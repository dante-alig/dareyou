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
  firework: () => void,
  playerNames: PlayerName[]
) => {
  if (selectedIndex === null) {
    // Vérifier si un joueur s'appelle Sam
    const samExists = playerNames.some(player => player.name === "Sam");
    
    // Sélectionner une carte aléatoire visuellement (toujours aléatoire pour l'effet visuel)
    const randomCardIndex = Math.floor(Math.random() * challenges.length);
    setSelectedIndex(randomCardIndex);
    
    setTimeout(() => {
      let selectedChallenge: Challenge;
      
      if (samExists) {
        // Si Sam existe, on prend son premier défi
        const samFirstChallenge = challenges.find(challenge => {
          const playerName = playerNames.find(p => p.player === challenge.player)?.name;
          return playerName === "Sam";
        });
        
        // Si on trouve un défi de Sam, on le prend, sinon on prend un défi aléatoire
        selectedChallenge = samFirstChallenge || challenges[Math.floor(Math.random() * challenges.length)];
      } else {
        // Sélection aléatoire normale si Sam n'existe pas
        selectedChallenge = challenges[Math.floor(Math.random() * challenges.length)];
      }

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
