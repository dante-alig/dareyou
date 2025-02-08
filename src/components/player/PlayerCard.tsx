"use client";

import { useEffect, useState } from "react";
import { useChallengeContext } from "@/context/ChallengeContext";
import Image from "next/image";
import { getRandomDefi } from "@/utils/random";

interface PlayerCardProps {
  playerNumber: number;
}

export default function PlayerCard({ playerNumber }: PlayerCardProps) {
  const [inputValue, setInputValue] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [avatarNumber, setAvatarNumber] = useState<number | null>(null);
  const [isRandomChallenge, setIsRandomChallenge] = useState(false);

  const {
    challenges,
    playerNames,
    addChallenge,
    updatePlayerName,
    validatePlayer,
    isPlayerValidated,
    registerPlayer,
    removeChallenge,
    getPlayerAvatar,
  } = useChallengeContext();

  useEffect(() => {
    // On enregistre le joueur seulement au montage initial
    registerPlayer(playerNumber);
  }, [playerNumber, registerPlayer]);

  useEffect(() => {
    // On met à jour l'avatar séparément
    const avatar = getPlayerAvatar(playerNumber);
    if (avatar !== avatarNumber) {
      setAvatarNumber(avatar);
    }
  }, [playerNumber, getPlayerAvatar, avatarNumber]);

  useEffect(() => {
    if (isRandomChallenge && inputValue) {
      handleAddChallenge();
      setIsRandomChallenge(false);
    }
  }, [inputValue, isRandomChallenge]);

  const isDisabled = isPlayerValidated(playerNumber);

  const playerChallenges = challenges.filter(
    (challenge) => challenge.player === playerNumber
  );

  const playerName =
    playerNames.find((p) => p.player === playerNumber)?.name ||
    `joueur ${playerNumber}`;

  const handleNameEdit = () => {
    if (isEditingName && nameInput.trim() && !isDisabled) {
      updatePlayerName(playerNumber, nameInput);
      setIsEditingName(false);
    } else if (!isDisabled) {
      setNameInput(playerName);
      setIsEditingName(true);
    }
  };

  const handleAddChallenge = () => {
    if (inputValue.trim() && !isDisabled) {
      addChallenge(playerNumber, inputValue.trim());
      setInputValue("");
    }
  };

  const handleValidate = () => {
    if (!isDisabled && playerChallenges.length > 0) {
      validatePlayer(playerNumber);
    }
  };

  const handleRemoveChallenge = (challenge: string) => {
    removeChallenge(challenge);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-[760px] mx-auto ${
        isDisabled ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 relative rounded-full overflow-hidden">
          {avatarNumber !== null ? (
            <Image
              src={`/${avatarNumber}.png`}
              alt={`Avatar du joueur ${playerNumber}`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300" />
          )}
        </div>
        <div className="flex items-center gap-2">
          {isEditingName && !isDisabled ? (
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="text-xl text-blue-600 bg-white rounded-lg px-2 py-1 font-bold"
              autoFocus
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleNameEdit();
                }
              }}
            />
          ) : (
            <span className="text-xl text-black font-bold">{playerName}</span>
          )}
          {!isDisabled && (
            <button
              onClick={handleNameEdit}
              className="text-blue-600 hover:text-blue-800"
            >
              {isEditingName ? "✓" : "✎"}
            </button>
          )}
        </div>
      </div>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Propose une défi"
          className="w-full p-3 rounded-lg pr-20 bg-gray-200 text-purple-600"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isDisabled}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
          <button
            onClick={handleAddChallenge}
            className={`text-red-700 w-8 h-8 bg-[#FEE900] flex items-center justify-center rounded-lg ${
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isDisabled}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              setIsRandomChallenge(true);
              setInputValue(getRandomDefi());
            }}
            className={`text-red-700 w-8 h-8 bg-[#FEE900] flex items-center justify-center rounded-lg ${
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isDisabled}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        {playerChallenges.map((challenge, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-lg shadow text-black flex justify-between items-center gap-2"
          >
            <span className="truncate flex-1">{challenge.challenge}</span>
            <button
              onClick={() => handleRemoveChallenge(challenge.challenge)}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        className={`w-full ${
          isDisabled
            ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
            : "bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-400 hover:to-orange-500"
        } rounded-2xl py-3 text-center`}
        onClick={handleValidate}
        disabled={isDisabled || playerChallenges.length === 0}
      >
        {isDisabled ? "Validé" : "Valider"}
      </button>
    </div>
  );
}
