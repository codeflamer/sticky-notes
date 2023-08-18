import SideBar from "@/components/SideBar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) return;
  return (
    <div className="flex bg-gray-500">
      <div className="">
        <SideBar session={session} />
      </div>
      <div className="flex-grow mt-4">{children}</div>
    </div>
  );
};

export default layout;
