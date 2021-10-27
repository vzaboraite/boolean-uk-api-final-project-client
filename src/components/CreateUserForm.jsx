import { useState } from "react";

export default function CreateUserForm({ users, setUsers }) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleUserName = (event) => {
        event.preventDefault();

        setUserName(event.target.vaule);
    };

    const handleEmail = (event) => {
        event.preventDefault();

        setEmail(event.target.vaule);
    };

    const handleFirstName = (event) => {
        event.preventDefault();

        setFirstName(event.target.vaule);
    };

    const handleLastName = (event) => {
        event.preventDefault();

        setLastName(event.target.vaule);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const userToCreate = {
            userName,
            email,
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
                const profileToCreate = {
                    firstName,
                    lastName,
                    userId: newUser.id,
                };
                console.log("Profile to create: ", profileToCreate)
                const fetchTools = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(profileToCreate),
                };

                fetch("http://localhost:3030/users", fetchTools)
                    .then((res) => res.json())
                    .then((newProfile) => {
                        const userToAdd = {
                            ...newUser,
                            profile: newProfile,
                        };

                        setUsers([...users, userToAdd]);
                    });
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
                        type="text"
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
                    <button type="submit">Submit</button>
                </li>
            </ul>
        </form>
    );
}
