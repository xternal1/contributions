import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetail, fetchPreTest, fetchNavigate } from "../../../features/course/_service/course_service";
import type { DataWrapper } from "../../../features/course/_course";
import HeaderPretes from "../../../components/course/PreTes/HeaderPretes";

import imgBook from "../../../assets/img/book.png";


const Tes = () => {
    const navigate = useNavigate();
    const { slug } = useParams<{ slug: string }>();

    const [pretest, setPretest] = useState<DataWrapper | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [starting, setStarting] = useState(false);

    useEffect(() => {
        if (!slug) return;

        const loadPretest = async () => {
            setLoading(true);
            setError(null);

            try {
                const course = await fetchCourseDetail(slug);
                if (!course?.course_test_id) throw new Error("Pretest ID tidak ditemukan");

                const pretestData = await fetchPreTest(course?.course_test_id);
                setPretest(pretestData);

            } catch (err: unknown) {
                console.error("Gagal load pretest:", err);

                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Gagal memuat pretest");
                }
            } finally {
                setLoading(false);
            }
        };

        loadPretest();
    }, [slug]);

    const handleStartExam = async () => {
        if (!slug) return;
        try {
            setStarting(true);
            await fetchNavigate(slug);
            navigate(`/course/pre-tes/exam/${slug}`);
        } catch (err) {
            console.error("Gagal memulai pretest:", err);
            alert("Gagal memulai pretest. Coba lagi.");
        } finally {
            setStarting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 pb-20 dark:bg-[#141427] transition-colors duration-500">
            {/* Header */}
            <HeaderPretes pretest={pretest} />

            {/* Main Content */}
            <div className="2xl:max-w-6xl xl:max-w-5xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-md mx-auto mt-8">
                {/* Card Intro */}
                <div className="relative min-h-37 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow p-6 mb-6 flex flex-col md:flex-row items-center md:items-center justify-between">
                    <div className="text-left px-5 mb-4 md:mb-0 md:flex-1">
                        <h2 className="text-2xl font-bold text-white">
                            Test Sebelum Masuk Kursus
                        </h2>
                        <p className="text-white mt-1 sm:text-base md:text-base">
                            Sebelum Memasuki Kursus Anda Diperkenankan Mengerjakan test
                        </p>
                    </div>
                    <div className="flex justify-center md:justify-end w-full md:w-auto">
                        <img
                            src={imgBook}
                            alt="Ilustrasi Ujian"
                            className="w-80 sm:w-80 md:w-60 mx-8 mt-6 md:mt-0 2xl:absolute xl:absolute lg:absolute 2xl:right-2 2xl:-bottom-0 xl:right-2 xl:-bottom-0 lg:right-2 lg:-bottom-0"
                        />
                    </div>
                </div>

                {/* Card Aturan */}
                <div className="bg-white rounded-lg shadow p-8 dark:bg-[#0D0D1A]">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 dark:text-white">Aturan</h3>
                    <div className="text-gray-600 space-y-6 text-justify px-4 dark:text-white">
                        <p>
                            Anda akan menemui ujian (quiz, exam, atau ujian akhir) seperti ini
                            untuk memastikan Anda sudah mengerti dan memahami materi
                            pembelajaran yang telah diberikan. Pada ujian akan tersedia
                            beberapa pertanyaan dengan opsi jawaban pilihan ganda.
                        </p>
                        <p>
                            Ujian memiliki standar minimum kelulusan. Jika tidak memenuhi nilai
                            minimum, maka Anda wajib mengulang kembali sampai memenuhi standar
                            tersebut. Perhatikan bahwa jika Anda mau mengulang ujian, akan ada
                            waktu tunggu / jeda yang harus lewat. Setelahnya, Anda dapat
                            mengambil kembali ujian yang baru. Waktu tunggu ini berbeda-beda,
                            mulai dari hitungan menit hingga berhari-hari. Jadi agar waktu
                            lebih efisien pastikan Anda sudah siap secara materi, sebelum
                            mengambil ujian.
                        </p>
                        <p>
                            Setiap ujian juga memiliki durasi waktu yang berbeda. Anda wajib
                            menyelesaikan seluruh pertanyaan pada durasi waktu yang telah
                            diberikan. Jika waktu yang diberikan habis, maka ujian akan
                            otomatis selesai. Sistem hanya akan menilai pertanyaan yang sudah
                            terjawab. Jadi, usahakan Anda telah menjawab sebanyak mungkin
                            pertanyaan hingga tuntas, sebelum durasi waktu habis.
                        </p>
                        <p>
                            Mari kita coba fitur ujian pada Getskill. Jika sudah siap
                            mencoba, klik tombol Ambil di bawah. Anda hanya bisa lanjut ke
                            modul pelajaran berikutnya jika telah lulus dari ujian ini.
                        </p>
                    </div>

                    {/* Detail Aturan */}
                    {loading && <p className="mt-6 text-gray-500 px-5 dark:text-white">Memuat data pretest...</p>}
                    {error && <p className="mt-6 text-red-500 px-5">{error}</p>}
                    {pretest && (
                        <ul className="mt-6 text-gray-700 space-y-1 text-left px-5 dark:text-white">
                            <li>• Jumlah Soal: {pretest.paginate.last_page}</li>
                            <li>• Durasi Ujian: {pretest.course_test.duration} Menit</li>
                        </ul>
                    )}

                    {/* Button */}  
                    <div className="text-center mt-8 mb-10">
                        <button
                            disabled={loading || !!error || starting}
                            onClick={handleStartExam}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow">
                            Mulai Ujian
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tes;
