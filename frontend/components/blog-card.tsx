import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface BlogCardProps {
  title: string;
  slug: string;
  content: string;
  createdAt: string;
}

export function BlogCard({ title, slug, content, createdAt }: BlogCardProps) {
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${slug}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardDescription>{date}</CardDescription>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-2">{content}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
