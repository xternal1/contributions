import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import PaymentMethodList from './PaymentMethodList';

interface PaymentMethod {
    code: string;
    name: string;
    icon: string;
}

type SectionType = 'va' | 'ewallet' | 'minimarket';

interface PaymentMethodSectionProps {
    sectionType: SectionType;
    title: string;
    description: string;
    methods: PaymentMethod[];
    isOpen: boolean;
    selectedPayment: PaymentMethod | null;
    onToggle: () => void;
    onSelectPayment: (method: PaymentMethod) => void;
    hasBorderBottom?: boolean;
}

const PaymentMethodSection = ({
    sectionType,
    title,
    description,
    methods,
    isOpen,
    selectedPayment,
    onToggle,
    onSelectPayment,
    hasBorderBottom = true,
}: PaymentMethodSectionProps) => {
    return (
        <div className={hasBorderBottom ? "border-b border-gray-200 dark:border-white mb-4" : ""}
        data-section-type={sectionType}>
            <button
                onClick={onToggle}
                className={`w-full flex justify-between items-center px-4 py-3 text-left font-medium text-base transition-colors duration-500 rounded-lg
                    ${isOpen
                        ? "bg-blue-50 dark:bg-[#1B1B33] text-[#9425FE]"
                        : "bg-white dark:bg-[#0D0D1A] text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1E1E36] hover:text-yellow-500"
                    }`}
            >
                <span className="font-semibold">{title}</span>
                <FiChevronDown
                    className={`w-5 h-5 transition-transform duration-500 ${isOpen ? "rotate-180" : "rotate-0"
                        }`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <PaymentMethodList
                            methods={methods}
                            selectedPayment={selectedPayment}
                            onSelectPayment={onSelectPayment}
                            description={description}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PaymentMethodSection;