import DashboardLayout from "@components/public/auth/DashboardLayout";
import { useState } from "react";
import { TabSwitcher, TeacherMentorCards, StudentTable, StudentPagination, MaterialInfo, MaterialGrid, MaterialPagination } from "@components/classindustry/Index";

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

    return (
        <DashboardLayout slug="class">
            <main className="flex-1 ml-0 2xl:ml-8 xl:ml-8 lg:ml-8 pb-10 min-h-screen transition-colors duration-500">
                {/* Header Judul */}
                <div className="mb-6">
                    <h2 className="text-left text-xl font-bold mb-3 dark:text-white transition-colors duration-500">Detail Kelas - XII RPL 1</h2>

                    {/* Tab Switcher */}
                    <TabSwitcher activeTab={activeTab} onTabChange={handleTabChange} />
                </div>

                {/* ===== Bagian Siswa ===== */}
                {activeTab === "siswa" && (
                    <section className="text-start">
                        <TeacherMentorCards />

                        <StudentTable
                            currentStudents={currentStudents}
                            filteredStudents={filteredStudents}
                            searchQuery={searchQuery}
                            currentStudentPage={currentStudentPage}
                            studentsPerPage={studentsPerPage}
                            onSearchChange={handleSearchChange}
                        />

                        <StudentPagination
                            currentStudentPage={currentStudentPage}
                            totalStudentPages={totalStudentPages}
                            onPageChange={setCurrentStudentPage}
                        />
                    </section>
                )}

                {/* ===== Bagian Materi ===== */}
                {activeTab === "materi" && (
                    <section>
                        <MaterialInfo />

                        <MaterialGrid
                            currentMaterials={currentMaterials}
                            filteredMaterials={filteredMaterials}
                            searchMaterialQuery={searchMaterialQuery}
                            onSearchChange={handleMaterialSearchChange}
                        />

                        <MaterialPagination
                            currentMaterialPage={currentMaterialPage}
                            totalMaterialPages={totalMaterialPages}
                            onPageChange={setCurrentMaterialPage}
                        />
                    </section>
                )}
            </main>
        </DashboardLayout>
    );
};

export default Class;