import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import usePurchaseStore from "@lib/stores/user/purchase/usePurchaseStore";
import { CourseSection, LoadingSkeleton, PaymentMethodSelector, PaymentSummary } from "@components/transaction/Index";

const MySwal = withReactContent(Swal);

const Transaction: React.FC = () => {
    const navigate = useNavigate();
    const { slug } = useParams<{ slug: string }>();

    // Store Imports
    const {
        course,
        loading,
        voucher,
        orderAmount,
        feeService,
        totalAmount,
        openSection,
        discountAmount,
        virtualAccounts,
        eWallets,
        convenienceStores,
        selectedPayment,

        loadCourse,
        loadPaymentChannels,
        setVoucher,
        checkVoucher,
        setSelectedPayment,
        setOpenSection,
        createOrder,
    } = usePurchaseStore((s) => ({
        course: s.course,
        loading: s.loading,
        voucher: s.voucher,
        orderAmount: s.orderAmount,
        feeService: s.feeService,
        totalAmount: s.totalAmount,
        openSection: s.openSection,
        discountAmount: s.discountAmount,
        virtualAccounts: s.virtualAccounts,
        eWallets: s.eWallets,
        convenienceStores: s.convenienceStores,
        selectedPayment: s.selectedPayment,

        loadCourse: s.loadCourse,
        loadPaymentChannels: s.loadPaymentChannels,
        setVoucher: s.setVoucher,
        checkVoucher: s.checkVoucher,
        setSelectedPayment: s.setSelectedPayment,
        setOpenSection: s.setOpenSection,
        createOrder: s.createOrder,
    }));

    useEffect(() => {
        if (!slug) return;
        loadCourse(slug);
        loadPaymentChannels();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    const handleVoucherCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!course) return;
        if (!voucher?.trim()) {
            await MySwal.fire({
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
            const result = await checkVoucher();
            if (result.valid) {
                const discountPercent = result.discount ?? 0;
                const potongan = Math.floor((orderAmount * discountPercent) / 100);
                await MySwal.fire({
                    title: "Berhasil!",
                    text: `Voucher berhasil digunakan. Hemat Rp ${potongan.toLocaleString("id-ID")} (${discountPercent}%).`,
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
                await MySwal.fire({
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
            await MySwal.fire({
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
        }
    };

    const handleBuyNow = async () => {
        if (!course) return;
        if (!selectedPayment) {
            await MySwal.fire({
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

        const confirm = await MySwal.fire({
            title: "Apakah Anda yakin ingin membeli kursus ini?",
            text: course?.title,
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
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await createOrder();
            if (res?.success && res.meta?.code === 200) {
                const reference = res.data.transaction.reference;
                navigate(`/transaction/detail/${reference}`, { state: res.data });
            } else {
                await MySwal.fire({
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
            await MySwal.fire({
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
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#141427] transition-colors duration-500">
            <div className="container mx-auto p-4 px-5 md:px-25 grid grid-cols-1 lg:grid-cols-3 gap-3 text-left">
                {/* Course Section */}
                <CourseSection loading={loading} course={course} orderAmount={orderAmount} />

                {/* Payment Section */}
                <div className="lg:col-span-1 space-y-4 text-left">
                    {loading ? (
                        <LoadingSkeleton />
                    ) : (
                        <>
                            <PaymentMethodSelector
                                openSection={openSection}
                                setOpenSection={setOpenSection}
                                virtualAccounts={virtualAccounts}
                                eWallets={eWallets}
                                convenienceStores={convenienceStores}
                                selectedPayment={selectedPayment}
                                setSelectedPayment={setSelectedPayment}
                            />

                            <PaymentSummary
                                voucher={voucher}
                                setVoucher={setVoucher}
                                handleVoucherCheck={handleVoucherCheck}
                                selectedPayment={selectedPayment}
                                orderAmount={orderAmount}
                                discountAmount={discountAmount}
                                feeService={feeService}
                                totalAmount={totalAmount}
                                handleBuyNow={handleBuyNow}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Transaction;