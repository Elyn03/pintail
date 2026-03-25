import { Link } from "react-router-dom";
import { useAuthStore } from "@/app/store/useUserStore";
import { useLogout } from "@/features/auth/model/useLogout";

export default function Header() {
  const session = useAuthStore((s) => s.session);
  const username = useAuthStore((s) => s.username);
  const { mutate: handleLogout } = useLogout();

  return (
    <header className="header">
      <div className="header-container">
        <h1>Pintail - Plan you journey like a duck</h1>
        {session ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/calendar">Calendar</Link>
            <span className="user-info">Welcome, {username || "User"}</span>
            <button onClick={() => handleLogout()} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </header>
  );
}
