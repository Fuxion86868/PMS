Got it! Here's your updated README.md with all the admission models added:

---

## **Updated README.md (Complete)**

```markdown
# GPS · PMS - Prison Management System

A full-stack web application for managing prison operations, officers, inmate records, and facility administration.

---

## 📁 Project Structure

```
pms-web-app/
├── frontend/                  # UI (HTML, CSS, JavaScript)
│   ├── assets/               # Images, icons, fonts
│   │   └── images/           # Logo and photos
│   ├── login/                # Authentication page
│   ├── dashboard/            # Main dashboard
│   ├── admissions/           # New inmate admission
│   ├── prisoners/            # Prisoner management
│   ├── court/                # Court attendance
│   ├── sentences/            # Sentence management
│   ├── medical/              # Medical records
│   ├── property/             # Property management
│   ├── discipline/           # Disciplinary records
│   ├── rehabilitation/       # Rehabilitation programs
│   ├── gatepass/             # Gate pass management
│   ├── transfers/            # Inmate transfers
│   └── discharge/            # Discharge processing
│
├── backend/                   # Python API (Flask/FastAPI)
│   ├── models/               # Database models
│   ├── routes/               # API endpoints
│   ├── config.py             # Configuration
│   └── app.py                # Main application
│
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling (Custom properties, Flexbox, Grid)
- **JavaScript (Vanilla)** - Interactivity & API calls
- **Chart.js** - Data visualization
- **Font Awesome** - Icons
- **Montserrat** - Primary font

### Backend
- **Python** - Flask / FastAPI
- **Database** - SQLite / PostgreSQL
- **Authentication** - JWT (JSON Web Tokens)

---

## 📊 Data Models

### 1. User Model (Prison Officers)
```
Table: users
├── id              INTEGER (Primary Key, Auto-increment)
├── officer_id      VARCHAR(20) (Unique) - e.g., OFF001
├── first_name      VARCHAR(50)
├── last_name       VARCHAR(50)
├── email           VARCHAR(100) (Unique)
├── password        VARCHAR(255) (Hashed)
├── phone           VARCHAR(20)
├── badge_number    VARCHAR(30) (Unique)
├── rank            VARCHAR(50) - Warden, Captain, Lieutenant, Sergeant, Guard
├── department      VARCHAR(50) - Security, Administration, Medical
├── role            VARCHAR(20) - admin, officer, supervisor
├── shift           VARCHAR(20) - morning, afternoon, night
├── status          VARCHAR(20) - active, inactive, suspended
├── date_joined     DATE
├── created_at      DATETIME
└── updated_at      DATETIME
```

### 2. Arrest Warrant Model
```
Table: arrest_warrants
├── id                  INTEGER (Primary Key, Auto-increment)
├── warrant_number      VARCHAR(30) (Unique) - e.g., WRT-2024-0042
├── case_number         VARCHAR(30) (Unique) - e.g., CASE-2024-0189
├── first_name          VARCHAR(50)
├── last_name           VARCHAR(50)
├── other_names         VARCHAR(100) (Nullable)
├── date_of_birth       DATE
├── gender              VARCHAR(10) - male, female
├── nationality         VARCHAR(50)
├── national_id         VARCHAR(50) (Nullable)
├── offense             VARCHAR(100)
├── offense_description TEXT (Nullable)
├── arrest_date         DATE
├── arresting_officer   VARCHAR(100)
├── arresting_agency    VARCHAR(100)
├── court               VARCHAR(100)
├── judge               VARCHAR(100) (Nullable)
├── sentence_type       VARCHAR(30) - remand, convicted, life, death
├── sentence_duration   VARCHAR(50) (Nullable)
├── status              VARCHAR(20) - pending, executed, cancelled
├── issued_date         DATE
├── created_at          DATETIME
└── updated_at          DATETIME
```

