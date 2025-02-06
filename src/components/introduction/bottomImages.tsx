"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BottomImages() {
  return (
    <>
      {/* Images du bas */}
      <motion.div
        className="absolute bottom-[20%] left-[15%]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.div
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/tv.png"
            alt="TV"
            width={100}
            height={100}
            className="md:w-[200px] md:h-[200px]"
          />
        </motion.div>
      </motion.div>

      {/* Ghost au centre bas */}
      <motion.div
        className="absolute bottom-[15%] left-[60%] transform -translate-x-1/2 md:bottom-[10%] md:left-[85%]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/purple_ghost.png"
            alt="Ghost"
            width={150}
            height={60}
            className="mb-4 md:hidden"
          />
          <Image
            src="/ghost_cry.png"
            alt="Ghost"
            width={80}
            height={80}
            className="md:w-[160px] md:h-[160px]"
          />
        </motion.div>
      </motion.div>
      {/* Ghost au centre bas */}
      <motion.div
        className="absolute bottom-[15%] left-[60%] transform -translate-x-1/2 md:bottom-[10%] md:left-[85%]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/purple_ghost.png"
            alt="Ghost"
            width={150}
            height={60}
            className="mb-4 md:hidden"
          />
          <Image
            src="/ghost_cry.png"
            alt="Ghost"
            width={80}
            height={80}
            className="md:w-[160px] md:h-[160px]"
          />
        </motion.div>
      </motion.div>
    </>
  );
}
