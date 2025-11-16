// src/components/transaction/TransactionEmpty.tsx
import empty from "../../assets/img/no-data/empty.svg";

const TransactionEmpty = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <img className="w-64" src={empty} alt="no-data" />
            <p className="text-gray-600 text-lg font-bold mt-4 dark:text-white">
                Belum ada riwayat transaksi.
            </p>
        </div>
    );
};

export default TransactionEmpty;