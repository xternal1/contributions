import DashboardLayout from "../../../../components/public/auth/DashboardLayout";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaSearch, FaBook, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";

interface Student {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    photo: string;
    class: string;
}

interface Material {
    id: number;
    title: string;
    class: string;
    totalChapter: number;
    description: string;
}

const Class = () => {
    const [activeTab, setActiveTab] = useState<"siswa" | "materi">("siswa");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchMaterialQuery, setSearchMaterialQuery] = useState("");
    
    // State pagination untuk siswa
    const [currentStudentPage, setCurrentStudentPage] = useState(1);
    const [studentsPerPage] = useState(5);
    
    // State pagination untuk materi
    const [currentMaterialPage, setCurrentMaterialPage] = useState(1);
    const [materialsPerPage] = useState(6);

    const [students] = useState<Student[]>([
        {
            id: 1,
            name: "Alfian Kopling",
            email: "alfian@gmail.com",
            phone: "089764543567",
            address: "Jl simpang lima no 32 lorem ipsum dolor",
            photo: "https://i.pravatar.cc/40?img=1",
            class: "XII RPL 1",
        },
        {
            id: 2,
            name: "Ahmad Fauzi",
            email: "ahmad@gmail.com",
            phone: "089764543568",
            address: "Jl melati no 10 banyuwangi",
            photo: "https://i.pravatar.cc/40?img=2",
            class: "XII RPL 1",
        },
        {
            id: 3,
            name: "Siti Aisyah",
            email: "siti@gmail.com",
            phone: "089764543569",
            address: "Jl kenangan no 7 cluring",
            photo: "https://i.pravatar.cc/40?img=3",
            class: "XII RPL 1",
        },
        {
            id: 4,
            name: "Budi Santoso",
            email: "budi@gmail.com",
            phone: "089764543570",
            address: "Jl mawar no 5 surabaya",
            photo: "https://i.pravatar.cc/40?img=4",
            class: "XII RPL 1",
        },
        {
            id: 5,
            name: "Maya Sari",
            email: "maya@gmail.com",
            phone: "089764543571",
            address: "Jl anggrek no 15 malang",
            photo: "https://i.pravatar.cc/40?img=5",
            class: "XII RPL 1",
        },
        {
            id: 6,
            name: "Rizki Pratama",
            email: "rizki@gmail.com",
            phone: "089764543572",
            address: "Jl kenjeran no 22 sidoarjo",
            photo: "https://i.pravatar.cc/40?img=6",
            class: "XII RPL 1",
        },
        {
            id: 7,
            name: "Dewi Anggraini",
            email: "dewi@gmail.com",
            phone: "089764543573",
            address: "Jl diponegoro no 45 mojokerto",
            photo: "https://i.pravatar.cc/40?img=7",
            class: "XII RPL 1",
        },
    ]);

    const [materials] = useState<Material[]>([
        {
            id: 1,
            title: "Java Fundamental Programming",
            class: "Kelas 10",
            totalChapter: 12,
            description:
                "Belajar dasar pemrograman Java untuk memahami logika, variabel, dan struktur kontrol.",
        },
        {
            id: 2,
            title: "Java Object-Oriented Programming",
            class: "Kelas 11",
            totalChapter: 10,
            description:
                "Pelajari konsep OOP seperti class, inheritance, dan polymorphism dalam Java.",
        },
        {
            id: 3,
            title: "Java Advanced Programming",
            class: "Kelas 12",
            totalChapter: 8,
            description:
                "Materi lanjutan Java untuk memahami collection, exception handling, dan stream API.",
        },
        {
            id: 4,
            title: "Web Development Basics",
            class: "Kelas 10",
            totalChapter: 15,
            description:
                "Pengenalan HTML, CSS, dan JavaScript untuk pembuatan website dasar.",
        },
        {
            id: 5,
            title: "Database Management",
            class: "Kelas 11",
            totalChapter: 9,
            description:
                "Memahami konsep database, SQL, dan normalisasi untuk pengelolaan data.",
        },
        {
            id: 6,
            title: "Mobile App Development",
            class: "Kelas 12",
            totalChapter: 11,
            description:
                "Pembuatan aplikasi mobile menggunakan framework modern dan responsive design.",
        },
        {
            id: 7,
            title: "UI/UX Design Principles",
            class: "Kelas 11",
            totalChapter: 7,
            description:
                "Prinsip desain antarmuka pengguna dan pengalaman pengguna untuk aplikasi yang intuitif.",
        },
        {
            id: 8,
            title: "Software Testing",
            class: "Kelas 12",
            totalChapter: 6,
            description:
                "Teknik pengujian perangkat lunak untuk memastikan kualitas dan keandalan aplikasi.",
        },
    ]);

    // Filter students based on search query
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter materials based on search query
    const filteredMaterials = materials.filter(material =>
        material.title.toLowerCase().includes(searchMaterialQuery.toLowerCase()) ||
        material.description.toLowerCase().includes(searchMaterialQuery.toLowerCase())
    );

    // Pagination logic untuk siswa
    const indexOfLastStudent = currentStudentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalStudentPages = Math.ceil(filteredStudents.length / studentsPerPage);

    // Pagination logic untuk materi
    const indexOfLastMaterial = currentMaterialPage * materialsPerPage;
    const indexOfFirstMaterial = indexOfLastMaterial - materialsPerPage;
    const currentMaterials = filteredMaterials.slice(indexOfFirstMaterial, indexOfLastMaterial);
    const totalMaterialPages = Math.ceil(filteredMaterials.length / materialsPerPage);

    // Reset page ketika search berubah atau tab berubah
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentStudentPage(1);
    };

    const handleMaterialSearchChange = (value: string) => {
        setSearchMaterialQuery(value);
        setCurrentMaterialPage(1);
    };

    const handleTabChange = (tab: "siswa" | "materi") => {
        setActiveTab(tab);
        setCurrentStudentPage(1);
        setCurrentMaterialPage(1);
    };

    // Pagination component untuk siswa
    const StudentPagination = () => {
        if (totalStudentPages <= 1) return null;

        return (
            <div className="flex justify-center items-center gap-2 mt-6">
                <button
                    onClick={() => setCurrentStudentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentStudentPage === 1}
                    className={`p-2 rounded-lg border transition-colors duration-300 ${currentStudentPage === 1
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed border-gray-300 dark:border-gray-600"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                        }`}
                >
                    <FaChevronLeft size={14} />
                </button>

                {Array.from({ length: totalStudentPages }, (_, i) => i + 1).map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentStudentPage(page)}
                        className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors duration-300 ${currentStudentPage === page
                            ? "bg-purple-600 border-purple-600 text-white"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentStudentPage(prev => Math.min(prev + 1, totalStudentPages))}
                    disabled={currentStudentPage === totalStudentPages}
                    className={`p-2 rounded-lg border transition-colors duration-300 ${currentStudentPage === totalStudentPages
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed border-gray-300 dark:border-gray-600"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                        }`}
                >
                    <FaChevronRight size={14} />
                </button>
            </div>
        );
    };

    // Pagination component untuk materi
    const MaterialPagination = () => {
        if (totalMaterialPages <= 1) return null;

        return (
            <div className="flex justify-center items-center gap-2 mt-8">
                <button
                    onClick={() => setCurrentMaterialPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentMaterialPage === 1}
                    className={`p-2 rounded-lg border transition-colors duration-300 ${currentMaterialPage === 1
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed border-gray-300 dark:border-gray-600"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                        }`}
                >
                    <FaChevronLeft size={14} />
                </button>

                {Array.from({ length: totalMaterialPages }, (_, i) => i + 1).map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentMaterialPage(page)}
                        className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors duration-300 ${currentMaterialPage === page
                            ? "bg-purple-600 border-purple-600 text-white"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentMaterialPage(prev => Math.min(prev + 1, totalMaterialPages))}
                    disabled={currentMaterialPage === totalMaterialPages}
                    className={`p-2 rounded-lg border transition-colors duration-300 ${currentMaterialPage === totalMaterialPages
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed border-gray-300 dark:border-gray-600"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                        }`}
                >
                    <FaChevronRight size={14} />
                </button>
            </div>
        );
    };

    return (
        <DashboardLayout slug="class">
            <main className="flex-1 ml-0 2xl:ml-8 xl:ml-8 lg:ml-8 pb-10 min-h-screen transition-colors duration-500">
                {/* Header Judul */}
                <div className="mb-6">
                    <h2 className="text-left text-xl font-bold mb-3 dark:text-white transition-colors duration-500">Detail Kelas - XII RPL 1</h2>

                    {/* Tab Switcher */}
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={() => handleTabChange("siswa")}
                            className={`
                                font-sans font-semibold text-sm py-2.5 px-6 rounded-full 
                                flex items-center justify-center transition-all duration-150 ease-in-out
                                active:translate-y-0.5 border
                                ${activeTab === "siswa"
                                    ? `
                                        shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] 
                                        dark:shadow-blue-950
                                        bg-gradient-to-r from-purple-600 to-purple-700 border-purple-700 text-white
                                        dark:from-purple-600 dark:to-purple-700 dark:border-purple-600
                                    `
                                    : `
                                        bg-gray-200 dark:bg-[#0D0D1A] border-gray-300 dark:border-purple-600 text-gray-700 dark:text-gray-200
                                        hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:border-purple-700 hover:text-white
                                        hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]
                                        dark:shadow-blue-950
                                        dark:hover:from-purple-600 dark:hover:to-purple-600 dark:hover:border-purple-600
                                    `
                                }
                            `}
                        >
                            Siswa
                        </button>
                        <button
                            onClick={() => handleTabChange("materi")}
                            className={`
                                font-sans font-semibold text-sm py-2.5 px-6 rounded-full 
                                flex items-center justify-center transition-all duration-150 ease-in-out
                                active:translate-y-0.5 border
                                ${activeTab === "materi"
                                    ? `
                                        shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] 
                                        dark:shadow-blue-950
                                        bg-gradient-to-r from-purple-600 to-purple-700 border-purple-700 text-white
                                        dark:from-purple-600 dark:to-purple-700 dark:border-purple-500
                                    `
                                    : `
                                        bg-gray-200 dark:bg-[#0D0D1A] border-gray-300 dark:border-purple-600 text-gray-700 dark:text-gray-200
                                        hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:border-purple-700 hover:text-white
                                        hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]
                                        dark:shadow-blue-950
                                        dark:hover:from-purple-600 dark:hover:to-purple-700 dark:hover:border-purple-500
                                    `
                                }
                            `}
                        >
                            Materi
                        </button>
                    </div>
                </div>

                {/* ===== Bagian Siswa ===== */}
                {activeTab === "siswa" && (
                    <section className="text-start">
                        {/* Header Kartu Guru dan Mentor */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="bg-white dark:bg-purple-900 rounded-2xl shadow-md p-4 flex items-center gap-4 border border-gray-100 dark:border-gray-700 transition-colors duration-500">
                                <img
                                    src="https://i.pravatar.cc/100?img=12"
                                    alt="wali kelas"
                                    className="w-16 h-16 rounded-full"
                                />
                                <div>
                                    <h2 className="font-semibold text-gray-800 dark:text-white transition-colors duration-500">
                                        Suyadi Oke Joss Sp.d
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500">
                                        Wali Kelas XII RPL 1
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-purple-900 rounded-2xl shadow-md p-4 flex items-center gap-4 border border-gray-100 dark:border-gray-700 transition-colors duration-500">
                                <img
                                    src="https://i.pravatar.cc/100?img=14"
                                    alt="mentor kelas"
                                    className="w-16 h-16 rounded-full"
                                />
                                <div>
                                    <h2 className="font-semibold text-gray-800 dark:text-white transition-colors duration-500">Alfian Justin</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500">
                                        Mentor Kelas Industri
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Table Siswa */}
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
                                    onChange={(e) => handleSearchChange(e.target.value)}
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

                            {/* Pagination untuk siswa */}
                            <StudentPagination />
                        </div>
                    </section>
                )}

                {/* ===== Bagian Materi ===== */}
                {activeTab === "materi" && (
                    <section>
                        {/* Info Box */}
                        <div className="text-left bg-yellow-50 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-600 text-yellow-800 dark:text-yellow-200 p-4 rounded-xl mb-6 transition-colors duration-500">
                            <div className="flex items-center gap-2 mb-2">
                                <BsFillInfoSquareFill size={20} className="text-yellow-400 dark:text-yellow-500" />
                                <h3 className="font-semibold text-lg">Informasi</h3>
                            </div>

                            <ul className="text-sm list-disc list-inside pl-8 space-y-1">
                                <li>
                                    Kamu harus mengerjakan test terlebih dahulu sebelum membuka
                                    materi untuk pertama kali
                                </li>
                                <li>
                                    Selesaikan materi sebelumnya untuk membuka materi yang dipilih
                                </li>
                                <li>
                                    Selesaikan semua tugas dari materi sebelumnya agar dapat
                                    membuka materi selanjutnya
                                </li>
                            </ul>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <div className="relative w-fit">
                                <FaSearch className="absolute top-3.5 left-3 text-gray-400 dark:text-gray-500 transition-colors duration-500" />
                                <input
                                    type="text"
                                    placeholder="Cari materi..."
                                    value={searchMaterialQuery}
                                    onChange={(e) => handleMaterialSearchChange(e.target.value)}
                                    className="w-72 border border-gray-300 dark:border-gray-600 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 bg-white dark:bg-[#0D0D1A] text-gray-800 dark:text-white transition-colors duration-500"
                                />
                            </div>
                        </div>

                        {/* Daftar Materi */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 mt-2 max-w-6xl mx-auto">
                            {currentMaterials.map((mat) => (
                                <div
                                    key={mat.id}
                                    className="bg-white dark:bg-[#0D0D1A] border border-gray-100 dark:border-gray-200 rounded-2xl shadow-md p-5 flex flex-col h-full hover:shadow-lg transition-all duration-300 hover:border-purple-200 dark:hover:border-purple-500"
                                >
                                    <div className="flex text-left gap-3 mb-3">
                                        <div className="p-2">
                                            <FaBook className="text-purple-600 dark:text-purple-400 text-lg transition-colors duration-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-white text-[13px] transition-colors duration-500">
                                                {mat.title}
                                            </h4>
                                            <p className="mt-1 text-[13px] text-gray-600 dark:text-gray-400 transition-colors duration-500">{mat.class}</p>
                                        </div>
                                    </div>

                                    <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-1 flex-grow text-left transition-colors duration-500">
                                        {mat.description}
                                    </p>

                                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 transition-colors duration-500">
                                        <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-md font-medium transition-colors duration-500">
                                            {mat.totalChapter} Bab
                                        </span>
                                        <button className="w-fit relative group overflow-hidden font-sans font-semibold text-xs py-1 px-4 rounded-lg flex items-center justify-center gap-2 border transition-all duration-500 ease-in-out shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 bg-white dark:bg-purple-600 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-100 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-700">
                                            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                            <span className="relative z-10">Detail</span>
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {filteredMaterials.length === 0 && (
                                <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400 transition-colors duration-500">
                                    Tidak ada materi yang ditemukan
                                </div>
                            )}
                        </div>

                        {/* Pagination untuk materi */}
                        <MaterialPagination />
                    </section>
                )}
            </main>
        </DashboardLayout>
    );
};

export default Class;