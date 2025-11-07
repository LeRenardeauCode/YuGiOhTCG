import connexion from './config/bdd.js';

async function seedAll() {
  try {
    console.log('🧹 Nettoyage des tables...');
    // Nettoyage des tables liées en ordre correct pour respecter les FK
    await connexion.execute('DELETE FROM carte_sous_type');
    await connexion.execute('DELETE FROM carte_race');
    await connexion.execute('DELETE FROM carte_edition');
    await connexion.execute('DELETE FROM carte');

    console.log('📦 Insertion des types de cartes...');
    // 1. Types de cartes
    const typesCartes = [
      { NomTypeCarte: 'Monstre' },
      { NomTypeCarte: 'Magie' },
      { NomTypeCarte: 'Piège' },
      { NomTypeCarte: 'Lien' },
    ];
    for (const type of typesCartes) {
      await connexion.execute(`INSERT IGNORE INTO type_carte (NomTypeCarte) VALUES (?)`, [type.NomTypeCarte]);
    }

    console.log('🌟 Insertion des attributs...');
    // 2. Attributs
    const attributs = [
      { NomAttribut: 'Lumière' },
      { NomAttribut: 'Ténèbres' },
      { NomAttribut: 'Feu' },
      { NomAttribut: 'Eau' },
      { NomAttribut: 'Terre' },
      { NomAttribut: 'Vent' },
    ];
    for (const attr of attributs) {
      await connexion.execute(`INSERT IGNORE INTO attribut (NomAttribut) VALUES (?)`, [attr.NomAttribut]);
    }

    console.log('💎 Insertion des raretés...');
    // 3. Raretés
    const raretes = [
      { NomRarete: 'Commun' },
      { NomRarete: 'Rare' },
      { NomRarete: 'Super Rare' },
      { NomRarete: 'Ultra Rare' },
      { NomRarete: 'Secret Rare' },
    ];
    for (const r of raretes) {
      await connexion.execute(`INSERT IGNORE INTO rarete (NomRarete) VALUES (?)`, [r.NomRarete]);
    }

    console.log('📚 Insertion des éditions...');
    // 4. Editions
    const editions = [
      { NomEdition: 'Legend of Blue Eyes White Dragon', CodeEdition: 'LOB', DateEdition: '2002-03-08', TypeImpression: '1st Edition' },
      { NomEdition: 'Metal Raiders', CodeEdition: 'MRD', DateEdition: '2003-04-21', TypeImpression: 'Unlimited' },
      { NomEdition: 'Invasion of Chaos', CodeEdition: 'IOC', DateEdition: '2004-07-12', TypeImpression: 'Limited' },
      { NomEdition: 'Pharaoh\'s Servant', CodeEdition: 'PSV', DateEdition: '2005-10-11', TypeImpression: 'Unlimited' },
      { NomEdition: 'Labyrinth of Nightmare', CodeEdition: 'LON', DateEdition: '2006-07-01', TypeImpression: '1st Edition' },
      { NomEdition: 'Legacy of Darkness', CodeEdition: 'LOD', DateEdition: '2007-01-18', TypeImpression: 'Promo' },
      { NomEdition: 'Phantom Darkness', CodeEdition: 'PTD', DateEdition: '2008-03-26', TypeImpression: '1st Edition' },
      { NomEdition: 'The Duelist Genesis', CodeEdition: 'TDG', DateEdition: '2009-05-31', TypeImpression: 'Unlimited' },
      { NomEdition: 'Rise of Destiny', CodeEdition: 'ROD', DateEdition: '2010-12-09', TypeImpression: '1st Edition' },
      { NomEdition: 'Shadow Specters', CodeEdition: 'SDS', DateEdition: '2011-09-08', TypeImpression: 'Limited' },
    ];
    for (const ed of editions) {
      await connexion.execute(
        `INSERT IGNORE INTO edition (NomEdition, CodeEdition, DateEdition, TypeImpression) VALUES (?, ?, ?, ?)`,
        [ed.NomEdition, ed.CodeEdition, ed.DateEdition, ed.TypeImpression]
      );
    }

    console.log('🐉 Insertion des races...');
    // 5. Races
    const races = [
      { NomRace: 'Dragon' },
      { NomRace: 'Guerrier' },
      { NomRace: 'Magicien' },
      { NomRace: 'Bête' },
      { NomRace: 'Zombie' },
      { NomRace: 'Aqua' },
      { NomRace: 'Rocher' },
      { NomRace: 'Plante' },
      { NomRace: 'Pyro' },
      { NomRace: 'Spectre' },
    ];
    for (const race of races) {
      await connexion.execute(`INSERT IGNORE INTO race (NomRace) VALUES (?)`, [race.NomRace]);
    }

    console.log('🔖 Insertion des sous-types...');
    // 6. Sous-types
    const sousTypes = [
      { NomSousType: 'Dragon Ancien', TypeCarteId: 1 },
      { NomSousType: 'Dragon des Ténèbres', TypeCarteId: 1 },
      { NomSousType: 'Sort Instantané', TypeCarteId: 2 },
      { NomSousType: 'Piège Continu', TypeCarteId: 3 },
      { NomSousType: 'Lien Démoniaque', TypeCarteId: 4 },
    ];
    for (const st of sousTypes) {
      await connexion.execute(
        `INSERT IGNORE INTO sous_type_carte (NomSousType, TypeCarteId) VALUES (?, ?)`,
        [st.NomSousType, st.TypeCarteId]
      );
    }

    console.log('📊 Récupération des données de référence...');
    // Récupération des données pour usage dans les cartes
    const [typeDb] = await connexion.query('SELECT * FROM type_carte');
    const [attributDb] = await connexion.query('SELECT * FROM attribut');
    const [editionDb] = await connexion.query('SELECT * FROM edition');
    const [rareteDb] = await connexion.query('SELECT * FROM rarete');
    const [raceDb] = await connexion.query('SELECT * FROM race');
    const [sousTypeDb] = await connexion.query('SELECT * FROM sous_type_carte');

    console.log('🎴 Génération de 600 cartes...');
    // Génération des 600 cartes avec références
    for (let i = 1; i <= 600; i++) {
      const NomCarte = `CarteYugiOh${i}`;
      const DescriptionCarte = `Description de la carte numéro ${i}`;
      const ImageUrl = `https://example.com/carte${i}.jpg`;

      const TypeCarte = typeDb[i % typeDb.length];
      const Attribut = TypeCarte.NomTypeCarte === 'Monstre' ? attributDb[i % attributDb.length] : null;

      let NiveauCarte = null;
      let RangCarte = null;
      let LienRating = null;

      if (TypeCarte.NomTypeCarte === 'Lien') {
        RangCarte = null;
        LienRating = (i % 8) + 1;
      } else if (TypeCarte.NomTypeCarte === 'Monstre') {
        NiveauCarte = (i % 12) + 1;
      }

      let EchellePendule = null;
      if (TypeCarte.NomTypeCarte === 'Magie' || TypeCarte.NomTypeCarte === 'Piège') {
        EchellePendule = (i % 13) + 1;
      }

      const ATK = TypeCarte.NomTypeCarte === 'Monstre' ? (1000 + (i * 4) % 3000) : null;
      const DEF = TypeCarte.NomTypeCarte === 'Monstre' ? (800 + (i * 3) % 2500) : null;
      const EffetCarte = `Effet spécial unique pour la carte numéro ${i}`;

      // Insérer la carte
      const [result] = await connexion.execute(
        `INSERT INTO carte (
          NomCarte, DescriptionCarte, ImageUrl, TypeCarteId, AttributId,
          NiveauCarte, ATK, DEF, RangCarte, LienRating, EchellePendule, EffetCarte
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          NomCarte, DescriptionCarte, ImageUrl, TypeCarte.TypeCarteId,
          Attribut ? Attribut.AttributId : null, NiveauCarte, ATK, DEF, RangCarte,
          LienRating, EchellePendule, EffetCarte,
        ]
      );

      const CarteId = result.insertId;

      // Insert into carte_edition
      const EditionId = editionDb[Math.floor(Math.random() * editionDb.length)].EditionId;
      const RareteId = rareteDb[Math.floor(Math.random() * rareteDb.length)].RareteId;
      const NumeroSerieCarte = `CB-${i.toString().padStart(4, '0')}-2025`;

      await connexion.execute(
        `INSERT INTO carte_edition (CarteId, EditionId, RareteId, NumeroSerieCarte) VALUES (?, ?, ?, ?)`,
        [CarteId, EditionId, RareteId, NumeroSerieCarte]
      );

      // Insert into carte_race (1-3 races par carte)
      const nbRaces = 1 + Math.floor(Math.random() * 3);
      const racesChoisies = [];
      for (let r = 0; r < nbRaces; r++) {
        let RaceId;
        do {
          RaceId = raceDb[Math.floor(Math.random() * raceDb.length)].RaceId;
        } while (racesChoisies.includes(RaceId));
        racesChoisies.push(RaceId);

        await connexion.execute(
          'INSERT IGNORE INTO carte_race (CarteId, RaceId) VALUES (?, ?)', [CarteId, RaceId]
        );
      }

      // Insert into carte_sous_type (1-2 sous-types compatibles)
      const sousTypesCompatibles = sousTypeDb.filter(st => st.TypeCarteId === TypeCarte.TypeCarteId);
      const nbSousTypes = 1 + Math.floor(Math.random() * 2);
      const sousTypesChoisis = [];
      for (let st = 0; st < nbSousTypes && sousTypesCompatibles.length > 0; st++) {
        let SousTypeId;
        do {
          SousTypeId = sousTypesCompatibles[Math.floor(Math.random() * sousTypesCompatibles.length)].SousTypeId;
        } while (sousTypesChoisis.includes(SousTypeId));
        sousTypesChoisis.push(SousTypeId);

        await connexion.execute(
          'INSERT IGNORE INTO carte_sous_type (CarteId, SousTypeId) VALUES (?, ?)',
          [CarteId, SousTypeId]
        );
      }

      // Affichage de progression tous les 50 cartes
      if (i % 50 === 0) {
        console.log(`   ✅ ${i} cartes insérées...`);
      }
    }

    console.log('✨ Seed complet terminé !');
    console.log('📊 Résumé :');
    console.log('   - Types de cartes, attributs, raretés, éditions, races et sous-types créés');
    console.log('   - 600 cartes générées avec toutes leurs relations');

  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
  } finally {
    connexion.end();
  }
}

seedAll();
