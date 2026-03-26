import Header from "../widgets/header/ui/Header";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "@/shared/components/ui/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <div className="app-container">
        <Header />
        <Outlet />
      </div>
    </ErrorBoundary>
  );
}

export default App;
