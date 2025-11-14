import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Module {
    id: string | number;
    title: string;
}

interface DiscussionDropdownProps {
    modules: Module[];
    selectedModule: string;
    onChange: (moduleId: string) => void;
    placeholder?: string;
}

const DiscussionDropdown = ({
    modules,
    selectedModule,
    onChange,
    placeholder = "Pilih Modul"
}: DiscussionDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState(placeholder);

    useEffect(() => {
        if (selectedModule && modules.length > 0) {
            const selectedModuleObj = modules.find(mod =>
                String(mod.id) === String(selectedModule)
            );
            setSelectedTitle(selectedModuleObj ? selectedModuleObj.title : placeholder);
        } else {
            setSelectedTitle(placeholder);
        }
    }, [selectedModule, modules, placeholder]);

    const handleSelect = (moduleId: string) => {
        onChange(moduleId);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.discussion-dropdown')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="discussion-dropdown relative w-full">
            <div
                className="w-full bg-white dark:bg-[#141427] dark:text-white dark:border-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 cursor-pointer flex justify-between items-center hover:border-purple-500 transition-colors duration-300"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedTitle}</span>
                {isOpen ? (
                    <ChevronUp size={18} className="text-purple-600" />
                ) : (
                    <ChevronDown size={18} className="text-purple-600" />
                )}
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-[#0D0D1A] border border-gray-300 dark:border-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <div
                        className={`px-4 py-2.5 text-sm font-medium cursor-pointer hover:bg-purple-50 dark:hover:bg-[#1e1e2f] transition-colors ${!selectedModule ? 'bg-purple-100 text-purple-700 dark:bg-[#1e1e2f]' : ''
                            }`}
                        onClick={() => handleSelect("")}
                    >
                        Semua Modul
                    </div>
                    {modules.map((module) => (
                        <div
                            key={module.id}
                            className={`px-4 py-2.5 text-sm font-medium cursor-pointer hover:bg-purple-50 dark:hover:bg-[#1e1e2f] transition-colors ${String(module.id) === String(selectedModule)
                                    ? 'bg-purple-100 text-purple-700 dark:bg-[#1e1e2f]'
                                    : ''
                                }`}
                            onClick={() => handleSelect(String(module.id))}
                        >
                            {module.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DiscussionDropdown;