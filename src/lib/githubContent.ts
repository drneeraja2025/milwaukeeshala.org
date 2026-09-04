/**
 * Commit public content files to the milwaukeeshala.org GitHub repo.
 * Used by the staff publish API (hybrid CMS: calendar stays on GuruVidyaZen).
 */

const API = "https://api.github.com";

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function repoParts(): { owner: string; repo: string } {
  const full = process.env.GITHUB_CONTENT_REPO || "drneeraja2025/milwaukeeshala.org";
  const [owner, repo] = full.split("/");
  if (!owner || !repo) throw new Error("GITHUB_CONTENT_REPO must be owner/repo");
  return { owner, repo };
}

function authHeaders(): HeadersInit {
  const token = requireEnv("GITHUB_CONTENT_TOKEN");
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "milwaukeeshala-org-staff-publish",
  };
}

export type RepoFile = {
  path: string;
  sha: string;
  content: string;
};

export async function getRepoFile(path: string): Promise<RepoFile> {
  const { owner, repo } = repoParts();
  const branch = process.env.GITHUB_CONTENT_BRANCH || "main";
  const url = `${API}/repos/${owner}/${repo}/contents/${path
    .split("/")
    .map(encodeURIComponent)
    .join("/")}?ref=${encodeURIComponent(branch)}`;
  const res = await fetch(url, { headers: authHeaders(), cache: "no-store" });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub GET ${path} failed (${res.status}): ${body.slice(0, 300)}`);
  }
  const data = (await res.json()) as { sha: string; content: string; encoding: string };
  if (data.encoding !== "base64" || typeof data.content !== "string") {
    throw new Error(`Unexpected GitHub encoding for ${path}`);
  }
  const content = Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf8");
  return { path, sha: data.sha, content };
}

export async function putRepoFile(options: {
  path: string;
  content: string | Buffer;
  message: string;
  sha?: string;
  binary?: boolean;
}): Promise<{ commitUrl?: string; commitSha?: string }> {
  const { owner, repo } = repoParts();
  const branch = process.env.GITHUB_CONTENT_BRANCH || "main";
  const contentBase64 = Buffer.isBuffer(options.content)
    ? options.content.toString("base64")
    : Buffer.from(options.content, "utf8").toString("base64");

  const res = await fetch(`${API}/repos/${owner}/${repo}/contents/${options.path}`, {
    method: "PUT",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: options.message,
      content: contentBase64,
      branch,
      ...(options.sha ? { sha: options.sha } : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub PUT ${options.path} failed (${res.status}): ${body.slice(0, 400)}`);
  }

  const data = (await res.json()) as {
    commit?: { html_url?: string; sha?: string };
  };
  return { commitUrl: data.commit?.html_url, commitSha: data.commit?.sha };
}

export async function deleteRepoFile(options: {
  path: string;
  message: string;
  sha: string;
}): Promise<{ commitUrl?: string }> {
  const { owner, repo } = repoParts();
  const branch = process.env.GITHUB_CONTENT_BRANCH || "main";
  const res = await fetch(`${API}/repos/${owner}/${repo}/contents/${options.path}`, {
    method: "DELETE",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: options.message,
      sha: options.sha,
      branch,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub DELETE ${options.path} failed (${res.status}): ${body.slice(0, 400)}`);
  }
  const data = (await res.json()) as { commit?: { html_url?: string } };
  return { commitUrl: data.commit?.html_url };
}

export type ContentCommit = {
  sha: string;
  message: string;
  date: string;
  url: string;
  author: string;
};

export async function listRecentContentCommits(limit = 15): Promise<ContentCommit[]> {
  const { owner, repo } = repoParts();
  const branch = process.env.GITHUB_CONTENT_BRANCH || "main";
  const url = `${API}/repos/${owner}/${repo}/commits?sha=${encodeURIComponent(branch)}&per_page=30`;
  const res = await fetch(url, { headers: authHeaders(), cache: "no-store" });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub list commits failed (${res.status}): ${body.slice(0, 300)}`);
  }
  const data = (await res.json()) as Array<{
    sha: string;
    html_url: string;
    commit: { message: string; author?: { name?: string; date?: string } };
  }>;
  return data
    .filter((c) => c.commit.message.startsWith("content:"))
    .slice(0, limit)
    .map((c) => ({
      sha: c.sha,
      message: c.commit.message.split("\n")[0],
      date: c.commit.author?.date || "",
      url: c.html_url,
      author: c.commit.author?.name || "staff",
    }));
}

