import { fetchAPI } from "./client";

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export async function sendContact(data: ContactForm): Promise<{ message: string }> {
  return fetchAPI<{ message: string }>("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