### 3. Inmate/Admission Model
```
Table: inmates
├── id                  INTEGER (Primary Key, Auto-increment)
├── inmate_id           VARCHAR(20) (Unique) - e.g., INM-2024-0012
├── warrant_id          INTEGER (Foreign Key → arrest_warrants.id)
├── first_name          VARCHAR(50)
├── last_name           VARCHAR(50)
├── other_names         VARCHAR(100) (Nullable)
├── date_of_birth       DATE
├── age                 INTEGER
├── gender              VARCHAR(10) - male, female
├── nationality         VARCHAR(50)
├── national_id         VARCHAR(50) (Nullable)
├── phone               VARCHAR(20) (Nullable)
├── address             TEXT (Nullable)
├── marital_status      VARCHAR(20) - single, married, divorced, widowed
├── photo               VARCHAR(255) (Nullable) - File path/URL
├── fingerprint_id      VARCHAR(50) (Nullable)
├── height_cm           DECIMAL(5,1) (Nullable)
├── weight_kg           DECIMAL(5,1) (Nullable)
├── eye_color           VARCHAR(20) (Nullable)
├── hair_color          VARCHAR(20) (Nullable)
├── distinguishing_marks TEXT (Nullable)
├── religion            VARCHAR(50) (Nullable)
├── occupation          VARCHAR(100) (Nullable)
├── education_level     VARCHAR(50) (Nullable)
├── next_of_kin_name    VARCHAR(100)
├── next_of_kin_relation VARCHAR(30) - spouse, parent, sibling, child, other
├── next_of_kin_contact VARCHAR(20) (Nullable)
├── next_of_kin_address TEXT (Nullable)
├── case_number         VARCHAR(30)
├── offense             VARCHAR(100)
├── offense_description TEXT (Nullable)
├── arrest_date         DATE
├── arresting_officer   VARCHAR(100)
├── arresting_agency    VARCHAR(100)
├── court               VARCHAR(100)
├── judge               VARCHAR(100) (Nullable)
├── sentence_type       VARCHAR(30) - remand, convicted, life, death
├── sentence_duration   VARCHAR(50) (Nullable)
├── expected_release_date DATE (Nullable)
├── status              VARCHAR(20) - active, released, transferred, deceased
├── admission_date      DATE
├── admission_time      TIME
├── admission_officer_id INTEGER (Foreign Key → users.id)
├── created_at          DATETIME
└── updated_at          DATETIME
```

### 4. Medical Record Model
```
Table: medical_records
├── id                  INTEGER (Primary Key, Auto-increment)
├── inmate_id           INTEGER (Foreign Key → inmates.id)
├── blood_group         VARCHAR(5) - A+, A-, B+, B-, AB+, AB-, O+, O-
├── genotype            VARCHAR(5) - AA, AS, SS, AC
├── allergies           TEXT (Nullable)
├── chronic_illnesses   TEXT (Nullable)
├── current_medications TEXT (Nullable)
├── mental_health_status VARCHAR(30) - stable, under_observation, requires_treatment, critical
├── physical_disabilities TEXT (Nullable)
├── substance_abuse_history TEXT (Nullable)
├── last_checkup_date   DATE (Nullable)
├── notes               TEXT (Nullable)
├── created_at          DATETIME
└── updated_at          DATETIME
```

### 5. Cell Assignment Model
```
Table: cell_assignments
├── id                  INTEGER (Primary Key, Auto-increment)
├── inmate_id           INTEGER (Foreign Key → inmates.id)
├── cell_block          VARCHAR(10) - A, B, C, D
├── cell_number         VARCHAR(20) - e.g., A-104
├── security_level      VARCHAR(20) - minimum, medium, maximum, supermax
├── assigned_officer_id INTEGER (Foreign Key → users.id)
├── assignment_date     DATE
├── special_instructions TEXT (Nullable)
├── status              VARCHAR(20) - active, changed, released
├── created_at          DATETIME
└── updated_at          DATETIME
```

### 6. Property/Inventory Model
```
Table: inmate_property
├── id                  INTEGER (Primary Key, Auto-increment)
├── inmate_id           INTEGER (Foreign Key → inmates.id)
├── item_description    VARCHAR(255)
├── quantity            INTEGER
├── condition           VARCHAR(20) - good, fair, poor
├── cash_amount         DECIMAL(10,2) (Nullable)
├── valuables_description TEXT (Nullable)
├── storage_location    VARCHAR(50) (Nullable)
├── collected_by        INTEGER (Foreign Key → users.id)
├── collection_date     DATE
├── status              VARCHAR(20) - stored, returned, confiscated
├── created_at          DATETIME
└── updated_at          DATETIME
```

### 7. Admission Confirmation Model
```
Table: admission_confirmations
├── id                  INTEGER (Primary Key, Auto-increment)
├── inmate_id           INTEGER (Foreign Key → inmates.id)
├── inmate_searched     BOOLEAN (Default: false)
├── property_collected  BOOLEAN (Default: false)
├── medical_screened    BOOLEAN (Default: false)
├── rules_explained     BOOLEAN (Default: false)
├── officer_signature   VARCHAR(255) (Nullable) - Image path
├── confirmed_by        INTEGER (Foreign Key → users.id)
├── confirmed_at        DATETIME
└── created_at          DATETIME
```

---

## 🔗 Database Relationships

```
arrest_warrants (1) ──────< (1) inmates
       │
       │ warrant_id (FK)
       │
inmates (1) ──────< (1) medical_records
inmates (1) ──────< (1) cell_assignments
inmates (1) ──────< (many) inmate_property
inmates (1) ──────< (1) admission_confirmations
       │
       │ admission_officer_id (FK)
       │ assigned_officer_id (FK)
       │ collected_by (FK)
       │ confirmed_by (FK)
       │
users (officers)
```

---

## 🔐 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | Officer login | No |
| POST | `/api/auth/logout` | Officer logout | Yes |