export async function undoLastContentCommit(): Promise<{
  commitUrl?: string;
  undoneMessage: string;
}> {
  const { owner, repo } = repoParts();
  const commits = await listRecentContentCommits(5);
  const target = commits.find((c) => !c.message.startsWith("content: undo"));
  if (!target) {
    throw Object.assign(new Error("No content publish commit found to undo"), { status: 404 });
  }

  const detailRes = await fetch(`${API}/repos/${owner}/${repo}/commits/${target.sha}`, {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (!detailRes.ok) {
    throw new Error(`GitHub get commit failed (${detailRes.status})`);
  }
  const detail = (await detailRes.json()) as {
    parents: Array<{ sha: string }>;
    files?: Array<{ filename: string; status: string; previous_filename?: string }>;
  };
  const parent = detail.parents[0]?.sha;
  if (!parent || !detail.files?.length) {
    throw Object.assign(new Error("Cannot undo: missing parent or file list"), { status: 400 });
  }

  let lastUrl: string | undefined;
  const short = target.sha.slice(0, 7);
  for (const file of detail.files) {
    const path = file.filename;
    if (file.status === "added") {
      const current = await getRepoFile(path).catch(() => null);
      if (current) {
        const del = await deleteRepoFile({
          path,
          sha: current.sha,
          message: `content: undo ${short} (remove ${path})`,
        });
        lastUrl = del.commitUrl;
      }
      continue;
    }
    if (file.status === "removed") {
      // Restore from parent
      const prevUrl = `${API}/repos/${owner}/${repo}/contents/${path
        .split("/")
        .map(encodeURIComponent)
        .join("/")}?ref=${encodeURIComponent(parent)}`;
      const prevRes = await fetch(prevUrl, { headers: authHeaders(), cache: "no-store" });
      if (!prevRes.ok) continue;
      const prev = (await prevRes.json()) as { content: string; encoding: string };
      const buf = Buffer.from(prev.content.replace(/\n/g, ""), "base64");
      const put = await putRepoFile({
        path,
        content: buf,
        message: `content: undo ${short} (restore ${path})`,
        binary: true,
      });
      lastUrl = put.commitUrl;
      continue;
    }
    // modified / renamed
    const prevPath = file.previous_filename || path;
    const prevUrl = `${API}/repos/${owner}/${repo}/contents/${prevPath
      .split("/")
      .map(encodeURIComponent)
      .join("/")}?ref=${encodeURIComponent(parent)}`;
    const prevRes = await fetch(prevUrl, { headers: authHeaders(), cache: "no-store" });
    if (!prevRes.ok) continue;
    const prev = (await prevRes.json()) as { content: string; encoding: string };
    const buf = Buffer.from(prev.content.replace(/\n/g, ""), "base64");
    const current = await getRepoFile(path).catch(() => null);
    const put = await putRepoFile({
      path,
      content: buf,
      message: `content: undo ${short} (restore ${path})`,
      sha: current?.sha,
      binary: true,
    });
    lastUrl = put.commitUrl;
  }

  return { commitUrl: lastUrl, undoneMessage: target.message };
}

export function slugify(input: string): string {
  const base = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return base || "update";
}

/** @deprecated Prefer assertStaffAuth from staffAuth — re-exported for callers. */
export { assertStaffAuth as assertPublishSecret } from "@/lib/staffAuth";
