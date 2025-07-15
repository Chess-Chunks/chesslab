export const INSIGHT_GROUPS = [
  {
    label: "Performance",
    value: "performance",
    icon: "BarChart",
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
    label: "Positional Play",
    value: "positional-play",
    icon: "LayoutGrid",
    insights: [
      {
        label: "Quiet Moves",
        value: "quiet-moves",
        icon: "Turtle",
      },
    ],
  },
  {
    label: "Tactics",
    value: "tactics",
    icon: "Zap",
    insights: [
      {
        label: "Trends",
        value: "tactical-trends",
        icon: "Target",
      },
      {
        label: "Puzzles",
        value: "puzzle-performance",
        icon: "Puzzle",
      },
    ],
  },
  {
    label: "Endgames",
    value: "endgames",
    icon: "Target",
    insights: [
      {
        label: "Performance",
        value: "endgame-accuracy",
        icon: "BarChart",
      },
      {
        label: "Weak Spots",
        value: "endgame-trends",
        icon: "Target",
      },
    ],
  },
];
