import React from "react";
import { useNavigate } from "react-router-dom";
import ClassHeader from "@/components/public/Header";
import { DataTable, type Column } from "@/components/public/Table";
import { mockJournalDetail, type JournalAttendance } from "@/data/journalData";

const JournalDetail: React.FC = () => {
  const navigate = useNavigate();


  // In real app, fetch data based on id
  const journalDetail = mockJournalDetail;

  const columns: Column<JournalAttendance>[] = [
    {
      key: 'no',
      header: 'No',
      align: 'center',
      className: 'w-16'
    },
    {
      key: 'name',
      header: 'Nama',
      render: (attendance) => (
        <div className="font-medium text-gray-900 dark:text-white">
          {attendance.name}
        </div>
      )
    },
    {
      key: 'class',
      header: 'Kelas',
      align: 'center'
    },
    {
      key: 'status',
      header: 'Kehadiran',
      align: 'center',
      render: (attendance) => {
        const statusColors = {
          Hadir: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
          Sakit: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
          Izin: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
          Alfa: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
        };

        return (
          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${statusColors[attendance.status]}`}>
            {attendance.status}
          </span>
        );
      }
    }
  ];

  return (
    <div className="space-y-6">
      <ClassHeader title="Jurnal" subtitle="Daftar Jurnal Guru" />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition-colors shadow-md hover:shadow-lg"
      >
        Kembali
      </button>

      {/* Journal Detail Section */}
      <div className="bg-white dark:bg-[#0B0B15] rounded-2xl border border-gray-200 dark:border-[#171725] overflow-hidden shadow-lg dark:shadow-2xl dark:shadow-purple-500/10 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Detail Jurnal
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Image Section */}
          <div className="md:col-span-1">
            <img
              src={journalDetail.image}
              alt={journalDetail.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          {/* Content Section */}
          <div className="md:col-span-2 space-y-4">
            {/* Title */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Judul
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {journalDetail.title}
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Deskripsi
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {journalDetail.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance List Section */}
      <div className="bg-white dark:bg-[#0B0B15] rounded-2xl border border-gray-200 dark:border-[#171725] overflow-hidden shadow-lg dark:shadow-2xl dark:shadow-purple-500/10">
        <div className="p-6 border-b border-gray-200 dark:border-[#171725]">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Daftar Kehadiran Siswa
          </h2>
        </div>

        <DataTable
          data={journalDetail.attendances}
          columns={columns}
          keyExtractor={(attendance) => attendance.id}
          emptyMessage="Tidak ada data kehadiran"
        />
      </div>
    </div>
  );
};

export default JournalDetail;