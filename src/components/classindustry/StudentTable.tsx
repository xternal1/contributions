import { FaSearch } from "react-icons/fa";

interface Student {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    photo: string;
    class: string;
}

interface StudentTableProps {
    currentStudents: Student[];
    filteredStudents: Student[];
    searchQuery: string;
    currentStudentPage: number;
    studentsPerPage: number;
    onSearchChange: (value: string) => void;
}

const StudentTable = ({
    currentStudents,
    filteredStudents,
    searchQuery,
    currentStudentPage,
    studentsPerPage,
    onSearchChange,
}: StudentTableProps) => {
    return (
        <div className="bg-white dark:bg-[#0D0D1A] rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-100 transition-colors duration-500">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-white transition-colors duration-500">
                    Daftar Siswa
                </h3>
            </div>

            {/* Search di bawah teks daftar siswa */}
            <div className="relative mb-4">
                <FaSearch className="absolute top-3.5 left-3 text-gray-400 dark:text-gray-500 transition-colors duration-500" />
                <input
                    type="text"
                    placeholder="Cari siswa..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-72 border border-gray-300 dark:border-gray-600 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-500"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 dark:border-gray-100">
                    <thead>
                        <tr className="border border-gray-200 dark:border-gray-100 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm transition-colors duration-500">
                            <th className="py-3 px-4 text-left">No</th>
                            <th className="py-3 px-4 text-left">Nama</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">No Telepon</th>
                            <th className="py-3 px-4 text-left">Alamat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.map((student, index) => (
                            <tr
                                key={student.id}
                                className="border-b dark:bg-gray-800 border-gray-200 dark:border-gray-100 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                            >
                                <td className="py-3 px-4">{(currentStudentPage - 1) * studentsPerPage + index + 1}</td>
                                <td className="py-3 px-4 flex items-center gap-3">
                                    <img
                                        src={student.photo}
                                        alt={student.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <div>
                                        <p className="font-medium">{student.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-500">
                                            {student.class}
                                        </p>
                                    </div>
                                </td>
                                <td className="py-3 px-4">{student.email}</td>
                                <td className="py-3 px-4">{student.phone}</td>
                                <td className="py-3 px-4">{student.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredStudents.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400 transition-colors duration-500">
                        Tidak ada siswa yang ditemukan
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentTable;