export const defis = [
  "Vous devez boire votre shooter d'alcool à l'envers",
  "Ni oui ni non, chaque perdant boit",
  "Créez un cocktail. Pierre papier ciseaux, le perdant boit le cocktail",
  "Celui qui imite le mieux le singe ne boit pas",
  "Chacun choisit droite ou gauche (ceux qui ont choisi droite boivent)",
  "Chacun votre tour donnez un nom de film qui commence par T. Le gagnant ne boit pas",
  "Celui qui imite le mieux l'oiseau ne boit pas",
  "Celui qui imite le mieux le chat ne boit pas",
  "Tout le monde dit sa position préférée (ceux qui n'ont pas dit levrette boivent)",
  "Chacun fait une blague, si personne ne rit il boit",
  "Ceux qui arrivent à toucher leur nez avec la langue ne boivent pas",
  "Ceux qui n'ont pas vu Le Seigneur des Anneaux boivent",
  "Les personnes portant un vêtement noir boivent",
  "On décide d'un signe à faire. Maintenant il est obligatoire de faire ce signe avant de boire sinon double boisson",
  "Place ton pouce n'importe où. Tout le monde fait pareil, le dernier a perdu",
  "Les personnes en couple boivent",
  "Buvez sans les mains",
  "Choisissez un mot. Chacun doit trouver un mot qui rime avec ce mot, le dernier à trouver gagne",
  "La personne la plus grande boit une gorgée",
  "Chante une chanson en miaulant. Ceux qui ne trouvent pas boivent",
  "Imite un personnage de film. Ceux qui ne l'ont pas boivent",
  "Ceux qui râlent au volant doivent boire une gorgée",
  "Les fumeurs boivent",
  "Le joueur en face boit une gorgée",
];

export const getRandomDefi = () => {
  return defis[Math.floor(Math.random() * defis.length)];
};
