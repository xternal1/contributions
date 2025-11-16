// src/components/user/Profile/ProfileTabs.tsx

interface ProfileTabsProps {
    activeTab: "profile" | "password";
    onTabChange: (tab: "profile" | "password") => void;
}

const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
    return (
        <div className="flex gap-6 border-b-3 border-purple-200 mb-6 mt-10">
            <button
                onClick={() => onTabChange("profile")}
                className={`text-xs font-semibold pb-2 px-3 text-center ${activeTab === "profile"
                        ? "text-purple-600 border-b-3 border-purple-600 -mb-[2px] dark:text-purple-400 dark:border-purple-400"
                        : "text-gray-500 hover:text-purple-600 dark:text-white"
                    }`}
            >
                Profile
            </button>
            <button
                onClick={() => onTabChange("password")}
                className={`text-xs font-semibold pb-2 px-3 ${activeTab === "password"
                        ? "text-purple-600 border-b-3 border-purple-600 -mb-[2px] dark:text-purple-400 dark:border-purple-400"
                        : "text-gray-500 hover:text-purple-600 dark:text-white"
                    }`}
            >
                Password
            </button>
        </div>
    );
};

export default ProfileTabs;