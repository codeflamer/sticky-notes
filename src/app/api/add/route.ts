import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  //   console.log(session);
  //   console.log(req.body);
  try {
    const data = await req.json();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    await db.sheet.create({
      data: {
        User: { connect: { email: session.user.email as string } },
        contents: {
          create: {
            message: data,
          },
        },
        isEmpty: false,
      },
    });

    return new Response("OK");
  } catch (e) {
    return new Response("Something went wrong", { status: 500 });
  }
  return new Response("OK");
}
