# Decisions

## SAP Data Choice

Decision:
Handle SAP exports using CSV flat-file format.

Why:
CSV exports are commonly used in enterprises because they are simple to export and upload. Handling full SAP IDocs or BAPIs would add unnecessary complexity for a prototype.

Ignored:

* IDoc parsing
* BAPI integrations
* SAP OData APIs

Question for PM:
Will clients upload SAP exports manually or connect SAP directly?

---

## Utility Data Choice

Decision:
Handle utility data using CSV portal exports.

Why:
Facilities teams commonly export electricity usage from utility portals as CSV files.

Ignored:

* PDF bill OCR
* Utility APIs

Question for PM:
Should historical bills also be imported?

---

## Travel Data Choice

Decision:
Handle travel data through CSV exports similar to Concur/Navan exports.

Why:
Travel systems commonly support downloadable reports and CSV exports.

Ignored:

* Live API integrations
* Real-time synchronization

Question for PM:
Do we need flight-only data or complete travel expenses?

---

## Ingestion Method

Decision:
Use file upload for all three sources.

Why:
One consistent ingestion flow reduces complexity and works well for a prototype.

---

## Suspicious Data Detection

Decision:
Mark rows as suspicious if:

* Quantity is missing
* Negative values appear
* Abnormal values exceed a threshold

Why:
Helps analysts quickly review potentially incorrect or unusual data.

---

## Unit Normalization

Decision:
Normalize all quantities into a common unit (kgCO2).

Why:
Different sources may provide values in different formats such as liters, kWh, or kilometers. Normalizing values allows easier comparison, reporting, and analytics across data sources.
