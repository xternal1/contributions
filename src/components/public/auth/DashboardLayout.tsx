import { useEffect, useState } from "react";
import { fetchProfile, fetchProfileById } from "../../../features/user/user_service";
import type { ProfilData } from "../../../features/user/models";

import BackgroundShapes from "../../../components/public/BackgroundShapes";
import SidebarDashboard from "./SidebarDashboard";

import { Toaster } from "react-hot-toast";
import noImage from "../../../assets/img/no-image/no-image.jpg";

type DashboardLayoutProps = React.PropsWithChildren<{ slug: string; refreshKey?: number }>;

const DashboardLayout = ({ children, slug, refreshKey = 0 }: DashboardLayoutProps) => {
    const [user, setUser] = useState<ProfilData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const baseProfile = await fetchProfile();
                if (baseProfile?.id) {
                    const detailProfile = await fetchProfileById(baseProfile.id);
                    setUser((detailProfile || baseProfile) as ProfilData);

                }
            } catch (error) {
                console.error("Gagal memuat profil:", error);
            } finally {
                setTimeout(() => setLoading(false), 300);
            }
        };


        loadProfile();
    }, [slug, refreshKey]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#141427] transition-colors duration-500">
            {/* Header */}
            <div className="relative px-6 py-30 bg-gradient-to-r dark:bg-[#0D0D1A] dark:bg-none from-indigo-100 via-stone-100 to-fuchsia-100 overflow-hidden">
                <BackgroundShapes />
            </div>

            <div className="relative z-20 -mt-35 max-w-sm 2xl:max-w-6xl xl:max-w-6xl lg:max-w-5xl md:max-w-3xl sm:max-w-xl mx-auto h-[200px] rounded-xl shadow-lg overflow-hidden">
                {/* Banner */}
                {loading ? (
                    <div className="w-full h-60 bg-gray-200 animate-pulse dark:bg-[#0D0D1A]" />
                ) : (
                    <div className="relative w-full h-60">
                        <img
                            src={
                                user?.banner
                                    ? user.banner.startsWith("http")
                                        ? user.banner
                                        : `${import.meta.env.VITE_API_URL}/storage/${user.banner}`
                                    : noImage
                            }
                            alt="cover"
                            className="w-full h-60 object-cover rounded-xl"
                            onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                target.onerror = null;
                                target.src = noImage;
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Profile */}
            <div className="mt-7 max-w-sm 2xl:max-w-6xl xl:max-w-6xl lg:max-w-5xl md:max-w-3xl sm:max-w-xl mx-auto pb-20 flex flex-col 2xl:flex-row xl:flex-row lg:flex-row gap-6 2xl:gap-0 xl:gap-0 lg:gap-0 md:gap-8 sm:gap-8">
                {/* Sidebar */}
                <SidebarDashboard />

                {/* Konten */}
                <div className="flex-1">{children}</div>
                <Toaster position="top-right" reverseOrder={false} />
            </div>

        </div>
    )
};

export default DashboardLayout;