interface PlayerName {
  player: number;
  name: string;
}

interface Challenge {
  challenge: string;
  player: number;
}

interface RandomChallenge {
  challenge: string;
  playerNumber: number;
}

export const getPlayerName = (playerNumber: number, playerNames: PlayerName[]) => {
  const player = playerNames.find((p) => p.player === playerNumber);
  return player ? player.name : `Joueur ${playerNumber}`;
};

export const handleCardClick = (
  index: number,
  selectedIndex: number | null,
  challenges: Challenge[],
  setSelectedIndex: (index: number) => void,
  setRandomChallenge: (challenge: RandomChallenge) => void,
  setIsFlipped: (isFlipped: boolean) => void,
  firework: () => void
) => {
  if (selectedIndex === null) {
    setSelectedIndex(index);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * challenges.length);
      const selectedChallenge = challenges[randomIndex];
      setRandomChallenge({
        challenge: selectedChallenge.challenge,
        playerNumber: selectedChallenge.player,
      });
      setIsFlipped(true);
      // Lancer les feux d'artifice après que la carte soit retournée
      setTimeout(firework, 500);
    }, 800);
  }
};

export const handleRestart = (
  resetGame: () => void,
  router: { replace: (path: string) => void }
) => {
  resetGame();
  router.replace("/player");
};
