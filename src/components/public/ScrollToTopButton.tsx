import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    key="scroll-top"
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    onClick={scrollToTop}
                    className="
                        fixed z-50
                        bg-purple-600 hover:bg-yellow-500 text-white hover:text-black
                        shadow-md rounded-full
                        bottom-4 right-4 sm:bottom-6 sm:right-9
                        p-2 sm:p-2
                    "
                    aria-label="Scroll to top"
                >
                    <FaChevronUp size={13} />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTopButton;
