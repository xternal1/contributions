import { useState } from "react";
import TipTapEditor from "./TipTapEditor";
import noProfile from "../../assets/img/no-image/no-profile.jpeg";
import { fetchSubmitAnswer } from "../../features/discussion/_service/discussionService";
import type { ProfilData } from "../../features/user/models";
import { toast } from "react-hot-toast";

interface ReplyEditorProps {
  discussionId: string;
  onSubmitted?: () => void;
  currentUser?: ProfilData | null;
}

export default function ReplyEditor({
  discussionId,
  onSubmitted,
  currentUser,
}: ReplyEditorProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("Isi balasan tidak boleh kosong!");
      return;
    }

    if (!currentUser) {
      toast.error("Anda harus login untuk membalas diskusi.");
      return;
    }

    try {
      setLoading(true);

      await fetchSubmitAnswer({
        discussion_id: discussionId,
        answer: content,
        user_id: currentUser.id,
      });

      setContent("");
      if (onSubmitted) onSubmitted();

      toast.success("Balasan berhasil dikirim!");
    } catch (error) {
      console.error("Gagal mengirim balasan:", error);
      toast.error("Gagal mengirim balasan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm mb-10 dark:bg-[#0D0D1A] transition-colors duration-500">
      {/* Info User */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={
            currentUser?.photo
              ? currentUser.photo.startsWith("http")
                ? currentUser.photo
                : `${import.meta.env.VITE_API_URL}/storage/${currentUser.photo}`
              : noProfile
          }
          alt={currentUser?.name || "User"}
          className="w-10 h-10 rounded-full object-cover dark:border-2 dark:border-white"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.onerror = null;
            target.src = noProfile;
          }}
        />
        <span className="font-semibold text-gray-800 dark:text-white">
          {currentUser?.name || "Pengguna"}
        </span>
      </div>

      {/* Editor Input */}
      <TipTapEditor content={content} onChange={setContent} />

      {/* Tombol Submit */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`${loading ? "opacity-50 cursor-not-allowed" : ""
            } transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
      hover:shadow-none active:translate-y-0.5 bg-purple-500 text-white font-bold text-md 
      px-6 py-3 rounded-full hover:text-black hover:bg-yellow-400`}
        >
          {loading ? "Mengirim..." : "Balas"}
        </button>
      </div>
    </div>
  );
}
