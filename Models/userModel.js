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
