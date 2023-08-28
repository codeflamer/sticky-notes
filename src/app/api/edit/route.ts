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
    const { item: newMessage, content }: { item: string; content: Content } =
      await req.json();
    // console.log(item);
    await db.content.update({
      where: { id: content.id },
      data: {
        message: newMessage,
      },
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
  return new Response("OK");
}
