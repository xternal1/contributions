import { useState } from "react";
import { HiOutlineMail, HiCheck, HiX } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotSchema, type ForgotFormValues } from "./validation/forgotSchema";
import { Button, Toast } from "flowbite-react";

const ForgotForm = () => {
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(ForgotSchema),
  });

  const onSubmit = async (data: ForgotFormValues) => {
    try {
      console.log("Forgot Password Data:", data);
      // Simulasi API sukses
      setToast({ type: "success", message: "Link reset password telah dikirim ke email Anda." });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setToast({ type: "error", message: "Terjadi kesalahan saat mengirim link reset password." });
    }

    setTimeout(() => setToast(null), 5000);
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <Toast className={`shadow-lg rounded-lg ${toast.type === "success" ? "bg-green-50 dark:bg-[#141427]" : "bg-red-50 dark:bg-[#141427]"}`}>
            {toast.type === "success" ? (
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500">
                <HiCheck className="h-5 w-5" />
              </div>
            ) : (
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
                <HiX className="h-5 w-5" />
              </div>
            )}
            <div className="ml-3 text-sm font-normal">{toast.message}</div>
            <button
              onClick={() => setToast(null)}
              className="ml-2 text-gray-400 hover:text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 p-1"
            >
              <HiX className="w-4 h-4" />
            </button>
          </Toast>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Input Email */}
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <HiOutlineMail className="w-4 h-4 text-gray-500 dark:text-white" />
            </div>
            <input
              type="text"
              {...register("email")}
              className={`bg-white border dark:bg-[#141427] dark:placeholder:text-white ${errors.email ? "border-red-500" : "border-gray-300"} text-gray-900 dark:text-white text-sm rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5`}
              placeholder="Email"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Tombol Kirim & Kembali */}
        <div className="space-y-3">
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Kirim
          </Button>
          <a
            href="/login"
            className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2.5 rounded-lg transition-colors dark:bg-[#141427] dark:text-white"
          >
            Kembali ke Login
          </a>
        </div>
      </form>
    </>
  );
};

export default ForgotForm;
