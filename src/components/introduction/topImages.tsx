"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TopImages() {
  return (
    <>
      {/* Images du haut */}
      <motion.div
        className="absolute top-[5%] sm:top-[10%] left-[5%] sm:left-[2%] md:top-[15%] md:left-[10%]"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          animate={{ rotate: [0, -12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/shoes.png"
            alt="Chaussures"
            width={100}
            height={100}
            className="md:w-[200px] md:h-[200px]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-[5%] sm:top-[10%] right-[5%] sm:right-[2%] md:top-[15%] md:right-[15%]"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/phone.png"
            alt="Téléphone"
            width={80}
            height={80}
            className="md:w-[160px] md:h-[160px]"
          />
        </motion.div>
      </motion.div>
    </>
  );
}