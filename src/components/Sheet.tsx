"use client";
import { Content, Sheet } from "@prisma/client";
import { FC, useRef, useState } from "react";
import { Button } from "./ui/Button";
import { Icons } from "./icons";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import OverLayForm from "./OverLayForm";
import { Dialog, Transition } from "@headlessui/react";
import SheetContent from "./SheetContent";

interface SheetProps {
  initialSheet: Sheet & {
    contents: Content[];
  };
}

const Sheet: FC<SheetProps> = ({ initialSheet }) => {
  // console.log(initialSheet.contents);
  const focusInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [newContent, setNewContent] = useState<string>("");
  let [isOpen, setIsOpen] = useState(false);

  const handleAddContent = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!newContent) return;
    e.preventDefault();
    try {
      await axios.post(
        "/api/content",
        JSON.stringify({ newContent, initialSheet })
      );
      setNewContent("");
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
    // console.log(newContent);
  };

  const handleClickSheet = (sheet: Sheet & { contents: Content[] }) => {
    // console.log(sheet);
    setIsOpen(true);
  };

  return (
    <div
      className="border h-[210px] rounded-md p-2 flex flex-col justify-between hover:cursor-pointer hover:bg-gray-400"
      onClick={() => handleClickSheet(initialSheet)}
    >
      <h2 className="text-center mx-auto text-bold text-[18px] italic">
        Sheet
        <hr className="border border-t " />
      </h2>

      <div className="flex-1 mt-2">
        <ul>
          {initialSheet.contents
            .sort((a, b) => a.id - b.id)
            .map((content, index) => (
              <li key={content.id} className="list">
                <span>{index + 1}) </span>
                {content.message}
              </li>
            ))}
        </ul>
      </div>

      <div>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="border bg-white p-2 rounded-md">
              <Dialog.Panel>
                <div
                  className="h-auto rounded-md p-2 flex flex-col justify-between hover:cursor-pointer hover:bg-gray-100 w-[400px]"
                  onClick={() => handleClickSheet(initialSheet)}
                >
                  <h2 className="text-center mx-auto text-bold text-[18px] italic">
                    Sheet
                    <hr className="border border-t " />
                  </h2>

                  <div className="flex-1 mt-2">
                    <ul className="space-y-2">
                      {initialSheet.contents
                        .sort((a, b) => a.id - b.id)
                        .map((content, index) => (
                          <SheetContent
                            content={content}
                            index={index}
                            key={index}
                          />
                        ))}
                    </ul>
                  </div>
                  <div className="flex-1 flex mt-2">
                    <span onClick={() => focusInputRef.current?.focus()}>
                      <Icons.add />{" "}
                    </span>
                    <form onSubmit={handleAddContent}>
                      <input
                        value={newContent}
                        ref={focusInputRef}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="outline-none bg-transparent"
                      />
                    </form>
                  </div>
                  {/* <div className="flex mx-auto w-full space-x-2 mt-3">
                    <Button variant="default" className="flex-1 space-x-2">
                      <span>Edit</span> <Icons.edit className="h-5" />
                    </Button>
                  </div> */}
                </div>
                <div className="flex flex-col">
                  <Button
                    className="mx-auto mt-1"
                    variant="destructive"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </Button>
                </div>

                {/* <button onClick={() => setIsOpen(false)}>Cancel</button> */}
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Sheet;
