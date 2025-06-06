import "./App.css";
import { InsightCard } from "./components/ui/insight-card";
import { InteractiveBarChart } from "./components/ui/interactive-bar-chart";
import { InteractivePieChart } from "./components/ui/interactive-pie-chart";

function App() {
  return (
    <div className="flex flex-row flex-wrap gap-4">
      <InsightCard
        name="Wins, Losses, and Draws"
        description="A summary of the game results."
        chart={<InteractiveBarChart />}
      />
      <InsightCard
        name="Wins, Losses, and Draws"
        description="A summary of the game results."
        chart={<InteractivePieChart />}
      />
    </div>
  );
}

export default App;
