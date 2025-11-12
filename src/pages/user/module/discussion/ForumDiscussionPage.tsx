import { useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { MessagesSquare, BookText } from "lucide-react";
import ReplyEditor from "../../../../components/discussion/ReplyEditor";
import TipTapEditor from "../../../../components/discussion/TipTapEditor";
import noProfile from "../../../../assets/img/no-image/no-profile.jpeg";
import { useForumData, useForumActions, useForumDerived } from '../../../../lib/stores/user/module/useForumStore';
import { toast } from "react-hot-toast";

const ForumDiscussionPage = () => {
    const navigate = useNavigate();
    const { slug } = useParams<{ slug: string }>();

    const {
        discussion,
        answers,
        currentUser,
        loadingDiscussion,
        loadingAnswers,
        replyLoading,
        activeReplyId,
        error
    } = useForumData();

    const {
        fetchDiscussion,
        fetchAnswers,
        fetchUserProfile,
        setActiveReplyId,
        setReplyContent,
        submitReply,
        clearError
    } = useForumActions();

    const {
        getDiscussionTitle,
        getReplyContent
    } = useForumDerived();

    // Fetch user profile on mount
    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    // Fetch discussion when slug changes
    useEffect(() => {
        if (slug) {
            fetchDiscussion(slug);
        }
    }, [slug, fetchDiscussion]);

    // Fetch answers when discussion ID changes
    useEffect(() => {
        if (discussion?.id) {
            fetchAnswers(String(discussion.id));
        }
    }, [discussion?.id, fetchAnswers]);

    // Handle reply submission
    const handleReply = async (parentId: number) => {
        if (!discussion?.id) return;

        const content = getReplyContent(parentId);
        try {
            await submitReply(String(discussion.id), parentId, content);
            toast.success("Balasan berhasil dikirim!");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Gagal mengirim balasan.");
        }
    };

    // Render child replies
    const renderChildReplies = (parent: any) => {
        if (!parent.discussion_answers || parent.discussion_answers.length === 0)
            return null;

        return (
            <div className="space-y-3">
                {parent.discussion_answers.map((child: any) => (
                    <div
                        key={child.id}
                        className="border border-gray-200 bg-white rounded-lg p-4 shadow-sm dark:bg-[#0D0D1A]"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <img
                                src={
                                    child.user?.photo
                                        ? child.user.photo.startsWith("http")
                                            ? child.user.photo
                                            : `${import.meta.env.VITE_API_URL}/storage/${child.user.photo}`
                                        : noProfile
                                }
                                alt={child.user?.name || "User"}
                                className="w-8 h-8 rounded-full object-cover dark:border-2 dark:border-white"
                                onError={(e) => {
                                    const target = e.currentTarget as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = noProfile;
                                }}
                            />
                            <div className="text-sm text-gray-700 dark:text-white">
                                <span className="font-semibold">{child.user?.name}</span>
                                <span className="mx-2 text-gray-400">•</span>
                                <span className="text-gray-500 dark:text-gray-300">{child.time_ago}</span>
                            </div>
                        </div>

                        <p
                            className="text-gray-600 text-sm text-start leading-relaxed dark:text-white"
                            dangerouslySetInnerHTML={{ __html: child.answer }}
                        />
                    </div>
                ))}
            </div>
        );
    };

    // Loading state
    if (loadingDiscussion) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-[#141427]">
                <p className="text-gray-600 dark:text-white">Memuat data diskusi...</p>
            </div>
        );
    }

    // Error state
    if (error || !discussion) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-[#141427]">
                <p className="text-red-500">{error || "Diskusi tidak ditemukan."}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 pb-15 dark:bg-[#141427] transition-colors duration-500">
            {/* Header */}
            <div className="2xl:max-w-6xl xl:max-w-5xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-sm mx-auto pt-8">
                {/* Header kecil */}
                <div className="flex items-center bg-gradient-to-br from-purple-500 to-purple-700 py-3 px-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-white text-2xl flex items-center justify-center mr-2"
                    >
                        <FiChevronLeft size={24} className="p-0.5 rounded-full bg-purple-400 text-white" />
                    </button>
                    <h1 className="text-white font-semibold text-left text-lg">
                        Forum Diskusi ({getDiscussionTitle()})
                    </h1>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-6 bg-white rounded-xl p-7 shadow dark:bg-[#0D0D1A] dark:border-2 dark:border-white">
                    {/* Diskusi Utama */}
                    <div className="bg-white text-start shadow rounded-lg overflow-hidden border border-gray-200 ">
                        <div className="p-5 bg-gray-50 dark:bg-[#0D0D1A]">
                            {/* Info Pengguna */}
                            <div className="flex items-center gap-3 mb-3">
                                <img
                                    src={
                                        discussion.user?.photo
                                            ? discussion.user.photo.startsWith("http")
                                                ? discussion.user.photo
                                                : `${import.meta.env.VITE_API_URL}/storage/${discussion.user.photo}`
                                            : noProfile
                                    }
                                    alt={discussion.user?.name || "User"}
                                    className="w-10 h-10 rounded-full object-cover dark:border-2 dark:border-white"
                                    onError={(e) => {
                                        const target = e.currentTarget as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = noProfile;
                                    }}
                                />
                                <div className="text-sm text-gray-700 dark:text-white">
                                    <span className="font-semibold">{discussion.user?.name}</span>
                                    <span className="mx-2 text-gray-400">•</span>
                                    <span className="text-gray-500 dark:text-gray-300"> {discussion.time_ago}
                                    </span>
                                </div>
                            </div>

                            {/* Judul & Deskripsi */}
                            <h3 className="font-bold text-gray-900 mb-1 dark:text-white">{discussion.discussion_title}</h3>
                            <p
                                className="text-gray-600 text-sm leading-relaxed mb-3 dark:text-gray-300"
                                dangerouslySetInnerHTML={{ __html: discussion.discussion_question }}
                            />

                            {/* Tag */}
                            {discussion.discussion_tags && discussion.discussion_tags.length > 0 && (
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {discussion.discussion_tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-semibold"
                                        >
                                            #{tag.tag.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Info tambahan */}
                            <div className="flex items-center text-gray-600 text-sm font-medium mt-3 gap-3 dark:text-white">
                                {/* Jumlah Balasan */}
                                <div className="flex items-center gap-2">
                                    <MessagesSquare size={18} />
                                    <span>{discussion.discussion_answers_count || 0} Balasan</span>
                                </div>

                                {/* Nama Modul (di samping Balasan) */}
                                <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
                                    <BookText size={18} />
                                    <span>{discussion.module?.title || "Tanpa Modul"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Editor Section */}
                    <ReplyEditor
                        discussionId={String(discussion.id)}
                        currentUser={currentUser}
                        onSubmitted={async () => {
                            if (discussion?.slug) {
                                await Promise.all([
                                    fetchDiscussion(discussion.slug),
                                    fetchAnswers(String(discussion.id)),
                                ]);
                            }
                        }}
                    />


                    {/* Replies List */}
                    <div>
                        <h4 className="font-bold text-xl text-start text-gray-900 mb-4 dark:text-white">
                            {discussion.discussion_answers_count || 0} Balasan
                        </h4>

                        {loadingAnswers ? (
                            <p className="text-gray-500 text-sm">Memuat balasan...</p>
                        ) : answers.length > 0 ? (
                            answers.map((reply) => (
                                <div
                                    key={reply.id}
                                    className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4 shadow-sm dark:bg-[#0D0D1A] transition-colors duration-500"
                                >
                                    {/* Info User */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <img
                                            src={
                                                reply.user?.photo
                                                    ? reply.user.photo.startsWith("http")
                                                        ? reply.user.photo
                                                        : `${import.meta.env.VITE_API_URL}/storage/${reply.user.photo}`
                                                    : noProfile
                                            }
                                            alt={reply.user?.name || "User"}
                                            className="w-10 h-10 rounded-full object-cover dark:border-2 dark:border-white"
                                            onError={(e) => {
                                                const target = e.currentTarget as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = noProfile;
                                            }}
                                        />
                                        <div className="text-sm text-gray-700 dark:text-white">
                                            <span className="font-semibold">{reply.user?.name}</span>
                                            <span className="mx-2 text-gray-400">•</span>
                                            <span className="text-gray-500 dark:text-gray-300">{reply.time_ago}</span>
                                        </div>
                                    </div>

                                    {/* Isi Jawaban */}
                                    <p
                                        className="text-gray-600 text-sm text-start leading-relaxed mb-3 dark:text-white"
                                        dangerouslySetInnerHTML={{ __html: reply.answer }}
                                    />

                                    {/* Aksi */}
                                    <div
                                        onClick={() => setActiveReplyId(
                                            activeReplyId === reply.id ? null : reply.id
                                        )}
                                        className="flex items-center text-gray-600 gap-2 text-sm font-medium cursor-pointer hover:text-purple-600 dark:text-white dark:hover:text-purple-600">
                                        <MessagesSquare size={16} />
                                        {reply.discussion_answers_reply_count > 0 ? (
                                            <>
                                                <span>{reply.discussion_answers_reply_count}</span>
                                                <span>Balasan</span>
                                            </>
                                        ) : (
                                            <span>Balas</span>
                                        )}
                                    </div>

                                    {/* Reply Editor Toggle */}
                                    {activeReplyId === reply.id && (
                                        <div className="mt-4">
                                            <TipTapEditor
                                                content={getReplyContent(reply.id)}
                                                onChange={(content) => setReplyContent(reply.id, content)}
                                            />
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => handleReply(reply.id)}
                                                    disabled={replyLoading}
                                                    className={`mt-3 mb-3 bg-gradient-to-r hover:opacity-90 transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
                                                                hover:shadow-none active:translate-y-0.5 ${replyLoading ? 'opacity-50 cursor-not-allowed' : ''}
                                                                bg-purple-500 text-white font-bold text-md 
                                                                px-6 py-3 rounded-full hover:text-black hover:bg-yellow-400`}
                                                >
                                                    {replyLoading ? "Mengirim..." : "Balas"}
                                                </button>
                                            </div>

                                            {renderChildReplies(reply)}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">Belum ada balasan.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForumDiscussionPage;