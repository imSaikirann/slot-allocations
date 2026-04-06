# Exam Slot Allocation System

This project is a full-stack exam slot allocation system with:

- A Node.js + Express backend
- A PostgreSQL database managed with Prisma
- A React + Vite frontend for admin and student workflows

The app lets an admin log in, create students, generate exam allocations, and view all assigned schedules. Students can search their exam schedule by hall ticket number.

## Project Structure

```text
exam/
|-- src/                  # Backend source code
|-- prisma/               # Prisma schema, migrations, seed script
|-- frontend/             # React frontend
|-- docker-compose.yml    # PostgreSQL container setup
|-- package.json          # Backend package config
|-- README.md
```

Important folders:

- `src/controllers` handles request logic
- `src/routes` defines API routes
- `src/services` contains allocation logic
- `src/middleware` contains admin JWT verification
- `frontend/src/pages` contains the app screens
- `frontend/src/services/api.ts` configures Axios for backend calls

## Features

- Admin login with JWT
- Create student records
- Seed default rooms, subjects, slots, and users
- Generate room and slot allocations for exams
- View all allocations from the admin dashboard
- Search a student's exam schedule using hall ticket number

## Tech Stack

### Backend

- Node.js
- Express
- Prisma
- PostgreSQL
- JWT
- bcryptjs

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios

## How It Works

### Admin flow

1. Admin logs in using email and password.
2. Backend verifies credentials and returns a JWT token.
3. Frontend stores the token in `localStorage`.
4. Token is attached automatically to protected API requests.
5. Admin can:
   - generate allocations
   - view all allocations
   - add a student

### Student flow

1. Student opens the student portal.
2. Student enters a hall ticket number.
3. Frontend requests the student's exam schedule.
4. Backend returns allocated subject, date, session, and room details.

## Backend Overview

Backend entry files:

- `src/server.js` starts the server on port `5000`
- `src/app.js` registers middleware and routes

Registered API route groups:

- `/api/auth/admin`
- `/api/student`
- `/api/allocation`

### API Endpoints

#### Auth

`POST /api/auth/admin/login`

Request body:

```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

Response:

```json
{
  "message": "Login successful",
  "token": "jwt-token"
}
```

#### Student

`POST /api/student/create`

Protected route. Requires `Authorization: Bearer <token>`.

Request body:

```json
{
  "name": "Student Name",
  "email": "student@mail.com",
  "hallTicket": "22CS051",
  "subjects": ["subject-id-1", "subject-id-2"]
}
```

Notes:

- If `subjects` is omitted, the student is still created.
- The default student password is currently hardcoded as `password123`.

#### Allocation

`POST /api/allocation/generate`

Protected route. Deletes old allocations and generates fresh ones.

`GET /api/allocation/all`

Protected route. Returns every allocation with student, subject, slot, and room data.

`GET /api/allocation/student/:hallTicket`

Public route. Returns a single student's schedule by hall ticket number.

## Allocation Logic

The allocation engine lives in `src/services/allocation.service.js`.

Current behavior:

- Clears all previous allocations
- Loads all students, subjects, slots, and rooms
- Iterates through every student
- Cycles subjects against available slots
- Prevents the same student from getting the same slot twice in one run
- Tracks room usage by `slot + room`
- Stops assigning a room when capacity is reached

Current limitation:

- Allocation is not based on each student's selected subjects; it loops through all subjects in the database for every student
- If slots and rooms are insufficient, some exams may remain unassigned
- There is no conflict resolution beyond simple slot reuse prevention per student

## Database Design

The Prisma schema is in `prisma/schema.prisma`.

Main models:

- `User`
- `Student`
- `Subject`
- `StudentSubject`
- `ExamSlot`
- `Room`
- `Allocation`

Enums:

- `Role`: `ADMIN`, `STUDENT`
- `Session`: `AM`, `PM`

Relationships:

- A `User` can be an admin or a student
- A `Student` belongs to one `User`
- A `Student` can have many subjects through `StudentSubject`
- An `Allocation` connects one student, one subject, one exam slot, and one room

## Seed Data

The seed script is `prisma/seed.js`.

It creates:

- 5 subjects
- 3 rooms
- 3 exam slots
- 50 students
- 1 admin user

Seeded admin credentials:

- Email: `admin@gmail.com`
- Password: `admin123`

Sample seeded hall tickets:

- `22CS001`
- `22CS002`
- `22CS003`

Important note:

- Seeded student passwords are currently stored as plain text in the script, while the admin password is hashed

## Frontend Overview

The frontend is inside `frontend/`.

Main screens:

- `frontend/src/pages/Login.tsx`
  Admin login page
- `frontend/src/pages/AdminDashboard.tsx`
  Generate allocations, view all allocations, add students
- `frontend/src/pages/StudentDashboard.tsx`
  Search by hall ticket and view exam schedule
- `frontend/src/pages/AddStudent.tsx`
  Create a student from the UI

Shared pieces:

- `frontend/src/components/Navbar.tsx`
- `frontend/src/services/api.ts`

Frontend routing:

- `/` -> Admin login
- `/admin` -> Admin dashboard
- `/student` -> Student dashboard
- `/add-student` -> Add student form

## Environment Variables

Create a `.env` file in the backend root with at least:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/exam_system
JWT_SECRET=your_jwt_secret
```

