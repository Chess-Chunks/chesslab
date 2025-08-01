// Filters
export interface Filters {
  platform: Platform;
  username: string;
  startDate: Date;
  endDate: Date;
}

export type Insight = "results" | "rating-history";
export type Platform = "chessdotcom" | "lichess";

// Charts
export interface PieChartData {
  name: string;
  value: number;
}

export interface AreaChartData {
  name: string;
  value: number;
}

export interface RatingHistoryData {
  date: string; // ISO date string
  rating: number;
}
