from fastapi import APIRouter
from app.schemas.contact import ContactCreate

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("/")
def send_contact(data: ContactCreate):
    # For now, just log and return success
    # In the future, this could send an email or save to database
    print(f"Contact from {data.name} ({data.email}): {data.message}")
    return {"message": "Thank you for your message! We will get back to you soon."}
