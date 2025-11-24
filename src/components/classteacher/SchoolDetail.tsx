import React from 'react';
import { type SchoolData } from '@/data/classData';

interface SchoolDetailProps {
    schoolData: SchoolData;
}

export const SchoolDetail: React.FC<SchoolDetailProps> = ({ schoolData }) => {
    return (
        <div className="bg-white dark:bg-[#0B0B15] rounded-2xl border border-gray-100 dark:border-[#171725] p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-left">
                Detail Sekolah
            </h2>

            {/* School Header */}
            <div className="flex items-start justify-between mb-8 pb-6 border-b border-gray-100 dark:border-[#171725]">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center p-3">
                        <img
                            src={schoolData.logo}
                            alt="School Logo"
                            className="w-full h-full"
                        />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {schoolData.name}
                        </h3>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                            {schoolData.type}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Tahun Ajaran
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {schoolData.tahunAjaran}
                    </p>
                </div>
            </div>

            {/* School Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-6">
                    <DetailRow label="Kepala Sekolah :" value={schoolData.kepalaSekolah} />
                    <DetailRow label="NPSN :" value={schoolData.npsn} />
                    <DetailRow label="Nomor Telepon :" value={schoolData.nomorTelepon} />
                    <DetailRow label="Email" value={schoolData.email} />
                </div>

                <div className="space-y-6">
                    <DetailRow label="Jenjang Pendidikan :" value={schoolData.jenjangPendidikan} />
                    <DetailRow label="Akreditasi :" value={schoolData.akreditasi} />
                    <DetailRow label="Deskripsi :" value={schoolData.deskripsi} />
                    <DetailRow label="Alamat :" value={schoolData.alamat} isAddress />
                </div>
            </div>
        </div>
    );
};

const DetailRow: React.FC<{ label: string; value: string; isAddress?: boolean }> = ({
    label,
    value,
    isAddress = false
}) => (
    <div className="flex justify-between items-start">
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
        <span className={`text-gray-900 dark:text-white font-medium ${isAddress ? 'text-right max-w-md' : 'text-right'}`}>
            {value}
        </span>
    </div>
);

export default SchoolDetail;