import jsPDF from "jspdf";
import Logo from "../assets/img/logo/get-skill/logoInvoice.png";
import watermark from "../assets/img/logo/get-skill/logoWatermark.png";
import type { TransactionDetail } from "../features/transactionDetail/transactionDetail";
import type { TransactionFullDetail } from "../features/transactionDetail/transactionFullDetail";

export const generateInvoicePDF = (transaction: TransactionDetail, fullTransaction: TransactionFullDetail) => {
    if (!transaction || !fullTransaction) return;

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [80, 150]
    });

    const margin = 5;
    const pageWidth = 80;
    const pageHeight = 150;
    const contentWidth = pageWidth - (margin * 2);
    let yPosition = 10;

    // Watermark
    try {
        doc.addImage(watermark, 'PNG', 5, 20, 20, 23, '', 'NONE', 0.3);
        doc.addImage(watermark, 'PNG', pageWidth / 2 - 10, pageHeight / 2 - 15, 20, 23, '', 'NONE', 0.3);
        doc.addImage(watermark, 'PNG', pageWidth - 25, pageHeight - 50, 20, 23, '', 'NONE', 0.3);
    } catch (error) {
        doc.setFontSize(24);
        doc.setTextColor(230, 230, 230);
        doc.setFont("helvetica", "bold");
        doc.saveGraphicsState();
        doc.setGState(new (doc as any).GState({ opacity: 0.3 }));
        doc.text("GETSKILL", 15, 30, { angle: 45 });
        doc.text("GETSKILL", pageWidth / 2, pageHeight / 2, { angle: 45, align: "center" });
        doc.text("GETSKILL", pageWidth - 15, pageHeight - 20, { angle: 45, align: "right" });
        doc.restoreGraphicsState();
    }

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);

    // Header dengan Logo GETSKILL
    try {
        // Tambahkan logo di sebelah kiri
        doc.addImage(Logo, 'PNG', margin, yPosition - 2, 34, 8);

        // Tambahkan teks "KUITANSI" di sebelah kanan
        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");
        doc.text("KUITANSI", pageWidth - margin, yPosition + 3, { align: "right" });
    } catch (error) {
        // Fallback jika logo gagal dimuat
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("GETSKILL KUITANSI", pageWidth / 2, yPosition, { align: "center" });
    }

    yPosition += 10;

    // Garis pemisah header
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.6);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 6;

    // INFORMASI TRANSAKSI - FORMAT KIRI-KANAN
    const leftColumnX = margin;
    const rightColumnX = pageWidth - margin;

    // Kode Transaksi - kiri: label, kanan: value
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Kode Transaksi", leftColumnX, yPosition);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 37, 254);
    doc.text(fullTransaction?.id || "DEV-T23746304918YA5YS", rightColumnX, yPosition, { align: "right" });
    yPosition += 7;

    // Atas Nama - kiri: label, kanan: value
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Atas Nama", leftColumnX, yPosition);
    doc.setFont("helvetica", "normal");
    const customerName = fullTransaction?.user?.name || "kusuma";
    doc.text(customerName, rightColumnX, yPosition, { align: "right" });
    yPosition += 7;

    // Fungsi untuk format tanggal ke "30 October 2025"
    const formatDateToLong = (dateString: string): string => {
        try {
            // Jika sudah format "30 October 2025", return langsung
            if (dateString.includes('October') || dateString.includes('January') || dateString.includes('February') ||
                dateString.includes('March') || dateString.includes('April') || dateString.includes('May') ||
                dateString.includes('June') || dateString.includes('July') || dateString.includes('August') ||
                dateString.includes('September') || dateString.includes('November') || dateString.includes('December')) {
                return dateString;
            }

            // Format dari "2025-10-30" ke "30 October 2025"
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return dateString; // Return original jika parsing gagal
            }

            const day = date.getDate();
            const month = date.toLocaleString('en-US', { month: 'long' });
            const year = date.getFullYear();

            return `${day} ${month} ${year}`;
        } catch (error) {
            return dateString; // Return original jika error
        }
    };

    // Pesanan Dibuat - kiri: label, kanan: value
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Pesanan Dibuat", leftColumnX, yPosition);
    doc.setFont("helvetica", "normal");

    // Format createdDate ke "30 October 2025"
    const createdDateRaw = fullTransaction?.created_at || "30 October 2025";
    const createdDate = formatDateToLong(createdDateRaw);
    doc.text(createdDate, rightColumnX, yPosition, { align: "right" });
    yPosition += 7;

    // Pesanan Dibayar - kiri: label, kanan: value
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Pesanan Dibayar", leftColumnX, yPosition);
    doc.setFont("helvetica", "normal");

    // Cek status pembayaran
    const isPaid = fullTransaction?.invoice_status === "paid" ||
        (fullTransaction?.paid_amount && fullTransaction.paid_amount > 0);

    let paidDateText;
    if (isPaid && fullTransaction?.paid_at && fullTransaction.paid_at !== "1970-01-01") {
        paidDateText = formatDateToLong(fullTransaction.paid_at);
    } else if (isPaid) {
        paidDateText = "Telah dibayar";
    } else {
        paidDateText = "Belum dibayar";
    }
    doc.text(paidDateText, rightColumnX, yPosition, { align: "right" });
    yPosition += 7;

    // Metode Pembayaran - kiri: label, kanan: value
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Metode Pembayaran", leftColumnX, yPosition);
    doc.setFont("helvetica", "normal");
    const paymentMethod = fullTransaction?.payment_method ||
        fullTransaction?.payment_channel ||
        "BRIVA";
    doc.text(paymentMethod, rightColumnX, yPosition, { align: "right" });
    yPosition += 5;

    // Garis pemisah sebelum rincian pesanan
    doc.setDrawColor(150, 150, 150);
    doc.setLineWidth(0.1);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 6;

    // RINCIAN PESANAN - FORMAT KIRI-KANAN
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Rincian Pesanan", margin, yPosition);
    yPosition += 8;

    // Detail kursus - FORMAT KIRI-KANAN
    doc.setFont("helvetica", "normal");

    // Label "Kursus" di kiri
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Kursus", leftColumnX, yPosition);

    // Nama kursus di kanan (dari API)
    const courseTitle = fullTransaction?.product?.title || "Belajar Coding Untuk Anak Menggunakan Scratch";
    const splitTitle = doc.splitTextToSize(courseTitle, contentWidth / 2 - 5);
    doc.setFont("helvetica", "normal");
    doc.text(splitTitle, rightColumnX, yPosition, { align: "right" });

    yPosition += Math.min(splitTitle.length, 2) * 3 + 6;

    // Harga - FORMAT KIRI-KANAN
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Harga", leftColumnX, yPosition);
    doc.setFont("helvetica", "normal");

    const hasPromotionalPrice = fullTransaction?.product?.promotional_price;
    const regularPrice = fullTransaction?.product?.price || 250000;
    const finalPrice = hasPromotionalPrice ? fullTransaction.product.promotional_price ?? regularPrice : regularPrice;

    doc.text(`Rp ${finalPrice.toLocaleString("id-ID")}`, rightColumnX, yPosition, { align: "right" });
    yPosition += 5;

    // Garis pemisah item
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.1);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 6;

    // SUBTOTAL & LAINNYA - FORMAT KIRI-KANAN

    // Subtotal untuk Produk
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Subtotal untuk Produk", leftColumnX, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(`Rp ${finalPrice.toLocaleString("id-ID")}`, rightColumnX, yPosition, { align: "right" });
    yPosition += 7;

    // Voucher
    const voucherAmount = fullTransaction?.course_voucher || 0;
    if (voucherAmount > 0) {
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.text("Voucher", leftColumnX, yPosition);
        doc.setFont("helvetica", "normal");
        doc.text(`- Rp ${voucherAmount.toLocaleString("id-ID")}`, rightColumnX, yPosition, { align: "right" });
        yPosition += 7;
    }

    // Biaya Layanan
    const serviceFee = fullTransaction?.fee_amount || 4250;
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Biaya Layanan", leftColumnX, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(`Rp ${serviceFee.toLocaleString("id-ID")}`, rightColumnX, yPosition, { align: "right" });
    yPosition += 8;

    // Garis pemisah sebelum total
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.3);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;

    // Total Pembayaran
    const totalAmount = fullTransaction?.paid_amount ||
        fullTransaction?.amount ||
        (finalPrice + serviceFee - voucherAmount);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Total Pembayaran", leftColumnX, yPosition);
    doc.text(`Rp ${totalAmount.toLocaleString("id-ID")}`, rightColumnX, yPosition, { align: "right" });
    doc.save(`INVOICE_${fullTransaction?.id || transaction.reference || "payment"}.pdf`);
};