## Installation and Setup

### 1. Start PostgreSQL

Using Docker:

```bash
docker-compose up -d
```

This starts PostgreSQL with:

- database: `exam_system`
- user: `postgres`
- password: `postgres`
- port: `5432`

### 2. Install backend dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd frontend
npm install
```

### 4. Run Prisma migrations

From the project root:

```bash
npx prisma migrate dev
```

### 5. Seed the database

```bash
npm run seed
```

### 6. Start the backend

From the project root:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

### 7. Start the frontend

From `frontend/`:

```bash
npm run dev
```

Frontend usually runs at:

```text
http://localhost:5173
```

## Frontend to Backend Connection

The frontend Axios client uses:

```ts
baseURL: "http://localhost:5000/api"
```

If the backend URL changes, update:

- `frontend/src/services/api.ts`

## Default Credentials

Admin:

- Email: `admin@gmail.com`
- Password: `admin123`

Student:

- Seeded hall tickets start from `22CS001`
- Student login is not implemented in the current frontend
- Student schedule lookup is done by hall ticket only

## Known Issues / Limitations

- No root README existed before this one
- The backend server port is hardcoded to `5000`
- Frontend API base URL is hardcoded to localhost
- No automated tests are configured
- Error handling is minimal in several backend routes
- Student passwords are inconsistently handled in seed/create flows
- `frontend/src/components/AllocationTable.tsx` exists but is empty
- Logout in `AdminDashboard.tsx` navigates to `/admin-login`, but that route is not defined
- The repo contains a nested `exam-slot-system/` directory that appears to duplicate the backend project structure

## Duplicate Folder Note

There is an `exam-slot-system/` directory inside the repository that mirrors much of the backend code and Prisma setup. The active full-stack app appears to be:

- backend from the repository root
- frontend from `frontend/`

If this duplicate folder is not needed, it may be worth cleaning up later to reduce confusion.

## Useful Commands

From the project root:

```bash
npm run dev
npm run seed
npx prisma migrate dev
docker-compose up -d
```

From `frontend/`:

```bash
npm run dev
npm run build
npm run lint
```

## Future Improvements

- Add student authentication
- Let admins assign subjects while creating students through the UI
- Improve allocation algorithm to use actual enrolled subjects
- Add validation and better API error responses
- Move config values to environment variables on both frontend and backend
- Add tests for controllers and allocation logic
- Protect admin routes on the frontend

## Summary

This project is a working exam allocation platform with a simple admin workflow, a searchable student schedule portal, and a Prisma-backed PostgreSQL database. The README now documents the full stack, setup steps, schema, routes, and current limitations so the project is easier to run and explain.
