import connexion from "../config/bdd.js";

export const getAllUsers = async () => {
  const selectAllUsers = "SELECT * FROM user";
  const [response] = await connexion.query(selectAllUsers);
  return response;
};

export const getAllRoles = async () => {
  const selectAllRoles =
    "SELECT user.NomUser, user.PrenomUser, role.NomRole FROM user INNER JOIN role ON user.RoleId = role.RoleId";
  const [response] = await connexion.query(selectAllRoles);
  return response;
};

export const getAllUsersById = async (id) => {
  // IMPORTANT DE METTRE LE "?" ! EMPECHE L'INJECTION SQL (attaque pirate) PUIS on ajoute un paramètre [id] à la fonction
  const selectAllUsersId =
    "SELECT user.NomUser, user.PrenomUser, user.Mail FROM user WHERE UserId = ?";
  const [response] = await connexion.query(selectAllUsersId, [id]);
  return response;
};

export const addUser = async (
  PrenomUser, NomUser, Mail, hashMdp, DateNaissance, DateInscription, RoleId
) => {
  const sql = `
    INSERT INTO user (PrenomUser, NomUser, Mail, MotDePasse, DateNaissance, DateInscription, RoleId)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const [result] = await connexion.query(
    sql, [PrenomUser, NomUser, Mail, hashMdp, DateNaissance, DateInscription, RoleId]
  );
  return result;
};

export const updateUser = async (id, PrenomUser, NomUser, Mail, MotDePasse, DateNaissance, RoleId) => {
  let sql;
  let params;

  try {
    if (MotDePasse) {
      sql = `
        UPDATE user SET PrenomUser = ?, NomUser = ?, Mail = ?, MotDePasse = ?, DateNaissance = ?, RoleId = ?
        WHERE UserId = ?
      `;
      params = [PrenomUser, NomUser, Mail, MotDePasse, DateNaissance, RoleId, id];
    } else {
      sql = `
        UPDATE user SET PrenomUser = ?, NomUser = ?, Mail = ?, DateNaissance = ?, RoleId = ?
        WHERE UserId = ?
      `;
      params = [PrenomUser, NomUser, Mail, DateNaissance, RoleId, id];
    }

    console.log("SQL Query:", sql);
    console.log("Params:", params);

    const [result] = await connexion.query(sql, params);

    console.log("Query result:", result);

    return result;
  } catch (error) {
    console.error("Erreur dans updateUser model:", error);
    throw error;
  }
};

export const deleteUser = async (UserId) => {
  const delUser = `
    DELETE FROM user
    WHERE UserId = ?;
  `;
  const [result] = await connexion.query(delUser, [UserId]);
  return result;
};