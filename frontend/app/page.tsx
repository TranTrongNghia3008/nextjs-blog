import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Personal Blog</h1>
      <p className="text-lg text-gray-600 mb-8">
        Welcome to my personal blog!
      </p>
      <div className="flex gap-4">
        <Link
          href="/blog"
          className="rounded-full bg-foreground text-background px-6 py-3 font-medium hover:opacity-80 transition"
        >
          View Blog
        </Link>
        <Link
          href="/about"
          className="rounded-full border border-foreground px-6 py-3 font-medium hover:bg-foreground hover:text-background transition"
        >
          About
        </Link>
      </div>
    </div>
  );
}
