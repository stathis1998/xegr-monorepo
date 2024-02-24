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
import { About } from "./pages/secured/about";
import { CommunityGuidelines } from "./pages/CommunityGuidelines";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
      {
        path: "/about",
        element: <About />,
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
  {
    path: "/community-guidelines",
    element: <CommunityGuidelines />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  </>
);
