import { useHistory } from "react-router-dom";

export default function Recipes({ recipes }) {
  console.log("Inside Recipes props: ", recipes);
  const history = useHistory();

  return (
    <>
      <h2>All recipes</h2>
      <ul>
        {recipes.map((recipe, index) => {
          console.log(recipe);
          const { title, prepTime, cookingTime, description } = recipe;

          return (
            <li key={index}>
              <p>
                <span>Title: {title}</span> <br />
                <span>Preparation time: {prepTime}</span> <br />
                <span>Cooking time: {cookingTime}</span> <br />
                <span>Description: {description}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
