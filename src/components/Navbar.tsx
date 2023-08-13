import Link from "next/link";
import { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <nav className="bg-[#0e1420] text-white h-[50px] flex flex-col justify-center">
      <div className="max-w-6xl  mx-auto flex">
        <h3 className="font-bold text-[20px] md:text-[24px]">
          <Link href="/">Sticky Notes</Link>
        </h3>
      </div>
    </nav>
  );
};

export default Navbar;
