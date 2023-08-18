"use client";
import { sideBarConfig } from "@/config/sidebarConfig";
import { FC } from "react";
import { Icons } from "./icons";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { User } from "@prisma/client";
import { Button } from "./ui/Button";
import { Session } from "next-auth";

interface sidebarProps {
  session: Session;
}

const SideBar: FC<sidebarProps> = ({ session }) => {
  const router = useRouter();

  return (
    <div className="max-w-[250px] md:w-[270px]  h-screen bg-[#0e1420] text-white rounded-r-lg px-2 py-5 flex flex-col justify-between">
      <div>
        <h2 className="capitalize font-medium text-[25px] mt-3">
          <Link href="/">Sticky Notes</Link>
        </h2>
        <ul className="space-y-3 mt-5 pl-4 text-[16px] md:text-[17px] text-[#a1a6ac cursor-pointer">
          {sideBarConfig.sideNav.map(({ title, Icon, link }) => (
            <a
              key={title + 1}
              href={link}
              className="px-2 py-1 hover:bg-white hover:text-[#0e1420] rounded-md  flex items-center"
            >
              <li className="flex items-center space-x-3">
                <Icon className=" h-[19px] font-medium" />
                <span>{title}</span>
              </li>
            </a>
          ))}
        </ul>
      </div>
      <div className="text-center flex flex-col space-y-2 items-center mx-auto px-2 py-2 rounded-md hover:cursor-pointer ">
        <span>{session?.user.email}</span>

        <Button
          variant="secondary"
          onClick={() => {
            signOut();
            router.push("/login");
          }}
        >
          Logout <Icons.logout className=" h-[19px] font-medium" />
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
