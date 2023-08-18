"use client";
import { Content, Sheet } from "@prisma/client";
import { FC, useState } from "react";
import { Button } from "./ui/Button";
import { Icons } from "./icons";
import axios, { AxiosError } from "axios";

interface SheetProps {
  initialSheet: Sheet & {
    contents: Content[];
  };
}

const Sheet: FC<SheetProps> = ({ initialSheet }) => {
  // console.log(initialSheet.contents);
  const [newContent, setNewContent] = useState<string>("");

  const handleAddContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/addContent",
        JSON.stringify({ newContent, initialSheet })
      );
      setNewContent("");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
    console.log(newContent);
  };

  return (
    <div className="border h-[200px] rounded-md p-2 flex flex-col justify-between">
      <h2 className="text-center mx-auto text-bold text-[18px] italic">
        Sheet
        <hr className="border border-t " />
      </h2>

      <div className="flex-1 mt-2">
        <ul>
          {initialSheet.contents.map((content, index) => (
            <li key={content.id} className="list">
              <span>{index + 1}) </span>
              {content.message}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 mx-auto">
        <form onSubmit={handleAddContent}>
          <input
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        </form>
      </div>
      <div className="flex mx-auto w-full space-x-2">
        <Button variant="secondary" className="flex-1">
          Add to list <Icons.add className="h-5" />
        </Button>
        <Button variant="default" className="flex-1 space-x-2">
          <span>Edit</span> <Icons.edit className="h-5" />
        </Button>
        ii
      </div>
    </div>
  );
};

export default Sheet;
