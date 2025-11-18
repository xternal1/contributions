import jsPDF from "jspdf";

import Logo from "../assets/img/logo/get-skill/logoInvoice.png";
import watermark from "../assets/img/logo/get-skill/logoWatermark.png";

interface InvoiceData {
    reference: string;
    pay_code: string;
    created_time: number;
    paid_time: number | null;
    customer_name: string;
    payment_method: string;
    product_price: number;
    fee_amount: number;
    total_amount: number;
    product_name: string;
}

export const generatePaymentInvoicePDF = (invoiceData: InvoiceData) => {
    if (!invoiceData) return;

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [80, 150]
    });

    const margin = 5;
    const pageWidth = 80;
    const pageHeight = 150;
    let yPosition = 10;

    // Watermark
    try {
        doc.addImage(watermark, 'PNG', 5, 20, 20, 23, '', 'NONE', 0.3);
        doc.addImage(watermark, 'PNG', pageWidth / 2 - 10, pageHeight / 2 - 15, 20, 23, '', 'NONE', 0.3);
        doc.addImage(watermark, 'PNG', pageWidth - 25, pageHeight - 50, 20, 23, '', 'NONE', 0.3);
    } catch (error) {
        // Fallback watermark text
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

    // Format timestamp to readable date
    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        const day = date.getDate();
        const month = date.toLocaleString("id-ID", { month: "long" });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    // Kode Transaksi
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Kode Transaksi", leftColumnX, yPosition);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 37, 254);
    doc.text(invoiceData.reference, rightColumnX, yPosition, { align: "right" });
    yPosition += 7;

    // Kode Pembayaran
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Kode Pembayaran", leftColumnX, yPosition);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 37, 254);
    doc.text(invoiceData.pay_code, rightColumnX, yPosition, { align: "right" });
    yPosition += 7;

    // Atas Nama
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Atas Nama", leftColumnX, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(invoiceData.customer_name, rightColumnX, yPosition, { align: "right" });
    yPosition += 7;

    // Pesanan Dibuat
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Pesanan Dibuat", leftColumnX, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(formatTimestamp(invoiceData.created_time), rightColumnX, yPosition, { align: "right" });
    yPosition += 7;

    // Pesanan Dibayar
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Pesanan Dibayar", leftColumnX, yPosition);
    doc.setFont("helvetica", "normal");

    const paidDateText = invoiceData.paid_time
        ? formatTimestamp(invoiceData.paid_time)
        : "Telah dibayar";
    doc.text(paidDateText, rightColumnX, yPosition, { align: "right" });
    yPosition += 7;

    // Metode Pembayaran
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Metode Pembayaran", leftColumnX, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(invoiceData.payment_method, rightColumnX, yPosition, { align: "right" });
    yPosition += 5;

    // Garis pemisah sebelum rincian pembayaran
    doc.setDrawColor(150, 150, 150);
    doc.setLineWidth(0.1);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 6;

    // RINCIAN PEMBAYARAN - DIUBAH DARI RINCIAN PESANAN
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Rincian Pembayaran", margin, yPosition);
    yPosition += 8;

    // Nominal Yang Dibayar
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Nominal Yg Dibayar", leftColumnX, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(`Rp ${invoiceData.product_price.toLocaleString("id-ID")}`, rightColumnX, yPosition, { align: "right" });
    yPosition += 7;

    // Biaya Admin
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Biaya Admin", leftColumnX, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(`Rp ${invoiceData.fee_amount.toLocaleString("id-ID")}`, rightColumnX, yPosition, { align: "right" });
    yPosition += 7;

    // Garis pemisah sebelum total
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.3);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;

    // Total Pembayaran
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Total Pembayaran", leftColumnX, yPosition);
    doc.text(`Rp ${invoiceData.total_amount.toLocaleString("id-ID")}`, rightColumnX, yPosition, { align: "right" });

    // Simpan PDF
    doc.save(`INVOICE_${invoiceData.reference}.pdf`);
};

// Fungsi untuk membuat data dummy invoice berdasarkan data dari PaymentDetail
export const createInvoiceData = (transactionData: any, selectedPayment: any, paymentSummary: any): InvoiceData => {
    return {
        reference: transactionData.reference,
        pay_code: transactionData.pay_code,
        created_time: transactionData.created_time,
        paid_time: transactionData.paid_time,
        customer_name: "Customer GetSkill", // Bisa diganti dengan data user dari auth
        payment_method: selectedPayment.name,
        product_price: paymentSummary.product_price,
        fee_amount: paymentSummary.fee_amount,
        total_amount: paymentSummary.total_amount,
        product_name: "Kursus Premium GetSkill" // Bisa diganti dengan nama produk yang sesuai
    };
};