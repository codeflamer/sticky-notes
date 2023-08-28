"use client";
import { Content } from "@prisma/client";
import { FC, useRef, useState } from "react";
import { Menu } from "@headlessui/react";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface SheetContentProps {
  content: Content;
  index: number;
}

const SheetContent: FC<SheetContentProps> = ({ content, index }) => {
  const ref = useRef(null);
  const router = useRouter();

  const [item, setItem] = useState<string>(content.message);
  const [edit, setEdit] = useState<boolean>(false);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!item) return;
    e.preventDefault();
    try {
      await axios.post("/api/edit", JSON.stringify({ item, content }));
      //   console.log(item);
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
    setEdit(false);
  };

  const handleDelete = async () => {
    try {
      await axios.post("/api/delete/item", JSON.stringify(content));
      //   console.log(item);
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  // bg-transparent

  return (
    <div className="relative">
      <Menu>
        {edit ? (
          <form onSubmit={handleEdit}>
            <input
              value={item}
              ref={ref}
              autoFocus
              onChange={(e) => setItem(e.target.value)}
              className={cn("outline-none bg-transparent", {})}
            />
          </form>
        ) : (
          <Menu.Button>
            {index + 1}) {content.message}
          </Menu.Button>
        )}

        <Menu.Items className="absolute right-0 border flex flex-col bg-primary w-[200px] text-white rounded-sm space-y-2 p-1 z-10 text-[14px] ">
          <Menu.Item>
            <span
              className="flex items-center hover:bg-white rounded-sm hover:text-primary p-1"
              onClick={() => {
                setEdit(true);
              }}
            >
              <Icons.edit className="h-4" /> Edit
            </span>
          </Menu.Item>
          <hr className="p-0" />
          <Menu.Item>
            <span
              className="flex items-center hover:bg-white rounded-sm hover:text-primary p-1"
              onClick={() => {
                setEdit(true);
              }}
            >
              <Icons.completed className="h-4" /> Mark Complete
            </span>
          </Menu.Item>
          <hr className="p-0" />
          <Menu.Item>
            <span
              className="flex items-center hover:bg-white rounded-sm hover:text-primary p-1"
              onClick={() => handleDelete()}
            >
              <Icons.trash className="h-4" />
              Delete
            </span>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default SheetContent;
