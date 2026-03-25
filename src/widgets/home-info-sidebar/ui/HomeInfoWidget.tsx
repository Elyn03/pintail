import "@/widgets/home-info-sidebar/styles/HomeInfoWidget.css"
import Calendar from "@/widgets/home-info-sidebar/ui/Calendar.tsx";
import TrendCard from "@/widgets/home-info-sidebar/ui/TrendCard.tsx";

export default function HomeInfoWidget() {
  return (
    <div className="profile-widget">
      <Calendar />
      <TrendCard />
    </div>
  );
}