import { useRef, useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../../components/public/auth/DashboardLayout";
import { fetchProfile, updateProfile, UpdatePassword } from "../../../features/user/user_service";
import type { ProfilData } from "../../../features/user/models";

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [profile, setProfile] = useState<ProfilData | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string>("");
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string>("");

    const photoInputRef = useRef<HTMLInputElement | null>(null);
    const bannerInputRef = useRef<HTMLInputElement | null>(null);


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
            }
        };
        loadProfile();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("phone_number", form.phone_number);
            formData.append("address", form.address);
            formData.append("gender", form.gender || "");

            if (photoFile) formData.append("photo", photoFile);
            if (bannerFile) formData.append("banner", bannerFile);

            formData.append("_method", "PATCH");

            // langsung kirim aja, jangan cek return
            await updateProfile(formData);

            // fetch ulang data setelah update
            const freshData = await fetchProfile();
            setProfile(freshData);

            setPhotoFile(null);
            setBannerFile(null);
            setPhotoPreview("");
            setBannerPreview("");

            setRefreshKey((prev) => prev + 1);

            setShowConfirm(false);
            setShowSuccess(true);
            setActiveTab("profile");
            console.log("✅ Profile berhasil diperbarui");
        } catch (err: unknown) {
            console.error("❌ Update profile gagal", err);

            if (err instanceof Error) {
                setErrorMessage(err.message);
            } else {
                setErrorMessage("Update profil gagal, silakan coba lagi.");
            }

            setShowError(true);
            setShowConfirm(false);
        }
    };

    const handleUpdatePassword = async () => {
        try {
            if (passwordForm.password !== passwordForm.password_confirmation) {
                setErrorMessage("Password baru dan konfirmasi tidak sama.");
                setShowError(true);
                return;
            }

            const result = await UpdatePassword(passwordForm);

            if (result) {
                setShowSuccess(true);
                setPasswordForm({ old_password: "", password: "", password_confirmation: "" });
            } else {
                setErrorMessage("Gagal update password.");
                setShowError(true);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setErrorMessage(err.message);
            } else {
                setErrorMessage("Update password gagal, silakan coba lagi.");
            }
            setShowError(true);
        }
    };

    return (
        <DashboardLayout slug="profile" refreshKey={refreshKey}>
            {/* Konten */}
            <main className="flex-1 bg-white ml-8 p-7 rounded-xl shadow-xl border-3 border-purple-200 ">
                <h4 className="text-start font-bold mb-6 border-b pb-4 border-b-gray-300">Profil Saya</h4>

                {/* Tab */}
                <div className="flex gap-6 border-b-3 border-purple-200 mb-6 mt-10 ">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`text-xs font-semibold pb-2 px-3 text-center ${activeTab === "profile"
                            ? "text-purple-600 border-b-3 border-purple-600 -mb-[2px]"
                            : "text-gray-500 hover:text-purple-600"
                            }`}
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab("password")}
                        className={`text-xs font-semibold pb-2 px-3 ${activeTab === "password"
                            ? "text-purple-600 border-b-3 border-purple-600 -mb-[2px]"
                            : "text-gray-500 hover:text-purple-600"
                            }`}
                    >
                        Password
                    </button>
                </div>

                {/* Content Profile */}
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
                                    <div className="relative h-45 bg-gradient-to-r from-blue-200 to-blue-400 rounded-lg mb-10 overflow-hidden">
                                        <img
                                            src={bannerPreview || profile?.banner || "/src/assets/img/no-image/no-image.jpg"}
                                            alt="cover"
                                            className="w-full h-60 object-cover"
                                        />
                                        <div className="absolute bottom-5 left-8 flex items-center space-x-4">
                                            {/* Foto Profil */}
                                            <img
                                                src={photoPreview || profile?.photo || "/src/assets/img/no-image/no-profile.jpeg"}
                                                alt="profile"
                                                className="w-25 h-25 rounded-full border-7 border-white shadow-md object-cover bg-white"
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
                                            <label className="block text-gray-700 font-bold mb-2">Nama</label>
                                            <input
                                                type="text"
                                                className="w-full border-2 border-purple-200 hover:border-purple-500 
             focus:border-purple-600 focus:outline-none rounded-md p-3 "
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-bold mb-2">Email</label>
                                            <input
                                                type="email"
                                                className="w-full border-2 border-purple-200 hover:border-purple-500 
             focus:border-purple-600 focus:outline-none rounded-md p-3"
                                                value={form.email}
                                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
                                            <input type="text" className="w-full border-2 border-purple-200 hover:border-purple-500 
             focus:border-purple-600 focus:outline-none rounded-md p-3"
                                                value={form.phone_number}
                                                placeholder="Nomor Telepon"
                                                onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-bold mb-2">Gender</label>
                                            <select
                                                className="w-full border-2 border-purple-200 hover:border-purple-500 
      focus:border-purple-600 focus:outline-none rounded-md p-3 bg-white"
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
                                            <label className="block text-gray-700 font-bold mb-2">Alamat</label>
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
                                            onClick={() => setShowConfirm(true)}
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

                    {/* Modal Konfirmasi */}
                    <AnimatePresence>
                        {showConfirm && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                            >
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-xl shadow-xl p-8 w-[400px] text-center"
                                >
                                    <div className="text-orange-500 text-4xl mb-4">!</div>
                                    <h2 className="text-lg font-bold mb-2">Apakah Anda yakin?</h2>
                                    <p className="text-gray-600 mb-6">Pastikan data yang diisi sudah benar!</p>

                                    <div className="flex justify-center gap-4">
                                        <button
                                            onClick={handleUpdateProfile}
                                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-semibold"
                                        >
                                            Ya, Update!
                                        </button>
                                        <button
                                            onClick={() => setShowConfirm(false)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold"
                                        >
                                            Batal
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Modal Berhasil */}
                    <AnimatePresence>
                        {showSuccess && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                            >
                                <motion.div
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -50, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-xl shadow-xl p-8 w-[400px] text-center"
                                >
                                    <div className="text-green-500 text-5xl mb-4">✔</div>
                                    <h2 className="text-2xl font-bold mb-2">Berhasil!</h2>
                                    <p className="text-gray-600 mb-6">Profil berhasil diperbarui.</p>

                                    <button
                                        onClick={() => setShowSuccess(false)}
                                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-semibold"
                                    >
                                        OK
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Modal Error */}
                    <AnimatePresence>
                        {showError && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                            >
                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 50, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-xl shadow-xl p-8 w-[400px] text-center"
                                >
                                    <div className="text-red-500 text-5xl mb-4">✖</div>
                                    <h2 className="text-2xl font-bold mb-2">Gagal!</h2>
                                    <p className="text-gray-600 mb-6">{errorMessage}</p>

                                    <button
                                        onClick={() => setShowError(false)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-semibold"
                                    >
                                        Tutup
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>


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
                                        <label className="block text-gray-700 font-bold mb-2">Password Lama</label>
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
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                            >
                                                {showPassword.old ? <HiOutlineEye size={18} /> : <HiOutlineEyeOff size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Password Baru */}
                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">Password Baru</label>
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
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                            >
                                                {showPassword.new ? <HiOutlineEye size={18} /> : <HiOutlineEyeOff size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Konfirmasi Password */}
                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">Konfirmasi Password</label>
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
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
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
            </main>
        </DashboardLayout>
    );
};

export default ProfilePage;