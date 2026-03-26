import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/app/store/useUserStore";

export default function ProtectedRoute() {
  const location = useLocation();
  const session = useAuthStore((s) => s.session);
  const isLoading = useAuthStore((s) => s.isLoading);

  if (isLoading) {
    return (
      <main className="main-content">
        <p>Loading session...</p>
      </main>
    );
  }

  if (!session?.user?.id) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}