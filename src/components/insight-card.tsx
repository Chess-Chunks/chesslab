import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface InsightCardProps {
  name: string;
  description: string;
  chart: React.ReactNode;
  loading?: boolean;
  error?: boolean;
}

export function InsightCard({
  name,
  description,
  chart,
  loading = false,
  error = false,
}: InsightCardProps) {
  return (
    <Card className="w-full max-w-sm shadow-sm hover:shadow-lg transition-shadow duration-100">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-red-500 text-center py-8">
            Error loading data.
          </div>
        ) : loading ? (
          <Skeleton className="h-32 w-full rounded" />
        ) : (
          chart
        )}
      </CardContent>
      <CardFooter>
        <CardDescription>{description}</CardDescription>
      </CardFooter>
    </Card>
  );
}
