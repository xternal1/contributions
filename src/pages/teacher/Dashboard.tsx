import ClassCard from '@/components/public/Card';
import StatCard from '@/components/dashboardteacher/StatCard';
import React from 'react';
import { HiBookOpen } from 'react-icons/hi';


const Dashboard: React.FC = () => {
  // Sample data - replace with your actual data
  const stats = [
    { count: 12, label: 'Kelas' },
    { count: 12, label: 'Kelas' },
    { count: 12, label: 'Kelas' },
    { count: 12, label: 'Kelas' },
  ];

  const classes = [
    {
      id: 1,
      title: 'XII DKV 2',
      category: 'SMKN 1 KEPANJEN',
      division: 'Devisi Web Development',
      teacherName: 'Wali Kelas',
      teacherTitle: 'Suyadi Oke Joss Sp.d',
      teacherAvatar: '/path/to/avatar.jpg',
    },
    {
      id: 2,
      title: 'XII DKV 2',
      category: 'SMKN 1 KEPANJEN',
      division: 'Devisi UI/UX Design',
      teacherName: 'Wali Kelas',
      teacherTitle: 'Suyadi Oke Joss Sp.d',
      teacherAvatar: '/img/no-image/no-profile.jpeg',
    },
    {
      id: 3,
      title: 'XII DKV 2',
      category: 'SMKN 1 KEPANJEN',
      division: 'Devisi Mobile',
      teacherName: 'Wali Kelas',
      teacherTitle: 'Suyadi Oke Joss Sp.d',
      teacherAvatar: '/img/no-image/no-profile.jpeg',
    },
    {
      id: 4,
      title: 'XII DKV 2',
      category: 'SMKN 1 KEPANJEN',
      division: 'Devisi Digital Marketing',
      teacherName: 'Wali Kelas',
      teacherTitle: 'Suyadi Oke Joss Sp.d',
      teacherAvatar: '/img/no-image/no-profile.jpeg',
    },
  ];

  const handleViewClass = (classId: number) => {
    console.log('View class:', classId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#141427] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={<HiBookOpen className="w-6 h-6" />}
              count={stat.count}
              label={stat.label}
            />
          ))}
        </div>

        {/* Classes Section */}
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Daftar Kelas
            </h2>
            <a
              href="/teacher/classlist"
              className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              Lihat Lainnya
            </a>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((classItem) => (
              <ClassCard
                key={classItem.id}
                title={classItem.title}
                category={classItem.category}
                division={classItem.division}
                teacherName={classItem.teacherName}
                teacherTitle={classItem.teacherTitle}
                teacherAvatar={classItem.teacherAvatar}
                onViewClass={() => handleViewClass(classItem.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;