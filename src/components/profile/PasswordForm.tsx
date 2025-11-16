// src/components/profile/PasswordForm.tsx
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

interface PasswordFormData {
    old_password: string;
    password: string;
    password_confirmation: string;
}

interface ShowPasswordState {
    old: boolean;
    new: boolean;
    confirm: boolean;
}

interface PasswordFormProps {
    passwordForm: PasswordFormData;
    showPassword: ShowPasswordState;
    onPasswordFormChange: (field: string, value: string) => void;
    onToggleShowPassword: (field: "old" | "new" | "confirm") => void;
    onSubmit: () => void;
}

const PasswordForm = ({
    passwordForm,
    showPassword,
    onPasswordFormChange,
    onToggleShowPassword,
    onSubmit,
}: PasswordFormProps) => {
    return (
        <div>
            <div className="grid grid-cols-1 gap-6 text-start text-xs">
                {/* Password Lama */}
                <div>
                    <label className="block text-gray-700 font-bold mb-2 dark:text-white">Password Lama</label>
                    <div className="relative">
                        <input
                            type={showPassword.old ? "text" : "password"}
                            placeholder="Password Lama"
                            className="w-full border-2 border-purple-200 hover:border-purple-500 
                                focus:border-purple-600 focus:outline-none rounded-md p-3 pr-10"
                            value={passwordForm.old_password}
                            onChange={(e) => onPasswordFormChange("old_password", e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => onToggleShowPassword("old")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white"
                        >
                            {showPassword.old ? <HiOutlineEye size={18} /> : <HiOutlineEyeOff size={18} />}
                        </button>
                    </div>
                </div>

                {/* Password Baru */}
                <div>
                    <label className="block text-gray-700 font-bold mb-2 dark:text-white">Password Baru</label>
                    <div className="relative">
                        <input
                            type={showPassword.new ? "text" : "password"}
                            placeholder="Password Baru"
                            className="w-full border-2 border-purple-200 hover:border-purple-500 
                                focus:border-purple-600 focus:outline-none rounded-md p-3 pr-10"
                            value={passwordForm.password}
                            onChange={(e) => onPasswordFormChange("password", e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => onToggleShowPassword("new")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white"
                        >
                            {showPassword.new ? <HiOutlineEye size={18} /> : <HiOutlineEyeOff size={18} />}
                        </button>
                    </div>
                </div>

                {/* Konfirmasi Password */}
                <div>
                    <label className="block text-gray-700 font-bold mb-2 dark:text-white">Konfirmasi Password</label>
                    <div className="relative">
                        <input
                            type={showPassword.confirm ? "text" : "password"}
                            placeholder="Re-Type New Password"
                            className="w-full border-2 border-purple-200 hover:border-purple-500 
                                focus:border-purple-600 focus:outline-none rounded-md p-3 pr-10"
                            value={passwordForm.password_confirmation}
                            onChange={(e) => onPasswordFormChange("password_confirmation", e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => onToggleShowPassword("confirm")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white"
                        >
                            {showPassword.confirm ? <HiOutlineEye size={18} /> : <HiOutlineEyeOff size={18} />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-start mt-6">
                <button
                    onClick={onSubmit}
                    className="transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
                        hover:shadow-none active:translate-y-0.5 bg-purple-500 text-white font-bold text-xs 
                        px-6 py-3 rounded-full hover:text-black hover:bg-yellow-400"
                >
                    Update Password
                </button>
            </div>
        </div>
    );
};

export default PasswordForm;


