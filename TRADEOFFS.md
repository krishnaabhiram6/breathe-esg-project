# Tradeoffs

## 1. No Live SAP Integration

Not built:
Direct SAP API/IDoc integration.

Reason:
Real SAP integrations require authentication, enterprise setup, and significantly increase complexity. CSV ingestion is sufficient for a prototype.

---

## 2. No OCR for Utility Bills

Not built:
Extracting data from PDF utility bills using OCR.

Reason:
OCR introduces additional complexity and possible extraction errors. CSV exports are more reliable for this prototype.

---

## 3. No Real-Time Travel Sync

Not built:
Direct Concur/Navan API synchronization.

Reason:
Real-time integration requires authentication handling and background jobs. Static exports are sufficient to demonstrate ingestion logic.