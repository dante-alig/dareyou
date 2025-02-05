"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Challenge {
  player: number;
  challenge: string;
}

interface PlayerName {
  player: number;
  name: string;
}

interface PlayerStatus {
  player: number;
  isValidated: boolean;
}

interface ChallengeContextType {
  challenges: Challenge[];
  playerNames: PlayerName[];
  playerStatuses: PlayerStatus[];
  addChallenge: (playerNumber: number, challenge: string) => void;
  removeChallenge: (challengeToRemove: string) => void;
  updatePlayerName: (playerNumber: number, name: string) => void;
  validatePlayer: (playerNumber: number) => void;
  isPlayerValidated: (playerNumber: number) => boolean;
  registerPlayer: (playerNumber: number) => void;
  resetGame: () => void;
  resetValidations: () => void;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export function ChallengeProvider({ children }: { children: ReactNode }) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [playerNames, setPlayerNames] = useState<PlayerName[]>([]);
  const [playerStatuses, setPlayerStatuses] = useState<PlayerStatus[]>([]);
  const [registeredPlayers, setRegisteredPlayers] = useState<Set<number>>(new Set());
  const router = useRouter();

  const registerPlayer = useCallback((playerNumber: number) => {
    setRegisteredPlayers(prev => new Set(prev).add(playerNumber));
  }, []);

  const addChallenge = (playerNumber: number, challenge: string) => {
    setChallenges([...challenges, { player: playerNumber, challenge }]);
  };

  const removeChallenge = (challengeToRemove: string) => {
    setChallenges(prevChallenges => 
      prevChallenges.filter(challenge => challenge.challenge !== challengeToRemove)
    );
  };

  const updatePlayerName = (playerNumber: number, name: string) => {
    const existingNameIndex = playerNames.findIndex(p => p.player === playerNumber);
    if (existingNameIndex !== -1) {
      const updatedNames = [...playerNames];
      updatedNames[existingNameIndex] = { player: playerNumber, name };
      setPlayerNames(updatedNames);
    } else {
      setPlayerNames([...playerNames, { player: playerNumber, name }]);
    }
  };

  const validatePlayer = (playerNumber: number) => {
    console.log('Validating player:', playerNumber);
    const existingStatusIndex = playerStatuses.findIndex(p => p.player === playerNumber);
    if (existingStatusIndex !== -1) {
      const updatedStatuses = [...playerStatuses];
      updatedStatuses[existingStatusIndex] = { player: playerNumber, isValidated: true };
      setPlayerStatuses(updatedStatuses);
    } else {
      setPlayerStatuses([...playerStatuses, { player: playerNumber, isValidated: true }]);
    }
  };

  const isPlayerValidated = (playerNumber: number) => {
    return playerStatuses.find(p => p.player === playerNumber)?.isValidated || false;
  };

  const resetGame = () => {
    setChallenges([]);
    setPlayerNames([]);
    setPlayerStatuses([]);
    setRegisteredPlayers(new Set());
  };

  const resetValidations = () => {
    setPlayerStatuses([]);
  };

  // Vérifier si tous les joueurs sont validés
  useEffect(() => {
    const totalPlayers = registeredPlayers.size;
    console.log('Current playerStatuses:', playerStatuses);
    console.log('Total players:', totalPlayers);
    console.log('Registered players:', Array.from(registeredPlayers));
    
    const validatedCount = playerStatuses.filter(status => status.isValidated).length;
    console.log('Validated count:', validatedCount);
    
    const allValidated = validatedCount === totalPlayers && totalPlayers > 0;
    console.log('All validated:', allValidated);

    if (allValidated) {
      console.log('Redirecting to /draw');
      router.push('/draw');
    }
  }, [playerStatuses, registeredPlayers, router]);

  const value = {
    challenges,
    playerNames,
    playerStatuses,
    addChallenge,
    removeChallenge,
    updatePlayerName,
    validatePlayer,
    isPlayerValidated,
    registerPlayer,
    resetGame,
    resetValidations
  };

  return (
    <ChallengeContext.Provider value={value}>
      {children}
    </ChallengeContext.Provider>
  );
}

export function useChallengeContext() {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error("useChallengeContext must be used within a ChallengeProvider");
  }
  return context;
}
