import type { DashboardHeaderProps } from "@/types/Dashboard";
import user1 from "@assets/img/user1.png";
import user2 from "@assets/img/user2.png";

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ name, gender, loading }) => {
    if (loading) {
        return (
            <section className="relative bg-white rounded-md w-full h-40 shadow border flex items-center justify-start overflow-hidden dark:bg-[#2C004F]">
                <div className="flex items-center w-full h-full p-6 animate-pulse gap-6">
                    <div className="h-28 w-28 bg-gray-200 dark:bg-[#0D0D1A] rounded-full"></div>
                    <div className="flex flex-col justify-center flex-1 space-y-3">
                        <div className="h-6 bg-gray-200 dark:bg-[#0D0D1A] rounded w-1/3"></div>
                        <div className="h-4 bg-gray-200 dark:bg-[#0D0D1A] rounded w-2/3"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative bg-white rounded-md w-full h-40 shadow border flex items-center justify-start overflow-hidden dark:bg-[#2C004F]">
            <img
                src={gender === "female" ? user2 : user1}
                alt="avatar"
                className="h-35 w-auto object-cover mt-5"
            />
            <div className="p-6 -mt-6">
                <h2 className="text-3xl font-semibold text-start text-purple-600">
                    Hola, {name}!
                </h2>
                <p className="text-gray-600 font-semibold dark:text-white">
                    Selamat Datang di Kelas Industri Hummatech
                </p>
            </div>
            <div className="absolute bottom-0 right-0">
                <div className="w-23 h-23 bg-purple-400 opacity-60 rounded-full absolute -bottom-9 right-2"></div>
                <div className="w-23 h-23 bg-purple-400 opacity-60 rounded-full absolute -bottom-1 -right-10"></div>
            </div>
        </section>
    );
};

export default DashboardHeader;