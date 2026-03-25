import "../styles/HomePage.css";
import TripList from "../../../widgets/product-list/styles/TripList.tsx";
import HomeInfoWidget from "@/widgets/home-info-sidebar";

export default function HomePage() {
  return (
    <main className="main-content home-page-container">
      <section className="trip-list-wrapper">
        <TripList/>
      </section>

      <aside className="sidebar">
        <HomeInfoWidget/>
      </aside>
    </main>
  );
}