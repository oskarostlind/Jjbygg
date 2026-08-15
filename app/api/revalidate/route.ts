import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ revalidated: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const secret = typeof body === "object" && body !== null && "secret" in body
    ? (body as { secret?: unknown }).secret
    : undefined;

  if (typeof secret !== "string" || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("cms");
  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true });
}
