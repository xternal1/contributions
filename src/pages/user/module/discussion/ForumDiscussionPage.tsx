import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MessagesSquare, BookText } from "lucide-react";
import ReplyEditor from "../../../../components/discussion/ReplyEditor";

const ForumDiscussionPage = () => {
    const navigate = useNavigate();

    const replies = Array(2).fill({
        name: "Alfian Ban Dalam",
        date: "04 Desember 2024",
        content:
            "Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas",
    });


    return (
        <div className="min-h-screen bg-gray-100 mb-15">
            {/* Header */}
            <div className="2xl:max-w-6xl xl:max-w-5xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-md mx-auto mt-8">
                {/* Header kecil */}
                <div className="flex items-center bg-gradient-to-br from-purple-500 to-purple-700 py-3 px-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-white text-2xl flex items-center justify-center mr-2"
                    >
                        <FiChevronLeft size={24} />
                    </button>
                    <h1 className="text-white font-semibold text-left text-lg">Forum Diskusi (nama modul)</h1>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-6 bg-white rounded-xl p-7 shadow">
                    {/* Discussion List */}
                    <div className="bg-white text-start shadow rounded-lg overflow-hidden border border-gray-200">

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
                                    <span className="text-gray-500">04 Desember 2024</span>
                                </div>
                            </div>

                            {/* Title & Description */}
                            <h3 className="font-bold text-gray-900 mb-1">
                                Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua Quis
                                ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
                            </p>

                            {/* Tag */}
                            <div className="mb-4">
                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-xs font-medium">
                                    #loremipsum
                                </span>
                            </div>

                            {/* Reply Count */}
                            <div className="flex items-center text-gray-600 gap-3 text-sm font-medium ">
                                <MessagesSquare size={18} />
                                <span>10 Balasan</span>
                                <BookText size={18} />
                                <span>Latihan Ujian</span>
                            </div>
                        </div>
                    </div>

                    {/* Editor Section */}
                    <ReplyEditor />

                    {/* Replies List */}
                    <div>
                        <h4 className="font-bold text-xl text-start text-gray-900 mb-4">20 Balasan</h4>
                        {replies.map((r, i) => (
                            <div
                                key={i}
                                className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4 shadow-sm"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <img
                                        src="/src/assets/img/no-image/no-profile.jpeg"
                                        alt="User"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="text-sm text-gray-700">
                                        <span className="font-semibold">{r.name}</span>
                                        <span className="mx-2 text-gray-400">•</span>
                                        <span className="text-gray-500">{r.date}</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm text-start leading-relaxed mb-3">
                                    {r.content}
                                </p>
                                <div className="flex items-center text-gray-600 gap-2 text-sm font-medium">
                                    <MessagesSquare size={16} />
                                    <span>Balas</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ForumDiscussionPage