import SideBar from "@/components/SideBar";
import { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div>
      <div>
        <SideBar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default layout;
