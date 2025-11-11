import { useRef, useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../../components/public/auth/DashboardLayout";
import { fetchProfile, updateProfile, UpdatePassword } from "../../../features/user/user_service";
import type { ProfilData } from "../../../features/user/models";

import noProfile from "../../../assets/img/no-image/no-profile.jpeg";
import noImage from "../../../assets/img/no-image/no-image.jpg";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [profile, setProfile] = useState<ProfilData | null>(null);
    const [loading, setLoading] = useState(true);

    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string>("");
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string>("")

    const photoInputRef = useRef<HTMLInputElement | null>(null);
    const bannerInputRef = useRef<HTMLInputElement | null>(null);

    const MySwal = withReactContent(Swal);


    const [form, setForm] = useState({
        name: "",
        email: "",
        phone_number: "",
        address: "",
        gender: "",
    });

    const [passwordForm, setPasswordForm] = useState({
        old_password: "",
        password: "",
        password_confirmation: "",
    });


    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false,
    });


    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                setLoading(true);
                const data = await fetchProfile();
                if (data) {
                    setProfile(data);
                    setForm({
                        name: data.name,
                        email: data.email,
                        phone_number: data.phone_number,
                        address: data.address,
                        gender: data.gender?.toLowerCase() === "laki-laki" || data.gender?.toLowerCase() === "laki-laki"
                            ? "laki-laki"
                            : data.gender?.toLowerCase() === "perempuan" || data.gender?.toLowerCase() === "perempuan"
                                ? "perempuan"
                                : "",
                    });
                }
            } catch (err) {
                console.error("Gagal load profile", err);
            } finally {
                setTimeout(() => setLoading(false), 300);
            }
        };
        loadProfile();
    }, []);

    const ProfileSkeleton = () => (
        <div className="animate-pulse">
            {/* Banner Skeleton */}
            <div className="relative bg-gray-200 dark:bg-[#141427] rounded-lg mb-10 overflow-hidden">
                {/* Banner */}
                <div className="h-40 bg-gray-200 dark:bg-[#141427]" />

                {/* Foto profil + nama */}
                <div className="absolute bottom-5 left-8 flex items-center space-x-4">
                    <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-[#141427] border-8 border-white shadow-md dark:border-[#0D0D1A]" />
                    <div className="flex flex-col space-y-2">
                        <div className="h-4 w-24 bg-gray-200 dark:bg-[#141427] rounded" />
                    </div>
                </div>

                {/* Tombol edit cover */}
                <div className="absolute bottom-5 right-7 h-10 w-40 bg-gray-300 dark:bg-[#141427] rounded-full"></div>
            </div>

            {/* Form Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start text-xs">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i}>
                        <div className="h-4 w-24 bg-gray-200 dark:bg-[#141427] rounded mb-2"></div>
                        <div className="h-10 w-full bg-gray-200 dark:bg-[#141427] rounded"></div>
                    </div>
                ))}
            </div>

            {/* Button Skeleton */}
            <div className="flex justify-start mt-8">
                <div className="h-10 w-36 bg-gray-200 dark:bg-[#141427] rounded-full"></div>
            </div>
        </div>
    );

    const handleUpdateProfile = async () => {
        try {

            const confirm = await MySwal.fire({
                title: "Apakah kamu yakin?",
                text: "Pastikan semua data sudah benar sebelum disimpan.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya, Update!",
                cancelButtonText: "Batal",
                reverseButtons: true,
                buttonsStyling: false,
                customClass: {
                    popup: "my-swal-popup",
                    title: "my-swal-title",
                    htmlContainer: "my-swal-text",
                    confirmButton: "my-swal-confirm",
                    cancelButton: "my-swal-cancel",
                    icon: "my-swal-icon swal2-warning",
                },
            });

            if (!confirm.isConfirmed) return;

            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("phone_number", form.phone_number);
            formData.append("address", form.address);
            formData.append("gender", form.gender || "");

            if (photoFile) formData.append("photo", photoFile);
            if (bannerFile) formData.append("banner", bannerFile);
            formData.append("_method", "PATCH");

            await updateProfile(formData);

            const freshData = await fetchProfile();
            setProfile(freshData);
            setPhotoFile(null);
            setBannerFile(null);
            setPhotoPreview("");
            setBannerPreview("");
            setRefreshKey((prev) => prev + 1);
            setActiveTab("profile");

            await MySwal.fire({
                title: "Berhasil!",
                text: "Profil kamu berhasil diperbarui.",
                icon: "success",
                confirmButtonText: "OK",
                buttonsStyling: false,
                customClass: {
                    popup: "my-swal-popup",
                    title: "my-swal-title",
                    htmlContainer: "my-swal-text",
                    confirmButton: "my-swal-confirm",
                    icon: "my-swal-icon swal2-success",
                },
            });
        } catch (err: unknown) {
            console.error("Update profile gagal", err);

            const message =
                err instanceof Error
                    ? err.message
                    : "Update profil gagal, silakan coba lagi.";

            await MySwal.fire({
                title: "Oops!",
                text: message,
                icon: "error",
                confirmButtonText: "OK",
                buttonsStyling: false,
                customClass: {
                    popup: "my-swal-popup",
                    title: "my-swal-title",
                    htmlContainer: "my-swal-text",
                    confirmButton: "my-swal-confirm",
                    icon: "my-swal-icon swal2-error",
                },
            });
        }
    };


    const handleUpdatePassword = async () => {
        try {
            if (passwordForm.password !== passwordForm.password_confirmation) {
                MySwal.fire({
                    title: "Oops!",
                    text: "Password baru dan konfirmasi tidak sama.",
                    icon: "warning",
                    confirmButtonText: "OK",
                    buttonsStyling: false,
                    customClass: {
                        popup: "my-swal-popup",
                        title: "my-swal-title",
                        htmlContainer: "my-swal-text",
                        confirmButton: "my-swal-confirm",
                        icon: "my-swal-icon swal2-warning",
                    },
                });
                return;
            }

            const result = await UpdatePassword(passwordForm);

            if (result) {
                setPasswordForm({
                    old_password: "",
                    password: "",
                    password_confirmation: "",
                });

                MySwal.fire({
                    title: "Berhasil!",
                    text: "Password kamu berhasil diperbarui.",
                    icon: "success",
                    confirmButtonText: "OK",
                    buttonsStyling: false,
                    customClass: {
                        popup: "my-swal-popup",
                        title: "my-swal-title",
                        htmlContainer: "my-swal-text",
                        confirmButton: "my-swal-confirm",
                        icon: "my-swal-icon swal2-success",
                    },
                });
            } else {
                MySwal.fire({
                    title: "Gagal!",
                    text: "Gagal memperbarui password.",
                    icon: "error",
                    confirmButtonText: "OK",
                    buttonsStyling: false,
                    customClass: {
                        popup: "my-swal-popup",
                        title: "my-swal-title",
                        htmlContainer: "my-swal-text",
                        confirmButton: "my-swal-confirm",
                        icon: "my-swal-icon swal2-error",
                    },
                });
            }
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Terjadi kesalahan saat memperbarui password.";

            MySwal.fire({
                title: "Oops!",
                text: message,
                icon: "error",
                confirmButtonText: "OK",
                buttonsStyling: false,
                customClass: {
                    popup: "my-swal-popup",
                    title: "my-swal-title",
                    htmlContainer: "my-swal-text",
                    confirmButton: "my-swal-confirm",
                    icon: "my-swal-icon swal2-error",
                },
            });
        }
    };

    return (
        <DashboardLayout slug="profile" refreshKey={refreshKey}>
            {/* Konten */}
            <main className="flex-1 bg-white ml-0 2xl:ml-8 xl:ml-8 lg:ml-8 p-7 rounded-xl shadow-xl border-3 border-purple-200 dark:bg-[#0D0D1A] dark:border-white transition-colors duration-500">
                <h4 className="text-start font-bold mb-6 border-b pb-4 border-b-gray-300">Profil Saya</h4>

                {/* Tab */}
                <div className="flex gap-6 border-b-3 border-purple-200 mb-6 mt-10 ">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`text-xs font-semibold pb-2 px-3 text-center ${activeTab === "profile"
                            ? "text-purple-600 border-b-3 border-purple-600 -mb-[2px] dark:text-purple-400 dark:border-purple-400"
                            : "text-gray-500 hover:text-purple-600 dark:text-white"
                            }`}
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab("password")}
                        className={`text-xs font-semibold pb-2 px-3 ${activeTab === "password"
                            ? "text-purple-600 border-b-3 border-purple-600 -mb-[2px] dark:text-purple-400 dark:border-purple-400"
                            : "text-gray-500 hover:text-purple-600 dark:text-white"
                            }`}
                    >
                        Password
                    </button>
                </div>

                {/* Content Profile */}
                {loading ? (
                    <ProfileSkeleton />
                ) : (
                    <AnimatePresence mode="wait">
                        {activeTab === "profile" && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }}
                                transition={{ duration: 0.4 }}
                            >
                                {activeTab === "profile" && (
                                    <div>
                                        {/* isi Profile */}
                                        <div className="relative h-45 rounded-lg mb-10 overflow-hidden">
                                            <img
                                                src={bannerPreview || profile?.banner || noImage}
                                                alt="cover"
                                                className="w-full h-60 object-cover"
                                                onError={(e) => {
                                                    const target = e.currentTarget as HTMLImageElement;
                                                    target.onerror = null;
                                                    target.src = noImage;
                                                }}
                                            />

                                            <div className="absolute bottom-5 left-8 flex items-center space-x-4">
                                                {/* Foto Profil */}
                                                <img
                                                    src={photoPreview || profile?.photo || noProfile}
                                                    alt="profile"
                                                    className="w-25 h-25 rounded-full border-7 border-white shadow-md object-cover bg-white"
                                                    onError={(e) => {
                                                        const target = e.currentTarget as HTMLImageElement;
                                                        target.onerror = null;
                                                        target.src = noProfile;
                                                    }}
                                                />

                                                {/* Tombol Kamera */}
                                                <button
                                                    type="button"
                                                    className="absolute bottom-1 right-4 bg-white p-2 rounded-full shadow-md hover:bg-purple-600 group"
                                                    onClick={() => photoInputRef.current?.click()}
                                                >
                                                    <FaCamera size={15} className="text-purple-600 group-hover:text-white" />
                                                </button>

                                                <input
                                                    type="file"
                                                    ref={photoInputRef}
                                                    className="hidden"
                                                    accept="image/png, image/jpeg, image/webp, image/jpg, image/gif, image/avif"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            setPhotoFile(file);
                                                            setPhotoPreview(URL.createObjectURL(file));
                                                        }
                                                    }}
                                                />
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => bannerInputRef.current?.click()}
                                                className="absolute transition-all duration-500 ease-out shadow-[3px_3px_0px_0px_#0B1367]
                                                    hover:shadow-none active:translate-y-0.5 bottom-5 right-7 bg-yellow-400 text-black font-bold text-xs px-6 py-3 border-2 rounded-full hover:text-white hover:bg-purple-600">
                                                Edit Cover Photo
                                            </button>

                                            <input
                                                type="file"
                                                ref={bannerInputRef}
                                                className="hidden"
                                                accept="image/png, image/jpeg, image/webp, image/jpg, image/gif, image/avif"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setBannerFile(file);
                                                        setBannerPreview(URL.createObjectURL(file));
                                                    }
                                                }}
                                            />
                                        </div>

                                        {/* Form */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start text-xs">
                                            <div>
                                                <label className="block text-gray-700 font-bold mb-2 dark:text-white">Nama</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-2 border-purple-200 hover:border-purple-500 
                                                        focus:border-purple-600 focus:outline-none rounded-md p-3 "
                                                    value={form.name}
                                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 font-bold mb-2 dark:text-white">Email</label>
                                                <input
                                                    type="email"
                                                    className="w-full border-2 border-purple-200 hover:border-purple-500 
                                                        focus:border-purple-600 focus:outline-none rounded-md p-3"
                                                    value={form.email}
                                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 font-bold mb-2 dark:text-white">Phone Number</label>
                                                <input type="text" className="w-full border-2 border-purple-200 hover:border-purple-500 
                                                focus:border-purple-600 focus:outline-none rounded-md p-3"
                                                    value={form.phone_number}
                                                    placeholder="Nomor Telepon"
                                                    onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 font-bold mb-2 dark:text-white">Gender</label>
                                                <select
                                                    className="w-full border-2 border-purple-200 hover:border-purple-500 
                                                focus:border-purple-600 focus:outline-none rounded-md p-3 bg-white dark:bg-[#0D0D1A] transition-colors duration-500"
                                                    value={form.gender}
                                                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                                                >
                                                    <option value="" className="text-gray-400 border-b border-gray-300">
                                                        -- Pilih Gender --
                                                    </option>
                                                    <option value="laki-laki" className="text-gray-700 border-b border-gray-300">
                                                        Laki-laki
                                                    </option>
                                                    <option value="perempuan" className="text-gray-700 border-b border-gray-300">
                                                        Perempuan
                                                    </option>
                                                </select>
                                            </div>

                                            {/* Alamat */}
                                            <div className="md:col-span-2">
                                                <label className="block text-gray-700 font-bold mb-2 dark:text-white">Alamat</label>
                                                <textarea
                                                    rows={4}
                                                    className="w-full border-2 border-purple-200 hover:border-purple-500 
                                                focus:border-purple-600 focus:outline-none rounded-md p-3 resize-none"
                                                    value={form.address}
                                                    placeholder="Alamat"
                                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="flex justify-start mt-6">
                                            <button
                                                onClick={handleUpdateProfile}
                                                className="transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
                                                    hover:shadow-none active:translate-y-0.5 bg-purple-500 text-white font-bold text-xs 
                                                    px-6 py-3 rounded-full hover:text-black hover:bg-yellow-400"
                                            >
                                                Update Info
                                            </button>
                                        </div>
                                    </div>

                                )}
                            </motion.div>
                        )}

                        {/* Password */}
                        <motion.div
                            key="password"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.4 }}
                        >
                            {activeTab === "password" && (
                                <div>
                                    {/* isi Password */}
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
                                                    onChange={(e) =>
                                                        setPasswordForm({ ...passwordForm, old_password: e.target.value })
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword({ ...showPassword, old: !showPassword.old })}
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
                                                    onChange={(e) =>
                                                        setPasswordForm({ ...passwordForm, password: e.target.value })
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
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
                                                    onChange={(e) =>
                                                        setPasswordForm({ ...passwordForm, password_confirmation: e.target.value })
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white"
                                                >
                                                    {showPassword.confirm ? <HiOutlineEye size={18} /> : <HiOutlineEyeOff size={18} />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-start mt-6">
                                        <button
                                            onClick={handleUpdatePassword}
                                            className="transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
                                        hover:shadow-none active:translate-y-0.5 bg-purple-500 text-white font-bold text-xs 
                                        px-6 py-3 rounded-full hover:text-black hover:bg-yellow-400"
                                        >
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}
            </main>
        </DashboardLayout>
    );
};

export default ProfilePage;