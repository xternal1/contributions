import { z } from "zod";

export const ForgotSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
});

export type ForgotFormValues = z.infer<typeof ForgotSchema>;
