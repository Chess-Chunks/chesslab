import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "../ui/separator";

interface InsightCardProps {
  name: string;
  icon: React.ReactNode;
  description: string;
  chart: React.ReactNode;
  loading?: boolean;
  error?: boolean;
  className?: string;
  id?: string;
}

export function InsightCard({
  name,
  icon,
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
      className={`w-full min-h-100 max-h-100 justify-between shadow-sm hover:shadow-lg transition-shadow duration-100 ${
        className ?? ""
      }`}
    >
      <CardHeader className="flex flex-col gap-4">
        <div className="flex items-center space-x-2">
          {icon && <span>{icon}</span>}
          <CardTitle className="m-0">{name}</CardTitle>
        </div>
        <Separator />
      </CardHeader>

      <CardContent className="flex-grow flex items-center justify-center">
        {error ? (
          <div className="text-red-500 text-center py-8">
            Error loading data.
          </div>
        ) : loading ? (
          <Skeleton className="h-64 w-full rounded" />
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
