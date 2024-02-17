import "./App.css";
import { Data } from "express-server/server";

function App() {
  return (
    <>
      <button
        onClick={() =>
          fetch(
            `http://${import.meta.env.VITE_SERVER_DOMAIN}:${
              import.meta.env.VITE_SERVER_PORT
            }/data`
          )
            .then((response) => response.json())
            .then((value: Data) => console.log(value.data))
        }
      >
        Fetch
      </button>
    </>
  );
}

export default App;
