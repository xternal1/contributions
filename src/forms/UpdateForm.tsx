import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    HiOutlineLockClosed,
    HiOutlineEye,
    HiOutlineEyeOff,
    HiCheck,
    HiX
} from "react-icons/hi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Toast } from "flowbite-react";
import { UpdatePasswordSchema, type UpdatePasswordValues } from "./validation/updatePasswordSchema";

const UpdateForm = () => {
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdatePasswordValues>({
        resolver: zodResolver(UpdatePasswordSchema),
    });

    const navigate = useNavigate();

    const onSubmit = async (data: UpdatePasswordValues) => {
        try {
            console.log("Update Password Data:", data);
            setToast({ type: "success", message: "Password berhasil diperbarui." });
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setToast({ type: "error", message: "Terjadi kesalahan saat mengubah password." });
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
                {/* Password Baru */}
                <div className="mb-6 relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <HiOutlineLockClosed className="w-4 h-4 text-gray-500 dark:text-white" />
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        className={`bg-white border dark:bg-[#141427] dark:placeholder:text-white ${errors.password ? "border-red-500" : "border-gray-300"} text-gray-900 dark:text-white text-sm rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5`}
                        placeholder="Password Baru"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-white"
                    >
                        {showPassword ? <HiOutlineEye className="w-5 h-5" /> : <HiOutlineEyeOff className="w-5 h-5" />}
                    </button>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                {/* Konfirmasi Password */}
                <div className="mb-6 relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <HiOutlineLockClosed className="w-4 h-4 text-gray-500 dark:text-white" />
                    </div>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                        className={`bg-white border dark:bg-[#141427] dark:placeholder:text-white ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} text-gray-900 dark:text-white text-sm rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5`}
                        placeholder="Konfirmasi Password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-white"
                    >
                        {showConfirmPassword ? <HiOutlineEye className="w-5 h-5" /> : <HiOutlineEyeOff className="w-5 h-5" />}
                    </button>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>

                {/* Tombol Kirim */}
                <div className="space-y-3">
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        Ubah Password
                    </Button>
                </div>
            </form>
        </>
    );
};

export default UpdateForm;
