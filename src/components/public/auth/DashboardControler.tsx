import { useEffect, useState, useCallback } from "react";
import DashboardPage from "../../../pages/user/Profile/DashboardPage";
import DashboardIndustry from "../../../pages/user/Profile/ClassIndustry/DashboardIndustry";
import { fetchProfile } from "../../../features/user/user_service";
const DashboardControler = () => {
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const loadUserRole = useCallback(async () => {
        try {
            const user = await fetchProfile();
            setRole(user?.role || "guest");
        } catch (err) {
            console.error("Gagal memuat role user:", err);
            setRole("guest");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUserRole();
    }, [loadUserRole]);

    if (loading) {
        return null;
    }

    return (
        <>
            {role === "student" ? (
                <DashboardIndustry />
            ) : (
                <DashboardPage />
            )}
        </>
    );

}

export default DashboardControler