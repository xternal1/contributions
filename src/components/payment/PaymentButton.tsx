interface PaymentButtonProps {
    onClick: () => void;
}

const PaymentButton = ({ onClick }: PaymentButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="mt-8 w-full group bg-[#9425FE] text-white text-sm font-semibold py-2 rounded-md flex items-center justify-center transition-all duration-500 ease-in-out shadow-[4px_4px_0_#0A0082] hover:bg-yellow-400 hover:text-[#0A0082] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus:outline-none cursor-pointer"
        >
            <span className="relative z-10 group-hover:text-[#0A0082] transition-colors duration-500">
                Bayar Sekarang
            </span>
        </button>
    );
};

export default PaymentButton;