import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

export default function User({ users }) {
  const history = useHistory();
  const { userId } = useParams();

  const foundUser = users.find((user) => user.id === parseInt(userId));

  if (!foundUser) {
    history.push("/users");
    return null;
  }

  return (
    <>
      <h2>Username: {foundUser.userName}</h2>
      <p>Recipes: </p>
      <ul>
        {foundUser.recipes.map((recipe, index) => {
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
