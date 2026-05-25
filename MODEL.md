# Data Model

## Tenant
Represents a client company using the platform.

Fields:
- id
- company_name
- industry
- created_at

Reason:
Supports multi-tenancy because multiple companies can use the same system.

---

## DataSource

Tracks where data originated.

Fields:
- id
- tenant_id
- source_type
- ingestion_method
- upload_time

Values:

source_type:
- SAP
- Utility
- Travel

ingestion_method:
- CSV Upload
- API Pull
- Manual Upload

Reason:
Tracks source of truth and data lineage.

---

## EmissionRecord

Stores normalized records.

Fields:
- id
- tenant_id
- source_id
- category
- scope
- quantity
- normalized_unit
- original_unit
- emission_value
- date
- status

Values:

scope:
- Scope1
- Scope2
- Scope3

status:
- Pending
- Suspicious
- Approved
- Rejected

Reason:
Stores normalized emissions independent of source format.

---

## AuditLog

Tracks edits and approvals.

Fields:
- id
- record_id
- action
- previous_value
- updated_value
- modified_by
- timestamp

Reason:
Maintains audit trail for compliance.