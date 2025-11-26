import { useState } from "react";
import ClassHeader from "@/components/public/Header";
import Pagination from "@/components/raportteacher/Pagination";
import { leaderboardData } from "@/data/leaderboardData";
import LeaderboardFilters from "@/components/leaderboardteacher/LeaderboardFilter";
import { LeaderboardTable } from "@/components/leaderboardteacher/Index";

const Leaderboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = leaderboardData.filter((entry) => {
        const matchesSearch = entry.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesSchool =
            !selectedSchool || entry.school === selectedSchool;
        return matchesSearch && matchesSchool;
    });

    return (
        <div className="min-h-screen">
            <ClassHeader title="Peringkat" subtitle="Daftar siswa teratas" />

            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-white dark:bg-[#141427] rounded-xl shadow-sm border border-transparent dark:border-white/10">
                    <div className="p-6">
                        {/* Filters */}
                        <LeaderboardFilters
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            selectedSchool={selectedSchool}
                            onSchoolChange={setSelectedSchool}
                        />

                        {/* Table */}
                        <LeaderboardTable data={filteredData} />

                        {/* Empty State */}
                        {filteredData.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 dark:text-gray-400 text-lg">
                                    No data found
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {filteredData.length > 0 && (
                            <div className="mt-6">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={6}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;