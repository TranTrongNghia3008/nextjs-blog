import { fetchAPI } from "./client";

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface PostCreate {
  title: string;
  slug: string;
  content: string;
}

export interface PostUpdate {
  title?: string;
  slug?: string;
  content?: string;
}

export async function getPosts(): Promise<Post[]> {
  return fetchAPI<Post[]>("/api/posts");
}

export async function getPost(slug: string): Promise<Post> {
  return fetchAPI<Post>(`/api/posts/${slug}`);
}

export async function createPost(data: PostCreate): Promise<Post> {
  return fetchAPI<Post>("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updatePost(slug: string, data: PostUpdate): Promise<Post> {
  return fetchAPI<Post>(`/api/posts/${slug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deletePost(slug: string): Promise<void> {
  return fetchAPI<void>(`/api/posts/${slug}`, {
    method: "DELETE",
  });
}
