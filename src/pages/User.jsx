import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

export default function User() {
  const history = useHistory();
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3030/users/${userId}`)
      .then((res) => res.json())
      .then((userData) => {
        console.log(userData);
        if (userData === null) {
          history.push("/users");
        }
        setUser(userData);
      });
  }, [userId]);

  if (user === null) {
    return "loading";
  }

  return (
    <>
      <h2>Username: {user.userName}</h2>
      <p>Recipes: </p>
      <ul>
        {user.recipes.map((recipe, index) => {
          const { title, prepTime, cookingTime, description } = recipe;

          return (
            <li key={index}>
              <p>
                <span>Title: {title}</span> <br />
                <span>Preparation time: {prepTime}</span> <br />
                <span>Cooking time: {cookingTime}</span> <br />
                <span>Description: {description}</span>
              </p>
              <button
                onClick={() => history.push(`/recipes/${recipe.id}/edit`)}
              >
                Edit recipe
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
