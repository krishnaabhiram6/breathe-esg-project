# Sources Research

## SAP (Fuel and Procurement)

Researched Format:
CSV flat file export from SAP

What I learned:
- SAP data often contains plant codes
- Units can vary (L, KL, gallons)
- Dates may appear in different formats
- Column names can vary by configuration

Sample Data:

PlantCode, FuelType, Quantity, Unit, Date
P001, Diesel, 1000, L, 20-05-2026
P002, Petrol, 1, KL, 21-05-2026

Why this sample:
Represents realistic fuel purchase records.

What could break in production:
- Missing lookup tables
- Mixed languages
- Inconsistent units

---

## Utility Data (Electricity)

Researched Format:
CSV export from utility portal

What I learned:
- Electricity measured in kWh
- Billing periods may not align with calendar months
- Meter identifiers are common

Sample Data:

MeterID, Usage, Unit, BillingStart, BillingEnd
M001, 2500, kWh, 01-05-2026, 31-05-2026

Why this sample:
Represents common portal export data.

What could break:
- Missing billing periods
- Tariff structure differences

---

## Travel Data

Researched Format:
CSV export similar to Concur/Navan reports

What I learned:
- Travel categories differ
- Airport codes may be provided instead of distances
- Hotels and transport have different emission factors

Sample Data:

EmployeeID, TravelType, From, To
E001, Flight, HYD, DEL
E002, Hotel, Bangalore, Bangalore

Why this sample:
Represents common business travel records.

What could break:
- Missing airport mappings
- Missing distance information