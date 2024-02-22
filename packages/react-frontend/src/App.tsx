import { useValidate } from "./hooks/useValidate";
import { Navigation } from "./components/Navigation";
import { Outlet } from "react-router-dom";

function App() {
  useValidate();

  return (
    <div className="flex flex-col h-full">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export { App };
