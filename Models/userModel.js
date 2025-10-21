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

export const addUtilisateur = async (
  prenomUser, nomUser, mail, hashMdp, dateNaissance, dateInscription, roleId
) => {
  const sql = `
    INSERT INTO user (PrenomUser, NomUser, Mail, MotDePasse, DateNaissance, DateInscription, RoleId)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const [result] = await connexion.query(
    sql, [prenomUser, nomUser, mail, hashMdp, dateNaissance, dateInscription, roleId]
  );
  return result;
};

export const updateUtilisateur = async (id, prenomUser, nomUser, mail, motDePasse, dateNaissance, roleId) => {
  let sql;
  let params;

  if (motDePasse) {
    // Met à jour avec mot de passe hashé
    sql = `
      UPDATE user SET PrenomUser = ?, NomUser = ?, Mail = ?, MotDePasse = ?, DateNaissance = ?, RoleId = ?
      WHERE UserId = ?
    `;
    params = [prenomUser, nomUser, mail, motDePasse, dateNaissance, roleId, id];
  } else {
    // Met à jour sans changer le mot de passe
    sql = `
      UPDATE user SET PrenomUser = ?, NomUser = ?, Mail = ?, DateNaissance = ?, RoleId = ?
      WHERE UserId = ?
    `;
    params = [prenomUser, nomUser, mail, dateNaissance, roleId, id];
  }

  const [result] = await connexion.query(sql, params);
  return result;
};

export const deleteUser = async () => {
  const delUser = `
  DELETE FROM user
  WHERE UserId = ?;
  `;
  const [result] = await connexion.query(delUser, [UserId]);
  return result;
}