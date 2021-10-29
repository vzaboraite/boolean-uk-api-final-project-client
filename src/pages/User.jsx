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
      <h3>Email: {foundUser.email}</h3>
      {foundUser.profile && (
        /*
        Here using optional chaining `?.` operator, to check if the `profile` property exists in `foundUser` 
        object. Then using `??` operator we return an empty string if the `profile` property is null or undefined.
        References:
         binary logical operators => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators
         ?? operator => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
         ?. operator => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
       */
        <>
          <p>{foundUser.profile?.firstName ?? ""}</p>
          <p>{foundUser.profile?.lastName ?? ""}</p>
        </>
      )}
      <button onClick={() => history.push(`/users/${userId}/edit`)}>
        Edit user
      </button>
      <button onClick={() => history.push(`/users/${userId}/recipes/create`)}>
        Add recipe
      </button>
      {foundUser.recipes.length > 0 && (
        <>
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
      )}
    </>
  );
}
