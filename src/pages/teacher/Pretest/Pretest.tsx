// @/pages/Pretest.tsx
import { useState } from "react";
import ClassHeader from "@/components/public/Header";
import PretestCard from "@/components/pretestteacher/PretestCard";
import { Search } from "lucide-react";
import { pretestData } from "@/data/pretestData";

const Pretest = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = pretestData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDetailClick = (id: number) => {
        console.log("Detail clicked for item:", id);
        // Add navigation or modal logic here
    };

    return (
        <div className="min-h-screen">
            <ClassHeader title="Pretest" subtitle="Pretest pada kelas industri" />

            <div className="max-w-10xl mx-auto px-6">
                {/* Search Bar - Right below header */}
                <div className="py-6">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#1A1A2E] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.map(item => (
                        <PretestCard
                            key={item.id}
                            item={item}
                            onDetailClick={handleDetailClick}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredData.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            No pretest found matching "{searchQuery}"
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pretest;