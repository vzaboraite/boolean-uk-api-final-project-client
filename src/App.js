import { Switch, Route } from "react-router-dom";
import { useState } from "react";
import CreateRecipeForm from "./components/CreateRecipeForm";
import Users from "./pages/Users";
import User from "./pages/User";
import Recipes from "./pages/Recipes";
import CreateUserForm from "./components/CreateUserForm";

function App() {
  const [recipes, setRecipes] = useState([]);

  return (
    <>
      <Switch>
        <Route exact path="/recipes/create">
          <CreateRecipeForm recipes={recipes} setrecipes={setRecipes} />
        </Route>
        <Route exact path="/users/create">
          <CreateUserForm />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/users/:userId">
          <User />
        </Route>
        <Route exact path="/recipes">
          <Recipes />
        </Route>
      </Switch>
    </>
  );
}

export default App;
