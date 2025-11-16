import TipTapEditor from "./TipTapEditor";

interface CreateDiscussionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateDiscussionModal = ({ isOpen, onClose }: CreateDiscussionModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex text-start items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-purple-600 rounded-b-xl text-white px-5 py-3 flex justify-center items-center">
                    <h2 className="font-semibold text-xl">Diskusi Baru</h2>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                    <div>
                        <label className="font-semibold text-gray-700 block mb-1">Modul Belajar</label>
                        <select className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500">
                            <option>Rangkuman dari Sub-modul Pendahuluan</option>
                        </select>
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700 block mb-1">Judul Pertanyaan</label>
                        <input
                            type="text"
                            placeholder="Tulis judul pertanyaan Anda dengan singkat"
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700 block mb-1">Deskripsi Pertanyaan</label>
                        <div>
                            <TipTapEditor />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Anda dapat menambahkan potongan kode, gambar atau video untuk memperjelas pertanyaan.
                        </p>
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700 block mb-1">Kata Kunci</label>
                        <input
                            type="text"
                            placeholder="Tulis kata kunci pertanyaan, pisahkan dengan koma"
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Maksimal 6 kata kunci. Contoh: android, intents, material design
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 mb-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-full text-sm border-2 border-purple-600 text-purple-600 font-semibold hover:bg-gray-100"
                    >
                        Nanti Saja
                    </button>
                    <button className="transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
      hover:shadow-none active:translate-y-0.5 bg-purple-500 text-white font-semibold text-sm 
      px-6 py-3 rounded-full hover:text-black hover:bg-yellow-400">
                        Kirim Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateDiscussionModal;


