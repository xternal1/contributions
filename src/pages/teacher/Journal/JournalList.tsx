import React, { useState } from "react";
import { VscEye } from "react-icons/vsc";
import ClassHeader from "@/components/public/Header";
import { type Column, type Action, DataTable } from "@/components/public/Table";
import { type Journal, mockJournals } from "@/data/journalData";
import { useNavigate } from "react-router-dom";

const JournalList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddJournal = () => {
    console.log('Add journal clicked');
    navigate('/teacher/journal/create');
    // Add your add journal logic here
  }

  const handleViewJournal = (journal: Journal) => {
    console.log('View journal:', journal);
    navigate(`/teacher/journal/${journal.id}`);
    // Add your view logic here
  };

  const columns: Column<Journal>[] = [
    {
      key: 'no',
      header: 'No',
      align: 'center',
      className: 'w-16'
    },
    {
      key: 'title',
      header: 'Judul',
      render: (journal) => (
        <div className="font-medium text-gray-900 dark:text-white">
          {journal.title}
        </div>
      )
    },
    {
      key: 'image',
      header: 'Bukti',
      align: 'center',
      render: (journal) => (
        <div className="flex justify-center">
          <img
            src={journal.image}
            alt={journal.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
        </div>
      )
    },
    {
      key: 'date',
      header: 'Tanggal'
    },
    {
      key: 'class',
      header: 'Kelas'
    },
    {
      key: 'description',
      header: 'Deskripsi',
      render: (journal) => (
        <div className="text-gray-600 dark:text-gray-400 truncate max-w-xs">
          {journal.description}
        </div>
      )
    }
  ];

  const actions: Action<Journal>[] = [
    {
      icon: <VscEye size={16} />,
      onClick: handleViewJournal,
      className: 'w-8 h-8 rounded-lg bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center transition-colors',
      label: 'View journal details'
    }
  ];

  // Filter journals based on search
  const filteredJournals = mockJournals.filter(journal =>
    journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    journal.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
    journal.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <ClassHeader title="Jurnal" subtitle="Daftar Jurnal Guru" />

      {/* Search and Add Button */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <button
          onClick={handleAddJournal}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors shadow-md hover:shadow-lg">
          <span className="text-xl">+</span>
          Tambah
        </button>
      </div>

      {/* Journal Table */}
      <div className="bg-white dark:bg-[#0B0B15] rounded-2xl border border-gray-200 dark:border-[#171725] overflow-hidden shadow-lg dark:shadow-2xl dark:shadow-purple-500/10">
        <DataTable
          data={filteredJournals}
          columns={columns}
          actions={actions}
          keyExtractor={(journal) => journal.id}
          emptyMessage="Tidak ada jurnal yang ditemukan"
        />
      </div>
    </div>
  );
};

export default JournalList;