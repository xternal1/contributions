import { useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import TipTapEditor from "./TipTapEditor";
import DiscussionDropdown from "./DiscussionDropdown";
// Fix the import path for DiscussionDropdown


interface Module {
    id: number | string; // Updated to accept both number and string IDs
    title: string;
}

interface Tag {
    id: number;
    name: string;
}

interface NewDiscussionModalProps {
    isOpen: boolean;
    modules: Module[];
    tags: Tag[];
    selectedModule: string;
    title: string;
    description: string;
    tagsInput: string[];
    onClose: () => void;
    onModuleChange: (moduleId: string) => void;
    onTitleChange: (title: string) => void;
    onDescriptionChange: (description: string) => void;
    onTagsChange: (tags: string[]) => void;
    onSubmit: () => void;
    loading?: boolean;
}

const NewDiscussionModal = ({
    isOpen,
    modules,
    tags,
    selectedModule,
    title,
    description,
    tagsInput,
    onClose,
    onModuleChange,
    onTitleChange,
    onDescriptionChange,
    onTagsChange,
    onSubmit,
    loading = false
}: NewDiscussionModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex text-start items-center justify-center z-50 px-10 sm:px-20">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden flex flex-col dark:bg-[#0D0D1A]">
                {/* Header */}
                <div className="bg-purple-600 rounded-b-xl text-white px-5 py-3 flex justify-center items-center">
                    <h2 className="font-semibold text-xl">Diskusi Baru</h2>
                </div>
                {/* Body dengan scroll */}
                <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto scrollbar-hide">
                    <div>
                        <label className="font-semibold text-gray-700 block mb-1 dark:text-white">Modul Belajar</label>
                        <DiscussionDropdown
                            modules={modules}
                            selectedModule={selectedModule}
                            onChange={onModuleChange}
                        />
                    </div>
                    <div>
                        <label className="font-semibold text-gray-700 block mb-1 dark:text-white">Judul Pertanyaan</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => onTitleChange(e.target.value)}
                            placeholder="Tulis judul pertanyaan Anda dengan singkat"
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 dark:placeholder:text-gray-400 dark:bg-[#141427]"
                        />
                    </div>
                    <div>
                        <label className="font-semibold text-gray-700 block mb-1 dark:text-white">Deskripsi Pertanyaan</label>
                        {/* The description prop is used here */}
                        <TipTapEditor content={description} onChange={onDescriptionChange} />
                    </div>
                    <div>
                        <label className="font-semibold text-gray-700 block mb-1 dark:text-white">
                            Kata Kunci <span className="text-gray-500 text-sm dark:text-gray-400">(Ketik atau pilih)</span>
                        </label>
                        <CreatableSelect
                            isMulti
                            placeholder="Ketik atau pilih tag..."
                            value={tagsInput.map(tag => ({ value: tag, label: tag }))}
                            onChange={(selected) => {
                                onTagsChange(selected ? selected.map(opt => opt.value) : []);
                            }}
                            onCreateOption={(inputValue) => {
                                onTagsChange([...tagsInput, inputValue]);
                            }}
                            options={tags.map(tag => ({ value: tag.name, label: tag.name }))}
                            className="text-sm dark:text-white scrollbar-hide"
                            menuPosition="fixed"
                            styles={{
                                menuList: (base) => ({
                                    ...base,
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none",
                                    "&::-webkit-scrollbar": {
                                        display: "none",
                                    },
                                }),
                                control: (base) => ({
                                    ...base,
                                    backgroundColor: document.documentElement.classList.contains("dark")
                                        ? "#141427"
                                        : "#ffffff",
                                    borderColor: "#d1d5db",
                                    boxShadow: "none",
                                    color: document.documentElement.classList.contains("dark")
                                        ? "#ffffff"
                                        : "#000000",
                                    "&:hover": { borderColor: "#a855f7" },
                                }),
                                menu: (base) => ({
                                    ...base,
                                    backgroundColor: document.documentElement.classList.contains("dark")
                                        ? "#1e1e2f"
                                        : "#ffffff",
                                    color: document.documentElement.classList.contains("dark")
                                        ? "#f9fafb"
                                        : "#000000",
                                    borderRadius: "0.5rem",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                    zIndex: 50,
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isFocused
                                        ? document.documentElement.classList.contains("dark")
                                            ? "#3b0764"
                                            : "#ede9fe"
                                        : "transparent",
                                    color: state.isFocused
                                        ? document.documentElement.classList.contains("dark")
                                            ? "#c084fc"
                                            : "#6b21a8"
                                        : document.documentElement.classList.contains("dark")
                                            ? "#f9fafb"
                                            : "#000000",
                                    cursor: "pointer",
                                    ":active": {
                                        backgroundColor: "#a855f7",
                                        color: "#ffffff",
                                    },
                                }),
                                input: (base) => ({
                                    ...base,
                                    color: document.documentElement.classList.contains("dark")
                                        ? "#ffffff"
                                        : "#000000",
                                }),
                                placeholder: (base) => ({
                                    ...base,
                                    color: document.documentElement.classList.contains("dark")
                                        ? "#9ca3af"
                                        : "#6b7280",
                                }),
                                singleValue: (base) => ({
                                    ...base,
                                    color: document.documentElement.classList.contains("dark")
                                        ? "#ffffff"
                                        : "#000000",
                                }),
                                multiValue: (base) => ({
                                    ...base,
                                    backgroundColor: document.documentElement.classList.contains("dark")
                                        ? "#3b0764"
                                        : "#ede9fe",
                                    borderRadius: "8px",
                                    padding: "2px 6px",
                                }),
                                multiValueLabel: (base) => ({
                                    ...base,
                                    color: document.documentElement.classList.contains("dark")
                                        ? "#c084fc"
                                        : "#6b21a8",
                                    fontWeight: "500",
                                }),
                                multiValueRemove: (base) => ({
                                    ...base,
                                    color: document.documentElement.classList.contains("dark")
                                        ? "#c084fc"
                                        : "#9333ea",
                                    cursor: "pointer",
                                    ":hover": {
                                        backgroundColor: "#a855f7",
                                        color: "white",
                                    },
                                }),
                            }}
                        />
                    </div>
                </div>
                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-full text-sm border-2 border-purple-600 text-purple-600 font-semibold hover:bg-gray-100 dark:hover:bg-[#141427]"
                    >
                        Nanti Saja
                    </button>
                    <button
                        onClick={onSubmit}
                        disabled={loading}
                        className={`transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
            hover:shadow-none active:translate-y-0.5 ${loading ? 'opacity-50 cursor-not-allowed' : ''}
            bg-purple-500 text-white font-semibold text-sm 
            px-6 py-3 rounded-full hover:text-black hover:bg-yellow-400`}
                    >
                        {loading ? "Mengirim..." : "Kirim Diskusi"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewDiscussionModal;