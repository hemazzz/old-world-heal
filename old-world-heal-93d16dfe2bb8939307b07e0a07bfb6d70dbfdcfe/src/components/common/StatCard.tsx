import { ReactNode, CSSProperties } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
  style?: CSSProperties;
}

export function StatCard({
  title,
  value,
  icon,
  description,
  trend,
  className,
  style,
}: StatCardProps) {
  return (
    <Card variant="vintage" className={cn("animate-fade-in", className)} style={style}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="font-heading text-3xl font-semibold">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {trend && (
              <p
                className={cn(
                  "text-xs font-medium",
                  trend.positive ? "text-primary" : "text-destructive"
                )}
              >
                {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}% from last week
              </p>
            )}
          </div>
          <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-secondary-foreground">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
