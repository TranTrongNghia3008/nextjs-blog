import { fetchAPI } from "./client";

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export async function getPosts(): Promise<Post[]> {
  return fetchAPI<Post[]>("/api/posts");
}

export async function getPost(slug: string): Promise<Post> {
  return fetchAPI<Post>(`/api/posts/${slug}`);
}
