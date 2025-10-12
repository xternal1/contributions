import { z } from "zod";

export const RegisterSchema = z
  .object({
    fullName: z
      .string()
      .min(3, { message: "Nama lengkap minimal 3 karakter" })
      .max(50, { message: "Nama lengkap maksimal 50 karakter" }),
    email: z
      .string()
      .email({ message: "Email tidak valid" }),
    password: z
      .string()
      .min(8, { message: "Password minimal 8 karakter" }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof RegisterSchema>;
