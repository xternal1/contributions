// src/components/faq/CategoryFilter.tsx
import type { FC } from "react";

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const CategoryFilter: FC<CategoryFilterProps> = ({
    categories,
    activeCategory,
    onCategoryChange,
}) => {
    return (
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`font-sans font-semibold text-sm py-2.5 px-6 rounded-full 
            flex items-center justify-center transition-all duration-150 ease-in-out
            active:translate-y-0.5 border
            ${activeCategory === category
                            ? `
                  shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] 
                  dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]
                  bg-gradient-to-r from-yellow-400 to-yellow-500 border-yellow-600 text-black 
                  dark:bg-none dark:border-purple-600 dark:text-white dark:bg-purple-600
                `
                            : `
                  bg-gradient-to-r from-purple-600 to-purple-700 border-purple-700 text-white
                  hover:from-yellow-400 hover:to-yellow-500 hover:border-yellow-600 hover:text-black
                  hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] 
                  dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]
                  dark:bg-none dark:border-purple-600 dark:text-white
                `
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;