interface PaymentMethod {
    code: string;
    name: string;
    icon: string;
}

interface PaymentMethodListProps {
    methods: PaymentMethod[];
    selectedPayment: PaymentMethod | null;
    onSelectPayment: (method: PaymentMethod) => void;
    description: string;
}

const PaymentMethodList = ({
    methods,
    selectedPayment,
    onSelectPayment,
    description,
}: PaymentMethodListProps) => {
    return (
        <div className="p-3 space-y-2 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-[#2A2A40]">
            <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs">{description}</p>

            <div className="space-y-2">
                {methods.map((method) => (
                    <label
                        key={method.code}
                        className="flex items-center gap-3 p-2 rounded border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1E1E36] transition-colors duration-200"
                    >
                        <input
                            type="radio"
                            name="payment"
                            className="accent-purple-600"
                            checked={selectedPayment?.code === method.code}
                            onChange={() => onSelectPayment(method)}
                        />
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-8 rounded-sm flex items-center justify-center bg-white p-1">
                                <img
                                    src={method.icon}
                                    alt={method.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{method.name}</span>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default PaymentMethodList;