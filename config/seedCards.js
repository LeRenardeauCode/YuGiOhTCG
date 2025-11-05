import connexion from '../config/bdd.js';

async function seedCards() {
  const nombreCartes = 600;
  
  const typesCartes = [
    { Id: 1, Nom: 'Monstre' },
    { Id: 2, Nom: 'Magie' },
    { Id: 3, Nom: 'Piège' },
    { Id: 4, Nom: 'Lien' },
  ];
  
  const attributs = [
    { Id: 1, Nom: 'Lumière' },
    { Id: 2, Nom: 'Ténèbres' },
    { Id: 3, Nom: 'Feu' },
  ];

  for (let i = 1; i <= nombreCartes; i++) {
    const NomCarte = `CarteYugiOh${i}`;
    const DescriptionCarte = `Description de la carte numéro ${i}`;
    const ImageUrl = `https://example.com/carte${i}.jpg`;

    const TypeCarte = typesCartes[i % typesCartes.length];
    // Magie/Piège/Lien n'ont pas d'attribut
    const Attribut = TypeCarte.Nom === 'Monstre' ? attributs[i % attributs.length] : null;

    let NiveauCarte = null;
    let RangCarte = null;
    let LienRating = null;

    if (TypeCarte.Nom === 'Lien') {
      RangCarte = null;
      LienRating = (i % 8) + 1;
    } else if (TypeCarte.Nom === 'Monstre') {
      NiveauCarte = (i % 12) + 1;
    } else if (TypeCarte.Nom === 'Piège' || TypeCarte.Nom === 'Magie') {
      NiveauCarte = null;
    }

    let EchellePendule = null;
    if (TypeCarte.Nom === 'Magie' || TypeCarte.Nom === 'Piège') {
      EchellePendule = (i % 13) + 1;
    }

    const ATK = TypeCarte.Nom === 'Monstre' ? (1000 + (i * 4) % 3000) : null;
    const DEF = TypeCarte.Nom === 'Monstre' ? (800 + (i * 3) % 2500) : null;
    const EffetCarte = `Effet spécial unique pour la carte numéro ${i}`;

    await connexion.execute(
      `INSERT INTO carte (
        NomCarte, DescriptionCarte, ImageUrl, TypeCarteId, AttributId, NiveauCarte, ATK, DEF, RangCarte, LienRating, EchellePendule, EffetCarte
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        NomCarte,
        DescriptionCarte,
        ImageUrl,
        TypeCarte.Id,
        Attribut ? Attribut.Id : null,
        NiveauCarte,
        ATK,
        DEF,
        RangCarte,
        LienRating,
        EchellePendule,
        EffetCarte
      ]
    );
  }
  console.log(`${nombreCartes} cartes insérées en base.`);
}

seedCards().catch(console.error).finally(() => connexion.end());
