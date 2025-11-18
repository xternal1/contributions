import { PlusCircle } from "lucide-react";

interface DiscussionSidebarProps {
    onCreateNew: () => void;
}

const DiscussionSidebar = ({ onCreateNew }: DiscussionSidebarProps) => {
    return (
        <div className="w-full lg:w-64 flex flex-col gap-5">
            <button
                onClick={onCreateNew}
                className="flex items-center justify-center gap-2  transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
      hover:shadow-none active:translate-y-0.5 bg-purple-500 text-white font-bold text-md 
      px-6 py-3 rounded-lg hover:text-black hover:bg-yellow-400"
            >
                <PlusCircle size={18} />
                Buat Diskusi Baru
            </button>

            <div className="bg-white shadow rounded-lg p-5 h-fit">
                <h3 className="text-md font-semibold text-start text-gray-800 mb-4">
                    Filter Berdasarkan
                </h3>

                <div className="space-y-2 mb-6">
                    <label className="flex items-center gap-2">
                        <input type="radio" name="sort" defaultChecked />
                        <span>Diskusi Terbaru</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="sort" />
                        <span>Diskusi Populer</span>
                    </label>
                </div>

                <h3 className="text-md font-semibold text-start text-gray-800 mb-4">
                    Urutkan Berdasarkan
                </h3>

                <div className="space-y-2 mb-6">
                    <label className="flex items-center gap-2">
                        <input type="radio" name="sort" defaultChecked />
                        <span>Diskusi Terbaru</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="sort" />
                        <span>Diskusi Populer</span>
                    </label>
                </div>

                <h4 className="text-md text-start font-semibold text-gray-800 mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                    {["Ujian", "Materi", "Konsultasi", "Klinik"].map((tag) => (
                        <span
                            key={tag}
                            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-purple-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DiscussionSidebar;


