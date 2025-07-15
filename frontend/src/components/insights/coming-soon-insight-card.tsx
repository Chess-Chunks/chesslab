import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export function ComingSoonInsightCard() {
  return (
    <Card className="flex flex-col items-center justify-center min-h-72 max-h-72">
      <CardHeader className="flex flex-col items-center gap-4">
        <Clock className="h-8 w-8 text-muted-foreground" />
        <CardTitle className="text-nowrap">
          More Insights Coming Soon!
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
