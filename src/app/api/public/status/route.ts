export const dynamic = "force-dynamic";
export async function GET() {
  return Response.json({ public: true });
}
