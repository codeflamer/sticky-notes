import * as z from "zod";

export const userLoginSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be more than 2 characters",
  }),
  password: z.string().min(6, {
    message: "Password must be more than 6 characters",
  }),
});

export type TypeUserLoginSchema = z.infer<typeof userLoginSchema>;
