"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MainText() {
  return (
    <div className="text-center space-y-4 max-w-2xl relative z-50">
      <motion.h1
        className="text-5xl md:text-8xl font-bold uppercase tracking-wider mb-4"
        style={{ fontFamily: "'Lilita One', cursive" }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Lance des défis
      </motion.h1>

      <motion.p
        className="text-4xl md:text-7xl mb-2 text-black"
        style={{ fontFamily: "'Pacifico', cursive" }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        à tes amis
      </motion.p>

      <div className="relative">
        <motion.div
          className="absolute -right-20 -top-2"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/hand.png"
              alt="Peace"
              width={60}
              height={60}
              className="md:w-[120px] md:h-[120px]"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="text-white p-2 md:p-4 rounded-md transform text-xl md:text-4xl font-semibold mb-8"
          style={{
            fontFamily: "'Lilita One', cursive",
            backgroundColor: "#0920bb",
          }}
          initial={{ x: -300, rotate: 0, opacity: 0 }}
          animate={{ x: 0, rotate: -2, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
        >
          et laisse le hasard choisir
        </motion.div>
      </div>

      <motion.div
        className="text-red-500 text-2xl md:text-5xl mb-12"
        style={{ fontFamily: "'Lilita One', cursive" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        QUI DEVRA RELEVER LE CHALLENGE !
      </motion.div>
    </div>
  );
}
