import { BookOpen, MessageCircle } from "lucide-react";

interface DiscussionCardProps {
    onClick: () => void;
}

const DiscussionCard = ({ onClick }: DiscussionCardProps) => {
    return (
        <div
            onClick={onClick}
            className="bg-white text-start shadow rounded-lg overflow-hidden border border-gray-200 
                hover:shadow-lg hover:border-purple-500 transition cursor-pointer"
        >
            {/* Header Ungu */}
            <div className="bg-purple-600 text-white px-4 py-2 flex items-center gap-2">
                <BookOpen size={18} />
                <span className="font-semibold">Nama Modul Lorem Ipsum</span>
            </div>

            {/* Body */}
            <div className="p-5 bg-gray-50">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-3">
                    <img
                        src="/src/assets/img/no-image/no-profile.jpeg"
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-sm text-gray-700">
                        <span className="font-semibold">Alfian Ban Dalam</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-500">1 Tahun yang lalu</span>
                    </div>
                </div>

                {/* Judul & Deskripsi */}
                <h3 className="font-bold text-gray-900 mb-1">
                    Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida.
                    Risus commodo viverra maecenas
                </p>

                {/* Tag */}
                <div className="mb-4">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-xs font-medium">
                        #loremipsum
                    </span>
                </div>

                {/* Balasan */}
                <div className="flex items-center text-gray-600 gap-2 text-sm font-medium">
                    <MessageCircle size={18} />
                    <span>10 Balasan</span>
                </div>
            </div>
        </div>
    );
};

export default DiscussionCard;


