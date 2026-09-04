import { site } from "@/lib/site";

export const runtime = "edge";

export async function GET() {
  return Response.json({
    ok: true,
    site: site.domain,
    time: new Date().toISOString(),
  });
}
