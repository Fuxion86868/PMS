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

---

