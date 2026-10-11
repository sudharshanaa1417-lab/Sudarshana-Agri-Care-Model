import os
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

class PDFReportGenerator:
    """
    Generates professional PDF recommendation reports for PackSense AI.
    """

    @classmethod
    def generate_pdf_report(
        cls,
        output_path: str,
        sample: dict,
        recommendation: dict,
        sensor_data: dict,
        cost_sust_data: dict,
        shelf_life_data: dict
    ) -> str:

        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        doc = SimpleDocTemplate(
            output_path,
            pagesize=letter,
            rightMargin=36,
            leftMargin=36,
            topMargin=36,
            bottomMargin=36
        )

        styles = getSampleStyleSheet()
        
        # Custom Brand Colors (Emerald & Slate)
        BRAND_DARK = colors.HexColor("#0f172a")
        BRAND_EMERALD = colors.HexColor("#059669")
        BRAND_CYAN = colors.HexColor("#0891b2")
        BG_LIGHT = colors.HexColor("#f8fafc")

        title_style = ParagraphStyle(
            "DocTitle",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=20,
            textColor=BRAND_EMERALD,
            spaceAfter=4
        )

        subtitle_style = ParagraphStyle(
            "DocSubTitle",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=10,
            textColor=BRAND_DARK,
            spaceAfter=15
        )

        heading_style = ParagraphStyle(
            "SectionHeading",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=13,
            textColor=BRAND_EMERALD,
            spaceBefore=10,
            spaceAfter=6
        )

        body_style = ParagraphStyle(
            "BodyTextCustom",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=BRAND_DARK
        )

        disclaimer_style = ParagraphStyle(
            "DisclaimerStyle",
            parent=styles["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=8,
            leading=10,
            textColor=colors.HexColor("#dc2626")
        )

        elements = []

        # 1. Header & Title Block
        elements.append(Paragraph("PackSense AI — Smart Food Packaging Intelligence", title_style))
        elements.append(Paragraph(f"Official Packaging Recommendation Report | Batch ID: {sample.get('batch_id', 'N/A')} | Date: {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}", subtitle_style))
        elements.append(HRFlowable(width="100%", thickness=1.5, color=BRAND_EMERALD, spaceAfter=12))

        # 2. Food Sample & Environmental Profile Table
        elements.append(Paragraph("1. Food Sample Profile & Measured Storage Conditions", heading_style))
        
        temp_val = f"{sensor_data.get('temperature', sample.get('storage_temperature', 'N/A'))} °C" if sensor_data.get('temperature') is not None or sample.get('storage_temperature') is not None else "N/A"
        rh_val = f"{sensor_data.get('humidity', sample.get('relative_humidity', 'N/A'))} %" if sensor_data.get('humidity') is not None or sample.get('relative_humidity') is not None else "N/A"
        co2_val = f"{sensor_data.get('co2', 'N/A')} ppm" if sensor_data.get('co2') is not None else "N/A (No Sensor)"

        profile_table_data = [
            [Paragraph("<b>Commodity:</b>", body_style), Paragraph(str(sample.get("commodity", "N/A")), body_style), Paragraph("<b>Category:</b>", body_style), Paragraph(str(sample.get("category", "N/A")), body_style)],
            [Paragraph("<b>Moisture Content:</b>", body_style), Paragraph(f"{sample.get('moisture_content', 'N/A')} %", body_style), Paragraph("<b>Fat / Oil Content:</b>", body_style), Paragraph(f"{sample.get('fat_oil_content', 'N/A')} %", body_style)],
            [Paragraph("<b>pH Level:</b>", body_style), Paragraph(str(sample.get("ph", "N/A")), body_style), Paragraph("<b>Respiration Rate:</b>", body_style), Paragraph(f"{sample.get('respiration_rate', 'N/A')} mg CO₂/kg·h", body_style)],
            [Paragraph("<b>Storage Temp:</b>", body_style), Paragraph(temp_val, body_style), Paragraph("<b>Relative Humidity:</b>", body_style), Paragraph(rh_val, body_style)],
            [Paragraph("<b>CO₂ Level:</b>", body_style), Paragraph(co2_val, body_style), Paragraph("<b>Target Shelf Life:</b>", body_style), Paragraph(f"{sample.get('desired_shelf_life', 'N/A')} Days", body_style)],
        ]

        t1 = Table(profile_table_data, colWidths=[110, 150, 120, 160])
        t1.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), BG_LIGHT),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('PADDING', (0,0), (-1,-1), 5),
        ]))
        elements.append(t1)
        elements.append(Spacer(1, 10))

        # 3. Recommended Packaging & Specifications Table
        elements.append(Paragraph("2. Optimal Packaging Materials & Target Specifications", heading_style))

        rec_table_data = [
            [Paragraph("<b>Recommended Material:</b>", body_style), Paragraph(str(recommendation.get("recommended_material_name", "N/A")), body_style)],
            [Paragraph("<b>Layer Structure:</b>", body_style), Paragraph(str(recommendation.get("recommended_structure", "N/A")), body_style)],
            [Paragraph("<b>Film Thickness:</b>", body_style), Paragraph(str(recommendation.get("recommended_thickness_um", "N/A")), body_style)],
            [Paragraph("<b>Target OTR (Oxygen):</b>", body_style), Paragraph(str(recommendation.get("required_otr", "N/A")), body_style)],
            [Paragraph("<b>Target WVTR (Water Vapor):</b>", body_style), Paragraph(str(recommendation.get("required_wvtr", "N/A")), body_style)],
            [Paragraph("<b>Sealability & Strength:</b>", body_style), Paragraph(str(recommendation.get("sealability_requirement", "N/A")), body_style)],
            [Paragraph("<b>MAP Gas Strategy:</b>", body_style), Paragraph(str(recommendation.get("recommended_gas_strategy", "N/A")), body_style)],
        ]

        t2 = Table(rec_table_data, colWidths=[150, 390])
        t2.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (0,-1), colors.HexColor("#e2e8f0")),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('PADDING', (0,0), (-1,-1), 5),
        ]))
        elements.append(t2)
        elements.append(Spacer(1, 10))

        # 4. Explainable AI Rationale & Advantages
        elements.append(Paragraph("3. Explainable AI Rationale & Technical Justification", heading_style))
        elements.append(Paragraph(str(recommendation.get("why_recommended", "N/A")), body_style))
        elements.append(Spacer(1, 6))

        advantages = recommendation.get("expected_advantages") or []
        if advantages:
            adv_text = "<b>Key Advantages:</b><br/>" + "<br/>".join([f"• {adv}" for adv in advantages])
            elements.append(Paragraph(adv_text, body_style))
            elements.append(Spacer(1, 8))

        # 5. Shelf Life, Cost & Sustainability Table
        elements.append(Paragraph("4. Shelf-Life, Cost & Sustainability Metrics", heading_style))
        
        metrics_table_data = [
            [Paragraph("<b>Estimated Shelf Life:</b>", body_style), Paragraph(f"<b>{shelf_life_data.get('estimated_shelf_life_days', 'N/A')} Days</b> (Range: {shelf_life_data.get('shelf_life_range_min')} - {shelf_life_data.get('shelf_life_range_max')} days)", body_style)],
            [Paragraph("<b>Primary Risk Factor:</b>", body_style), Paragraph(str(shelf_life_data.get("primary_deterioration_factor", "N/A")), body_style)],
            [Paragraph("<b>Cost Per Package:</b>", body_style), Paragraph(f"${cost_sust_data.get('cost_per_package_usd', 0.0):.4f} USD (₹{cost_sust_data.get('cost_per_package_inr', 0.0):.2f} INR) [DATABASE ESTIMATE]", body_style)],
            [Paragraph("<b>Cost Per 1,000 Units:</b>", body_style), Paragraph(f"${cost_sust_data.get('cost_per_1000_packages_usd', 0.0):.2f} USD (₹{cost_sust_data.get('cost_per_1000_packages_inr', 0.0):.2f} INR)", body_style)],
            [Paragraph("<b>Recyclability & EOL:</b>", body_style), Paragraph(f"{cost_sust_data.get('recyclability', 'N/A')} | {cost_sust_data.get('end_of_life_pathway', 'N/A')}", body_style)],
            [Paragraph("<b>CO₂ Impact / Pouch:</b>", body_style), Paragraph(f"{cost_sust_data.get('co2_per_package_g', 'N/A')} g CO₂-eq", body_style)],
        ]

        t3 = Table(metrics_table_data, colWidths=[150, 390])
        t3.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), BG_LIGHT),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('PADDING', (0,0), (-1,-1), 5),
        ]))
        elements.append(t3)
        elements.append(Spacer(1, 15))

        # 6. Mandatory Validation Disclaimer
        elements.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#ef4444"), spaceAfter=6))
        elements.append(Paragraph("<b>MANDATORY VALIDATION DISCLAIMER:</b> " + str(shelf_life_data.get("disclaimer", "Recommendation requires laboratory/industry validation before commercial production use.")), disclaimer_style))

        doc.build(elements)
        return output_path
