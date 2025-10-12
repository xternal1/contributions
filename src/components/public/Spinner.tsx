import React from "react";
import { motion } from "framer-motion";
import logo from "../../assets/img/logo/get-skill/logo.png";

interface SpinnerProps {
  animateOut?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ animateOut }) => {
  return (
    <div
      id="preloader"
      className={`fixed top-0 left-0 w-full h-full z-[9999] bg-white ${
        animateOut ? "fade-out" : ""
      }`}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Outer Circle Border */}
        <motion.div
          className="relative inset-0 w-[85px] h-[85px] rounded-full border-[3px] border-gray-300"
          animate={{ rotate: 900 }}
          transition={{
            repeat: Infinity,
            duration: 1.1,
            ease: "easeInOut",
          }}
        >
          {/* Top Border (rotating) */}
          <div className="absolute inset-0 rounded-full border-t-[3px] border-purple-600" />
        </motion.div>

        {/* Logo (pulsing) */}
        <motion.img
          src={logo}
          alt="Preloader"
          className="absolute top-1/2 left-1/2 w-[35px] -translate-x-[calc(60%-2px)] -translate-y-1/2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            repeat: Infinity,
            duration: 0.9,
            repeatType: "reverse",
          }}
        />
      </div>
    </div>
  );
};

export default Spinner;