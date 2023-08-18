import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Content, Sheet } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized action", { status: 400 });
    }
    const {
      newContent,
      initialSheet,
    }: {
      newContent: string;
      initialSheet: Sheet & { content: Content };
    } = await req.json();

    await db.sheet.update({
      where: { id: initialSheet.id },
      data: {
        contents: {
          create: {
            message: newContent,
          },
        },
      },
    });
    return new Response("OK");
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
