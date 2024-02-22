import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";

import { Toaster } from "@/components/ui/sonner";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./pages/error/ErrorPage";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { TermsOfServices } from "./pages/TermsOfServices";
import { PrivacePolicy } from "./pages/PrivacyPolicy";
import { Home } from "./pages/secured/home";
import { AdView } from "./pages/secured/adView";
import { AdsView } from "./pages/secured/adsView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/ads",
        element: <AdsView />,
      },
      {
        path: "/ads/:id",
        element: <AdView />,
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
  {
    path: "/terms-of-service",
    element: <TermsOfServices />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacePolicy />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
);
