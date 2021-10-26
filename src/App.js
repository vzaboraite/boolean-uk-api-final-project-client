import { Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateRecipeForm from "./components/CreateRecipeForm";
import Users from "./pages/Users";
import User from "./pages/User";
import Recipes from "./pages/Recipes";
import CreateUserForm from "./components/CreateUserForm";

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
