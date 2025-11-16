// src/components/transaction/TransactionCard.tsx
import { FaStar } from "react-icons/fa";
import DefaultImg from "../../assets/Default-Img.png";

interface Product {
    photo: string | null;
    title: string;
    category: string;
    rating: string | null;
    description: string;
}

interface Transaction {
    id: string;
    product: Product;
    invoice_status: string;
    paid_amount: number;
}

interface TransactionCardProps {
    transaction: Transaction;
    onPayment: (id: string) => void;
    onCancel: (id: string) => void;
}

const TransactionCard = ({ transaction, onPayment, onCancel }: TransactionCardProps) => {
    const cleanHTML = (html: string) => html.replace(/style="[^"]*"/g, "");

    const getStatusColor = (status: string) => {
        switch (status) {
            case "unpaid":
            case "pending":
                return "text-yellow-500";
            case "paid":
                return "text-green-500";
            case "expired":
                return "text-gray-700 dark:text-gray-400";
            case "canceled":
                return "text-red-500";
            default:
                return "text-gray-600";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "unpaid":
                return "Menunggu Pembayaran";
            case "paid":
                return "Selesai";
            case "expired":
                return "Kedaluarsa";
            case "canceled":
                return "Dibatalkan";
            default:
                return "Pending";
        }
    };

    return (
        <div className="border rounded-xl shadow-md overflow-hidden mb-6 dark:border-white dark:bg-[#0D0D1A]">
            <div className="flex flex-wrap items-center gap-6 p-6">
                <img
                    className="w-60 h-40 border-2 border-gray-200 rounded-lg object-cover"
                    src={transaction.product.photo || DefaultImg}
                    alt={transaction.product.title}
                    onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.onerror = null;
                        target.src = DefaultImg;
                    }}
                />

                <div className="flex-1 min-w-auto">
                    <span className="bg-gray-100 text-gray-600 hover:bg-purple-600 hover:text-white text-xs font-semibold px-3 py-1 rounded-full transition-all duration-300 dark:text-white dark:bg-purple-950">
                        {transaction.product.category}
                    </span>
                    <h3 className="text-lg font-bold mt-2">{transaction.product.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1 dark:text-gray-300">
                        <FaStar className="text-yellow-500" />
                        <span>
                            ({parseFloat(transaction.product.rating || "0").toFixed(1)} Reviews)
                        </span>
                    </div>
                    <p
                        className="text-gray-500 text-sm mt-2 line-clamp-2 dark:text-gray-300"
                        dangerouslySetInnerHTML={{
                            __html: cleanHTML(transaction.product.description || ""),
                        }}
                    ></p>
                </div>
            </div>

            <div className="border-t px-6 py-4 text-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4 dark:border-gray-400">
                <p className="font-semibold text-gray-700 dark:text-white">
                    Status Pesanan:{" "}
                    <span className={`${getStatusColor(transaction.invoice_status)} capitalize`}>
                        {getStatusText(transaction.invoice_status)}
                    </span>
                </p>
                <p className="font-semibold text-gray-800 dark:text-white">
                    Total Harga:{" "}
                    <span className="text-purple-700 text-lg font-bold">
                        Rp. {transaction.paid_amount.toLocaleString("id-ID")}
                    </span>
                </p>
            </div>

            {(transaction.invoice_status === "pending" ||
                transaction.invoice_status === "unpaid") && (
                    <div className="px-6 py-4 flex flex-col sm:flex-row flex-wrap gap-3 justify-end">
                        <button
                            onClick={() => onCancel(transaction.id)}
                            className="border-2 border-red-500 text-red-600 text-sm font-semibold px-5 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                        >
                            Batalkan Pesanan
                        </button>
                        <button
                            onClick={() => onPayment(transaction.id)}
                            className="bg-purple-600 text-white text-sm font-semibold px-6 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition"
                        >
                            Bayar
                        </button>
                    </div>
                )}
        </div>
    );
};

export default TransactionCard;