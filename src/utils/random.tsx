export const defis = [
  "Fais 10 pompes",
  "Chante une chanson",
  "Raconte une blague",
  "Fais une danse",
  "Imite un animal",
  "Fais le poirier",
  "Récite l'alphabet à l'envers",
  "Fais 20 squats"
];

export const getRandomDefi = () => {
  return defis[Math.floor(Math.random() * defis.length)];
};