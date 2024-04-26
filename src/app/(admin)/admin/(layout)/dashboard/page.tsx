import { ChartsComponent } from "@/app/(admin)/_components/dashboard/charts";
import { StatsComponent } from "@/app/(admin)/_components/dashboard/stats";

const DashboardPage = () => {
  return (
    <div>
      <StatsComponent />
      <ChartsComponent />
    </div>
  );
}
 
export default DashboardPage;