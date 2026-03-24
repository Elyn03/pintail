import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1>Pintail - Plan you journey like a duck</h1>
        <Link to="/">Home</Link>
        <Link to="/calendar">Calendar</Link>
      </div>
    </header>
  );
}
