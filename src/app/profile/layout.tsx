import SideBar from "@/components/SideBar";
import { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="flex ">
      <div className="">
        <SideBar />
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default layout;
