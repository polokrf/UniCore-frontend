# 🎓 UniCore — University Management System (Frontend)

UniCore is a modern, responsive frontend application for a **University Management System** designed to simplify university academic operations through role-based dashboards and seamless REST API integration.

The application provides dedicated interfaces for administrators, department heads, teachers, students, and general users to manage academic activities, including departments, courses, semesters, enrollments, class routines, payments, and academic results.

Built with **Next.js, TypeScript, TanStack Query, and shadcn/ui**, UniCore focuses on a clean user interface, reusable components, type safety, and efficient server-state management.

> 🚀 **Project Status:** MVP (Minimum Viable Product)

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* User login and registration
* JWT-based authentication
* Access token and refresh token handling through HTTP cookies
* Email verification support
* Protected routes and authentication guards
* Role-based dashboard access
* Active/inactive account handling
* Automatic redirection based on authentication status

### 👥 Role-Based Dashboards

UniCore supports multiple user roles with role-specific functionality.

| Role              | Access                                       |
| ----------------- | -------------------------------------------- |
| `USER`            | General user features                        |
| `SUPER_ADMIN`     | System-wide management                       |
| `ADMIN`           | University administration                    |
| `DEPARTMENT_HEAD` | Department-level management                  |
| `TEACHER`         | Teaching and academic operations             |
| `STUDENT`         | Enrollment, schedules, payments, and results |

Access to individual features depends on the permissions implemented by the backend.

### 🏢 Department Management

Administrators can manage university departments through an interactive dashboard.

* Create departments
* View all departments
* View department details
* Update department information
* Delete or deactivate departments
* Search and manage department records

### 👨‍🏫 Teacher Management

The teacher management interface supports the teacher application and approval workflow.

* Submit teacher applications
* View teacher profiles
* Search teachers
* Filter teachers by status and department
* Approve or reject applications
* Activate or deactivate teacher accounts

### 🎓 Student Management

The student management module provides interfaces for student applications and administrative operations.

* Submit student applications
* View student profiles
* Search students
* Filter by status, department, batch, and semester
* Approve or reject student applications
* Activate or deactivate student accounts
* Display generated student IDs

### 📚 Course Management

* Create and manage courses
* View course information
* Display course codes, titles, and credits
* Manage department-based courses
* Activate or deactivate courses

### 📅 Semester Management

Manage academic semesters through the administration dashboard.

* Create semesters
* View semester information
* Update semester details
* Manage semester names and academic years
* Set start and end dates
* Manage active status

Supported semesters:

* Spring
* Summer
* Fall

### 📝 Course Offering Management

The course offering interface allows administrators to manage courses offered during specific semesters.

* Create course offerings
* Assign courses to semesters
* Manage sections
* Set enrollment capacity
* Configure course fees
* Assign teachers
* View and update course offerings
* Manage active and inactive offerings

### 📖 Course Enrollment

The enrollment module supports the student course registration workflow.

* View available course offerings
* Enroll in courses
* View enrollment information
* Track enrollment status
* Support enrollment confirmation and cancellation
* Display relevant course and semester information

Supported enrollment statuses:

```text
PENDING
CONFIRMED
CANCELLED
```

### 💳 Payment Integration

UniCore integrates with the backend's **bKash Sandbox/Test Payment Flow** for course enrollment payments.

Frontend payment functionality can include:

* Initiate the payment process
* Redirect to the bKash sandbox checkout
* Handle payment return or callback navigation
* Display payment status
* Show transaction and invoice information
* Display payment success or failure feedback

Supported payment statuses:

```text
UNPAID
PENDING
PAID
FAILED
REFUNDED
CANCELLED
```

> **Note:** Payments use the bKash sandbox/test environment. Production payment processing requires the appropriate production configuration and credentials.

### 🗓️ Class Routine Management

The class routine interface helps users view and manage academic schedules.

* Create class routines
* View class schedules
* Update existing routines
* Delete or deactivate routines
* Display course, teacher, room, and time information
* Organize schedules by day
* Support routine management through tables and detail views

Supported days:

```text
SATURDAY
SUNDAY
MONDAY
TUESDAY
WEDNESDAY
THURSDAY
FRIDAY
```

The backend validates scheduling conflicts involving rooms and teachers.

### 📊 Result & Grade Management

The result management module supports academic result creation and viewing.

* Create results for eligible enrollments
* Enter student marks
* Display grades and grade points
* Manage result publication status
* Allow students to view published results

Supported grades:

```text
A_PLUS
A
A_MINUS
B_PLUS
B
B_MINUS
C_PLUS
C
D
F
```

### 🔎 Search, Filtering & Pagination

The frontend integrates with backend APIs to provide efficient data management.

Supported modules include:

* Users
* Teachers
* Students
* Enrollments
* Results

Features include:

* Search by keyword
* Filter by status
* Filter by relevant academic attributes
* Pagination
* URL-based filter and page state where implemented
* Loading, empty, and error states

---

## 🛠️ Technology Stack

### Frontend

