import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import defaultimg from "../../../assets/Default-Img.png";

import type { DetailCourse } from "../../../features/course/_course";
import { fetchCourseDetail } from "../../../features/course/_service/course_service";
import { checkVoucherCode } from "../../../features/coursevoucher/_service/_coursevoucher_service";
import { getPaymentChannels } from "../../../features/Payment/_service/payment-channel_service";
import type { PaymentChannelResponse, PaymentChannel } from "../../../features/Payment/payment-channel";
import { createTransaction } from "../../../features/transaction/_service/_transaction-create_service";

const MySwal = withReactContent(Swal);

const TransactionPage: React.FC = () => {
    const navigate = useNavigate();
    const { slug } = useParams<{ slug: string }>();

    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState<DetailCourse | null>(null);
    const [voucher, setVoucher] = useState("");
    const [orderAmount, setOrderAmount] = useState(0);
    const [feeService, setFeeService] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [discountAmount, setDiscountAmount] = useState(0);

    const [virtualAccounts, setVirtualAccounts] = useState<PaymentChannel[]>([]);
    const [eWallets, setEWallets] = useState<PaymentChannel[]>([]);
    const [convenienceStores, setConvenienceStores] = useState<PaymentChannel[]>([]);

    // state tambahan
    const [selectedPayment, setSelectedPayment] = useState<any | null>(null);

    useEffect(() => {
        const loadCourse = async () => {
            try {
                setLoading(true);
                if (!slug) return;

                const data = await fetchCourseDetail(slug);
                if (!data) return;

                setCourse(data);
                const price = data.promotional_price ?? data.price;
                setOrderAmount(price);
                setFeeService(0);
                setTotalAmount(price);
            } catch (error) {
                console.error("Gagal mengambil detail course:", error);
            } finally {
                setLoading(false);
            }
        };

        const loadPaymentChannels = async () => {
            try {
                const result: PaymentChannelResponse = await getPaymentChannels();
                setVirtualAccounts(result.data.virtual_account || []);
                setEWallets(result.data.e_wallet || []);
                setConvenienceStores(result.data.convenience_store || []);
            } catch (error) {
                console.error("Gagal fetch payment channels:", error);
            }
        };

        loadCourse();
        loadPaymentChannels();
    }, [slug]);

    // fungsi hitung fee dari API
    const calculateFee = (payment: any, amount: number) => {
        if (!payment) return 0;

        const flat = payment.fee_customer?.flat ?? 0;
        const percent = payment.fee_customer?.percent ?? 0;

        let fee = flat + (amount * percent) / 100;

        if (payment.minimum_fee && fee < payment.minimum_fee) {
            fee = payment.minimum_fee;
        }
        if (payment.maximum_fee && fee > payment.maximum_fee) {
            fee = payment.maximum_fee;
        }

        return Math.round(fee);
    };

    useEffect(() => {
        if (!orderAmount) return;

        const fee = selectedPayment ? calculateFee(selectedPayment, orderAmount) : 0;
        setFeeService(fee);
        setTotalAmount(orderAmount + fee - discountAmount);
    }, [orderAmount, selectedPayment, discountAmount]);

    const handleVoucherCheck = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!course) return;

        if (!voucher.trim()) {
            MySwal.fire({
                title: "Oops!",
                text: "Silakan masukkan kode voucher.",
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
            setLoading(true);
            const result = await checkVoucherCode(course.slug, voucher);

            if (result.valid) {
                const discount = result.discount ?? 0;
                const potongan = Math.floor((orderAmount * discount) / 100);
                const totalBaru = orderAmount - potongan + feeService;

                setDiscountAmount(potongan);
                setTotalAmount(totalBaru);

                MySwal.fire({
                    title: "Berhasil!",
                    text: `Voucher berhasil digunakan. Hemat Rp ${potongan.toLocaleString(
                        "id-ID"
                    )} (${discount}%).`,
                    icon: "success",
                    confirmButtonText: "OK",
                    buttonsStyling: false,
                    customClass: {
                        popup: "my-swal-popup",
                        title: "my-swal-title",
                        htmlContainer: "my-swal-text",
                        confirmButton: "my-swal-confirm",
                    },
                });
            } else {
                setDiscountAmount(0);
                setTotalAmount(orderAmount + feeService);

                MySwal.fire({
                    title: "Oops!",
                    text: result.reason || "Voucher tidak valid.",
                    icon: "error",
                    confirmButtonText: "Coba Lagi",
                    buttonsStyling: false,
                    customClass: {
                        popup: "my-swal-popup",
                        title: "my-swal-title",
                        htmlContainer: "my-swal-text",
                        confirmButton: "my-swal-confirm",

                    },
                });
            }
        } catch (err) {
            console.error("Voucher check error:", err);
            MySwal.fire({
                title: "Error!",
                text: "Terjadi kesalahan saat memeriksa voucher.",
                icon: "error",
                confirmButtonText: "OK",
                buttonsStyling: false,
                customClass: {
                    popup: "my-swal-popup",
                    title: "my-swal-title",
                    htmlContainer: "my-swal-text",
                    confirmButton: "my-swal-confirm",

                },
            });
        } finally {
            setLoading(false);
        }
    };

    const handleBuyNow = async () => {
        if (!course) return;

        if (!selectedPayment) {
            MySwal.fire({
                title: "Oops!",
                text: "Silakan pilih metode pembayaran terlebih dahulu.",
                icon: "warning",
                width: "420px",
                confirmButtonText: "OK",
                buttonsStyling: false,
                customClass: {
                    popup: "my-swal-popup",
                    title: "my-swal-title",
                    icon: "my-swal-icon",
                    htmlContainer: "my-swal-text",
                    confirmButton: "my-swal-confirm",
                    cancelButton: "my-swal-cancel",
                },
            });
            return;
        }

        MySwal.fire({
            title: "Apakah Anda yakin ingin membeli kursus ini?",
            text: course.title,
            icon: "warning",
            width: "420px",
            customClass: {
                popup: "my-swal-popup",
                title: "my-swal-title",
                icon: "my-swal-icon",
                htmlContainer: "my-swal-text",
                confirmButton: "my-swal-confirm",
                cancelButton: "my-swal-cancel",
            },
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Batal",
            buttonsStyling: false,
        }).then(async (result) => {
            if (!result.isConfirmed) return;

            try {
                const res = await createTransaction(
                    "course",
                    course.id,
                    totalAmount,
                    selectedPayment.code,
                    voucher || ""
                );

                if (res?.success && res.meta?.code === 200) {
                    const reference = res.data.transaction.reference;
                    navigate(`/transaction/detail/${reference}`, { state: res.data });
                } else {
                    MySwal.fire({
                        title: "Gagal",
                        text: res?.meta?.message || "Gagal membuat transaksi.",
                        icon: "error",
                        width: "420px",
                        confirmButtonText: "OK",
                        buttonsStyling: false,
                        customClass: {
                            popup: "my-swal-popup",
                            title: "my-swal-title",
                            icon: "my-swal-icon",
                            htmlContainer: "my-swal-text",
                            confirmButton: "my-swal-confirm",
                            cancelButton: "my-swal-cancel",
                        },
                    });

                }
            } catch (err) {
                console.error("handleBuyNow error:", err);
                MySwal.fire({
                    title: "Error",
                    text: "Terjadi kesalahan saat memproses transaksi.",
                    icon: "error",
                    width: "420px",
                    confirmButtonText: "OK",
                    buttonsStyling: false,
                    customClass: {
                        popup: "my-swal-popup",
                        title: "my-swal-title",
                        icon: "my-swal-icon",
                        htmlContainer: "my-swal-text",
                        confirmButton: "my-swal-confirm",
                        cancelButton: "my-swal-cancel",
                    },
                });

            }
        });
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto p-4 px-5 md:px-25 grid grid-cols-1 lg:grid-cols-3 gap-3 text-left">
                {/* Course Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white shadow rounded-xl p-6 flex flex-col gap-4 text-left border border-gray-300 transition-all duration-500 hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.25)]">
                        {loading ? (
                            <div className="animate-pulse space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-45 md:h-45 bg-gray-300 rounded-lg"></div>
                                    <div className="flex-1 space-y-3">
                                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                                </div>
                            </div>
                        ) : (
                            course && (
                                <>
                                    <div className="flex flex-col sm:flex-row items-start gap-4">
                                        <Link to={`/course/${course.slug}`}>
                                            <div className="relative w-full sm:max-w-[12rem] md:max-w-[14rem] aspect-[3/2] rounded-lg overflow-hidden bg-gray-100 cursor-pointer">
                                                <img
                                                    src={course.photo || defaultimg}
                                                    alt={course.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </Link>

                                        <div className="text-left -pl-1 sm:pl-6">
                                            <span className="text-xs bg-gray-100 text-black px-2 py-1 rounded-full transition-colors duration-300 hover:bg-purple-600 hover:text-white">
                                                {typeof course.sub_category === "string"
                                                    ? course.sub_category
                                                    : course.sub_category?.name}
                                            </span>
                                            <h2 className="text-sm font-semibold mt-2">{course.title}</h2>
                                            <p className="text-gray-500 text-xs mt-2 mb-2">By GetSkill</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <p className="text-purple-600 font-semibold text-xs">
                                                    Rp {orderAmount.toLocaleString("id-ID")}
                                                </p>
                                                <span className="text-gray-500 text-xs">
                                                    ({parseFloat(course.rating).toFixed(1)} Reviews)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-justify border-t border-gray-300 pt-4">
                                        <h3 className="font-bold text-gray-800 text-base mb-5">Deskripsi:</h3>
                                        <div
                                            className="text-gray-600 text-sm sm:text-xs leading-7 space-y-4 [&_p]:mb-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:mb-1 [&_strong]:font-semibold [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-gray-800 [&_h3]:mb-3"
                                            dangerouslySetInnerHTML={{ __html: course.description }}
                                        />
                                    </div>
                                </>
                            )
                        )}
                    </div>
                </div>

                {/* Payment Section */}
                <div className="lg:col-span-1 space-y-4 text-left">
                    {loading ? (
                        <>
                            <div className="bg-white shadow rounded-xl p-4 border border-gray-300 animate-pulse space-y-4">
                                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                                <div className="space-y-3">
                                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                                </div>
                            </div>

                            <div className="bg-white shadow rounded-xl p-6 border border-gray-300 animate-pulse space-y-4">
                                <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                                <div className="h-10 bg-gray-200 rounded w-full"></div>
                                <div className="space-y-3 pt-4">
                                    <div className="flex justify-between">
                                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    </div>
                                </div>
                                <div className="h-12 bg-gray-200 rounded w-full mt-6"></div>
                            </div>
                        </>
                    ) : (
                        <div className="lg:col-span-1 space-y-3 text-left">
                            <div className="bg-white shadow rounded-xl p-4 border border-gray-300">
                                <h3 className="text-lg font-semibold mb-4 ">Pilih Metode Pembayaran</h3>

                                {/* Virtual Account */}
                                <div className="border-b border-gray-200">
                                    <button
                                        onClick={() => setOpenSection(openSection === "va" ? null : "va")}
                                        className={`w-full flex justify-between items-center px-3 py-2 text-left font-medium text-sm transition ${openSection === "va"
                                            ? "bg-blue-50 text-blue-700"
                                            : "bg-white hover:bg-gray-50 hover:text-yellow-500"
                                            }`}
                                    >
                                        <span>Virtual Account</span>
                                        <ChevronDown
                                            className={`w-5 h-5 transition-transform duration-300 ${openSection === "va" ? "rotate-180" : "rotate-0"
                                                }`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {openSection === "va" && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-3 space-y-3 text-xs text-gray-600 border-t border-gray-200">
                                                    <p>Pembayaran terhubung langsung dengan akun bank kamu</p>
                                                    <div className="flex items-center gap-6 flex-wrap">
                                                        {virtualAccounts.map((method) => (
                                                            <label
                                                                key={method.code}
                                                                className="flex flex-col items-center gap-1 cursor-pointer"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="va"
                                                                    className="accent-blue-600"
                                                                    checked={selectedPayment?.code === method.code}
                                                                    onChange={() => setSelectedPayment(method)}
                                                                />
                                                                <img
                                                                    src={method.icon_url}
                                                                    alt={method.name}
                                                                    className="w-12 h-12 object-contain"
                                                                />
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* E-Wallet */}
                                <div className="border-b border-gray-200">
                                    <button
                                        onClick={() => setOpenSection(openSection === "ewallet" ? null : "ewallet")}
                                        className={`w-full flex justify-between items-center px-3 py-2 text-left font-medium text-sm transition ${openSection === "ewallet"
                                            ? "bg-blue-50 text-blue-700"
                                            : "bg-white hover:bg-gray-50 hover:text-yellow-500"
                                            }`}
                                    >
                                        <span>E-Wallet</span>
                                        <ChevronDown
                                            className={`w-5 h-5 transition-transform duration-300 ${openSection === "ewallet" ? "rotate-180" : "rotate-0"
                                                }`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {openSection === "ewallet" && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-3 space-y-3 text-xs text-gray-600 border-t border-gray-200">
                                                    <p>Pembayaran lewat aplikasi dompet digital</p>
                                                    <div className="flex items-center gap-6 flex-wrap">
                                                        {eWallets.map((method) => (
                                                            <label
                                                                key={method.code}
                                                                className="flex flex-col items-center gap-1 cursor-pointer"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="ewallet"
                                                                    className="accent-blue-600"
                                                                    checked={selectedPayment?.code === method.code}
                                                                    onChange={() => setSelectedPayment(method)}
                                                                />
                                                                <img
                                                                    src={method.icon_url}
                                                                    alt={method.name}
                                                                    className="w-12 h-12 object-contain"
                                                                />
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Mini Market */}
                                <div>
                                    <button
                                        onClick={() =>
                                            setOpenSection(openSection === "minimarket" ? null : "minimarket")
                                        }
                                        className={`w-full flex justify-between items-center px-3 py-2 text-left font-medium text-sm transition ${openSection === "minimarket"
                                            ? "bg-blue-50 text-blue-700"
                                            : "bg-white hover:bg-gray-50 hover:text-yellow-500"
                                            }`}
                                    >
                                        <span>Mini Market</span>
                                        <ChevronDown
                                            className={`w-5 h-5 transition-transform duration-300 ${openSection === "minimarket" ? "rotate-180" : "rotate-0"
                                                }`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {openSection === "minimarket" && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-3 space-y-3 text-xs text-gray-600 border-t border-gray-200">
                                                    <p>Pembayaran bisa lewat mini market terdekat</p>
                                                    <div className="flex items-center gap-6 flex-wrap">
                                                        {convenienceStores.map((method) => (
                                                            <label
                                                                key={method.code}
                                                                className="flex flex-col items-center gap-1 cursor-pointer"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="minimarket"
                                                                    className="accent-blue-600"
                                                                    checked={selectedPayment?.code === method.code}
                                                                    onChange={() => setSelectedPayment(method)}
                                                                />
                                                                <img
                                                                    src={method.icon_url}
                                                                    alt={method.name}
                                                                    className="w-12 h-12 object-contain"
                                                                />
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="bg-white shadow rounded-xl p-4 text-left border border-gray-300">
                                <h3 className="text-lg font-semibold mb-5">Pembayaran</h3>
                                {/* form voucher */}
                                <form onSubmit={handleVoucherCheck} className="flex gap-2 mb-6">
                                    <input
                                        type="text"
                                        className="flex-1 border border-gray-300 rounded-lg -px-2 pl-2 py-2 text-sm
                                            focus:outline-none focus:border-2 focus:border-purple-500
                                            hover:border-2 hover:border-purple-500
                                            transition-all duration-100"
                                        placeholder="Kode Voucher"
                                        value={voucher}
                                        onChange={(e) => setVoucher(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium text-sm py-1.5 px-3
                                        rounded-md flex items-center justify-center gap-2 border border-black
                                        transition-all duration-500 ease-in-out shadow-[2px_2px_0px_rgba(0,0,0,0.6)]
                                        hover:bg-yellow-400 hover:text-black hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)]
                                        active:translate-y-0.5"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                        <span className="relative z-10 text-[14px] group-hover:text-black transition-colors duration-300">
                                            Cek
                                        </span>
                                    </button>

                                </form>

                                {/* Ringkasan Pembayaran */}
                                <div className="border-t border-gray-300 pt-7 mt-7 space-y-4 text-left text-gray-500 text-sm">
                                    <AnimatePresence>
                                        {selectedPayment && (
                                            <motion.div
                                                key="payment-method"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="grid grid-cols-[150px_1fr] gap-y-1 text-sm text-gray-500">
                                                    <span className="whitespace-nowrap">Metode Pembayaran</span>
                                                    <span className="font-medium text-gray-500 text-right break-words">
                                                        {selectedPayment.name}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="flex justify-between">
                                        <span>Harga Pesanan</span>
                                        <span>Rp {orderAmount.toLocaleString("id-ID")}</span>
                                    </div>

                                    {discountAmount > 0 && (
                                        <div className="flex justify-between ">
                                            <span>Diskon voucher</span>
                                            <span>- Rp {discountAmount.toLocaleString("id-ID")}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between">
                                        <span>Biaya Layanan</span>
                                        <span>Rp {feeService.toLocaleString("id-ID")}</span>
                                    </div>

                                    <div className="border-t border-gray-300 pt-7 mt-10 flex justify-between font-semibold text-gray-500">
                                        <span>Total Pesanan</span>
                                        <span className="text-base text-gray-500">
                                            Rp {totalAmount.toLocaleString("id-ID")}
                                        </span>
                                    </div>

                                    {discountAmount > 0 && (
                                        <div className="flex justify-end gap-2 text-purple-600 font-medium text-sm">
                                            <span>Hemat</span>
                                            <span>Rp {discountAmount.toLocaleString("id-ID")}</span>
                                        </div>
                                    )}

                                </div>

                                <button
                                    onClick={handleBuyNow}
                                    className="my-6 w-full relative group overflow-hidden text-black font-sans font-semibold text-sm py-3 px-4
                                        rounded-lg flex items-center justify-center gap-2 border border-black transition-all duration-500
                                        ease-in-out shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)]
                                        active:translate-y-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:text-white"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                    <span className="relative z-10 text-[14px]">
                                        Beli Sekarang
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionPage;
