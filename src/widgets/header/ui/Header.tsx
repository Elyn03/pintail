import {useState, useCallback, useEffect} from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "@/app/store/useUserStore";
import { useLogout } from "@/features/auth/model/useLogout";
import logo_pintail from "../../../assets/logo_pintail.svg";
import "../styles/Header.css";

export default function Header() {
  const session = useAuthStore((s) => s.session);
  const username = useAuthStore((s) => s.username);
  const { mutate: handleLogout } = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenuOnNavigation = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const handleBurgerClick = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleLogoutClick = useCallback(() => {
    handleLogout();
    setMenuOpen(false);
  }, [handleLogout]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="nav-link logo" onClick={closeMenuOnNavigation}>
          <img src={logo_pintail} alt="Pintail logo" />
          <h1>Plan your journey like a duck</h1>
        </Link>

        <nav className="nav">
          {session ? (
            <>
              <NavLink
                to="/calendar"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={closeMenuOnNavigation}
              >
                Calendar
              </NavLink>
              <span className="user-info">Welcome, {username || "User"}</span>
              <button onClick={handleLogoutClick} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={closeMenuOnNavigation}
            >
              Login
            </NavLink>
          )}
        </nav>

        <button
          className={`burger ${menuOpen ? "open" : ""}`}
          onClick={handleBurgerClick}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <nav className="mobile-nav">
          {session ? (
            <>
              <span className="mobile-user">👤 {username || "User"}</span>
              <NavLink
                to="/calendar"
                className={({ isActive }) => `mobile-link ${isActive ? "active" : ""}`}
                onClick={closeMenuOnNavigation}
              >
                Calendar
              </NavLink>
              <button onClick={handleLogoutClick} className="mobile-logout">
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => `mobile-link ${isActive ? "active" : ""}`}
              onClick={closeMenuOnNavigation}
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>

      {menuOpen && (
        <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
      )}
    </header>
  );
}