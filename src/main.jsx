import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { element } from "prop-types";

import Layout from "./Layout";
import ErrorPage from "./Pages/ErrorPage";
import ReadMore from "./Pages/ReadMore";
import SettingsPage from "./Pages/SettingPage";
import Profil from "./Pages/Profil";
import RegisterPage from "./Pages/RegisterPage";
import CreateTodo from "./Components/Todo/CreateTodo";
import MyTodos from "./Components/Todo/MyTodos";
import Tabulators from "./Pages/Tabulators";


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
        path: "home",
        element: <Tabulators />,
      },
      {
        path: "createTodo",
        element: <CreateTodo />,
      },
      {
        path: "myTodos",
        element: <MyTodos />
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
