import {Link, NavLink} from "react-router-dom";
import { useAuthStore } from "@/app/store/useUserStore";
import { useLogout } from "@/features/auth/model/useLogout";
import logo_pintail from "../../../assets/logo_pintail.svg";
import "../styles/Header.css";

export default function Header() {
  const session = useAuthStore((s) => s.session);
  const username = useAuthStore((s) => s.username);
  const { mutate: handleLogout } = useLogout();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className={"nav-link logo"}>
          <img src={logo_pintail} alt=""/>
          <h1>Plan you journey like a duck</h1>
        </Link>

        <nav className="nav">
          {session ? (
            <>
              <NavLink to="/calendar" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Calendar</NavLink>
              <span className="user-info">Welcome, {username || "User"}</span>
              <button onClick={() => handleLogout()} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Login</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
