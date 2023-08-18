import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const sheets = await db.sheet.findMany({
      where: {
        userId: session.user.id,
      },
    });
    // console.log("my sheets:", sheets);
    return new Response(JSON.stringify(sheets));
  } catch (e) {
    return new Response("Something went wrong", { status: 500 });
  }
  // return new Response("ok");
}
