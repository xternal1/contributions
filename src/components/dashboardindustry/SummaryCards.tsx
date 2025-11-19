import { motion } from "framer-motion";
import { FaBookOpen, FaTrophy } from "react-icons/fa";
import { IoExtensionPuzzle, IoLibrary } from "react-icons/io5";
import { MdEvent } from "react-icons/md";
import type { SummaryCardsProps, SummaryCard as SummaryCardType, IconType } from "@/types/Dashboard";

const iconMap: Record<IconType, React.ReactNode> = {
    book: <FaBookOpen className="text-purple-600 text-3xl" />,
    library: <IoLibrary className="text-purple-600 text-3xl" />,
    puzzle: <IoExtensionPuzzle className="text-purple-600 text-3xl" />,
    event: <MdEvent className="text-purple-600 text-3xl" />,
    trophy: <FaTrophy className="text-purple-600 text-3xl" />,
};

interface SummaryCardProps {
    card: SummaryCardType;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ card }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className="min-w-[266px] bg-white dark:bg-[#0D0D1A] dark:border-white border rounded-md shadow-sm p-5 text-center flex flex-col items-center justify-center flex-shrink-0"
    >
        <div className="text-purple-600 text-3xl p-3 bg-purple-100 dark:bg-[#2C004F] rounded-md">
            {iconMap[card.iconType]}
        </div>
        <p className="text-2xl font-bold text-dark mt-2">{card.value}</p>
        <h3 className="font-medium text-gray-700 mt-1 dark:text-white">
            {card.title}
        </h3>
    </motion.div>
);

const SummaryCards: React.FC<SummaryCardsProps> = ({ cards, loading }) => {
    return (
        <section className="w-full max-w-[840px] mx-auto flex gap-5 overflow-x-auto pb-2 scroll-smooth">
            {loading
                ? [...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="min-w-[266px] h-[150px] bg-gray-200 dark:bg-[#0D0D1A] rounded-md animate-pulse flex-shrink-0"
                    ></div>
                ))
                : cards.map((card, i) => <SummaryCard key={i} card={card} />)}
        </section>
    );
};

export default SummaryCards;