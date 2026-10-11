import os
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from app.core.database import get_db
from app.models.db_models import Report, FoodSample, PackagingRecommendation
from app.services.report_generator import PDFReportGenerator
from app.api.analysis import run_packaging_recommendation_pipeline, RunAnalysisRequest

router = APIRouter(prefix="/reports", tags=["PDF Reports"])

class ReportGenerateRequest(BaseModel):
    user_id: int = 1
    sample_id: int
    device_id: Optional[str] = "ESP32-PACK-01"

@router.post("/generate", response_model=dict)
def generate_report(req: ReportGenerateRequest, db: Session = Depends(get_db)):
    # Run pipeline to get latest analytical snapshot
    analysis_res = run_packaging_recommendation_pipeline(
        RunAnalysisRequest(sample_id=req.sample_id, device_id=req.device_id),
        db=db
    )

    sample = analysis_res["sample"]
    rec = analysis_res["ai_recommendation"]
    sensors = analysis_res["live_sensors"]
    cost_sust = analysis_res["cost_sustainability_analysis"]
    shelf = analysis_res["shelf_life_prediction"]

    reports_dir = os.path.join(os.getcwd(), "generated_reports")
    filename = f"PackSense_Report_Batch_{sample.get('batch_id')}.pdf"
    file_path = os.path.join(reports_dir, filename)

    PDFReportGenerator.generate_pdf_report(
        output_path=file_path,
        sample=sample,
        recommendation=rec,
        sensor_data=sensors,
        cost_sust_data=cost_sust,
        shelf_life_data=shelf
    )

    new_report = Report(
        user_id=req.user_id,
        sample_id=req.sample_id,
        report_title=f"Packaging Recommendation Report - {sample.get('commodity')} ({sample.get('batch_id')})",
        file_path=file_path,
        data_summary=analysis_res
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)

    return {
        "report_id": new_report.id,
        "title": new_report.report_title,
        "filename": filename,
        "download_url": f"/api/v1/reports/{new_report.id}/download",
        "created_at": new_report.created_at.isoformat()
    }

@router.get("", response_model=List[dict])
def list_reports(db: Session = Depends(get_db)):
    reports = db.query(Report).order_by(Report.created_at.desc()).all()
    return [
        {
            "id": r.id,
            "title": r.report_title,
            "sample_id": r.sample_id,
            "created_at": r.created_at.isoformat(),
            "download_url": f"/api/v1/reports/{r.id}/download"
        }
        for r in reports
    ]

@router.get("/{report_id}/download")
def download_pdf_report(report_id: int, db: Session = Depends(get_db)):
    rep = db.query(Report).filter(Report.id == report_id).first()
    if not rep or not rep.file_path or not os.path.exists(rep.file_path):
        raise HTTPException(status_code=404, detail="PDF Report file not found")
    
    filename = os.path.basename(rep.file_path)
    return FileResponse(
        path=rep.file_path,
        filename=filename,
        media_type="application/pdf"
    )
