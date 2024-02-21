import { Button } from "./components/ui/button";

import { useUser } from "./hooks/useUser";
import { Register } from "./pages/auth/register";

function App() {
  const user = useUser();

  if (!user) {
    return <Register />;
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button>Click me</Button>
    </>
  );
}

export { App };
