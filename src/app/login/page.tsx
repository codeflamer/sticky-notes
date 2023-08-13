"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { FC } from "react";
import { TypeUserLoginSchema, userLoginSchema } from "@/lib/validations/login";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeUserLoginSchema>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit = (data: TypeUserLoginSchema) => {
    // e.preventDefault();
    console.log(data);
  };

  return (
    <div className="border max-w-xl mx-auto flex flex-col mt-[60px] rounded-xl p-5">
      <h4 className="text-[24px] text-bold">Create an account or Login</h4>
      <p className="my-2 text-[#71717A]">
        Enter your email below to create your account
      </p>
      <div className="flex space-x-5 mt-2">
        <Button className="flex-grow hover:bg-gray-100">
          <Icons.github className="h-5 mr-1" />
          Github
        </Button>
        <Button className="flex-grow hover:bg-gray-100">
          <Icons.google className="h-5 mr-2" />
          Google
        </Button>
      </div>
      <div className="flex my-8 justify-center relative ">
        <div className="flex-grow border-t"></div>
        <span className="flex-1 mx-auto text-center absolute bg-white px-2 top-[-12px] uppercase text-[#71717A]">
          Or continue with{" "}
        </span>
      </div>

      {/* form handling */}

      <form className="space-y-5 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="email" className="font-bold ">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            className="placeholder:text-[#71717A]"
            {...register("username")}
          />
          <p className="text-red-500 text-[14px]">
            {errors.username && errors.username?.message}
          </p>
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="password" className="font-bold ">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="placeholder:text-[#71717A]"
            {...register("password")}
          />
          <p className="text-red-500 text-[14px]">
            {errors.password && errors.password?.message}
          </p>
        </div>
        <Button
          variant="default"
          type="submit"
          className="bg-black text-white rounded-md w-full hover:bg-black hover:opacity-80"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Page;
