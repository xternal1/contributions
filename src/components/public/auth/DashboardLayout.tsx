import { useEffect, useState } from "react";
import { fetchProfile, fetchProfileById } from "../../../features/user/user_service";
import type { ProfilData } from "../../../features/user/models";

import BackgroundShapes from "../../../components/public/BackgroundShapes";
import SidebarDashboard from "./SidebarDashboard";


type DashboardLayoutProps = React.PropsWithChildren<{ slug: string; refreshKey?: number }>;

const DashboardLayout = ({ children, slug, refreshKey = 0 }: DashboardLayoutProps) => {
    const [user, setUser] = useState<ProfilData | null>(null);

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
            }
        };

        
        loadProfile();
    },[slug, refreshKey]);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="relative px-6 py-30 bg-gradient-to-r from-indigo-100 via-stone-100 to-fuchsia-100 overflow-hidden">
                <BackgroundShapes />
            </div>

            <div className="relative z-20 -mt-35 max-w-6xl mx-auto h-[200px] bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Banner */}
                <img
                    src={
                        user?.banner
                            ? user.banner.startsWith("http")
                                ? user.banner
                                : `${import.meta.env.VITE_API_URL}/storage/${user.banner}`
                            : "/src/assets/img/no-image/no-image.jpg"
                    }
                    alt="cover"
                    className="w-full h-60 object-cover"
                />
            </div>

            {/* Profile */}
            <div className="mt-7 max-w-6xl mx-auto pb-20 bg-white flex">
                {/* Sidebar */}
                <SidebarDashboard />

                {/* Konten */}
                <div className="flex-1">{children}</div>
            </div>

        </div>
    )
};

export default DashboardLayout;
