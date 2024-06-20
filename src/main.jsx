import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Layout from "./Layout";
import ErrorPage from "./Components/Pages/ErrorPage";
import ReadMore from "./Components/Pages/ReadMore";
import SettingsPage from "./Components/Pages/SettingPage";
import LandingPage from "./Components/Pages/LandingPage";
import Map from "./Components/Pages/Map/Map";
import Profil from "./Components/Pages/Profil";
import RegisterPage from "./Components/Pages/RegisterPage";


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
        path: "register",
        element: <RegisterPage />,
      },
     
      {
        path: "map",
        element: <Map />,
      },
      {
        path: "profil",
        element: <Profil />,
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
