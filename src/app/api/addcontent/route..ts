import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  // try {
  //   const session = await getServerSession(authOptions);
  //   if (!session) {
  //     return new Response("Unauthorized action", { status: 400 });
  //   }
  //   const data = await req.json();
  //   console.log(data);
  // } catch (error) {
  //   return new Response("Internal server error", { status: 500 });
  // }
  return new Response("ok");
}
