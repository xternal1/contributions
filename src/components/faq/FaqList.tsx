// src/components/faq/FaqList.tsx
import type { FC } from "react";
import FaqItem from "./FaqItem";
import type { Faq } from "../../features/faq/_faq"; // Fixed import path

interface FaqListProps {
    faqs: Faq[];
    loading: boolean;
}

const FaqList: FC<FaqListProps> = ({ faqs, loading }) => {
    if (loading) {
        return (
            <p className="text-center py-10 text-gray-500 dark:text-gray-400 transition-colors duration-500">
                Memuat FAQ...
            </p>
        );
    }

    if (faqs.length === 0) {
        return (
            <p className="text-gray-500 dark:text-gray-400 text-center py-10 text-lg transition-colors duration-500">
                Belum ada FAQ tersedia.
            </p>
        );
    }

    return (
        <div className="space-y-2">
            {faqs.map((faq) => (
                <FaqItem key={faq.id} faq={faq} />
            ))}
        </div>
    );
};

export default FaqList;