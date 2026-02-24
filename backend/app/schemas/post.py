from pydantic import BaseModel
from datetime import datetime


class PostBase(BaseModel):
    title: str
    slug: str
    content: str


class PostCreate(PostBase):
    pass


class PostUpdate(BaseModel):
    title: str | None = None
    slug: str | None = None
    content: str | None = None


class PostResponse(PostBase):
    id: int
    created_at: datetime
    updated_at: datetime
