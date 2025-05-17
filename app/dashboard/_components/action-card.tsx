import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ActionCard({
  title,
  description,
  href,
  icon,
  className,
  onClick,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <Link href={href} onClick={onClick}>
      <Card
        className={`h-full transition-all hover:shadow-md hover:-translate-y-1 border-2 ${className}`}
      >
        <CardHeader>
          <div className="text-3xl mb-2">{icon}</div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
