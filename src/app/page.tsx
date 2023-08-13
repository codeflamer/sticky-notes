import SideBar from "@/components/SideBar";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-0 m-0 font-bold text-[25px]">
      Welcome to the ultimate home page of the fucking sticker
      <br />
      <Button variant="link">
        <Link href="/profile">Go to Profile</Link>
      </Button>
      |
      <Button variant="link">
        <Link href="/login">Go to Login</Link>
      </Button>
    </div>
  );
}
