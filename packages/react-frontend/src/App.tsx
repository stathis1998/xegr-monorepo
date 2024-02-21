import { Button } from "./components/ui/button";

import { Register } from "./pages/auth/register";

import { useValidate } from "./hooks/useValidate";

function App() {
  useValidate();

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button>Click me</Button>
    </>
  );
}

export { App };
