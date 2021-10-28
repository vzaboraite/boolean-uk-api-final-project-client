import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function EditUserForm({ users, setUsers }) {
  console.log("Inside EditUserForm state: ", users);

  const { userId } = useParams();
  const foundUser = users.find((user) => {
    console.log({ user });
    console.log({ id: user.id });
    console.log(user.id === parseInt(userId));
    return user.id === parseInt(userId);
  });
  console.log("foundUser:", foundUser);
  const [userToEdit] = useState(foundUser);
  const [userName, setUserName] = useState(userToEdit.userName);
  const [email, setEmail] = useState(userToEdit.email);
  const [firstName, setFirstName] = useState(userToEdit.profile.firstName);
  const [lastName, setLastName] = useState(userToEdit.profile.lastName);

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

    const userToUpdate = {
      userName,
      email,
      profile: {
        firstName,
        lastName,
      },
    };
    console.log("User to update: ", userToUpdate);

    const fetchOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToUpdate),
    };

    fetch(`http://localhost:3030/users/${userId}`, fetchOptions)
      .then((res) => res.json())
      .then((updatedUser) => {
        console.log("Updated user: ", updatedUser);

        const updatedUsers = users.map((user) => {
          if (updatedUser.id === userId) {
            return updatedUser;
          } else {
            return user;
          }
        });

        setUsers(updatedUsers);
        history.push("/users");
      });
  };

  const handleDelete = () => {
    const userToDelete = { ...userToEdit };
    const { id } = userToDelete;

    fetch(`http://localhost:3030/users/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);

        history.push("/users");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit profile</h1>
      <ul>
        <li>
          <label>Username</label>
          <input
            onChange={handleUserName}
            id="userName"
            name="userName"
            type="text"
            value={userName}
          />
        </li>
        <li>
          <label>Email</label>
          <input
            onChange={handleEmail}
            id="email"
            name="email"
            type="email"
            value={email}
          />
        </li>
        <li>
          <label>First Name</label>
          <input
            onChange={handleFirstName}
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
          />
        </li>
        <li>
          <label>Last Name</label>
          <input
            onChange={handleLastName}
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
          />
        </li>
        <li>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </li>
      </ul>
    </form>
  );
}
