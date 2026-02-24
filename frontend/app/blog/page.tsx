"use client";

import { useEffect, useState } from "react";
import { getRootMessage } from "@/lib/api/health";

export default function Blog() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRootMessage()
      .then((data) => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Cannot connect to Backend. Please start FastAPI first!");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-lg text-gray-600 mb-8">
        Posts will be displayed here (Phase 3).
      </p>
      <div className="rounded-lg border p-4 bg-gray-50">
        <p className="text-sm text-gray-500 mb-1">Backend connection:</p>
        {loading ? (
          <p className="font-mono">Connecting...</p>
        ) : (
          <p className="font-mono font-bold">{message}</p>
        )}
      </div>
    </div>
  );
}
