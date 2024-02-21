import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";

import { Toaster } from "sonner";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./pages/error/ErrorPage";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/terms-of-service",
        element: <div>Terms of Service</div>,
      },
      {
        path: "/privacy-policy",
        element: <div>Privacy Policy</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
);
