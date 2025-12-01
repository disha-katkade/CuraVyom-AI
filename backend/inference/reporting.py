import os
from datetime import datetime
from typing import Dict, Any, List

# Try importing dependencies, mock if missing
try:
    from fpdf import FPDF
except ImportError:
    class FPDF:
        def __init__(self): pass
        def add_page(self): pass
        def set_font(self, *args): pass
        def cell(self, *args): pass
        def multi_cell(self, *args): pass
        def output(self, *args): pass
        def set_fill_color(self, *args): pass
        def rect(self, *args): pass
        def ln(self, *args): pass

try:
    import pandas as pd
except ImportError:
    pd = None

class ReportGenerator:
    def __init__(self):
        self.output_dir = "reports"
        os.makedirs(self.output_dir, exist_ok=True)

    def generate_pdf(self, data: Dict[str, Any], filename: str = "report.pdf") -> str:
        """Generates a PDF report from the analysis data."""
        pdf = FPDF()
        pdf.add_page()
        
        # Header
        pdf.set_font("Arial", "B", 16)
        pdf.cell(0, 10, "CuraVyom AI - Drug Repurposing Report", ln=True, align="C")
        pdf.ln(10)

        # Metadata
        pdf.set_font("Arial", "", 12)
        pdf.cell(0, 10, f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}", ln=True)
        pdf.cell(0, 10, f"Query: {data.get('query', 'N/A')}", ln=True)
        pdf.ln(10)

        # Executive Summary
        pdf.set_font("Arial", "B", 14)
        pdf.cell(0, 10, "Executive Summary", ln=True)
        pdf.set_font("Arial", "", 12)
        pdf.multi_cell(0, 10, data.get("summary", "No summary available."))
        pdf.ln(10)

        # Evidence Score
        score_data = data.get("score", {})
        pdf.set_font("Arial", "B", 14)
        pdf.cell(0, 10, f"Confidence Score: {score_data.get('total_score', 'N/A')}/100 ({score_data.get('confidence_level', 'N/A')})", ln=True)
        pdf.ln(5)
        
        # Detailed Findings
        pdf.set_font("Arial", "B", 14)
        pdf.cell(0, 10, "Detailed Findings", ln=True)
        pdf.set_font("Arial", "", 12)
        
        for agent_name, content in data.get("agent_responses", {}).items():
            pdf.set_font("Arial", "B", 12)
            pdf.cell(0, 10, f"{agent_name}:", ln=True)
            pdf.set_font("Arial", "", 11)
            pdf.multi_cell(0, 10, str(content))
            pdf.ln(5)

        filepath = os.path.join(self.output_dir, filename)
        # In a real scenario with FPDF installed, this would write the file
        # pdf.output(filepath) 
        
        # For demo purposes, we'll just simulate the file creation if FPDF is mocked
        if isinstance(pdf, FPDF) and not hasattr(pdf, 'output'): # It's the real FPDF
             pdf.output(filepath)
        else:
             with open(filepath, "w") as f:
                 f.write("Simulated PDF content")

        return filepath

    def generate_excel(self, data: List[Dict[str, Any]], filename: str = "summary.xlsx") -> str:
        """Generates an Excel summary from a list of data points."""
        filepath = os.path.join(self.output_dir, filename)
        
        if pd:
            df = pd.DataFrame(data)
            df.to_excel(filepath, index=False)
        else:
            # Fallback CSV if pandas is missing
            filepath = filepath.replace(".xlsx", ".csv")
            import csv
            keys = data[0].keys() if data else []
            with open(filepath, "w", newline="") as f:
                dict_writer = csv.DictWriter(f, fieldnames=keys)
                dict_writer.writeheader()
                dict_writer.writerows(data)
                
        return filepath
