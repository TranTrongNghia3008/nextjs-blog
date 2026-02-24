"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getPost, type Post } from "@/lib/api/posts";
import { Button } from "@/components/ui/button";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getPost(params.slug)
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [params.slug]);

  if (loading) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The post you are looking for does not exist.
        </p>
        <Button asChild>
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/blog">&larr; Back to Blog</Link>
      </Button>
      <article>
        <p className="text-sm text-muted-foreground mb-2">{date}</p>
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">{post.content}</p>
        </div>
      </article>
    </div>
  );
}
