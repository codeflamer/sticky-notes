import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Content } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized action", { status: 400 });
    }
    const content: Content = await req.json();

    await db.content.delete({
      where: { id: content.id },
    });
    return new Response("OK");
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}
