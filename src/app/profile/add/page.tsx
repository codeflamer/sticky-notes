"use client";
import { Button } from "@/components/ui/Button";
import axios, { AxiosError } from "axios";
import { FC, useState } from "react";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const [content, setContent] = useState<string>("");

  const handleAdd = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!content) return;
    try {
      await axios.post("/api/add", JSON.stringify(content));
      setContent("");
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.message);
      }
    }
  };

  return (
    <div className=" flex flex-col " onSubmit={handleAdd}>
      <form className="w-[300px] mx-auto mt-[50px] flex  flex-col space-y-3">
        <label htmlFor="todo" className="text-center text-bold">
          New Sheet
        </label>
        <input
          id="todo"
          name="todo1"
          type="text"
          placeholder="Enter content "
          className="border-2  py-2 px-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};

export default Page;
