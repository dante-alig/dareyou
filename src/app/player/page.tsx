"use client";

import PlayerCard from "@/components/player/PlayerCard";
import Header from "@/components/header/Header";
import { useChallengeContext } from "@/context/ChallengeContext";

export default function PlayerSetup() {
  const { resetValidations } = useChallengeContext();

  return (
    <div className="intro-container min-h-screen bg-[#000066]">
      <Header />
      <div className="px-4 py-6 space-y-6">
        <PlayerCard playerNumber={1} />
        <PlayerCard playerNumber={2} />
        <div className="flex justify-center mt-8">
          <button
            onClick={resetValidations}
            className="bg-white text-blue-700 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 text-lg font-medium"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
