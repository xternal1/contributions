import noProfile from "../../../../assets/img/no-image/no-profile.jpeg";

interface User {
    name?: string;
    photo?: string;
}

interface DiscussionUserInfoProps {
    user?: User;
    timeAgo?: string;
}

const DiscussionUserInfo = ({ user, timeAgo = "Baru saja" }: DiscussionUserInfoProps) => {
    return (
        <div className="flex items-center gap-3 mb-3">
            <img
                src={
                    user?.photo
                        ? user.photo.startsWith("http")
                            ? user.photo
                            : `${import.meta.env.VITE_API_URL}/storage/${user.photo}`
                        : noProfile
                }
                alt={user?.name || "User"}
                className="w-10 h-10 rounded-full object-cover dark:border-2 dark:border-white"
                onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.onerror = null;
                    target.src = noProfile;
                }}
            />
            <div className="text-sm text-gray-700 dark:text-white">
                <span className="font-semibold">{user?.name || "Name"}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-500 dark:text-gray-300">{timeAgo}</span>
            </div>
        </div>
    );
};

export default DiscussionUserInfo;