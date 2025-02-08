"use client";

import { useState, useEffect } from "react";
import { useChallengeContext } from "@/context/ChallengeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  handleCardClick,
  handleRestart,
  getPlayerName,
} from "../../utils/handleDraw";
import { firework } from "../../utils/firework";

export default function Draw() {
  const router = useRouter();
  const { challenges, resetGame, playerNames } = useChallengeContext();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [randomChallenge, setRandomChallenge] = useState<{
    challenge: string;
    playerNumber: number;
  } | null>(null);
  const [cardColorMap, setCardColorMap] = useState<string[]>([]);

  useEffect(() => {
    // Initialiser toutes les cartes en jaune
    const yellowCards = Array(challenges.length).fill("bg-yellow-400");
    setCardColorMap(yellowCards);
  }, [challenges.length]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-200 p-8">
      <h1 className="text-2xl font-bold mb-8 text-black text-center">
        Tirage au sort des défis
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
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
                onClick={() =>
                  handleCardClick(
                    index,
                    selectedIndex,
                    challenges,
                    setSelectedIndex,
                    setRandomChallenge,
                    setIsFlipped,
                    firework,
                    playerNames
                  )
                }
                className={`${
                  cardColorMap[index] || "bg-gray-400"
                } p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer min-h-[200px] flex items-center justify-center text-center preserve-3d relative max-w-[400px] mx-auto w-full`}
              >
                <div
                  className="absolute w-full h-full backface-hidden flex items-center justify-center"
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="relative w-24 h-24">
                    <Image
                      src="/ghost_recto.png"
                      alt="Ghost Card"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div
                  className="absolute w-full h-full backface-hidden flex items-center justify-center bg-white rounded-lg"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="flex flex-col items-center space-y-4 p-4 w-full">
                    <p className="text-sm font-medium text-purple-600">
                      Défi proposé par{" "}
                      {randomChallenge
                        ? getPlayerName(
                            randomChallenge.playerNumber,
                            playerNames
                          )
                        : ""}
                    </p>
                    <p className="font-medium text-xl text-gray-800 break-words w-full text-center">
                      {randomChallenge?.challenge || ""}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {selectedIndex !== null && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => handleRestart(resetGame, router)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Recommencer
          </button>
        </div>
      )}
    </div>
  );
}
