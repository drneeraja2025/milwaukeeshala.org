/**
 * Optional Vercel Deploy Hook — call after staff content commits so Production
 * rebuilds from GitHub without waiting for the default webhook delay.
 */
export async function triggerProductionRedeploy(): Promise<boolean> {
  const hook = process.env.VERCEL_DEPLOY_HOOK_URL?.trim();
  if (!hook) return false;
  try {
    const res = await fetch(hook, { method: "POST", cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}

export function redeployNote(triggered: boolean): string {
  if (triggered) {
    return "Site rebuild started — news should appear on /news in about 1–2 minutes.";
  }
  return "Saved to GitHub. Site usually updates in 1–3 minutes after Vercel rebuilds main.";
}
