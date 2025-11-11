import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPreTest, fetchCourseDetail, submitPreTest, fetchPreTestResult } from "../../../features/course/_service/course_service";
import type { DataWrapper, CourseData } from "../../../features/course/_course";
import HeaderPretes from "../../../components/course/PreTes/HeaderPretes";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Exam = () => {
    const navigate = useNavigate();
    const { slug } = useParams<{ slug: string }>();

    const [pretest, setPretest] = useState<DataWrapper | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [answer, setAnswers] = useState<Record<string, string>>({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [isTimerStarted, setIsTimerStarted] = useState(false);

    const MySwal = withReactContent(Swal);

    const handlerPageSubmit = useCallback(async () => {
        if (!slug || !pretest?.user_quiz?.id) return;

        const lastPage = pretest.paginate?.last_page || 1;
        const orderedAnswers: string[] = [];

        for (let i = 1; i <= lastPage; i++) {
            const savedAnswer = localStorage.getItem(`answer_${i}`);
            orderedAnswers.push(savedAnswer || "null");
        }

        const allAnswered = orderedAnswers.every((a) => a !== "null");
        if (!allAnswered) {
            await MySwal.fire({
                title: "Perhatian!",
                text: "Anda harus menjawab semua soal terlebih dahulu sebelum mengirim.",
                icon: "warning",
                confirmButtonText: "OK",
                buttonsStyling: false,
                customClass: {
                    popup: "my-swal-popup",
                    title: "my-swal-title",
                    htmlContainer: "my-swal-text",
                    confirmButton: "my-swal-confirm",
                    icon: "my-swal-icon swal2-warning",
                },
            });
            return;
        }

        try {
            const result = await submitPreTest(pretest.user_quiz.id, orderedAnswers);
            if (result?.success) {
                for (let i = 1; i <= lastPage; i++) {
                    localStorage.removeItem(`answer_${i}`);
                }
                localStorage.removeItem("pretest_timeLeft");

                const testResult = await fetchPreTestResult(pretest.user_quiz.id);
                navigate(`/course/pre-tes/exam/results/${pretest.user_quiz.id}`, {
                    state: { testResult },
                });
            }
        } catch (err) {
            console.error("Gagal submit:", err);
            alert("Gagal submit jawaban!");
        }
    }, [slug, pretest, MySwal, navigate]);


    // Waktu habis
    const handleTimeUpAlert = useCallback(() => {
        MySwal.fire({
            title: "Waktu Habis!",
            text: "Maaf, waktu mengerjakan pre-test telah berakhir.",
            icon: "warning",
            confirmButtonText: "OK",
            buttonsStyling: false,
            customClass: {
                popup: "my-swal-popup",
                title: "my-swal-title",
                htmlContainer: "my-swal-text",
                confirmButton: "my-swal-confirm",
                icon: "my-swal-icon swal2-warning",
            },
        }).then(() => {
            navigate(`/course/${slug}`);
        });
    }, [MySwal, navigate, slug]);

    // Konfirmasi selesai pre tes
    const handleShowConfirm = useCallback(() => {
        MySwal.fire({
            title: "Apakah kamu yakin?",
            text: "Pastikan semua soal sudah terjawab sebelum disubmit.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Kirim!",
            cancelButtonText: "Batal",
            reverseButtons: true,
            buttonsStyling: false,
            customClass: {
                popup: "my-swal-popup",
                title: "my-swal-title",
                htmlContainer: "my-swal-text",
                confirmButton: "my-swal-confirm",
                cancelButton: "my-swal-cancel",
                icon: "my-swal-icon swal2-warning",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                handlerPageSubmit();
            }
        });
    }, [MySwal, handlerPageSubmit]);

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
            localStorage.removeItem("pretest_answers");
            localStorage.removeItem("pretest_timeLeft");
            setIsTimerStarted(false);
            handleTimeUpAlert();
        }
    }, [timeLeft, isTimerStarted, handleTimeUpAlert]);

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
            localStorage.setItem("pretest_refresh_flag", "true");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            const refreshFlag = localStorage.getItem("pretest_refresh_flag");

            if (!refreshFlag) {
                localStorage.removeItem("pretest_answers");
                localStorage.removeItem("pretest_timeLeft");
            }

            localStorage.removeItem("pretest_refresh_flag");
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:bg-[#141427]">
                <p className="text-xl font-semibold text-gray-700 dark:text-white">Memuat ujian...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:bg-[#141427]">
                <p className="text-xl font-semibold text-red-500">{error}</p>
            </div>
        );
    }

    if (!pretest) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:bg-[#141427]">
                <p className="text-xl font-semibold text-gray-700 dark:text-white">Data ujian tidak ditemukan.</p>
            </div>
        );
    }

    const totalQuestions = pretest.paginate?.last_page || 1;
    const currentPage = pretest?.paginate?.current_page || 1;
    const lastPage = pretest?.paginate?.last_page || 1;
    const answeredCount = pretest.paginate?.current_page || 1;
    const question: CourseData = pretest.data[0];

    // handler pilih jawaban
    const handleAnswer = (value: string, pageNumber: number) => {
        const newAnswers = {
            ...answer,
            [String(pageNumber)]: value,
        };

        setAnswers(newAnswers);
        localStorage.setItem("pretest_answers", JSON.stringify(newAnswers));
        localStorage.setItem(`answer_${pageNumber}`, value);
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

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#141427] transition-colors duration-500">
            {/* Header */}
            <HeaderPretes pretest={pretest} />

            {/* Main Content */}
            <div className="2xl:max-w-6xl xl:max-w-6xl lg:max-w-5xl md:max-w-2xl sm:max-w-xl max-w-sm mx-auto mt-8">
                {/* Card Intro */}
                <div className="relative min-h-5 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow p-6 mb-6 flex justify-between">
                    <div className="text-left px-5 mt-1">
                        <h2 className="text-sm 2xl:text-xl xl:text-xl lg:text-xl md:text-lg sm:text-sm font-bold text-white">
                            {answeredCount} Dikerjakan dari {totalQuestions} soal
                        </h2>
                    </div>
                    <div className="text-center px-5">
                        <p className="text-sm lg:text-lg md:text-md sm:text-sm text-purple-700 bg-white py-2 px-4 rounded-lg font-semibold">{formatTime(timeLeft)} Sisa waktu</p>
                    </div>
                </div>

                {/* Card Exam */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-20">
                    <div className="lg:col-span-3 space-y-6">
                        {/* Kolom kiri (Soal Ujian) */}
                        <div className="bg-white rounded-lg shadow p-8 flex flex-col dark:bg-[#0D0D1A] dark:border-2 dark:border-white">
                            <div className="flex items-start gap-2 mb-4">
                                <span className="text-gray-800 font-semibold dark:text-white">{currentPage}.</span>
                                <div
                                    className="text-gray-800 font-semibold leading-relaxed dark:text-white text-start"
                                    dangerouslySetInnerHTML={{ __html: question.question }}
                                />
                            </div>

                            {/* Opsi Jawaban */}
                            <div className="space-y-5 md-5 px-5 mb-5">
                                {["option_a", "option_b", "option_c", "option_d", "option_e"].map(
                                    (key) => (
                                        <label
                                            key={key}
                                            className="flex items-start space-x-3 cursor-pointer"
                                        >
                                            <input
                                                type="radio"
                                                name={`q-${question.id}`}
                                                value={key}
                                                onChange={() => handleAnswer(key, currentPage)}
                                                checked={answer[currentPage] === key}
                                                className={`mt-1 relative appearance-none aspect-square w-5 h-5
                                                rounded-full border-2 border-purple-600 cursor-pointer
                                                transition-all duration-200
                                                before:content-[''] before:absolute before:inset-[3px]
                                                before:w-3 before:rounded-full before:bg-transparent
                                                checked:before:bg-purple-600
                                                hover:shadow-[0_0_10px_2px_rgba(168,85,247,0.6)]
                                                dark:border-purple-500 dark:checked:before:bg-purple-600`}
                                            />
                                            <span
                                                className="text-start leading-relaxed"
                                                dangerouslySetInnerHTML={{
                                                    __html: question[key as keyof CourseData] as string,
                                                }}
                                            />
                                        </label>

                                    )
                                )}
                            </div>
                        </div>

                        {/* Navigasi */}
                        <div className="bg-white shadow p-3 flex justify-between dark:bg-purple-950 text-xs md:text-sm ">
                            {currentPage > 1 ? (
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className="px-4 py-2 rounded-lg border border-purple-600 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:text-white"
                                >
                                    ← Kembali
                                </button>
                            ) : (
                                <div></div>
                            )}

                            {currentPage < lastPage && (
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className="px-4 py-2 rounded-lg border border-purple-600 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:text-white"
                                >
                                    Selanjutnya →
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Kolom kanan (Sidebar) */}
                    <div className="bg-white rounded-lg shadow p-8 flex flex-col justify-between self-start dark:bg-[#0D0D1A] dark:border-2 dark:border-white">
                        <div>
                            <h3 className="text-lg text-start font-semibold text-gray-800 mb-3 dark:text-white">Soal Ujian</h3>

                            {/* Nomor soal */}
                            <div className="grid grid-cols-7 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5 mb-6">
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
                                                    ? "bg-purple-600 text-white border-yellow-400 dark:border-purple-100"
                                                    : isAnswered
                                                        ? "bg-purple-600 text-white border-purple-600"
                                                        : "text-purple-600 border-purple-600 hover:text-white hover:bg-purple-600"
                                                }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                })}

                            </div>
                            <div>
                                <p className="text-xs text-start text-gray-600 mb-5 dark:text-gray-300">
                                    Anda bisa menyelesaikan ujian ketika waktu ujian sisa 5 menit
                                </p>
                            </div>
                        </div>

                        {/* Tombol selesai ujian */}
                        <button
                            onClick={handleShowConfirm}
                            className="w-full py-2 rounded-lg text-white bg-yellow-400 hover:bg-purple-600 shadow-[4px_4px_0px_0px_#0B1367] font-semibold hover:shadow-none active:translate-y-0.5 transition-all duration-200 ease-out">
                            Selesai Pre Tes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Exam;