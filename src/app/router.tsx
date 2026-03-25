import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CalendarPage from "../pages/Calendar/ui/CalendarPage";
import App from "./App";
import LoginPage from "../pages/Login/ui/LoginPage";
import { RegisterPage } from "@/pages/Login/ui/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/calendar",
        element: <CalendarPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);
