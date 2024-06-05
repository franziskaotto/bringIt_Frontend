import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import ErrorPage from "./Components/Pages/ErrorPage";
import ReadMore from "./Components/Pages/ReadMore";
import User from "./Components/Pages/User";
import SettingsPage from "./Components/Pages/SettingPage";
import LandingPage from "./Components/Pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LandingPage />,
      },
      {
        path: "readMore",
        element: <ReadMore />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
