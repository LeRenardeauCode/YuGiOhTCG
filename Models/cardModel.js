import connexion from "../config/bdd.js";

export const getAllCards = async () => {
  const selectAllCards = `
SELECT carte.NomCarte, rarete.NomRarete, edition.NomEdition, attribut.NomAttribut, type_carte.NomTypeCarte
FROM carte
INNER JOIN carte_edition ON carte.CarteId = carte_edition.CarteId
INNER JOIN rarete ON carte_edition.RareteId = rarete.RareteId
INNER JOIN edition ON carte_edition.EditionId = edition.EditionId
INNER JOIN attribut ON carte.AttributId = attribut.AttributId
INNER JOIN type_carte ON carte.TypeCarteId = type_carte.TypeCarteId
`;
  const [response] = await connexion.query(selectAllCards);
  return response;
};

export const getAllCardsById = async (id) => {
  const selectAllCardsById = `
SELECT carte.NomCarte, rarete.NomRarete, edition.NomEdition, attribut.NomAttribut, type_carte.NomTypeCarte FROM carte
INNER JOIN carte_edition ON carte.CarteId = carte_edition.CarteId
INNER JOIN rarete ON carte_edition.RareteId = rarete.RareteId
INNER JOIN edition ON carte_edition.EditionId = edition.EditionId
INNER JOIN attribut ON carte.AttributId = attribut.AttributId
INNER JOIN type_carte ON carte.TypeCarteId = type_carte.TypeCarteId
WHERE carte.CarteId = ?;`;
  const [response] = await connexion.query(selectAllCardsById, [id]);
  return response;
};
