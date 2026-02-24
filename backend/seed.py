from app.database import SessionLocal
from app.models.post import Post

posts_data = [
    {
        "title": "Getting Started with Next.js",
        "slug": "getting-started-with-nextjs",
        "content": "Next.js is a React framework that enables server-side rendering and static site generation. It provides an excellent developer experience with features like file-based routing, API routes, and built-in CSS support.",
    },
    {
        "title": "Introduction to FastAPI",
        "slug": "introduction-to-fastapi",
        "content": "FastAPI is a modern Python web framework for building APIs. It is fast, easy to learn, and comes with automatic Swagger documentation. FastAPI uses Python type hints to validate request data automatically.",
    },
    {
        "title": "What is shadcn/ui?",
        "slug": "what-is-shadcn-ui",
        "content": "shadcn/ui is a collection of reusable UI components built with Radix UI and Tailwind CSS. Unlike traditional component libraries, shadcn/ui copies the component code directly into your project, giving you full control over customization.",
    },
]


def seed():
    db = SessionLocal()
    try:
        count = db.query(Post).count()
        if count > 0:
            print(f"Database already has {count} posts. Skipping seed.")
            return
        for data in posts_data:
            db.add(Post(**data))
        db.commit()
        print(f"Seeded {len(posts_data)} posts successfully!")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
