import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function CreateUserForm({ users, setUsers }) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const history = useHistory();

    const handleUserName = (event) => {
        setUserName(event.target.value);
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastName = (event) => {
        setLastName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const userToCreate = {
            userName,
            email,
            profile: {
                firstName,
                lastName,
            }
        };
        console.log("User to create: ", userToCreate);

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userToCreate),
        };

        fetch("http://localhost:3030/users", fetchOptions)
            .then((res) => res.json())
            .then((newUser) => {
                console.log("New user: ", newUser)


                setUsers([newUser, userToCreate]);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create User</h1>
            <ul>
                <li>
                    <label>Username</label>
                    <input
                        onChange={handleUserName}
                        id="userName"
                        name="userName"
                        type="text"
                        value={userName} />
                </li>
                <li>
                    <label>Email</label>
                    <input
                        onChange={handleEmail}
                        id="email"
                        name="email"
                        type="email"
                        value={email} />
                </li>
                <li>
                    <label>First Name</label>
                    <input
                        onChange={handleFirstName}
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={firstName} />
                </li>
                <li>
                    <label>Last Name</label>
                    <input
                        onChange={handleLastName}
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={lastName} />
                </li>
                <li>
                    <button type="submit" onClick={() => history.push("/users")}>Submit</button>
                </li>
            </ul>
        </form>
    );
}
