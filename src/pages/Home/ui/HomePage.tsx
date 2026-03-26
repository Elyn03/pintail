import "../styles/HomePage.css";
import HomeInfoWidget from "@/widgets/home-info-sidebar";
import {TripList} from "@/widgets/trip-list";
import {useSession} from "@/app/store/useUserStore.ts";

export default function HomePage() {
  const session = useSession();

  return (
    <main className="main-content home-page-container">
      <section className="trip-list-wrapper">
        <TripList user_id={session.user.id} />
      </section>

      <aside className="sidebar">
        <HomeInfoWidget/>
      </aside>
    </main>
  );
}