import React from "react";
import { RichTextEditor } from "./RichTextEditor";

interface JournalFormData {
    title: string;
    image: File | null;
    description: string;
}

interface JournalFormProps {
    formData: JournalFormData;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDescriptionChange: (value: string) => void;
}

export const JournalForm: React.FC<JournalFormProps> = ({
    formData,
    onInputChange,
    onFileChange,
    onDescriptionChange
}) => {
    return (
        <div className="space-y-6">
            {/* Judul Field */}
            <div>
                <label
                    htmlFor="title"
                    className="block text-sm font-semibold text-gray-900 dark:text-white mb-2 text-left"
                >
                    Judul
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={onInputChange}
                    placeholder="Lorema asdasowigiri sd"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    required
                />
            </div>

            {/* Bukti Field */}
            <div>
                <label
                    htmlFor="image"
                    className="block text-sm font-semibold text-gray-900 dark:text-white mb-2 text-left"
                >
                    Bukti
                </label>
                <div className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
                    <label
                        htmlFor="image"
                        className="px-4 py-1.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors text-sm"
                    >
                        Choose File
                    </label>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formData.image ? formData.image.name : "No file chosen"}
                    </span>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={onFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
            </div>

            {/* Deskripsi Field */}
            <div>
                <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-900 dark:text-white mb-2 text-left"
                >
                    Deskripsi
                </label>
                <RichTextEditor
                    value={formData.description}
                    onChange={onDescriptionChange}
                    placeholder="Tulis deskripsi jurnal di sini..."
                />
            </div>
        </div>
    );
};
export default JournalForm;