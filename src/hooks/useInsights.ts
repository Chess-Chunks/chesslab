import { type Insight, type Platform } from "@/lib/types";

import { useQuery } from "@tanstack/react-query";
import { fetchInsightByUsername } from "@/lib/api";

export function useInsights(
  insight: Insight,
  platform: Platform,
  username: string
) {
  return useQuery({
    queryKey: [`insights-${insight}-${platform}-${username}`, username],
    queryFn: () => fetchInsightByUsername(insight, platform, username),
  });
}
