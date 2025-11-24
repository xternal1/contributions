import React from "react";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
    value,
    onChange,
    placeholder = "Tulis deskripsi di sini..."
}) => {
    return (
        <div>
            {/* Toolbar */}
            <div className="border border-gray-300 dark:border-gray-600 rounded-t-lg bg-gray-50 dark:bg-gray-800 p-2">
                <div className="flex items-center gap-1 flex-wrap">
                    {/* File Menu */}
                    {["File", "Edit", "View", "Insert", "Format"].map((menu) => (
                        <button
                            key={menu}
                            type="button"
                            className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                        >
                            {menu}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                    {/* Undo/Redo */}
                    <button type="button" className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                        <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                    </button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                        <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
                        </svg>
                    </button>

                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

                    {/* Paragraph Dropdown */}
                    <select className="px-2 py-1 text-sm border-0 bg-transparent text-gray-700 dark:text-gray-300 focus:ring-0">
                        <option>Paragraph</option>
                        <option>Heading 1</option>
                        <option>Heading 2</option>
                    </select>

                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

                    {/* Text Formatting */}
                    <button type="button" className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded font-bold text-gray-700 dark:text-gray-300">
                        B
                    </button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded italic text-gray-700 dark:text-gray-300">
                        I
                    </button>

                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

                    {/* Alignment */}
                    {[
                        "M4 6h16M4 12h16M4 18h7",
                        "M4 6h16M4 12h16M4 18h16",
                        "M4 6h16M4 12h16m-7 6h7",
                        "M4 6h16M4 12h8m-8 6h16"
                    ].map((path, i) => (
                        <button key={i} type="button" className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
                            </svg>
                        </button>
                    ))}

                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

                    {/* Lists */}
                    <button type="button" className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                        <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                        <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Text Area */}
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={10}
                className="w-full px-4 py-3 rounded-b-lg border border-t-0 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                placeholder={placeholder}
                required
            />
        </div>
    );
};
export default RichTextEditor;