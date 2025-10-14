import { useState } from "react";
import TipTapEditor from "./TipTapEditor";

export default function ReplyEditor() {
  const [content, setContent] = useState("");

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm mb-10">
      <div className="flex items-center gap-3 mb-4">
        <img
          src="/src/assets/img/no-image/no-profile.jpeg"
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-semibold text-gray-800">Mohammad Arif</span>
      </div>

      <TipTapEditor content={content} onChange={setContent} />

      <div className="flex justify-end mt-4">
        <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
          Balas
        </button>
      </div>
    </div>
  );
}
