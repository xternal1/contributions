import React from 'react';
import { HiX } from 'react-icons/hi';

interface StudentDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: {
        name: string;
        avatar: string;
        kepalaSekolah?: string;
        nip?: string;
        nomorTelepon?: string;
        alamat?: string;
        email?: string;
        tanggalLahir?: string;
        jenisKelamin?: string;
    };
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
    isOpen,
    onClose,
    student
}) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop - Click to close */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
                <div
                    className="bg-white dark:bg-[#1a1a2e] rounded-3xl w-full max-w-5xl p-8 relative animate-in fade-in zoom-in duration-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center justify-center transition-colors"
                    >
                        <HiX size={20} />
                    </button>

                    {/* Header */}
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-12 text-left">Detail Siswa</h2>

                    {/* Avatar */}
                    <div className="flex justify-center mb-17">
                        <div className="w-33 h-33 rounded-full overflow-hidden bg- dark:bg-white">
                            <img
                                src={student.avatar}
                                alt={student.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <DetailField
                                label="Kepala Sekolah :"
                                value={student.kepalaSekolah || student.name}
                            />
                            <DetailField
                                label="NIP :"
                                value={student.nip || "89898989"}
                            />
                            <DetailField
                                label="Nomor Telepon :"
                                value={student.nomorTelepon || "898989899"}
                            />
                            <DetailField
                                label="Alamat"
                                value={student.alamat || "test edit sad"}
                            />
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <DetailField
                                label="Email :"
                                value={student.email || "wiramurid@gmail.com"}
                            />
                            <DetailField
                                label="Tanggal Lahir :"
                                value={student.tanggalLahir || "89898989"}
                            />
                            <DetailField
                                label="Jenis Kelamin :"
                                value={student.jenisKelamin || "Laki-laki"}
                            />
                        </div>
                    </div>

                    {/* Close Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium transition-all shadow-lg hover:shadow-xl"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

// Helper component for detail fields
const DetailField: React.FC<{ label: string; value: string }> = ({ label, value }) => {
    return (
        <div className="flex items-center pb-2 border-b border-gray-300 dark:border-gray-700">
            <label className="text-sm text-gray-900 dark:text-gray-400 min-w-[140px] text-left font-bold">{label}</label>
            <span className="text-gray-700 dark:text-gray-300 flex-1">{value}</span>
        </div>
    );
};