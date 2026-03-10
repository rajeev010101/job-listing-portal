# Job Listing Portal Backend

A full-featured backend system for a job marketplace platform built with Node.js, Express, and MongoDB.

This project implements authentication, job listings, applications, dashboards, notifications, and employer verification — following a modular architecture suitable for production-ready systems.

---

##  Features

###  Authentication
- User registration & login
- Secure password hashing (bcrypt)
- JWT authentication
- Role-based access (jobseeker / employer)

###  Profile Management
- Job seeker profile
- Employer profile
- Resume upload
- Avatar upload
- Profile update APIs

###  Employer Verification
- Admin approval system
- Employer-only job posting
- Verification middleware

###  Job Listings
- Create / update / delete jobs
- View public jobs
- Employer ownership protection

###  Job Applications
- Apply to jobs
- Prevent duplicate applications
- Track application status
- Employer applicant view

###  Dashboards
- Job seeker dashboard
- Employer dashboard
- Aggregated statistics

###  Search & Filters
- Keyword search
- Location filter
- Pagination & sorting

###  Notifications
- Automatic alerts on applications
- Notification inbox
- Read/unread tracking

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)
- dotenv
- Nodemon

---

##  Folder Structure

```
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── uploads/
├── .env
├── package.json
└── README.md
```

---

##  Setup Instructions

### 1. Clone repo

```
git clone https://github.com/yourusername/job-listing-portal.git
cd job-listing-portal/backend
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start server

```
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

##  API Overview

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Profile
```
GET /api/profile
PUT /api/profile
POST /api/profile/resume
POST /api/profile/avatar
```

### Jobs
```
POST /api/jobs
GET /api/jobs
PUT /api/jobs/:id
DELETE /api/jobs/:id
GET /api/jobs/search
```

### Applications
```
POST /api/applications/apply/:jobId
GET /api/applications/my
GET /api/applications/job/:jobId
```

### Dashboard
```
GET /api/dashboard/jobseeker
GET /api/dashboard/employer
```

### Notifications
```
GET /api/notifications
PUT /api/notifications/:id/read
```

---

##  Security Features

- JWT route protection
- Role-based authorization
- Employer verification gate
- Input validation
- Duplicate application prevention

---

##  Project Status

All core backend modules completed:

- Authentication
- Profiles
- Job Listings
- Applications
- Dashboards
- Search
- Notifications
- Employer verification

This backend is portfolio-ready and interview-ready.

---

##  Future Improvements

- Email notifications
- Real-time socket alerts
- Admin analytics panel
- Swagger API documentation
- Docker deployment
- Cloud storage integration
- Unit testing

---

##  Author

Developed as part of a full backend job marketplace system.

---

##  License

MIT License
