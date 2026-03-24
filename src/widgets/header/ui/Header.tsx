import { CartWidget } from "../../cart-widget";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1>React Store - Context & Reducer Limits</h1>
        <CartWidget />
      </div>
    </header>
  );
}