### Officers (Users)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/officers` | Get all officers | Yes (Admin) |
| GET | `/api/officers/:id` | Get single officer | Yes |
| POST | `/api/officers` | Add new officer | Yes (Admin) |
| PUT | `/api/officers/:id` | Update officer | Yes (Admin) |
| DELETE | `/api/officers/:id` | Delete officer | Yes (Admin) |

### Dashboard
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/dashboard/stats` | Prison statistics | Yes |
| GET | `/api/dashboard/recent` | Recent activities | Yes |

### Arrest Warrants
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/warrants` | Get all warrants | Yes |
| GET | `/api/warrants/:id` | Get single warrant | Yes |
| GET | `/api/warrants/search?q=WRT-2024-0042` | Search warrant | Yes |
| POST | `/api/warrants` | Create warrant | Yes |

### Admissions
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/admissions` | Get all admissions | Yes |
| GET | `/api/admissions/recent` | Get recent admissions | Yes |
| GET | `/api/admissions/:id` | Get single admission | Yes |
| POST | `/api/admissions` | Create new admission | Yes |
| PUT | `/api/admissions/:id` | Update admission | Yes |

### Medical Records
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/medical/:inmate_id` | Get inmate medical record | Yes |
| POST | `/api/medical` | Create medical record | Yes |
| PUT | `/api/medical/:id` | Update medical record | Yes |

### Property
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/property/:inmate_id` | Get inmate property | Yes |
| POST | `/api/property` | Add property item | Yes |
| DELETE | `/api/property/:id` | Remove property item | Yes |

---

## 🔑 Authentication Flow

```
1. Officer logs in with email + password
2. Server validates credentials
3. Server returns JWT token + officer data
4. Frontend stores token in localStorage
5. All requests include token in Authorization header
```

### Login Request:
```json
POST /api/auth/login
{
    "email": "officer@prison.gov",
    "password": "securepassword"
}
```

### Login Response:
```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
        "id": 1,
        "officer_id": "OFF001",
        "first_name": "Ryan",
        "last_name": "Smith",
        "rank": "Captain",
        "department": "Security",
        "role": "admin"
    }
}
```

---

## 📦 Sample POST - Create Admission

```json
POST /api/admissions

{
    "warrant_id": 42,
    "personal_info": {
        "first_name": "Marcus",
        "last_name": "Johnson",
        "other_names": "",
        "date_of_birth": "1985-06-15",
        "gender": "male",
        "nationality": "Ghanaian",
        "national_id": "GHA-839201745",
        "phone": "+233 24 567 8901",
        "address": "15 Independence Avenue, Accra",
        "marital_status": "single",
        "religion": "Christian",
        "occupation": "Trader",
        "education_level": "Secondary",
        "photo": "/uploads/photos/inm-2024-0012.jpg",
        "fingerprint_id": "FP-928374",
        "height_cm": 178,
        "weight_kg": 82,
        "eye_color": "Brown",
        "hair_color": "Black",
        "distinguishing_marks": "Scar on left forearm"
    },
    "next_of_kin": {
        "name": "Ama Johnson",
        "relation": "spouse",
        "contact": "+233 24 123 4567"
    },
    "case_details": {
        "case_number": "CASE-2024-0189",
        "offense": "armed_robbery",
        "offense_description": "Armed robbery at Capstone Supermarket",
        "arrest_date": "2024-01-10",
        "arresting_officer": "Detective Kwame Asante",
        "arresting_agency": "Ghana Police Service",
        "court": "high_court_accra",
        "judge": "Justice Abena Mensah",
        "sentence_type": "convicted",
        "sentence_duration": "15 years",
        "expected_release_date": "2039-01-10"
    },
    "medical": {
        "blood_group": "O+",
        "genotype": "AA",
        "allergies": "Penicillin, Peanuts",
        "chronic_illnesses": "Mild Asthma",
        "current_medications": "Ventolin Inhaler",
        "mental_health_status": "stable",
        "physical_disabilities": "None",
        "substance_abuse_history": "No known history"
    },
    "assignment": {
        "security_level": "medium",
        "cell_block": "A",
        "cell_number": "A-104",
        "assigned_officer_id": 5,
        "admission_date": "2024-01-15",
        "admission_time": "09:30",
        "special_instructions": "Monitor for 72 hours. Asthma check-ups required."
    },
    "property": [
        {
            "item_description": "Wrist Watch - Silver Casio",
            "quantity": 1,
            "condition": "good"
        },
        {
            "item_description": "Wallet - Brown Leather",
            "quantity": 1,
            "condition": "good"
        }
    ],
    "cash_amount": 450.00,
    "valuables_description": "Gold chain, 1 wedding ring",
    "confirmation": {
        "inmate_searched": true,
        "property_collected": true,
        "medical_screened": true,
        "rules_explained": true,
        "admission_officer_id": 1
    }
}
```

### Sample Response:
```json
{
    "success": true,
    "message": "Admission completed successfully",
    "data": {
        "inmate_id": "INM-2024-0012"
    }
}
```

---

## 🏷️ Status/Enum Values

| Model | Field | Accepted Values |
|-------|-------|-----------------|
| **users** | role | `admin`, `officer`, `supervisor` |
| **users** | rank | `Warden`, `Captain`, `Lieutenant`, `Sergeant`, `Guard` |
| **users** | department | `Security`, `Administration`, `Medical` |
| **users** | shift | `morning`, `afternoon`, `night` |
| **users** | status | `active`, `inactive`, `suspended` |
| **inmates** | status | `active`, `released`, `transferred`, `deceased` |
| **inmates** | gender | `male`, `female` |
| **inmates** | marital_status | `single`, `married`, `divorced`, `widowed` |
| **inmates** | sentence_type | `remand`, `convicted`, `life`, `death` |
| **cell_assignments** | security_level | `minimum`, `medium`, `maximum`, `supermax` |
| **cell_assignments** | cell_block | `A`, `B`, `C`, `D` |
| **cell_assignments** | status | `active`, `changed`, `released` |
| **medical_records** | mental_health_status | `stable`, `under_observation`, `requires_treatment`, `critical` |
| **medical_records** | blood_group | `A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-` |
| **medical_records** | genotype | `AA`, `AS`, `SS`, `AC` |
| **inmate_property** | condition | `good`, `fair`, `poor` |
| **inmate_property** | status | `stored`, `returned`, `confiscated` |
| **arrest_warrants** | status | `pending`, `executed`, `cancelled` |

---

## 👥 Team

| Name | Role | GitHub |
|------|------|--------|
| FRIMPONG JOSEPH | UI/Frontend Developer | [@Fuxion86868](https://github.com/Fuxion86868) |
| ANDREWS TETTEH | Backend/Python Developer | [@username] |

---

## 🚀 Setup Instructions

### Frontend
```bash
git clone https://github.com/Fuxion86868/PMS.git
cd PMS/frontend
# Open login/index.html in browser
```

### Backend (Coming Soon)
```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

## 📝 Current Status

- ✅ Login Page UI
- ✅ Dashboard UI  
- ✅ Admissions Page UI
- ✅ Database Models Designed
- 🚧 Backend API Development
- 🚧 Frontend-Backend Integration

---

## 🎨 Color Scheme

| Element | Color Code | Description |
|---------|------------|-------------|
| Sidebar BG | `#3E2723` | Dark Brown |
| Sidebar Hover | `rgba(255,255,255,0.15)` | Mirror/Glossy |
| Accent | `#D4A574` | Light Brown/Gold |
| Accent Dark | `#B8860B` | Dark Golden |
| Body BG | `#f5f0eb` | Warm Beige |
| Cards | `#ffffff` | White |
| Font | Montserrat | Google Font |

---

## 📋 Test Credentials (Development)

```
Email: admin@prison.gov
Password: Admin@123
```
```

## 📋 Prisoners Management Page

### Features
- **Prisoner List Table** - View all inmates with sorting and filtering
- **Stats Cards** - Total prisoners, new admissions, pending releases, high-risk count
- **Search & Filter** - Search by name, ID, case number; Filter by block, status, security, gender
- **Detail Modal** - View full prisoner profile with 5 tabs (Personal, Case, Medical, Assignment, Property)
- **Quick Actions** - Edit, Transfer, Discipline, Medical updates
- **Pagination** - Ready for large datasets
- **Select All** - Bulk action support

### API Endpoints Required

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/prisoners` | Get all prisoners | Yes |
| GET | `/api/prisoners/:id` | Get single prisoner | Yes |
| GET | `/api/prisoners/stats` | Get prisoner statistics | Yes |
| GET | `/api/prisoners/search?q=term` | Search prisoners | Yes |
| PUT | `/api/prisoners/:id` | Update prisoner details | Yes |
| POST | `/api/transfers` | Transfer prisoner to new block | Yes |
| POST | `/api/discipline` | Add disciplinary record | Yes |
| PUT | `/api/medical/:inmate_id` | Update medical record | Yes |

### Frontend → Backend Connection

**All buttons already trigger functions in `script.js`:**
- `openPrisonerModal(id)` → Needs `GET /api/prisoners/:id`
- `editPrisoner(id)` → Needs `GET /api/prisoners/:id` + `PUT /api/prisoners/:id`
- `transferPrisoner(id)` → Needs `POST /api/transfers`
- `filterPrisoners()` → Needs `GET /api/prisoners?block=A&status=active`

### Sample API Responses

**GET /api/prisoners**
```json
{
    "success": true,
    "data": [
        {
            "id": "INM-2024-0012",
            "first_name": "Marcus",
            "last_name": "Johnson",
            "age": 38,
            "gender": "Male",
            "nationality": "Ghanaian",
            "block": "A",
            "cell": "A-104",
            "security_level": "medium",
            "offense": "Armed Robbery",
            "sentence": "15 years",
            "status": "active",
            "admission_date": "2024-01-15",
            "photo": null,
            "case_number": "CASE-2024-0189",
            "warrant_number": "WRT-2024-0042"
        }
    ],
    "total": 1247,
    "page": 1,
    "per_page": 15
}
```

**GET /api/prisoners/stats**
```json
{
    "success": true,
    "data": {
        "total": 1247,
        "new_this_month": 38,
        "pending_release": 24,
        "high_risk": 42
    }
}
```

**POST /api/transfers**
```json
// Request
{
    "inmate_id": "INM-2024-0012",
    "from_block": "A",
    "to_block": "B",
    "new_cell": "B-305",
    "reason": "Security reassignment",
    "officer_id": 1
}

// Response
{
    "success": true,
    "message": "Transfer successful",
    "data": {
        "transfer_id": 1,
        "inmate_id": "INM-2024-0012",
        "new_block": "B",
        "new_cell": "B-305",
        "transfer_date": "2024-01-16"
    }
}
```

**POST /api/discipline**
```json
// Request
{
    "inmate_id": "INM-2024-0012",
    "incident": "Fighting in common area",
    "action_taken": "7 days solitary confinement",
    "officer_id": 1,
    "date": "2024-01-16"
}

// Response
{
    "success": true,
    "message": "Disciplinary record added",
    "data": {
        "discipline_id": 1,
        "inmate_id": "INM-2024-0012",
        "incident": "Fighting in common area",
        "action": "7 days solitary confinement",
        "status": "active"
    }
}
```

**PUT /api/medical/:inmate_id**
```json
// Request
{
    "notes": "Blood pressure elevated. Prescribed medication.",
    "checkup_date": "2024-01-16",
    "officer_id": 1
}

// Response
{
    "success": true,
    "message": "Medical record updated",
    "data": {
        "medical_id": 1,
        "inmate_id": "INM-2024-0012",
        "last_checkup": "2024-01-16",
        "notes": "Blood pressure elevated. Prescribed medication."
    }
}
```

### New Models Added

### 8. Transfer Model
```
Table: transfers
├── id              INTEGER (Primary Key)
├── inmate_id       INTEGER (Foreign Key → inmates.id)
├── from_block      VARCHAR(10)
├── from_cell       VARCHAR(20)
├── to_block        VARCHAR(10)
├── to_cell         VARCHAR(20)
├── reason          TEXT
├── requested_by    INTEGER (Foreign Key → users.id)
├── approved_by     INTEGER (Foreign Key → users.id, Nullable)
├── status          VARCHAR(20) - pending, approved, completed, rejected
├── transfer_date   DATE
├── created_at      DATETIME
└── updated_at      DATETIME
```

### 9. Discipline Model
```
Table: discipline_records
├── id              INTEGER (Primary Key)
├── inmate_id       INTEGER (Foreign Key → inmates.id)
├── incident        TEXT
├── incident_date   DATE
├── action_taken    TEXT
├── reported_by     INTEGER (Foreign Key → users.id)
├── severity        VARCHAR(20) - minor, moderate, major, critical
├── status          VARCHAR(20) - active, resolved, appealed
├── created_at      DATETIME
└── updated_at      DATETIME
```

### File Location
```
frontend/prisoners/
├── index.html      # Prisoner list page
├── style.css       # Styles
└── script.js       # All interactions (view, edit, transfer, discipline, medical)
```

### How to Test
1. Open `frontend/prisoners/index.html` in browser
2. Click **eye icon** → Opens detail modal with 5 tabs
3. Click **pencil icon** → Edit prisoner
4. Click **transfer icon** → Transfer to new block
5. In modal, click **Transfer/Discipline/Medical** buttons → All work
6. Use **search bar** and **filters** → Filters table live
```

---

---

---

## 📅 Court Attendance Management Page

### Features
- **Calendar View** - Monthly calendar with highlighted court dates
- **Daily Hearings List** - View all hearings for selected date
- **Upcoming Table** - All scheduled court appearances with filters
- **Schedule New Court Date** - Modal form to schedule hearings
- **Record Outcome** - Record verdict (Convicted/Acquitted/Adjourned/Discharged)
- **Quick Actions** - Adjourn, Cancel, Mark Complete
- **Stats Cards** - Today's hearings, This week, Pending, Completed
- **Color Coding** - Yellow=Scheduled, Green=Completed, Orange=Adjourned, Red=Cancelled

### File Location
```
frontend/court/
├── index.html      # Court attendance page
├── style.css       # Styles with calendar
└── script.js       # Calendar + hearings + outcomes
```

### API Endpoints Required

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/court` | Get all court hearings | Yes |
| GET | `/api/court?date=2024-01-16` | Get hearings by date | Yes |
| GET | `/api/court?status=scheduled` | Filter by status | Yes |
| GET | `/api/court/:id` | Get single hearing | Yes |
| GET | `/api/court/stats` | Get court statistics | Yes |
| POST | `/api/court` | Schedule new court date | Yes |
| PUT | `/api/court/:id` | Update hearing (outcome, adjourn) | Yes |
| DELETE | `/api/court/:id` | Cancel hearing | Yes |

### New Models

### 10. Court Attendance Model
```
Table: court_attendances
├── id                  INTEGER (Primary Key, Auto-increment)
├── inmate_id           INTEGER (Foreign Key → inmates.id)
├── case_number         VARCHAR(30)
├── court_name          VARCHAR(100)
├── hearing_type        VARCHAR(30) - trial, sentencing, bail, mention, appeal
├── hearing_date        DATE
├── hearing_time        TIME
├── judge_name          VARCHAR(100) (Nullable)
├── escort_officers     TEXT (Nullable) - Comma-separated officer IDs or names
├── status              VARCHAR(20) - scheduled, completed, adjourned, cancelled
├── outcome             VARCHAR(30) (Nullable) - convicted, acquitted, adjourned, discharged
├── verdict_details     TEXT (Nullable)
├── judge_remarks       TEXT (Nullable)
├── officer_report      TEXT (Nullable)
├── next_hearing_date   DATE (Nullable)
├── created_by          INTEGER (Foreign Key → users.id)
├── created_at          DATETIME
└── updated_at          DATETIME
```

### 11. Court Outcomes History Model
```
Table: court_outcomes
├── id                  INTEGER (Primary Key, Auto-increment)
├── court_attendance_id INTEGER (Foreign Key → court_attendances.id)
├── inmate_id           INTEGER (Foreign Key → inmates.id)
├── outcome             VARCHAR(30) - convicted, acquitted, adjourned, discharged
├── sentence_given      VARCHAR(100) (Nullable)
├── fine_amount         DECIMAL(10,2) (Nullable)
├── community_service   VARCHAR(100) (Nullable)
├── verdict_summary     TEXT
├── recorded_by         INTEGER (Foreign Key → users.id)
├── recorded_at         DATETIME
└── created_at          DATETIME
```

### Sample API Requests & Responses

**GET /api/court/stats**
```json
{
    "success": true,
    "data": {
        "today": 8,
        "this_week": 34,
        "pending": 52,
        "completed_this_month": 28
    }
}
```

**GET /api/court?date=2024-01-16**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "inmate_id": "INM-2024-0012",
            "prisoner_name": "Marcus Johnson",
            "case_number": "CASE-2024-0189",
            "court_name": "High Court - Accra",
            "hearing_type": "trial",
            "hearing_date": "2024-01-16",
            "hearing_time": "09:00",
            "judge_name": "Justice Abena Mensah",
            "escort_officers": "Capt. John Mensah, Offc. Grace Tetteh",
            "status": "scheduled",
            "outcome": null
        }
    ],
    "total": 2
}
```

**POST /api/court (Schedule New Hearing)**
```json
// Request
{
    "inmate_id": "INM-2024-0012",
    "case_number": "CASE-2024-0189",
    "court_name": "High Court - Accra",
    "hearing_type": "trial",
    "hearing_date": "2024-02-15",
    "hearing_time": "09:30",
    "judge_name": "Justice Abena Mensah",
    "escort_officers": [1, 4],
    "notes": "Witness testimony scheduled"
}

// Response
{
    "success": true,
    "message": "Court date scheduled successfully",
    "data": {
        "id": 8,
        "inmate_id": "INM-2024-0012",
        "hearing_date": "2024-02-15",
        "status": "scheduled"
    }
}
```

**PUT /api/court/:id (Record Outcome)**
```json
// Request
{
    "status": "completed",
    "outcome": "convicted",
    "verdict_details": "Found guilty on all counts. Sentenced to 15 years.",
    "judge_remarks": "Maximum sentence applied due to severity of crime",
    "officer_report": "Prisoner cooperative throughout proceedings",
    "sentence_given": "15 years imprisonment"
}

// Response
{
    "success": true,
    "message": "Outcome recorded successfully",
    "data": {
        "id": 1,
        "status": "completed",
        "outcome": "convicted",
        "updated_at": "2024-01-16T12:30:00"
    }
}
```

**PUT /api/court/:id (Adjourn)**
```json
// Request
{
    "status": "adjourned",
    "outcome": "adjourned",
    "next_hearing_date": "2024-02-20",
    "verdict_details": "Case adjourned pending witness availability"
}

