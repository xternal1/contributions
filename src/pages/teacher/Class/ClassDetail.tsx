import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Pagination, PersonCard, SchoolDetail, SearchFilter} from "@/components/classteacher/Index";
import ClassHeader from "@/components/public/Header";
import {
  mockStudents,
  mockSchoolData,
  mockTeacherData,
  mockMentorData,
  mockClasses
} from "@/data/classData";
import { useClassDetailStore } from "@/lib/stores/teacher/useClassDetail";
import StudentTable from "@/components/public/Table";

const genderOptions = ["Jenis Kelamin", "Laki - laki", "Perempuan"];

const ClassDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const {
    currentPage,
    searchQuery,
    selectedGender,
    isGenderDropdownOpen,
    setCurrentPage,
    setSearchQuery,
    setSelectedGender,
    setIsGenderDropdownOpen,
    getPaginatedStudents,
    getTotalPages
  } = useClassDetailStore();

  // Get class data from location state or find it from mock data
  const classData = location.state?.classData || mockClasses.find(c => c.id === Number(id));

  // Fallback to first class if no data found
  const currentClass = classData || mockClasses[0];

  const paginatedStudents = getPaginatedStudents(mockStudents);
  const totalPages = getTotalPages(mockStudents);

  return (
    <div className="space-y-6">
      <ClassHeader
        title="Detail Kelas"
        subtitle="Detail Kelas pada kelas industri"
      />

      {/* Title and Back Button Row */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white text-left">
            {currentClass.title} - {currentClass.division}
          </h1>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
        >
          Kembali
        </button>
      </div>

      {/* Class Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PersonCard
          name={mockTeacherData.name}
          role={mockTeacherData.role}
          avatar={mockTeacherData.avatar}
          gradientFrom="from-purple-400"
          gradientTo="to-purple-600"
        />
        <PersonCard
          name={mockMentorData.name}
          role={mockMentorData.role}
          avatar={mockMentorData.avatar}
          gradientFrom="from-blue-400"
          gradientTo="to-blue-600"
        />
      </div>

      {/* Student List Section */}
      <div className="bg-gray dark:bg-[#0B0B15] rounded-2xl border border-gray-200 dark:border-[#171725] overflow-hidden shadow-lg dark:shadow-2xl dark:shadow-purple-500/10">
        <div className="p-6 border-b border-gray-100 dark:border-[#171725]">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white text-left">
            Daftar Siswa
          </h2>
        </div>

        <SearchFilter
          searchQuery={searchQuery}
          selectedGender={selectedGender}
          isGenderDropdownOpen={isGenderDropdownOpen}
          genderOptions={genderOptions}
          onSearchChange={setSearchQuery}
          onGenderSelect={setSelectedGender}
          onToggleDropdown={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}
        />

        <StudentTable students={paginatedStudents} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* School Detail Section */}
      <SchoolDetail schoolData={mockSchoolData} />
    </div>
  );
};

export default ClassDetail;