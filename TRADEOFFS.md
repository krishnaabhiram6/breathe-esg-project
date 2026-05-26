# Tradeoffs

## 1. No Live SAP Integration

Not built:
Direct SAP API, IDoc, or BAPI integration.

Reason:
Real SAP integrations require authentication, enterprise setup, and additional infrastructure. CSV ingestion was selected because it demonstrates the ingestion workflow while keeping the prototype manageable.

---

## 2. No OCR for Utility Bills

Not built:
Extracting data from PDF utility bills using OCR.

Reason:
OCR introduces additional complexity and potential extraction inaccuracies. CSV exports provide a more reliable and structured data format for a prototype.

---

## 3. No Real-Time Travel Synchronization

Not built:
Direct Concur/Navan API synchronization.

Reason:
Real-time integrations require authentication handling, background jobs, and scheduling logic. Static exports are sufficient to demonstrate ingestion and normalization behavior in this prototype.

---

## Future Scope

The following can be added in a production implementation:

* Live third-party integrations
* OCR-based utility bill extraction
* Background processing and scheduled synchronization
* Role-based authentication and permissions
