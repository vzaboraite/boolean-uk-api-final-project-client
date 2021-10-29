import { useHistory } from "react-router-dom";
import User from "./User";

export default function Users({ users }) {
  const history = useHistory();

  // console.log({ users });

  return (
    <>
      <ul>
        <li>
          <button onClick={() => history.push("/users/create")}>
            Add user
          </button>
        </li>
        {users.map((user, index) => {
          return (
            <li key={index}>
              <p>
                <span>Username: {user.userName}</span> <br />
                <span>Email: {user.email}</span>
              </p>
              <button onClick={() => history.push(`/users/${user.id}`)}>
                Show profile
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
