import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPreTest, fetchCourseDetail, submitPreTest, fetchPreTestResult } from "../../../features/course/_service/course_service";
import type { DataWrapper, CourseData } from "../../../features/course/_course";
import HeaderPretes from "../../../components/course/PreTes/HeaderPretes";
import { motion, AnimatePresence } from "framer-motion";

const Exam = () => {
    const navigate = useNavigate();
    const { slug } = useParams<{ slug: string }>();

    const [pretest, setPretest] = useState<DataWrapper | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [answer, setAnswers] = useState<Record<string, string>>({});
    const [showConfirm, setShowConfirm] = useState(false);
    const [showTimeUp, setShowTimeUp] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isTimerStarted, setIsTimerStarted] = useState(false);
    const [showIncomplete, setShowIncomplete] = useState(false);

    // Ambil dari localStorage (persist data)
    useEffect(() => {
        const savedAnswers = localStorage.getItem("pretest_answers");
        const savedTime = localStorage.getItem("pretest_timeLeft");
        if (savedAnswers) {
            try {
                const parsedAnswers = JSON.parse(savedAnswers);
                setAnswers(parsedAnswers);
            } catch (e) {
                console.error("Gagal parse jawaban dari localStorage:", e);
                localStorage.removeItem("pretest_answers");
            }
        }

        if (savedTime) {
            setTimeLeft(parseInt(savedTime, 10));
            setIsTimerStarted(true);
        }
    }, []);

    // start timer
    useEffect(() => {
        if (pretest?.course_test.duration && !isTimerStarted) {
            const duration = pretest.course_test.duration * 60;
            setTimeLeft(duration);
            setIsTimerStarted(true);
            localStorage.setItem("pretest_timeLeft", duration.toString());
        }
    }, [pretest, isTimerStarted]);


    // countdown
    useEffect(() => {
        if (!isTimerStarted || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                const updated = prev > 0 ? prev - 1 : 0;
                localStorage.setItem("pretest_timeLeft", updated.toString());
                return updated;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isTimerStarted, timeLeft]);

    // waktu habis
    useEffect(() => {
        if (timeLeft === 0 && isTimerStarted) {
            setShowTimeUp(true);
            localStorage.removeItem("pretest_answers");
            localStorage.removeItem("pretest_timeLeft");
            setIsTimerStarted(false);
        }
    }, [timeLeft, isTimerStarted]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, "0")}:${m
            .toString()
            .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        if (!slug) return;

        const loadPreTest = async () => {
            try {
                setLoading(true);

                // 1. Ambil detail course dulu
                const courseDetail = await fetchCourseDetail(slug);

                if (!courseDetail?.course_test_id) {
                    setError("Course test id tidak ditemukan.");
                    return;
                }

                // 2. Ambil pretest pakai id
                const data = await fetchPreTest(`${courseDetail.course_test_id}?page=1`);
                setPretest(data);

            } catch (error) {
                console.error("Gagal memuat data ujian:", error);
                setError("Gagal memuat data ujian.");
            } finally {
                setLoading(false);
            }
        };

        loadPreTest();
    }, [slug]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            // Kalau user refresh tab → simpan agar tidak kehilangan waktu
            localStorage.setItem("pretest_refresh_flag", "true");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            const refreshFlag = localStorage.getItem("pretest_refresh_flag");

            if (!refreshFlag) {
                // Kalau user keluar dari fitur (navigasi route), hapus semua data pretest
                localStorage.removeItem("pretest_answers");
                localStorage.removeItem("pretest_timeLeft");
            }

            // Bersihkan flag supaya tidak numpuk
            localStorage.removeItem("pretest_refresh_flag");
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl font-semibold text-gray-700">Memuat ujian...</p>
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

    if (!pretest) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl font-semibold text-gray-700">Data ujian tidak ditemukan.</p>
            </div>
        );
    }

    const totalQuestions = pretest.course_test.total_question;
    const currentPage = pretest?.paginate?.current_page || 1;
    const lastPage = pretest?.paginate?.last_page || 1;
    const answeredCount = pretest.paginate?.current_page || 1;
    const question: CourseData = pretest.data[0];

    // handler pilih jawaban
    const handleAnswer = (value: string, pageNumber: number) => {
        setAnswers((prev) => {
            const updated = {
                ...prev,
                [String(pageNumber)]: value,
            };
            localStorage.setItem("pretest_answers", JSON.stringify(updated));
            return updated;
        });
    };


    const handlePageChange = async (page: number) => {
        if (!slug) return;
        try {
            setLoading(true);
            const courseDetail = await fetchCourseDetail(slug);

            if (!courseDetail?.course_test_id) return;

            const data = await fetchPreTest(`${courseDetail.course_test_id}?page=${page}`);
            setPretest(data);
        } catch (error) {
            console.error("Gagal pindah soal:", error);
        } finally {
            setLoading(false);
        }
    };


    const handlerPageSubmit = async () => {
        if (!slug || !pretest?.user_quiz?.id) return;
        const lastPage = pretest.paginate?.last_page || 1;
        const orderedAnswers: string[] = [];

        for (let i = 1; i <= lastPage; i++) {
            orderedAnswers.push(answer[i] || "null");
        }

        const allAnswered = orderedAnswers.every((a) => a !== "null");
        if (!allAnswered) {

            setShowConfirm(false);
            setTimeout(() => setShowIncomplete(true), 200);
            return;
        }

        try {
            const result = await submitPreTest(pretest.user_quiz.id, orderedAnswers);
            if (result?.success) {
                localStorage.removeItem("pretest_answers");
                localStorage.removeItem("pretest_timeLeft");
                const testResult = await fetchPreTestResult(pretest.user_quiz.id);
                console.log("Submit dengan ID:", pretest.user_quiz.id);


                navigate(`/course/pre-tes/exam/results/${pretest.user_quiz.id}`, {
                    state: { testResult },
                });
            }
        } catch (err) {
            console.error("Gagal submit:", err);
            alert("Gagal submit jawaban!");
        }
    };


    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <HeaderPretes pretest={pretest} />

            {/* Main Content */}
            <div className="2xl:max-w-6xl xl:max-w-5xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-md mx-auto mt-8">
                {/* Card Intro */}
                <div className="relative min-h-5 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow p-6 mb-6 flex justify-between">
                    <div className="text-left px-5 mt-1">
                        <h2 className="text-xl font-bold text-white">
                            {answeredCount} dari {totalQuestions} soal
                        </h2>
                    </div>
                    <div className="text-left px-5">
                        <p className="text-purple-700 bg-white py-2 px-4 rounded-lg font-semibold">{formatTime(timeLeft)} Sisa waktu</p>
                    </div>
                </div>

                {/* Card Exam */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-20">
                    {/* Kolom kiri (Soal Ujian) */}
                    <div className="lg:col-span-3 bg-white rounded-lg shadow p-8 flex flex-col justify-between h-full">
                        <div className="flex items-start gap-2 mb-4">
                            <span className="text-gray-800 font-semibold">{currentPage}.</span>
                            <div
                                className="text-gray-800 font-semibold leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: question.question }}
                            />
                        </div>


                        {/* Opsi Jawaban */}
                        <div className="space-y-5 md-5 px-5 mb-5">
                            {["option_a", "option_b", "option_c", "option_d", "option_e"].map(
                                (key) => (
                                    <label
                                        key={key}
                                        className="flex items-center space-x-3 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name={`q-${question.id}`}
                                            value={key}
                                            onChange={() => handleAnswer(key, currentPage)}
                                            checked={answer[currentPage] === key}

                                            className="w-5 h-5 accent-purple-600"
                                        />
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: question[key as keyof CourseData] as string,
                                            }}
                                        />
                                    </label>
                                )
                            )}
                        </div>

                        {/* Navigasi */}
                        <div className="flex justify-between mt-auto pt-6 sticky border-t border-gray-200">
                            {/* Tombol Kembali hanya muncul mulai dari soal nomor 2 */}
                            {currentPage > 1 && (
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                                >
                                    ← Kembali
                                </button>
                            )}

                            {/* Spacer agar tombol Selanjutnya tetap di kanan */}
                            <div className="flex-1" />

                            {/* Tombol Selanjutnya hanya muncul jika belum di halaman terakhir */}
                            {currentPage < lastPage && (
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                                >
                                    Selanjutnya →
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Kolom kanan (Sidebar) */}
                    <div className="bg-white rounded-lg shadow p-8 flex flex-col justify-between self-start">
                        <div>
                            <h3 className="text-lg text-start font-semibold text-gray-800 mb-3">Soal Ujian</h3>

                            {/* Nomor soal */}
                            <div className="grid grid-cols-7 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-10 2xl:gap-2 xl:gap-2 lg:gap-3 mb-6">
                                {Array.from({ length: totalQuestions }).map((_, i) => {
                                    const pageNumber = i + 1;
                                    const isActive = currentPage === pageNumber;
                                    const isAnswered = answer[pageNumber] !== undefined;

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => handlePageChange(pageNumber)}
                                            className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 font-semibold
                                                        ${isActive
                                                    ? "bg-purple-700 text-white border-purple-700"
                                                    : isAnswered
                                                        ? "bg-purple-300 text-white border-purple-700"
                                                        : "text-purple-700 border-purple-700 hover:text-white hover:bg-purple-700"
                                                }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                })}

                            </div>
                            <div>
                                <p className="text-sm text-start text-gray-600 mb-5">
                                    Anda bisa menyelesaikan ujian ketika waktu ujian sisa 5 menit
                                </p>
                            </div>
                        </div>

                        {/* Tombol selesai ujian */}
                        <button
                            onClick={() => setShowConfirm(true)}
                            className="w-full py-2 rounded-lg text-white bg-yellow-400 shadow-[4px_4px_0px_0px_#0B1367] font-semibold hover:shadow-none active:translate-y-0.5 transition-all duration-200 ease-out">
                            Selesai Pre Tes
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal konfirmasi waktu habis */}
            <AnimatePresence>
                {showTimeUp && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-lg p-8 text-center shadow-xl w-96"
                        >
                            <div className="text-orange-500 text-5xl mb-4">⚠️</div>
                            <h2 className="text-2xl font-bold mb-2">Waktu Habis</h2>
                            <p className="text-gray-600 mb-6">Maaf, waktu mengerjakan pre-test telah berakhir.</p>
                            <button
                                onClick={() => navigate(`/course/${slug}`)}
                                className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                            >
                                OK
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal: belum semua dijawab */}
            <AnimatePresence>
                {showIncomplete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-lg p-8 text-center shadow-xl w-96"
                        >
                            <div className="text-orange-500 text-5xl mb-4">⚠️</div>
                            <h2 className="text-2xl font-bold mb-2">Perhatian!</h2>
                            <p className="text-gray-600 mb-6">
                                Anda harus menjawab semua soal terlebih dahulu sebelum mengirim.
                            </p>
                            <button
                                onClick={() => setShowIncomplete(false)}
                                className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                            >
                                OK
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Konfirmasi */}
            <AnimatePresence>
                {showConfirm && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50"
                    >
                        <motion.div
                            key="modal"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="bg-white rounded-lg shadow-lg p-6 w-96 text-center"
                        >
                            <h2 className="text-lg font-semibold mb-4">Konfirmasi</h2>
                            <p className="mb-6">Apakah kamu yakin ingin menyelesaikan pre tes?</p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                                >
                                    No
                                </button>
                                <button
                                    onClick={() => {
                                        setShowConfirm(false);
                                        setTimeout(() => {
                                            handlerPageSubmit();
                                        }, 250);
                                    }}
                                    className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                                >
                                    Yes
                                </button>

                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Exam;