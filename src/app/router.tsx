import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/ui/HomePage";
import CalendarPage from "../pages/Calendar/ui/CalendarPage";
import App from "./App";
import LoginPage from "../pages/Login/ui/LoginPage";
import { RegisterPage } from "@/pages/Login/ui/RegisterPage";
import TripPage from "../pages/Trip/ui/TripPage.tsx";
import { TripForm } from "@/pages/TripForm";
import ProtectedRoute from "@/shared/components/ui/ProtectedRoute.tsx";
import { ProfilePage } from "@/pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "/calendar", element: <CalendarPage /> },
          { path: "/trip/:id", element: <TripPage /> },
          { path: "/trip/new", element: <TripForm /> },
          { path: "/profile", element: <ProfilePage /> },
        ],
      },
    ],
  },
]);
