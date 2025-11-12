import { BookOpen, BookText, MessageCircleMore } from "lucide-react";
import noProfile from "../../../../assets/img/no-image/no-profile.jpeg";

interface Discussion {
    id: number;
    slug?: string;
    discussion_title: string;
    discussion_question: string;
    time_ago?: string;
    discussion_answers_count?: number;
    discussion_tags?: Array<{ tag?: { name?: string } }>;
    module?: { title?: string };
    user?: {
        name?: string;
        photo?: string;
    };
}

interface DiscussionCardProps {
    item: Discussion;
    onClick: (slug: string) => void;
}

const DiscussionCard = ({ item, onClick }: DiscussionCardProps) => {
    return (
        <div
            key={item.id}
            onClick={() => onClick(item.slug || item.id.toString())}
            className="bg-white text-start shadow rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg hover:border-purple-500 transition cursor-pointer dark:hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]"
        >
            {/* Header */}
            <div className="bg-purple-600 text-white px-4 py-2 flex items-center gap-2">
                <BookOpen size={18} />
                <span className="font-semibold">{item.discussion_title || "Tanpa Modul"}</span>
            </div>
            {/* Body */}
            <div className="p-5 bg-gray-50 dark:bg-[#141427] transition-colors duration-500">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-3">
                    <img
                        src={
                            item.user?.photo
                                ? item.user.photo.startsWith("http")
                                    ? item.user.photo
                                    : `${import.meta.env.VITE_API_URL}/storage/${item.user.photo}`
                                : noProfile
                        }
                        alt={item.user?.name || "User"}
                        className="w-10 h-10 rounded-full object-cover dark:border-2 dark:border-white"
                        onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.onerror = null;
                            target.src = noProfile;
                        }}
                    />
                    <div className="text-sm text-gray-700 dark:text-white">
                        <span className="font-semibold">{item.user?.name || "Name"}</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-500 dark:text-gray-300">{item.time_ago || "Baru saja"}</span>
                    </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1 dark:text-white">{item.discussion_title}</h3>
                <p
                    className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: item.discussion_question }}
                ></p>
                {/* Tag */}
                {item.discussion_tags && item.discussion_tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                        {item.discussion_tags.map((tagWrapper, idx) => {
                            const tagName = tagWrapper?.tag?.name || "Tanpa Tag";
                            return (
                                <span
                                    key={idx}
                                    className="bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-semibold"
                                >
                                    #{tagName}
                                </span>
                            );
                        })}
                    </div>
                )}
                <div className="flex items-center text-gray-600 text-sm font-medium mt-3 gap-3 dark:text-white">
                    {/* Jumlah Balasan */}
                    <div className="flex items-center gap-2">
                        <MessageCircleMore size={18} />
                        <span>{item.discussion_answers_count || 0} Balasan</span>
                    </div>
                    {/* Nama Modul (di samping Balasan) */}
                    <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
                        <BookText size={18} />
                        <span>{item.module?.title || "Tanpa Modul"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscussionCard;