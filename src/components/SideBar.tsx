"use client";
import { sideBarConfig } from "@/config/sidebarConfig";
import { Home } from "../../node_modules/lucide-react";
import { FC } from "react";
import { Icons } from "./icons";

interface sidebarProps {}

const SideBar: FC<sidebarProps> = ({}) => {
  return (
    <div className="max-w-[250px]  h-screen bg-[#0e1420] text-white rounded-r-lg px-2 py-5 flex flex-col justify-between">
      <div>
        <h2 className="capitalize font-medium text-[25px] mt-3">
          Sticky Notes
        </h2>
        <ul className="space-y-3 mt-5 pl-4 text-[16px] md:text-[17px] text-[#a1a6ac cursor-pointer">
          {sideBarConfig.sideNav.map(({ title, Icon }) => (
            <li
              key={title + 1}
              className="space-x-3 hover:bg-white hover:text-[#0e1420] rounded-md px-2 py-1 flex items-center"
            >
              <Icon className=" h-[19px] font-medium" />
              <span>{title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-center flex space-x-2 items-center mx-auto px-2 py-2 rounded-md hover:bg-white hover:text-[#0e1420] hover:cursor-pointer ">
        <button>Logout</button>{" "}
        <Icons.logout className=" h-[19px] font-medium" />
      </div>
    </div>
  );
};

export default SideBar;
