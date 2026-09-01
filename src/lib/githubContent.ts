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
}): Promise<{ commitUrl?: string }> {
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

  const data = (await res.json()) as { commit?: { html_url?: string } };
  return { commitUrl: data.commit?.html_url };
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

export function assertPublishSecret(req: Request): void {
  const expected = process.env.CONTENT_PUBLISH_SECRET?.trim();
  if (!expected) throw new Error("CONTENT_PUBLISH_SECRET is not configured");
  const header = req.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  const token = match?.[1]?.trim() || "";
  if (!token || token !== expected) {
    const err = new Error("Unauthorized");
    (err as Error & { status: number }).status = 401;
    throw err;
  }
}
