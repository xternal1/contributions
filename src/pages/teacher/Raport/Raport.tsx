import { useState } from "react";
import ClassHeader from "@/components/public/Header";
import { Search } from "lucide-react";
import { years, classOptions, classList, students } from "@/data/raportData";
import { Pagination, RaportSidebar, StudentTable } from "@/components/raportteacher/Index";

const Raport = () => {
    const [selectedYear, setSelectedYear] = useState("2024/2025");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [activeClass, setActiveClass] = useState("XII RPL 1");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleClassFilterChange = (classId: string) => {
        setSelectedClasses(prev =>
            prev.includes(classId)
                ? prev.filter(id => id !== classId)
                : [...prev, classId]
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0D0D1A]">
            <ClassHeader title="Rapot" subtitle="Rapot pada kelas industri" />

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex gap-6">
                    {/* Sidebar */}
                    <RaportSidebar
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        years={years}
                        classOptions={classOptions}
                        selectedClasses={selectedClasses}
                        onClassFilterChange={handleClassFilterChange}
                        classList={classList}
                        activeClass={activeClass}
                        setActiveClass={setActiveClass}
                    />

                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-left">
                            Detail Kelas - {activeClass}
                        </h2>
                        <div className="bg-white dark:bg-[#141427] rounded-lg shadow-sm border border-transparent dark:border-white/10">
                            {/* Student List Section */}
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-left">
                                    Daftar Siswa
                                </h3>

                                {/* Search */}
                                <div className="relative mb-6 max-w-md">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#1A1A2E] text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Student Table */}
                                <StudentTable students={filteredStudents} />

                                {/* Pagination */}
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={6}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Raport;