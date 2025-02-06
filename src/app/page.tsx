"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Introduction() {
  return (
    <main className="min-h-screen bg-yellow-400 flex flex-col items-center justify-between p-4 relative overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center w-full relative">
        {/* Images du haut */}
        <div>
          <motion.div
            className="absolute top-[15%] left-[10%]"
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
            className="absolute top-[15%] right-[15%]"
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

          {/* Texte principal */}
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
        </div>

        {/* Bouton Skip */}
        <motion.div
          className="w-full flex justify-center mb-8 mt-12"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/player"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 text-xl md:text-3xl inline-block"
              style={{ fontFamily: "'Lilita One', cursive" }}
            >
              Passer
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
