import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassCard from "@/components/public/Card";
import ClassFilterBar from "@/components/classteacher/ClassFilterBar";
import Header from "@/components/public/Header";
import { mockClasses } from "@/data/classData";

const ClassList = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  // Parent handler — now performs navigation to /classdetail/{id}
  const handleViewClass = (classId: number) => {
    console.log("View class:", classId);
    navigate(`/classdetail/${classId}`);
  };

  const handleFilterClick = () => {
    console.log("Filter clicked");
    // Add your filter logic here
  };

  // Filter classes based on search
  const filteredClasses = mockClasses.filter((classItem) => {
    const searchLower = searchValue.toLowerCase();
    return (
      classItem.title.toLowerCase().includes(searchLower) ||
      classItem.category.toLowerCase().includes(searchLower) ||
      classItem.division.toLowerCase().includes(searchLower) ||
      classItem.teacherTitle.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Header title="Daftar Kelas" subtitle="Daftar Kelas Anda pada kelas industri" />

      {/* Filter Bar */}
      <ClassFilterBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterText="Daftar Sekolah yang ada/dipilih ke mentor"
        onFilterClick={handleFilterClick}
      />

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((classItem) => (
            <ClassCard
              key={classItem.id}
              title={classItem.title}
              category={classItem.category}
              division={classItem.division}
              teacherName={classItem.teacherName}
              teacherTitle={classItem.teacherTitle}
              teacherAvatar={classItem.teacherAvatar}
              classId={String(classItem.id)}
              onViewClass={() => handleViewClass(classItem.id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">Tidak ada kelas yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassList;