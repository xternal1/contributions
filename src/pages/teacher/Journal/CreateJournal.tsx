import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassHeader from "@/components/public/Header";
import { JournalForm, AttendanceTable } from "@/components/journalteacher/Index";
import { mockStudentsForAttendance } from "@/data/journalData";
import type { AttendanceStatus } from "@/components/journalteacher/AttendanceRow";

const CreateJournal: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        image: null as File | null,
        description: ""
    });
    const [attendanceData, setAttendanceData] = useState<Record<number, AttendanceStatus>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFormData(prev => ({ ...prev, image: e.target.files![0] }));
        }
    };

    const handleDescriptionChange = (value: string) => {
        setFormData(prev => ({ ...prev, description: value }));
    };

    const handleAttendanceChange = (studentId: number, status: AttendanceStatus) => {
        setAttendanceData(prev => ({ ...prev, [studentId]: status }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", { formData, attendanceData });
        navigate('/teacher/journals');
    };

    const handleCancel = () => navigate(-1);

    return (
        <div className="space-y-6">
            <ClassHeader title="Jurnal" subtitle="Daftar Jurnal Guru" />

            <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition-colors shadow-md hover:shadow-lg"
            >
                Kembali
            </button>

            <div className="bg-white dark:bg-[#0B0B15] rounded-2xl  dark:border-[#171725] overflow-hidden shadow-lg dark:shadow-2xl dark:shadow-purple-500/10 p-6">
                <form onSubmit={handleSubmit}>
                    <JournalForm
                        formData={formData}
                        onInputChange={handleInputChange}
                        onFileChange={handleFileChange}
                        onDescriptionChange={handleDescriptionChange}
                    />
                </form>
            </div>

            <div className="bg-white dark:bg-[#0B0B15] rounded-2xl border border-gray-200 dark:border-[#171725] overflow-hidden shadow-lg dark:shadow-2xl dark:shadow-purple-500/10">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-left">
                        Presensi Siswa
                    </h2>
                    <AttendanceTable
                        students={mockStudentsForAttendance}
                        onAttendanceChange={handleAttendanceChange}
                    />
                </div>

                <div className="p-6 border- dark:border-[#171725] flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-2.5 rounded-lg bg-orange-400 hover:bg-orange-500 text-white font-medium transition-colors shadow-md hover:shadow-lg"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="px-6 py-2.5 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors shadow-md hover:shadow-lg"
                    >
                        Tambah
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateJournal;