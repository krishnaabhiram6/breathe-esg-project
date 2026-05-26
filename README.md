# Breathe ESG Dashboard

## Project Overview

This project is a prototype ESG data ingestion and review platform built using Django REST Framework and React.

The application ingests emissions-related data from different sources, normalizes records, and allows analysts to review, approve, and export data before audit processes.

---

## Tech Stack

Frontend:

* React
* Axios
* Chart.js

Backend:

* Django
* Django REST Framework

Database:

* SQLite

Deployment:

* Frontend: Vercel
* Backend: Render

---

## Features

* Add emission records
* Dashboard analytics
* Search records
* Approve records
* Delete records
* Export reports
* Suspicious data review
* Audit tracking structure
* Multi-source data modeling

---

## Supported Sources

### SAP

* Fuel and procurement data
* CSV export format

### Utility

* Electricity usage data
* Portal CSV export format

### Travel

* Travel data
* Concur/Navan style exports

---

## Setup Instructions

Clone repository:

```bash
git clone https://github.com/krishnaabhiram6/breathe-esg-project.git
```

Move into project:

```bash
cd breathe-esg-project
```

Backend setup:

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Frontend setup:

```bash
cd frontend
npm install
npm run dev
```

---
## Live Application

Frontend URL:
https://breathe-esg-project-umber.vercel.app

Backend URL:
https://breathe-esg-project-r9pd.onrender.com

---

## GitHub Repository

https://github.com/krishnaabhiram6/breathe-esg-project