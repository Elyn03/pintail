import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/ui/HomePage";
import CalendarPage from "../pages/Calendar/ui/CalendarPage";
import App from "./App";
import LoginPage from "../pages/Login/ui/LoginPage";
import { RegisterPage } from "@/pages/Login/ui/RegisterPage";
import ProfilePage from "../pages/ProfilePage.tsx";
import TripPage from "../pages/TripPage.tsx";
import TripForm from "@/pages/TripForm";

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
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/trip/:id",
        element: <TripPage />,
      },
      {
        path: "/trip/new",
        element: <TripForm />,
      },
    ],
  },
]);
