import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetail, fetchPreTestResult } from "../../../features/course/_service/course_service";
import type { DataWrapper } from "../../../features/course/_course";

const TesResults = () => {
    const navigate = useNavigate();
    const { slug } = useParams<{ slug: string }>();

    const [result, setResult] = useState<DataWrapper| null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadResult = async () => {
            if (!slug) return;

            try {
                setLoading(true);

                // 1. Ambil courseDetail untuk dapat course_test_id
                const courseDetail = await fetchCourseDetail(slug);
                console.log("courseDetail:", courseDetail);
                if (!courseDetail?.course_test_id) {
                    setError("Course test id tidak ditemukan.");
                    return;
                }

                // 2. Ambil hasil pretest
                const data = await fetchPreTestResult(courseDetail.course_test_id);
                console.log("pretest result:", data);
                if (!data?.test_result?.id) {
                    setError("Hasil tes tidak ditemukan.");
                    return;
                }

                setResult(data);
            } catch (err) {
                console.error("Gagal mengambil hasil pretest:", err);
                setError("Gagal mengambil hasil pretest.");
            } finally {
                setLoading(false);
            }
        };

        loadResult();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl font-semibold text-gray-700">Memuat hasil tes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl font-semibold text-red-500">{error}</p>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl font-semibold text-gray-700">Data hasil tes tidak ditemukan.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 mb-15">
            {/* Header */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 py-6 px-6">
                <h1 className="text-white font-semibold text-left ml-13 2xl:ml-51 xl:ml-38 lg:ml-23 md:ml-32 sm:ml-15">
                    Pre Test - {slug}
                </h1>
            </div>

            <div className="2xl:max-w-6xl xl:max-w-5xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-md mx-auto mt-8">
                {/* Card Intro */}
                <div className="relative min-h-37 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow p-6 mb-6 flex flex-col md:flex-row items-center md:items-center justify-between">
                    <div className="text-left px-5 mb-4 md:mb-0 md:flex-1">
                        <h3 className="text-xl font-semibold text-white">
                            Test selesai
                        </h3>
                        <h2 className="text-2xl font-bold text-white">
                            Selamat anda telah menyelesaikan test
                        </h2>
                        <p className=" text-white mt-1 sm:text-base md:text-base">
                            Hasil test anda akan tampilan dibawah ini
                        </p>
                    </div>
                    <div className="flex justify-center md:justify-end w-full md:w-auto">
                        <img
                            src="/src/assets/img/book.png"
                            alt="Ilustrasi Ujian"
                            className="w-80 sm:w-80 md:w-60 mx-8 mt-6 md:mt-0 2xl:absolute xl:absolute lg:absolute 2xl:right-2 2xl:-bottom-0 xl:right-2 xl:-bottom-0 lg:right-2 lg:-bottom-0"
                        />
                    </div>
                </div>

                {/* Main Content */}
                <div className="2xl:max-w-6xl xl:max-w-5xl lg:max-w-5xl md:max-w-2xl sm:max-w-xl max-w-md mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card Aturan (Kiri) */}
                    <div className="bg-white rounded-lg shadow p-8">
                        <h2 className="text-2xl font-semibold mb-4 text-start">Hasil Test</h2>

                        <div className="text-sm text-black space-y-4">
                            <div className="text-start">
                                <span className="font-semibold mb-2 block">Tanggal Ujian</span>
                                <p className="text-purple-600">{new Date().toLocaleDateString("id-ID", {
                                    weekday: "long", day: "numeric", month: "long", year: "numeric"
                                })}</p>
                                <p className="text-purple-600">{new Date().toLocaleTimeString("id-ID")}</p>
                            </div>
                            <div className="grid grid-cols-[150px_20px_1fr] gap-x-2">
                                <span className="text-black font-semibold text-start">Jumlah Soal</span>
                                <span>:</span>
                                <span className="text-gray-600 text-end">{result.test_result?.total_question} Soal</span>
                            </div>

                            <div className="grid grid-cols-[150px_20px_1fr] gap-x-2">
                                <span className="text-black font-semibold text-start">Soal Benar</span>
                                <span>:</span>
                                <span className="text-gray-600 text-end">{result.test_result?.total_correct} Soal</span>
                            </div>

                            <div className="grid grid-cols-[150px_20px_1fr] gap-x-2">
                                <span className="text-black font-semibold text-start">Soal Salah</span>
                                <span>:</span>
                                <span className="text-gray-600 text-end">{result.test_result?.total_fault} Soal</span>
                            </div>
                        </div>

                        {/* Nilai Ujian */}
                        <div className="text-center my-6">
                            <p className="text-black font-semibold mb-3">Nilai Ujian</p>
                            <p className="text-7xl font-semibold text-purple-600 border-b-2 pb-3 border-purple-200">{result.test_result?.score}</p>
                        </div>

                        {/* Hasil */}
                        <div className="text-center">
                            <p className="text-gray-600">Hasil</p>
                            {parseFloat(result.test_result?.score ?? "0") >= 75 ? (
                                <p className="bg-green-100 text-green-600 font-semibold rounded-lg py-2 mt-2">
                                    Selamat Anda Lulus
                                </p>
                            ) : (
                                <p className="bg-red-100 text-red-600 font-semibold rounded-lg py-2 mt-2">
                                    Maaf Anda Belum Lulus
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Card Hasil Soal (Kanan) */}
                    <div className="md:col-span-2 space-y-6">
                        {result.test_result?.questions.map((q, idx) => {
                            const isCorrect = q.correct;
                            return (
                                <div key={q.question + idx} className="bg-white rounded-lg shadow p-7">
                                    <span
                                        className={`rounded-lg py-1 px-2 text-sm font-semibold block ml-auto w-fit mb-4 ${isCorrect ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {isCorrect ? "✔ Benar" : "✘ Salah"}
                                    </span>

                                    <div className="text-start">
                                        <h3 className="font-semibold">
                                            {idx + 1}. <span dangerouslySetInnerHTML={{ __html: q.question }} />
                                        </h3>
                                    </div>

                                    <div className="mt-4 space-y-2 text-sm">
                                        {["option_a", "option_b", "option_c", "option_d", "option_e"].map((opt) => {
                                            const optionText = q[opt as keyof typeof q] as string;
                                            const isUserAnswer = q.user_answer === opt;
                                            const isRightAnswer = q.correct_answer === opt;

                                            return (
                                                <label
                                                    key={opt}
                                                    className={`flex items-center space-x-3 ${isUserAnswer
                                                            ? isRightAnswer
                                                                ? "font-semibold text-green-600"
                                                                : "font-semibold text-red-600"
                                                            : ""
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        disabled
                                                        checked={isUserAnswer}
                                                        className="w-5 h-5 accent-purple-600"
                                                    />
                                                    <span dangerouslySetInnerHTML={{ __html: optionText }} />
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-yellow-400 shadow-[4px_4px_0px_0px_#0B1367] hover:bg-purple-600 hover:shadow-none active:translate-y-0.5 transition-all duration-200 ease-out text-white font-semibold py-2 rounded-lg">
                            Selesai
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TesResults;
