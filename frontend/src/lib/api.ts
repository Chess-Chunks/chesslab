import { type Insight, type Platform } from "./types";

export const fetchInsightByUsername = async (
  insight: Insight,
  platform: Platform,
  username: string
) => {
  const res = await fetch(`/api/v1/users/${platform}/${username}/${insight}`);
  if (!res.ok) {
    throw new Error(`Error fetching ${insight} for ${username} on ${platform}`);
  }
  return res.json();
};
