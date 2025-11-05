import { useState, useEffect } from "react";
import { allUsers } from "../services/userAPI";

function UserList() {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await allUsers();
            setUsers(response.data);

        } catch (error) {
            console.error(error);

        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    console.log(users);


    return (
        <div>
            <h1>List of users</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.UserId}>
                            <td>{user.UserId}</td>
                            <td>{user.NomUser}</td>
                            <td>{user.MAIL}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default UserList;