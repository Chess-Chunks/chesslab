import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface InsightCardProps {
  name: string;
  description: string;
  chart: React.ReactNode;
}

export function InsightCard({ name, description, chart }: InsightCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>{chart}</CardContent>
      <CardFooter>
        <CardDescription>{description}</CardDescription>
      </CardFooter>
    </Card>
  );
}
