import { useHistory } from "react-router-dom";

export default function Users({ users }) {
  const history = useHistory();

  console.log({ users });

  return (
    <>
      <ul>
        <li>
          <button onClick={() => history.push("/users/create")}>
            Add user
          </button>
        </li>
        {users.map((user, index) => {
          console.log({ user });
          const { userName, email, profile } = user;

          return (
            <li key={index}>
              <p>
                <span>Username: {userName}</span> <br />
                <span>Email: {email}</span>
                <br />
              </p>
              <button onClick={() => history.push("/users/:userId")}>
                Show profile
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
