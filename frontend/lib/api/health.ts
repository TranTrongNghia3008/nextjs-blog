import { fetchAPI } from "./client";

export async function getHealthCheck() {
  return fetchAPI<{ status: string; service: string }>("/api/health");
}

export async function getRootMessage() {
  return fetchAPI<{ message: string }>("/");
}
