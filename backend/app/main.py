from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import posts

app = FastAPI()

# CORS - allow Frontend (port 3000) to call API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(posts.router)


@app.get("/")
def root():
    return {"message": "Hello from FastAPI!"}


@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "blog-api"}
