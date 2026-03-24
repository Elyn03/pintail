import Header from "../widgets/header/ui/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
