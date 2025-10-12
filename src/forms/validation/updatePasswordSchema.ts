import { z } from "zod";

export const UpdatePasswordSchema = z
  .object({
    password: z.string().min(8, "Password minimal 6 karakter"),
    confirmPassword: z.string().min(8, "Konfirmasi password minimal 6 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

export type UpdatePasswordValues = z.infer<typeof UpdatePasswordSchema>;
