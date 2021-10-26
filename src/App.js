import { Switch, Router } from "react-router-dom";
import CreateUserForm from "./components/CreateUserForm"

function App() {
  return (
    <>
      <Switch>
        <Router exact path="/users">
          <CreateUserForm />
        </Router>
      </Switch>
    </>
  );
}

export default App;
