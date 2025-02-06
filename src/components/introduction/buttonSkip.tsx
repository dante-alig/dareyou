"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonSkipProps {
  text: string;
  href: string;
  className?: string;
}

export default function ButtonSkip({ text, href, className = "" }: ButtonSkipProps) {
  return (
    <motion.div
      className="w-full flex justify-center mb-8 mt-12"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Link
          href={href}
          className={`bg-white text-purple-600 px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 text-xl md:text-3xl inline-block ${className}`}
          style={{ fontFamily: "'Lilita One', cursive" }}
        >
          {text}
        </Link>
      </motion.div>
    </motion.div>
  );
}
