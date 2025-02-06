"use client";

import { useEffect, useState } from "react";
import { useChallengeContext } from "@/context/ChallengeContext";
import Image from "next/image";

interface PlayerCardProps {
  playerNumber: number;
}

export default function PlayerCard({ playerNumber }: PlayerCardProps) {
  const [inputValue, setInputValue] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [avatarNumber, setAvatarNumber] = useState<number | null>(null);

  const {
    challenges,
    playerNames,
    addChallenge,
    updatePlayerName,
    validatePlayer,
    isPlayerValidated,
    registerPlayer,
    removeChallenge,
    getPlayerAvatar
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
      className={`bg-gray-100 rounded-3xl p-6 shadow-lg ${
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
              className="text-xl text-blue-600 bg-white rounded-lg px-2 py-1"
              autoFocus
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleNameEdit();
                }
              }}
            />
          ) : (
            <span className="text-xl text-black">{playerName}</span>
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
          placeholder="nom du defie"
          className="w-full p-3 rounded-lg pr-10 bg-gray-200 text-blue-600"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isDisabled}
        />
        <button
          onClick={handleAddChallenge}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-red-700 w-8 h-8 bg-[#FEE900] flex items-center justify-center rounded-lg ${
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
              d="M12 6v12M6 12h12"
            />
          </svg>
        </button>
      </div>
      <div className="space-y-2 mb-4">
        {playerChallenges.map((challenge, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-lg shadow text-red-700 flex justify-between items-center"
          >
            <span>{challenge.challenge}</span>
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
        className={`w-full bg-[#FF3200] rounded-2xl py-3 text-center ${
          isDisabled
            ? "bg-white-300 text-gray-500"
            : "text-white-700 hover:bg-gray-50"
        }`}
        onClick={handleValidate}
        disabled={isDisabled || playerChallenges.length === 0}
      >
        {isDisabled ? "Validé" : "Valider"}
      </button>
    </div>
  );
}
