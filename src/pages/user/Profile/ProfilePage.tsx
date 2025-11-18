import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/public/auth/DashboardLayout";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useProfileStore from "@lib/stores/user/profile/useProfileStore";
import { ProfileSkeleton, ProfileTab } from "@components/profile";
import PasswordTabs from "@components/profile/PasswordTab";

const MySwal = withReactContent(Swal);

const ProfilePage = () => {
    const photoInputRef = useRef<HTMLInputElement | null>(null);
    const bannerInputRef = useRef<HTMLInputElement | null>(null);

    // Store Imports
    const {
        profile,
        loading,
        form,
        passwordForm,
        photoFile,
        photoPreview,
        bannerFile,
        bannerPreview,
        activeTab,
        showPassword,
        refreshKey,

        loadProfile,
        submitProfileUpdate,
        submitPasswordUpdate,
        setForm,
        setPasswordForm,
        setPhotoFile,
        setBannerFile,
        setActiveTab,
        setShowPassword,
        cleanupPreviews,
    } = useProfileStore((s) => ({
        profile: s.profile,
        loading: s.loading,
        form: s.form,
        passwordForm: s.passwordForm,
        photoFile: s.photoFile,
        photoPreview: s.photoPreview,
        bannerFile: s.bannerFile,
        bannerPreview: s.bannerPreview,
        activeTab: s.activeTab,
        showPassword: s.showPassword,
        refreshKey: s.refreshKey,

        loadProfile: s.loadProfile,
        submitProfileUpdate: s.submitProfileUpdate,
        submitPasswordUpdate: s.submitPasswordUpdate,
        setForm: s.setForm,
        setPasswordForm: s.setPasswordForm,
        setPhotoFile: s.setPhotoFile,
        setBannerFile: s.setBannerFile,
        setActiveTab: s.setActiveTab,
        setShowPassword: s.setShowPassword,
        cleanupPreviews: s.cleanupPreviews,
    }));

    useEffect(() => {
        loadProfile();
        return () => {
            cleanupPreviews();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

            await submitProfileUpdate(formData);

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

            const result = await submitPasswordUpdate(passwordForm);

            if (result) {
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

                {/* Content */}
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
                                <ProfileTab
                                    profile={profile}
                                    form={form}
                                    setForm={setForm}
                                    photoPreview={photoPreview}
                                    bannerPreview={bannerPreview}
                                    photoInputRef={photoInputRef}
                                    bannerInputRef={bannerInputRef}
                                    setPhotoFile={setPhotoFile}
                                    setBannerFile={setBannerFile}
                                    handleUpdateProfile={handleUpdateProfile}
                                />
                            </motion.div>
                        )}

                        {activeTab === "password" && (
                            <motion.div
                                key="password"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.4 }}
                            >
                                <PasswordTabs
                                    passwordForm={passwordForm}
                                    setPasswordForm={setPasswordForm}
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                    handleUpdatePassword={handleUpdatePassword}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </main>
        </DashboardLayout>
    );
};

export default ProfilePage;