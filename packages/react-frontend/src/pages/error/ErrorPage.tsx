import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();

  const errorMessages = [
    "Well, this is awkward. Something went a bit wonky.",
    "Oops! Our server is playing hide and seek. Please try again later.",
    "The gremlins are at it again. We're on it!",
    "Uh-oh! The internet hamsters stopped running. We're fixing it!",
    "Alert! Our code is having a coffee break. Please stand by.",
    "Mystery error! Not even our tech wizards know what happened.",
    "Whoops! We tripped over a rogue cable. Be right back.",
    "Your request is in a digital maze. Lost but not forgotten.",
    "System hiccup detected! Rebooting our magic spells.",
    "Technical oopsie! It's not you, it's us. Promise.",
  ];

  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center items-center gap-4">
      <h1 className="font-bold text-2xl">Oops!</h1>
      <p>{errorMessages[Math.floor(Math.random() * errorMessages.length)]}</p>
      {isRouteErrorResponse(error) && <div>{error.data}</div>}
      <Link to="/" className="text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  );
}
