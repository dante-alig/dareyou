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

export const getPlayerName = (
  playerNumber: number,
  playerNames: PlayerName[]
) => {
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
    const samExists = playerNames.some((player) => player.name === "Sam");

    const randomCardIndex = Math.floor(Math.random() * challenges.length);
    setSelectedIndex(randomCardIndex);

    setTimeout(() => {
      let selectedChallenge: Challenge;

      if (samExists) {
        const samFirstChallenge = challenges.find((challenge) => {
          const playerName = playerNames.find(
            (p) => p.player === challenge.player
          )?.name;
          return playerName === "Sam";
        });

        selectedChallenge =
          samFirstChallenge ||
          challenges[Math.floor(Math.random() * challenges.length)];
      } else {
        selectedChallenge =
          challenges[Math.floor(Math.random() * challenges.length)];
      }

      setRandomChallenge({
        challenge: selectedChallenge.challenge,
        playerNumber: selectedChallenge.player,
      });
      setIsFlipped(true);
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
