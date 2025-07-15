export const INSIGHT_GROUPS = [
  {
    label: "Games",
    value: "games",
    icon: "Swords",
    insights: [
      { label: "Results", value: "results-history", icon: "Trophy" },
      { label: "Rating History", value: "rating-history", icon: "LineChart" },
    ],
  },
  {
    label: "Openings",
    value: "openings",
    icon: "BookOpen",
    insights: [
      {
        label: "Popular Openings",
        value: "popular-openings",
        icon: "BookOpen",
      },
    ],
  },
  {
    label: "Performance",
    value: "performance",
    icon: "BarChart",
    insights: [
      {
        label: "Performance Over Time",
        value: "performance-over-time",
        icon: "BarChart",
      },
      {
        label: "Accuracy Breakdown",
        value: "accuracy-breakdown",
        icon: "LineChart",
      },
    ],
  },
  {
    label: "Analysis",
    value: "analysis",
    icon: "Target",
    insights: [
      {
        label: "Mistakes and Blunders",
        value: "mistakes-blunders",
        icon: "Move",
      },
      { label: "Best Moves", value: "best-moves", icon: "Move" },
    ],
  },
];
