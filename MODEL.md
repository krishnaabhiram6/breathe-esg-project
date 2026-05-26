# Data Model

## Tenant

Represents a client company using the platform.

Fields:

* id
* company_name
* industry

Reason:
Supports multi-tenancy because multiple companies can use the same platform.

---

## DataSource

Tracks where data originated.

Fields:

* id
* source_type
* ingestion_method
* upload_time

Values:

source_type:

* SAP
* Utility
* Travel

ingestion_method:

* CSV Upload
* API Pull
* Manual Upload

Reason:
Tracks source-of-truth information and data lineage.

---

## EmissionRecord

Stores normalized emissions records.

Fields:

* id
* category
* scope
* quantity
* normalized_unit
* original_unit
* emission_value
* status

Values:

scope:

* Scope1
* Scope2
* Scope3

status:

* Pending
* Suspicious
* Approved
* Rejected

Reason:
Stores normalized emissions independent of source format.

---

## AuditLog

Tracks edits and approval activity.

Fields:

* id
* action
* previous_value
* updated_value
* modified_by
* timestamp

Reason:
Maintains audit trail for compliance and analyst review history.

---

## Future Improvements

The current prototype demonstrates the core architecture. In a production system the following would be added:

* Tenant relationships across records
* Source-to-record mapping
* Record timestamps
* Record version history
* Role-based permissions
