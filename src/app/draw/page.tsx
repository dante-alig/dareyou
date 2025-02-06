"use client";

import { useState } from "react";
import { useChallengeContext } from "@/context/ChallengeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const emojis = [
  "🎲",
  "🎮",
  "🎯",
  "🎪",
  "🎨",
  "🎭",
  "🎪",
  "🎡",
  "🎢",
  "🎠",
  "🎬",
  "🎤",
  "🎧",
  "🎸",
  "🎹",
  "🎺",
  "🎻",
  "🎼",
];

export default function Draw() {
  const router = useRouter();
  const { challenges, resetGame } = useChallengeContext();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [randomChallenge, setRandomChallenge] = useState<string>("");

  const handleCardClick = (index: number) => {
    if (selectedIndex === null) {
      setSelectedIndex(index);
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * challenges.length);
        setRandomChallenge(challenges[randomIndex].challenge);
        setIsFlipped(true);
      }, 800);
    }
  };

  const handleRestart = () => {
    resetGame();
    router.replace('/player');
  };

  return (
    <div className="min-h-screen bg-blue-700 p-8">
      <h1 className="text-3xl font-bold mb-8 text-white">
        Tirage au sort des défis
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 perspective-1000">
        <AnimatePresence>
          {challenges.map((challenge, index) =>
            selectedIndex === null || selectedIndex === index ? (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: 1,
                  scale: selectedIndex === index ? 1.1 : 1,
                  gridColumn: selectedIndex === index ? "1 / -1" : "auto",
                  rotateY: isFlipped ? 180 : 0,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleCardClick(index)}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer min-h-[200px] flex items-center justify-center text-center preserve-3d"
              >
                <div 
                  className="absolute w-full h-full backface-hidden flex items-center justify-center"
                  style={{ 
                    backfaceVisibility: "hidden",
                  }}
                >
                  <p className="font-medium text-4xl">
                    {emojis[index % emojis.length]}
                  </p>
                </div>

                <div
                  className="absolute w-full h-full backface-hidden flex items-center justify-center bg-white rounded-lg"
                  style={{ 
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <p className="font-medium text-xl text-gray-800 max-w-2xl mx-auto">
                    {randomChallenge}
                  </p>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isFlipped && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={handleRestart}
              className="bg-white text-blue-700 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 text-lg"
            >
              Recommencer une partie
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
