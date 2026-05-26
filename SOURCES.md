# Sources Research

## SAP (Fuel and Procurement)

Researched Format:
CSV flat-file export from SAP

What I learned:

* SAP data commonly contains plant codes and material identifiers
* Units may vary (L, KL, gallons)
* Dates can appear in multiple formats
* Column names may vary depending on SAP configuration

Sample Data:

PlantCode, FuelType, Quantity, Unit, Date
P001, Diesel, 1000, L, 20-05-2026
P002, Petrol, 1, KL, 21-05-2026

Why this sample:
Represents realistic fuel purchase and procurement records commonly exported from enterprise systems.

What could break in production:

* Missing lookup tables
* Mixed language configurations
* Inconsistent units across departments
* Missing values in exports

---

## Utility Data (Electricity)

Researched Format:
CSV export from utility portals

What I learned:

* Electricity usage is commonly measured in kWh
* Billing periods may not align with calendar months
* Meter identifiers are usually included

Sample Data:

MeterID, Usage, Unit, BillingStart, BillingEnd
M001, 2500, kWh, 01-05-2026, 31-05-2026

Why this sample:
Represents common utility portal export structures used by facilities teams.

What could break in production:

* Missing billing periods
* Tariff structure differences
* Missing meter identifiers
* Different unit formats

---

## Travel Data

Researched Format:
CSV exports similar to Concur/Navan reports

What I learned:

* Travel categories differ across systems
* Airport codes may be available instead of distance values
* Hotels and transport use different emission factors

Sample Data:

EmployeeID, TravelType, From, To
E001, Flight, HYD, DEL
E002, Hotel, Bangalore, Bangalore

Why this sample:
Represents common business travel records and travel expense reporting.

What could break in production:

* Missing airport mappings
* Missing distance information
* Different travel categories across providers
* Inconsistent location formats
