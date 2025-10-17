import connexion from "../config/bdd.js";

export const getAllUsers = async () => {
    const selectAllUsers = "SELECT * FROM user";
    const [response] = await connexion.query(selectAllUsers);
    return response;
}

export const getAllRoles = async () => {
    const selectAllRoles = "SELECT user.NomUser, user.PrenomUser, role.NomRole FROM user INNER JOIN role ON user.RoleId = role.RoleId";
    const [response] = await connexion.query(selectAllRoles);
    return response;
}