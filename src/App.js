import { Switch, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateRecipeForm from "./components/CreateRecipeForm";
import Users from "./pages/Users";
import User from "./pages/User";
import Recipes from "./pages/Recipes";
import CreateUserForm from "./components/CreateUserForm";
import EditUserForm from "./components/EditUserForm";
import EditRecipeForm from "./components/EditRecipeForm";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/users")
      .then((res) => res.json())
      .then((usersData) => {
        console.log({ usersData: usersData.data });
        setUsers(usersData.data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3030/recipes")
      .then((res) => res.json())
      .then((recipesData) => {
        console.log({ recipesData: recipesData.data });
        setRecipes(recipesData.data);
      });
  }, []);

  if (users.length === 0 || recipes.length === 0) {
    return "loading";
  }

  return (
    <>
      <ul>
        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/users">
          <Users users={users} />
        </Route>
        <Route exact path="/users/create">
          <CreateUserForm users={users} setUsers={setUsers} />
        </Route>
        <Route exact path="/users/:userId">
          <User users={users} />
        </Route>
        <Route exact path="/users/:userId/edit">
          <EditUserForm users={users} setUsers={setUsers} />
        </Route>
        <Route exact path="/recipes">
          <Recipes recipes={recipes} />
        </Route>
        <Route exact path="/users/:userId/recipes/create">
          <CreateRecipeForm recipes={recipes} setRecipes={setRecipes} />
        </Route>
        <Route exact path="/recipes/:recipeId/edit">
          <EditRecipeForm recipes={recipes} setRecipes={setRecipes} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
