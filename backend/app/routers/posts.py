from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.schemas.post import PostCreate, PostUpdate, PostResponse

router = APIRouter(prefix="/api/posts", tags=["posts"])

# Sample data in memory (will be replaced by database in Phase 4)
posts_db: list[dict] = [
    {
        "id": 1,
        "title": "Getting Started with Next.js",
        "slug": "getting-started-with-nextjs",
        "content": "Next.js is a React framework that enables server-side rendering and static site generation. It provides an excellent developer experience with features like file-based routing, API routes, and built-in CSS support.",
        "created_at": datetime(2025, 1, 1),
        "updated_at": datetime(2025, 1, 1),
    },
    {
        "id": 2,
        "title": "Introduction to FastAPI",
        "slug": "introduction-to-fastapi",
        "content": "FastAPI is a modern Python web framework for building APIs. It is fast, easy to learn, and comes with automatic Swagger documentation. FastAPI uses Python type hints to validate request data automatically.",
        "created_at": datetime(2025, 1, 15),
        "updated_at": datetime(2025, 1, 15),
    },
    {
        "id": 3,
        "title": "What is shadcn/ui?",
        "slug": "what-is-shadcn-ui",
        "content": "shadcn/ui is a collection of reusable UI components built with Radix UI and Tailwind CSS. Unlike traditional component libraries, shadcn/ui copies the component code directly into your project, giving you full control over customization.",
        "created_at": datetime(2025, 2, 1),
        "updated_at": datetime(2025, 2, 1),
    },
]

next_id = 4


def find_post_by_slug(slug: str) -> dict | None:
    return next((p for p in posts_db if p["slug"] == slug), None)


@router.get("/", response_model=list[PostResponse])
def get_posts():
    return posts_db


@router.get("/{slug}", response_model=PostResponse)
def get_post(slug: str):
    post = find_post_by_slug(slug)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@router.post("/", response_model=PostResponse, status_code=201)
def create_post(data: PostCreate):
    global next_id
    if find_post_by_slug(data.slug):
        raise HTTPException(status_code=400, detail="Slug already exists")
    now = datetime.now()
    post = {
        "id": next_id,
        **data.model_dump(),
        "created_at": now,
        "updated_at": now,
    }
    next_id += 1
    posts_db.append(post)
    return post


@router.put("/{slug}", response_model=PostResponse)
def update_post(slug: str, data: PostUpdate):
    post = find_post_by_slug(slug)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    update_data = data.model_dump(exclude_unset=True)
    if "slug" in update_data and update_data["slug"] != slug:
        if find_post_by_slug(update_data["slug"]):
            raise HTTPException(status_code=400, detail="Slug already exists")
    post.update(update_data)
    post["updated_at"] = datetime.now()
    return post


@router.delete("/{slug}", status_code=204)
def delete_post(slug: str):
    post = find_post_by_slug(slug)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    posts_db.remove(post)