// Response
{
    "success": true,
    "message": "Hearing adjourned",
    "data": {
        "id": 1,
        "status": "adjourned",
        "next_hearing_date": "2024-02-20"
    }
}
```

### Status Values Reference

| Field | Accepted Values |
|-------|----------------|
| **hearing_type** | `trial`, `sentencing`, `bail`, `mention`, `appeal` |
| **status** | `scheduled`, `completed`, `adjourned`, `cancelled` |
| **outcome** | `convicted`, `acquitted`, `adjourned`, `discharged` |

### How Frontend Connects to Backend

| Button/Action | Function | API Call |
|---------------|----------|----------|
| Click calendar date | `selectDate()` | `GET /api/court?date=YYYY-MM-DD` |
| "Record Outcome" | `openOutcomeModal()` | `PUT /api/court/:id` |
| "Adjourn" | `adjournHearing()` | `PUT /api/court/:id` |
| "Cancel" | `cancelHearing()` | `DELETE /api/court/:id` |
| "Schedule Court Date" | Opens modal | `POST /api/court` |
| Filter dropdowns | `applyFilters()` | `GET /api/court?status=X&type=Y` |
| Stats cards | `updateStats()` | `GET /api/court/stats` |

### Color Codes

| Status | Calendar Dot | Badge |
|--------|-------------|-------|
| Scheduled | 🟡 Brown dot | Yellow badge |
| Completed | 🟢 Green dot | Green badge |
| Adjourned | 🟠 Orange dot | Orange badge |
| Cancelled | 🔴 No dot | Red badge |

### How to Test
1. Open `frontend/court/index.html`
2. Click dates on calendar → See hearings for that day
3. Click **"Record Outcome"** → Fill verdict form
4. Click **"Adjourn"** → Set new date
5. Click **"Schedule Court Date"** → Add new hearing
6. Use **filters** on bottom table
```

## 🚪 Discharge Management Page

### Features
- **Stats Cards** - Pending, Today's, This Month, Total Completed discharges
- **Pending Discharges List** - Quick view of upcoming releases with process buttons
- **Release Checklist** - 8-item verification checklist (Medical, Property, Admin, Court, Security, Records, Biometric, Gate Pass)
- **Process Discharge Modal** - Complete discharge form with prisoner selection, type, reason, authority, destination
- **Discharge Types** - Release (Sentence Complete), Court Order (Acquitted/Bail), Transfer Out, Parole, Death, Escape
- **View Discharge** - Detailed view of any discharge record
- **Save as Draft** - Save incomplete discharge for later
- **Print Discharge** - Print discharge document
- **Cancel Discharge** - Cancel pending discharges
- **Filter Table** - Filter by type, status, and date

### File Location
```
frontend/discharge/
├── index.html      # Discharge management page
├── style.css       # Styles with checklist
└── script.js       # Discharge processing logic
```

### API Endpoints Required

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/discharge` | Get all discharge records | Yes |
| GET | `/api/discharge?status=pending` | Filter by status | Yes |
| GET | `/api/discharge/:id` | Get single discharge | Yes |
| GET | `/api/discharge/stats` | Get discharge statistics | Yes |
| POST | `/api/discharge` | Create new discharge (draft or complete) | Yes |
| PUT | `/api/discharge/:id` | Update discharge (complete checklist) | Yes |
| PUT | `/api/discharge/:id/cancel` | Cancel discharge | Yes |
| GET | `/api/discharge/:id/print` | Generate printable discharge document | Yes |

### New Models

### 12. Discharge Model
```
Table: discharges
├── id                  INTEGER (Primary Key, Auto-increment)
├── discharge_id        VARCHAR(20) (Unique) - e.g., DIS-2024-0012
├── inmate_id           INTEGER (Foreign Key → inmates.id)
├── discharge_type      VARCHAR(30) - release, court_order, transfer_out, parole, death, escape
├── reason              TEXT
├── discharge_date      DATE
├── authorizing_officer VARCHAR(100)
├── destination         VARCHAR(255) (Nullable)
├── witness_officer_id  INTEGER (Foreign Key → users.id, Nullable)
├── processed_by        INTEGER (Foreign Key → users.id)
├── status              VARCHAR(20) - pending, in_progress, completed, cancelled
├── notes               TEXT (Nullable)
├── created_at          DATETIME
└── updated_at          DATETIME
```

### 13. Discharge Checklist Model
```
Table: discharge_checklists
├── id                  INTEGER (Primary Key, Auto-increment)
├── discharge_id        INTEGER (Foreign Key → discharges.id)
├── medical_clearance   BOOLEAN (Default: false)
├── property_returned   BOOLEAN (Default: false)
├── admin_clearance     BOOLEAN (Default: false)
├── court_order_verified BOOLEAN (Default: false)
├── security_clearance  BOOLEAN (Default: false)
├── records_updated     BOOLEAN (Default: false)
├── biometric_scan      BOOLEAN (Default: false)
├── gate_pass_issued    BOOLEAN (Default: false)
├── verified_by         INTEGER (Foreign Key → users.id, Nullable)
├── verified_at         DATETIME
├── created_at          DATETIME
└── updated_at          DATETIME
```

### 14. Discharge History Model
```
Table: discharge_history
├── id                  INTEGER (Primary Key, Auto-increment)
├── discharge_id        INTEGER (Foreign Key → discharges.id)
├── inmate_id           INTEGER (Foreign Key → inmates.id)
├── action              VARCHAR(50) - created, updated, checklist_updated, completed, cancelled
├── details             TEXT
├── performed_by        INTEGER (Foreign Key → users.id)
├── performed_at        DATETIME
└── created_at          DATETIME
```

### Sample API Requests & Responses

**GET /api/discharge/stats**
```json
{
    "success": true,
    "data": {
        "pending": 12,
        "today": 3,
        "this_month": 28,
        "total_completed": 1892
    }
}
```

**GET /api/discharge?status=pending**
```json
{
    "success": true,
    "data": [
        {
            "id": "DIS-2024-0011",
            "inmate_id": "INM-2023-0150",
            "prisoner_name": "Kwame Nkrumah",
            "discharge_type": "court_order",
            "reason": "Acquitted by High Court",
            "discharge_date": "2024-01-16",
            "authorizing_officer": "Deputy Warden Comfort Asare",
            "status": "pending",
            "checklist_completed": 0
        }
    ],
    "total": 12
}
```

**POST /api/discharge (Save as Draft)**
```json
// Request
{
    "inmate_id": "INM-2024-0012",
    "discharge_type": "release",
    "reason": "Sentence completed - 15 years",
    "discharge_date": "2039-01-10",
    "authorizing_officer": "Warden James Appiah",
    "destination": "15 Independence Avenue, Accra",
    "status": "draft",
    "processed_by": 1
}

