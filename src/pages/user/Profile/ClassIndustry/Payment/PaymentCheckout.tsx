import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@components/public/auth/DashboardLayout';
import { PaymentButton, PaymentHeader, PaymentMethodSection, PaymentSummary } from '@components/payment/Index';
import { convenienceStores, createTestTransaction, eWallets, feeService, orderAmount, totalAmount, virtualAccounts, type PaymentMethod } from '@/data/paymentDummy';

type OpenSection = 'va' | 'ewallet' | 'minimarket' | null;

const PaymentCheckout = () => {
    const navigate = useNavigate();

    // State untuk mengelola bagian yang terbuka
    const [openSection, setOpenSection] = useState<OpenSection>('ewallet');
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);

    const handleBuyNow = () => {
        if (!selectedPayment) {
            alert('Pilih metode pembayaran terlebih dahulu!');
            return;
        }

        // gunakan helper terpusat untuk generate reference + simpan ke localStorage
        const reference = createTestTransaction(selectedPayment);

        // Redirect ke halaman detail
        navigate(`/dashboard/user/payment-detail/${reference}`);
    };

    const handleBack = () => {
        navigate(-1); // Kembali ke halaman sebelumnya
    };

    const toggleSection = (section: OpenSection) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <DashboardLayout slug="payment">
            <div className="min-h-screen bg-gray-50 dark:bg-[#141427] py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header dengan judul dan tombol kembali */}
                    <PaymentHeader onBack={handleBack} />

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* Bagian Kiri - Pilihan Metode Pembayaran */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="bg-white dark:bg-[#0D0D1A] shadow rounded-xl p-6 border border-gray-300 dark:border-white transition-colors duration-500">

                                {/* E-Wallet Section */}
                                <PaymentMethodSection
                                    title="E-Wallet"
                                    description="Pembayaran lewat aplikasi dompet digital"
                                    methods={eWallets}
                                    isOpen={openSection === 'ewallet'}
                                    selectedPayment={selectedPayment}
                                    onToggle={() => toggleSection('ewallet')}
                                    onSelectPayment={setSelectedPayment}
                                    hasBorderBottom={true}
                                    sectionType={'ewallet'}
                                />

                                {/* Virtual Account Section */}
                                <PaymentMethodSection
                                    title="Virtual Account"
                                    description="Pembayaran terhubung langsung dengan akun bank kamu"
                                    methods={virtualAccounts}
                                    isOpen={openSection === 'va'}
                                    selectedPayment={selectedPayment}
                                    onToggle={() => toggleSection('va')}
                                    onSelectPayment={setSelectedPayment}
                                    hasBorderBottom={true}
                                    sectionType={'va'}
                                />

                                {/* Mini Market Section */}
                                <PaymentMethodSection
                                    title="Mini Market"
                                    description="Pembayaran bisa lewat mini market terdekat"
                                    methods={convenienceStores}
                                    isOpen={openSection === 'minimarket'}
                                    selectedPayment={selectedPayment}
                                    onToggle={() => toggleSection('minimarket')}
                                    onSelectPayment={setSelectedPayment}
                                    hasBorderBottom={false}
                                    sectionType={'minimarket'}
                                />

                            </div>
                        </div>

                        {/* Bagian Kanan - Ringkasan Pembayaran */}
                        <div className="lg:col-span-2 space-y-6">
                            <PaymentSummary
                                orderAmount={orderAmount}
                                feeService={feeService}
                                totalAmount={totalAmount}
                                selectedPayment={selectedPayment}
                            />

                            <PaymentButton onClick={handleBuyNow} />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PaymentCheckout;