* **Next.js** — React framework
* **React** — Component-based user interfaces
* **TypeScript** — Static type checking
* **Tailwind CSS** — Utility-first styling
* **shadcn/ui** — Reusable UI components

### Data Fetching & Forms

* **TanStack Query** — Server-state management, caching, and mutations
* **TanStack Form** — Form state management and validation integration
* **Zod** — Schema validation where implemented
* **ofetch** — HTTP requests and API communication

### UI & User Experience

* **Lucide React** — Icons
* Responsive dashboard layouts
* Reusable tables, dialogs, forms, and tabs
* Toast notifications
* Loading indicators
* Empty states and error handling

### Backend Integration

* Node.js
* Express.js 5
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT authentication
* HTTP cookies
* Redis
* bKash Sandbox API

> The backend technologies are listed to describe the integrated system; they are not frontend dependencies.

---

## 🏗️ Project Architecture

The frontend follows a modular, component-based architecture that separates pages, reusable UI components, API hooks, and application types.

```text
src/
├── app/
│   ├── (auth)/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   ├── loading.tsx
│   └── layout.tsx
│
├── components/
│   ├── ui/
│   ├── Form/
│   ├── modules/
│   │   ├── adminDashboard/
│   │   ├── teacher/
│   │   └── student/
│   └── shared/
│
├── hooks/
│   ├── auth.hook.ts
│   └── ...
│
├── lib/
│   ├── utils.ts
│   └── ...
│
├── services/
├── type/
├── providers/
└── ...
```

*Note: This is a representative structure. Update it to match the actual folders and files in your repository.*

---

## 🔄 Data Flow

UniCore follows a frontend-to-backend API communication workflow.

```text
User Interaction
       │
       ▼
Next.js Page / Component
       │
       ▼
Custom Hooks
       │
       ├── TanStack Query
       ├── TanStack Form
       └── API Service
              │
              ▼
       Express REST API
              │
              ▼
       Prisma ORM
              │
              ▼
       PostgreSQL Database
```

Authentication cookies are included in API requests where required by the configured HTTP client.

---

## 🔒 Security & Authentication

The frontend works with the backend authentication system to provide a secure application experience.

* Protected dashboard routes
* Role-based access control
* HTTP cookie-based token handling
* Credential-aware API requests
* Authentication state management
* Form validation
* Unauthorized request handling

**Important:** Frontend route guards improve navigation and user experience but do not replace backend authorization. The backend must independently validate authentication and permissions for protected operations.

---

## ⚙️ Getting Started

Follow these steps to run the frontend application locally.

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git
* A running UniCore backend API

### 1. Clone the Repository

```bash
git clone https://github.com/polokrf/UniCore-frontend.git
```

```bash
cd UniCore-Frontend
```

> Replace the repository URL if your actual frontend repository uses a different name.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Update the API URL to match your backend configuration.

> Make sure the frontend API client uses the same environment variable. If your backend uses a different API base path, adjust the value accordingly.

### 4. Start the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

### 5. Build for Production

```bash
npm run build
```

### 6. Start the Production Server

```bash
npm run start
```

---

## 🌐 Backend API Integration

The frontend communicates with the UniCore backend through REST APIs.

Example API endpoint:

```http
GET /api/admin/students?search=polok&status=APPROVED&page=1&limit=10
```

Example API configuration:

```typescript
import { ofetch } from 'ofetch';

export const api = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
});
```

This configuration enables cookie credentials to be included in browser requests.

The backend must be configured with appropriate CORS settings when the frontend and backend run on different origins.

---

## 🚀 Deployment

The frontend can be deployed to platforms that support Next.js applications, such as Vercel.

### Deployment Checklist

* Configure the production backend API URL.
* Add the required environment variables.
* Ensure backend CORS settings allow the frontend origin.
* Configure secure cookie attributes for production.
* Verify authentication and refresh-token behavior.
* Test all role-based dashboards.
* Test payment flows using the sandbox environment.
* Run a production build before deployment.

---

## 🧪 Testing & Development

Recommended testing areas include:

* Login and registration
* Protected routes and authentication redirects
* Role-based dashboard access
* Form validation
* CRUD operations
* Search, filtering, and pagination
* Enrollment workflows
* Payment success and failure handling
* Class routine management
* Result creation and publication
* Loading, empty, and error states
* Production API integration

---

## 🎯 Project Goals

UniCore aims to provide a practical university management experience while demonstrating modern frontend development practices.

Key goals:

* Build a responsive and reusable UI
* Maintain type safety with TypeScript
* Manage server state efficiently
* Integrate with a secure REST API
* Implement role-specific user experiences
* Handle real-world academic workflows
* Improve maintainability through modular architecture

---

## 🔮 Future Improvements

Potential future enhancements include:

* Real-time notifications
* Student and teacher messaging
* Advanced analytics dashboards
* Academic performance charts
* Enhanced accessibility
* Improved automated testing
* More comprehensive error reporting
* Production payment integration

---

---

## 📄 License

This project is currently developed as an MVP for learning and portfolio purposes.

Add a `LICENSE` file to the repository if you intend to distribute the project under a specific open-source license.