// Response
{
    "success": true,
    "message": "Discharge saved as draft",
    "data": {
        "discharge_id": "DIS-2024-0013",
        "status": "draft"
    }
}
```

**PUT /api/discharge/:id (Complete Discharge with Checklist)**
```json
// Request
{
    "status": "completed",
    "checklist": {
        "medical_clearance": true,
        "property_returned": true,
        "admin_clearance": true,
        "court_order_verified": true,
        "security_clearance": true,
        "records_updated": true,
        "biometric_scan": true,
        "gate_pass_issued": true
    },
    "witness_officer_id": 2,
    "notes": "All clearances obtained. Prisoner released to family."
}

// Response
{
    "success": true,
    "message": "Discharge completed successfully",
    "data": {
        "discharge_id": "DIS-2024-0013",
        "status": "completed",
        "completed_at": "2039-01-10T10:30:00",
        "gate_pass_number": "GP-2024-0891"
    }
}
```

**PUT /api/discharge/:id/cancel**
```json
// Request
{
    "reason": "Discharge order revoked by court"
}

// Response
{
    "success": true,
    "message": "Discharge cancelled",
    "data": {
        "discharge_id": "DIS-2024-0011",
        "status": "cancelled"
    }
}
```

### Discharge Types Reference

| Type | Code | Description |
|------|------|-------------|
| Release | `release` | Sentence completed |
| Court Order | `court_order` | Acquitted, bailed, or discharged by court |
| Transfer Out | `transfer_out` | Moving to another facility |
| Parole | `parole` | Approved for early release |
| Death | `death` | Deceased in custody |
| Escape | `escape` | Escaped from facility |

### Release Checklist Items

| # | Check | Description |
|---|-------|-------------|
| 1 | Medical Clearance | Final medical check completed |
| 2 | Property Returned | All personal items returned |
| 3 | Admin Clearance | All paperwork processed |
| 4 | Court Order Verified | Release order authenticated |
| 5 | Security Clearance | Final security check done |
| 6 | Records Updated | Prisoner file closed |
| 7 | Biometric Scan | Final fingerprint scan |
| 8 | Gate Pass Issued | Exit pass generated |

### Status Values Reference

| Status | Description |
|--------|-------------|
| `pending` | Scheduled but not started |
| `in_progress` | Checklist being completed |
| `completed` | All checks done, prisoner released |
| `cancelled` | Discharge cancelled/reversed |
| `draft` | Saved but not submitted |

### How Frontend Connects to Backend

| Button/Action | Function | API Call |
|---------------|----------|----------|
| "Process Discharge" | `processDischarge()` | Opens modal with pre-filled data |
| "Complete Discharge" | Button in modal | `PUT /api/discharge/:id` |
| "Save Draft" | Button in modal | `POST /api/discharge` (status: draft) |
| "View" (eye icon) | `viewDischarge()` | `GET /api/discharge/:id` |
| "Cancel" (X icon) | `cancelDischarge()` | `PUT /api/discharge/:id/cancel` |
| "Print" | `printDischarge()` | `GET /api/discharge/:id/print` |
| Filter dropdowns | `applyFilters()` | `GET /api/discharge?status=X&type=Y` |
| Stats cards | `updateStats()` | `GET /api/discharge/stats` |

### How to Test
1. Open `frontend/discharge/index.html`
2. View **pending discharges** in left panel
3. Click **"Process Discharge"** → Complete checklist → Submit
4. Click **"New Discharge"** button → Fill form → Save or Complete
5. Use **filters** on bottom table to find records
6. Click **eye icon** to view discharge details
7. Click **X icon** to cancel a discharge
```

---


---




