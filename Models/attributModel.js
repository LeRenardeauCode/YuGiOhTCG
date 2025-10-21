import connexion from '../config/bdd.js';


export const getAllAttributs = async () => {
  const selectAllAttributs = "SELECT * FROM attribut";
  const [response] = await connexion.query(selectAllAttributs)
  return response;
}

export const createAttribut = async (NomAttribut) => {
  const sql = "INSERT INTO attribut (NomAttribut) VALUES (?)";
  const [result] = await connexion.query(sql, [NomAttribut]);
  return result;
};

export const updateAttribut = async (id, NomAttribut) => {
  const sql = `
    UPDATE attribut
    SET NomAttribut = ?
    WHERE AttributId = ?
  `;
  const [result] = await connexion.query(sql, [NomAttribut, id]);
  return result;
};

export const deleteAttribut = async (id) => {
  const sql = `
    DELETE FROM attribut WHERE AttributId = ?
  `;
  const [result] = await connexion.query(sql, [id]);
  return result;
};

