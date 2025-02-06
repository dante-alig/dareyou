"use client";

import { useState, useEffect } from "react";
import { useChallengeContext } from "@/context/ChallengeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import confetti from 'canvas-confetti';

const cardColors = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-indigo-400",
  "bg-orange-400",
  "bg-teal-400",
  "bg-cyan-400",
];

const firework = () => {
  const duration = 2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 35, spread: 360, ticks: 50, zIndex: 0 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: NodeJS.Timeout = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);
    
    // Lancer les confettis depuis des positions aléatoires
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    });
  }, 200);
};

export default function Draw() {
  const router = useRouter();
  const { challenges, resetGame, playerNames } = useChallengeContext();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [randomChallenge, setRandomChallenge] = useState<{ challenge: string; playerNumber: number } | null>(null);
  const [cardColorMap, setCardColorMap] = useState<string[]>([]);

  useEffect(() => {
    // Mélanger les couleurs pour avoir un ordre aléatoire
    const shuffledColors = [...cardColors]
      .sort(() => Math.random() - 0.5)
      .slice(0, challenges.length);
    setCardColorMap(shuffledColors);
  }, [challenges.length]);

  const handleCardClick = (index: number) => {
    if (selectedIndex === null) {
      setSelectedIndex(index);
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * challenges.length);
        const selectedChallenge = challenges[randomIndex];
        setRandomChallenge({
          challenge: selectedChallenge.challenge,
          playerNumber: selectedChallenge.player
        });
        setIsFlipped(true);
        // Lancer les feux d'artifice après que la carte soit retournée
        setTimeout(firework, 500);
      }, 800);
    }
  };

  const getPlayerName = (playerNumber: number) => {
    const player = playerNames.find(p => p.player === playerNumber);
    return player ? player.name : `Joueur ${playerNumber}`;
  };

  const handleRestart = () => {
    resetGame();
    router.replace("/player");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-200 p-8">
      <h1 className="text-2xl font-bold mb-8 text-black text-center">
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
                className={`${
                  cardColorMap[index] || "bg-gray-400"
                } p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer min-h-[200px] flex items-center justify-center text-center preserve-3d relative`}
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
                      Défi proposé par {randomChallenge ? getPlayerName(randomChallenge.playerNumber) : ''}
                    </p>
                    <p className="font-medium text-xl text-gray-800 break-words w-full text-center">
                      {randomChallenge?.challenge || ''}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleRestart}
          className="bg-white text-purple-600 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 text-lg font-medium"
        >
          Recommencer
        </button>
      </div>
    </div>
  );
}
