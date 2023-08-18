import { authOptions } from "@/lib/auth";
import axios, { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { FC } from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Session } from "next-auth";
import Sheet from "@/components/Sheet";

interface pageProps {}

const getSheets = async (session: Session) => {
  try {
    const results = await db.sheet.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        contents: {},
      },
    });
    return results;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    }
    return notFound();
  }
};

const Page: FC<pageProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();

  // const sheets = await axios.get("/api/get");
  const initialSheets = await getSheets(session);
  // console.log(initialSheets);

  return (
    <div className="mx-2">
      <div className="grid grid-cols-3 gap-5">
        {initialSheets.map((initialSheet) => (
          <Sheet key={initialSheet.id} initialSheet={initialSheet} />
        ))}
      </div>
    </div>
  );
};

export default Page;
