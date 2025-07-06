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
  className?: string;
  id?: string;
}

export function InsightCard({
  name,
  description,
  chart,
  loading = false,
  error = false,
  className,
  id,
}: InsightCardProps) {
  return (
    <Card
      id={id}
      className={`w-full min-h-72 max-h-72 shadow-sm hover:shadow-lg transition-shadow duration-100 ${
        className ?? ""
      }`}
    >
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
