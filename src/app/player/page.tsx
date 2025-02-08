"use client";

import PlayerCard from "@/components/player/PlayerCard";
import Header from "@/components/header/Header";
import { useChallengeContext } from "@/context/ChallengeContext";
import { useState } from "react";

export default function PlayerSetup() {
  const { resetValidations } = useChallengeContext();
  const [playerCount, setPlayerCount] = useState(2);

  const handleAddPlayer = () => {
    setPlayerCount((prev) => prev + 1);
  };

  return (
    <div className="intro-container min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-200">
      <Header />
      <div className="px-4 py-6 space-y-6">
        {Array.from({ length: playerCount }, (_, i) => (
          <PlayerCard key={i + 1} playerNumber={i + 1} />
        ))}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleAddPlayer}
            className="bg-white text-purple-500 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 text-lg font-medium"
          >
            Ajouter un joueur
          </button>
          <button
            onClick={resetValidations}
            className="bg-white text-purple-500 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 text-lg font-medium"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
