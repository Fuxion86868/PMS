# PMS
Project Management System (PMS) - A web application with Python Flask backend and HTML/CSS/JS frontend. Features include user authentication, project tracking, task management, and team collaboration tools.
# PMS - Project Management System

A collaborative project management web application.

## Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Python (Flask/FastAPI)
- **Database:** SQLite/PostgreSQL

## Current Status
✅ Login Page UI Complete
🚧 Dashboard UI In Progress
🚧 Backend API Integration Pending

## Team
- FRIMPONG JOSEPH - UI/Frontend Developer
-ANDREWS TETTEH - Backend/Python Developer

## Setup Instructions (Coming Soon)
1. Clone the repo
2. Open `frontend/login/index.html` in browser
3. Backend setup TBD by Python dev
# 📊 Data Models

### 1. User Model (Prison Officers)
Table: users
├── id INTEGER (Primary Key, Auto-increment)
├── officer_id VARCHAR(20) (Unique) - e.g., OFF001
├── first_name VARCHAR(50)
├── last_name VARCHAR(50)
├── email VARCHAR(100) (Unique)
├── password VARCHAR(255) (Hashed)
├── phone VARCHAR(20)
├── badge_number VARCHAR(30) (Unique)
├── rank VARCHAR(50) - e.g., Warden, Captain, Lieutenant, Sergeant, Guard
├── department VARCHAR(50) - e.g., Security, Administration, Medical
├── role VARCHAR(20) - admin, officer, supervisor
├── shift VARCHAR(20) - morning, afternoon, night
├── status VARCHAR(20) - active, inactive, suspended
├── date_joined DATE
├── created_at DATETIME
└── updated_at DATETIME
