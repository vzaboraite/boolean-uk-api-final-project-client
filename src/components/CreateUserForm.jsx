import { useState } from "react";

export default function CreateUserForm({ users, setUsers }) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleUserName = (event) => {
        console.log("User handler: ", event.target.value)

        setUserName(event.target.value);
    };

    const handleEmail = (event) => {
        console.log("User email: ", event.target.value)

        setEmail(event.target.value);
    };

    const handleFirstName = (event) => {
        console.log("User firstName: ", event.target.value)

        setFirstName(event.target.value);
    };

    const handleLastName = (event) => {
        console.log("User lastName: ", event.target.value)

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


                // setUsers([...newUser, userToCreate]);
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
                    <button type="submit">Submit</button>
                </li>
            </ul>
        </form>
    );
}
