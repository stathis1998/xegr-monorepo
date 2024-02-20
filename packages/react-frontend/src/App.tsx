import "./App.css";
import { UserModel } from "./types/userTypes";

function App() {
  const user: UserModel = {
    username: "user",
    password: "password",
  };

  return <>{user.username}</>;
}

export default App;
