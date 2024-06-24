import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Layout from "./Layout";
import ErrorPage from "./Pages/ErrorPage";
import ReadMore from "./Pages/ReadMore";
import SettingsPage from "./Pages/SettingPage";
import Map from "./Pages/Map/Map";
import Profil from "./Pages/Profil";
import RegisterPage from "./Pages/RegisterPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
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
