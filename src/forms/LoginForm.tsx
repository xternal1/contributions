import { useState } from "react";
import { HiOutlineLockClosed, HiOutlineMail, HiOutlineEye, HiOutlineEyeOff, HiCheck, HiX } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginFormValues } from "./validation/loginScema";
import { Checkbox, Button, Toast } from "flowbite-react";
import { authService } from "../features/user/user_service";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const user = await authService.login({
        email: data.email,
        password: data.password,
      });

      if (user) {
        setToast({ type: "success", message: `Login berhasil! Selamat datang, ${user.name}` });

        window.location.href = "/dashboard/user";
      } else {
        setToast({ type: "error", message: "Email atau password salah" });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setToast({ type: "error", message: "Terjadi kesalahan saat login" });
    } finally {
      setLoading(false);
    }

    setTimeout(() => setToast(null), 20000);
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <Toast
            className={`shadow-lg rounded-lg ${toast.type === "success" ? "bg-green-50" : "bg-red-50"
              }`}
          >
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


      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Tombol Google */}
        <Button
          type="button"
          color="light"
          className="w-full border border-gray-300 mb-4 flex items-center justify-center"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </Button>

        {/* Garis pemisah */}
        <div className="flex items-center mb-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Input Email */}
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <HiOutlineMail className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              {...register("email")}
              className={`bg-white border ${errors.email ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5`}
              placeholder="Email"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Input Password */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <HiOutlineLockClosed className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`bg-white border ${errors.password ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5`}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <HiOutlineEye className="w-5 h-5" />
              ) : (
                <HiOutlineEyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Remember me & Forgot password */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <div className="flex items-center">
              <Checkbox
                className="accent-purple-500 focus:outline-none focus:ring-0"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
          </div>

          <a href="/password/email" className="text-sm text-purple-500">
            Forgot Password
          </a>
        </div>

        {/* Tombol Masuk */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4" />
              <span>Memproses...</span>
            </>
          ) : (
            "Masuk"
          )}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
