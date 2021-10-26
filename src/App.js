import { Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import CreateRecipeForm from "./components/CreateRecipeForm";

function App() {
  const [recipes, setRecipes] = useState([]);

  return (
    <>
      <Switch>
        <Route exact path="/recipes/create">
          <CreateRecipeForm recipes={recipes} setrecipes={setRecipes} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
