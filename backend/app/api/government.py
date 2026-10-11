from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.db_models import GovernmentResource

router = APIRouter(prefix="/government", tags=["Ministry & Government Context"])

@router.get("", response_model=List[dict])
def get_government_resources(db: Session = Depends(get_db)):
    resources = db.query(GovernmentResource).all()
    return [
        {
            "id": r.id,
            "organization": r.organization,
            "title": r.title,
            "category": r.category,
            "summary": r.summary,
            "url": r.url,
            "publication_date": r.publication_date,
            "retrieval_date": r.retrieval_date.isoformat()
        }
        for r in resources
    ]
