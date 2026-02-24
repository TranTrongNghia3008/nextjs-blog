"use client";

import { useEffect, useState } from "react";
import { getPosts, type Post } from "@/lib/api/posts";
import { BlogCard } from "@/components/blog-card";

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Cannot connect to Backend. Please start FastAPI first!");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      {loading && <p className="text-muted-foreground">Loading posts...</p>}

      {error && <p className="text-destructive">{error}</p>}

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            title={post.title}
            slug={post.slug}
            content={post.content}
            createdAt={post.created_at}
          />
        ))}
      </div>
    </div>
  );
}
