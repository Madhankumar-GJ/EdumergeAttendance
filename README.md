EduMerge Attendance Management System
Advanced college attendance, academic management and intelligent timetable management prototype.

🚀 Live Project
Live Application:
https://edumerge-attendance.vercel.app/

The live URL above is the intended Vercel deployment URL. If your Vercel project generates a different production URL, replace this URL with the exact URL from Vercel before submitting.

📦 Source Code
GitHub Repository:
https://github.com/Madhankumar-GJ/EdumergeAttendance

📌 Project Overview
EduMerge Attendance Management System is a modern web-based college management prototype designed to bring attendance, students, teachers, staff, academics, reports, notifications and timetable management into a single system.

The project focuses on building a practical administrative interface rather than a simple attendance-marking page.

EduMerge Attendance Management System
Advanced College Attendance & Academic Management Platform




A modular React-based college management prototype connecting attendance, students, teachers, staff, academics, timetable generation, reports and notifications in a single platform.

🔗 Project Links
Resource	Link
🌐 Live Application	Open Live Project
💻 GitHub Repository	View Source Code
👨‍💻 Developer GitHub	Madhankumar-GJ

Note: If Vercel assigns a different production URL, replace the live application URL above with the final Vercel URL before submission.

1. Project Overview
EduMerge Attendance Management System is a frontend-focused college management prototype designed around the idea that attendance should not operate as an isolated feature.

In a real college environment, attendance is closely connected to:

Students

Teachers

Staff

Departments

Courses

Classes

Subjects

Rooms

Academic years

Timetables

Leave management

Reports

Notifications

The application therefore brings these areas together through a modular React architecture.

2. Problem Statement
Traditional attendance applications often focus only on:

Select Class
     ↓
Mark Attendance
     ↓
Save

This approach does not adequately represent the academic context behind attendance.

EduMerge expands the workflow:

Academic Structure
        ↓
Course → Class → Subject
        ↓
Teacher Assignment
        ↓
Timetable
        ↓
Attendance Session
        ↓
Attendance Records
        ↓
Analytics / Shortage
        ↓
Reports / Notifications

This structure makes attendance part of the broader academic workflow.

3. Key Features
📊 Dashboard
Centralized system overview

Attendance statistics

Today's schedule

Quick actions

Alerts

Recent activity

Role-oriented dashboard structure

🎓 Student Management
Student directory

Student search

Filtering

Student details

Academic information

Attendance summary

Attendance history

Student statistics

👨‍🏫 Teacher Management
Teacher directory

Teacher details

Department association

Subject assignments

Timetable association

Attendance-related workflows

👥 Staff Management
Staff directory

Staff details

Administrative staff workflows

Dedicated staff management area

🏫 Academic Management
The academic structure is divided into independent entities:

Module	Purpose
Academic Years	Manage academic sessions
Departments	Organize institutional departments
Courses	Manage academic programs
Classes	Manage student groups
Subjects	Manage academic subjects
Rooms	Manage classrooms and resources

This structure provides the foundation for attendance and timetable relationships.

4. Attendance Management
Attendance is the core module of the application.

Supported workflows
Mark attendance

Attendance roster

Attendance status

Attendance history

Attendance calendar

Attendance summary

Attendance reports

Attendance shortage

Student attendance

Attendance filtering

Attendance states
Status	Description
🟢 Present	Student attended the session
🔴 Absent	Student did not attend
🟡 Late	Student arrived late
🔵 Excused	Absence approved/excused

The architecture allows additional attendance states to be added later.

5. Timetable Management
The timetable module connects academic data with scheduling.

Timetable inputs
Academic year

Department

Course

Class

Subject

Teacher

Room

Working days

Periods

Teacher availability

Room availability

Subject requirements

Generation workflow
Academic Data
      ↓
Scheduling Inputs
      ↓
Constraint Validation
      ↓
Timetable Generation
      ↓
Conflict Detection
      ↓
Review / Edit
      ↓
Final Timetable

Conflict detection
The system is designed to identify situations such as:

Teacher assigned to multiple classes at the same time

Room assigned to multiple classes

Class assigned multiple subjects in one period

Teacher availability conflicts

Room availability conflicts

Insufficient available periods

Insufficient rooms

The timetable generator and conflict detector are separated from the UI so the scheduling logic can evolve independently.

6. Reports & Analytics
The reporting architecture provides a foundation for:

Attendance reports

Attendance analytics

Student attendance analysis

Shortage reports

Visual data analysis

Export-oriented workflows

Reusable chart components are included for analytical dashboards.

7. Leave Management
Leave management provides the foundation for:

Leave requests

Leave management

Approval workflows

Rejection workflows

Future integration can allow approved leave to influence attendance calculations according to institutional policies.

8. Notifications
The notification module provides a centralized area for:

Attendance alerts

Shortage notifications

Administrative notifications

System notifications

9. User Roles
The architecture supports the following roles:

Role	Main Responsibility
Administrator	System and academic management
Teacher	Classes, subjects and attendance
Staff	Administrative operations
Student	Personal attendance and academic information

Role-aware routing and permissions can be expanded when a backend authentication layer is introduced.

10. UI / UX
The interface is designed around:

Responsive layouts

Desktop navigation

Mobile navigation

Reusable components

Data tables

Cards

Modals

Filters

Empty states

Charts

Notifications

Light theme

Dark theme

Design goals
Minimize unnecessary navigation.

Keep related academic data connected.

Make frequently used attendance actions easily accessible.

Provide clear visual feedback.

Support both desktop and mobile workflows.

11. Technology Stack
Technology	Purpose
React	Frontend application
JavaScript	Application logic
Tailwind CSS	UI styling
Vite	Development/build tooling
React Router	Client-side routing
GSAP	Advanced animations
Anime.js	UI animations
Lucide React	Interface icons
Vercel	Deployment

12. Architecture
The project follows a modular component-based architecture.

src/
│
├── assets/
│
├── components/
│   ├── attendance/
│   ├── charts/
│   ├── common/
│   ├── dashboard/
│   ├── layout/
│   ├── students/
│   └── timetable/
│
├── config/
│
├── data/
│
├── hooks/
│
├── layouts/
│
├── pages/
│   ├── academics/
│   ├── activity/
│   ├── attendance/
│   ├── auth/
│   ├── dashboard/
│   ├── leave/
│   ├── notifications/
│   ├── reports/
│   ├── settings/
│   ├── staff/
│   ├── students/
│   ├── teachers/
│   └── timetable/
│
├── router/
│
├── services/
│
├── store/
│
└── utils/

Layer responsibilities
┌─────────────────────────────┐
│            Pages            │
│       Route-level UI        │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│         Components          │
│      Reusable UI logic      │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│       Stores / Hooks        │
│       Application State     │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│          Services           │
│     Application Operations  │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│           Utils             │
│ Business & validation logic │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│       Seed / Demo Data      │
└─────────────────────────────┘

13. Important Utility Modules
The application separates reusable business logic into utility modules.

Utility	Responsibility
attendanceCalculator.js	Attendance calculations
conflictDetector.js	Timetable conflict detection
timetableGenerator.js	Timetable generation logic
csvUtils.js	CSV processing
dateUtils.js	Date operations
exportUtils.js	Data export
formatters.js	Display formatting
validators.js	Input validation

This separation makes the application easier to maintain and extend.

14. State Management
Separate stores are maintained for major application domains.

store/
├── appStore.js
├── attendanceStore.js
├── authStore.js
├── leaveStore.js
├── notificationStore.js
├── settingsStore.js
├── studentStore.js
├── teacherStore.js
└── timetableStore.js

This prevents the entire application from depending on one large global state object.

15. Data Flow Example
Attendance
Teacher
   ↓
Select Class
   ↓
Select Subject
   ↓
Select Session
   ↓
Load Student Roster
   ↓
Mark Attendance
   ↓
Validate
   ↓
Store Attendance
   ↓
Calculate Statistics
   ↓
Reports / Shortage / Analytics

Timetable
Classes
Teachers
Subjects
Rooms
Availability
Periods
    │
    ▼
Timetable Generator
    │
    ▼
Conflict Detector
    │
    ├── Conflicts Found → Review / Edit
    │
    └── Valid Schedule → Timetable

16. Setup & Installation
Prerequisites
Make sure the following are installed:

Node.js

npm

Git

Verify:

node --version
npm --version
git --version

Clone the Repository
git clone https://github.com/Madhankumar-GJ/EdumergeAttendance.git

Navigate into the project:

cd EdumergeAttendance

Install dependencies:

npm install

Start the development server:

npm run dev

Vite will provide the local development URL.

17. Production Build
Create a production build:

npm run build

Preview the production build:

npm run preview

The production output is generated in:

dist/

dist/ is intentionally excluded from Git because Vercel generates it during deployment.

18. Deployment
The project is configured for Vercel deployment.

GitHub
   │
   ▼
Vercel
   │
   ├── Install dependencies
   │
   ├── npm run build
   │
   └── Deploy dist/

Every new push to the connected GitHub repository can trigger a new Vercel deployment.

19. Assumptions
The prototype currently assumes:

A college has departments, courses, classes and subjects.

Students belong to academic classes.

Teachers can be associated with subjects.

Rooms have limited availability.

A teacher cannot teach two classes simultaneously.

A room cannot host two classes simultaneously.

Attendance is associated with an academic session.

Attendance shortage is based on configurable thresholds.

Approved leave may affect attendance according to institutional policy.

Seed data can be used during prototype development.

Production persistence will eventually be handled by a backend/database.

20. Validation & Edge Cases
Attendance
Duplicate attendance submission

Empty attendance roster

Invalid attendance date

Missing student

Student below attendance threshold

Attendance modification

Unauthorized attendance operation

Timetable
Teacher double-booking

Room double-booking

Class double-booking

Teacher unavailable

Room unavailable

Insufficient rooms

Insufficient periods

Impossible scheduling constraints

Empty scheduling inputs

Data
Missing fields

Duplicate records

Invalid IDs

Empty datasets

Invalid academic relationships

UI
Responsive navigation

Mobile sidebar

Long tables

Empty states

Modal interactions

Theme switching

Route navigation

21. Testing & Validation Approach
The prototype was validated incrementally during development.

Validation methods
Vite development server

Production build

Browser developer console

Route navigation

Manual UI testing

Responsive layout testing

Theme testing

Import/export verification

Timetable conflict scenarios

Runtime error investigation

Debugging example
During development, several route modules initially produced errors such as:

does not provide an export named 'default'

The issue was identified by examining the Vite import error and comparing route imports with the actual component exports.

The affected modules were corrected and re-tested.

A separate layout issue caused the sidebar/header to overlap the main content. The layout was subsequently reorganized so that the desktop sidebar participates in the main flex layout rather than behaving as an unwanted overlay.

22. Technical Trade-offs
Decision	Benefit	Trade-off
React	Component reusability	More project structure than plain HTML
Vite	Fast development/build	Requires Node.js environment
Modular architecture	Easier maintenance	More files/abstractions
Client-side prototype	Easy demonstration	Not suitable for production persistence
Local storage	Simple state persistence	Not suitable for multi-user synchronization
Client timetable generation	Demonstrable scheduling workflow	Production version may require stronger optimization
Seed data	Fast prototype development	Not connected to institutional database

23. Current Prototype vs Production
Current Prototype
React Frontend
      │
      ├── Local State
      ├── Seed Data
      ├── Local Persistence
      └── Client-side Business Logic

Production Architecture
A production implementation could evolve into:

React Frontend
      │
      ▼
API Layer
      │
      ▼
Authentication / Authorization
      │
      ▼
Backend Services
      │
      ├── Attendance
      ├── Students
      ├── Teachers
      ├── Timetable
      ├── Reports
      └── Notifications
      │
      ▼
PostgreSQL / MySQL

Additional production infrastructure could include:

Redis

Background jobs

Email/SMS services

Cloud storage

Audit logging

Monitoring

24. Future Improvements
The following features could be added in a production version:

Authentication
Secure login

JWT/session authentication

Role-based access control

Password reset

Multi-factor authentication

Attendance
QR attendance

RFID integration

Biometric integration

Bulk attendance

Attendance locking

Audit trails

Timetable
Constraint optimization

Automatic teacher availability analysis

Room capacity constraints

Elective-subject scheduling

Multiple timetable versions

Drag-and-drop editing

Notifications
Email notifications

SMS notifications

Push notifications

Parent/guardian alerts

Infrastructure
PostgreSQL/MySQL

REST/GraphQL API

Cloud storage

Background jobs

Audit logging

Monitoring

25. Mandatory AI / Tool Usage Report
AI Tool Used
ChatGPT

What I Asked AI To Do
1. Project Architecture
Designed the overall architecture and feature structure for an advanced college attendance management system.

2. React Development
Generated and assisted with:

React components

Pages

Routing

Layouts

Attendance modules

Timetable modules

Dashboard modules

Services

Stores

Utility modules

Styling

3. Debugging & Improvement
Assisted with:

Import/export errors

React Router issues

Missing modules

Sidebar layout problems

Responsive navigation

Dark/light theme implementation

UI structure

Most Useful Prompt
"Will do one thing will do this project using React so that it will be easy to render and smart and advanced."

Followed by:

"Give all commands from creating folder structure and installing packaging to dependencies and complete everything 100%."

These prompts established the React-based architecture and development workflow.

Code Generated By AI
AI assistance was used for portions of:

React application scaffolding

Component structures

Page structures

Routing

Attendance UI

Timetable UI

Dashboard UI

State/store structure

Service structure

Utility functions

CSS/Tailwind styling

Responsive layout

Theme implementation

Code Modified By Me
The generated code was reviewed and modified during implementation, including:

Project structure

File organization

Component integration

Route configuration

Layout behavior

Sidebar positioning

Header behavior

Theme implementation

UI styling

Runtime error corrections

Application-specific data and workflows

AI Output That Was Wrong
Some generated code initially did not match the actual project file structure or export conventions.

This resulted in errors including:

Failed to resolve import

and:

does not provide an export named 'default'

There was also an initial layout issue where the sidebar and top navigation could overlap the main content.

The first theme implementation also changed the theme icon without correctly applying the theme to the complete application interface.

How I Identified The Problems
Problems were identified through:

Vite development errors

Browser console errors

React runtime errors

Inspecting the actual project directory

Route navigation

Manual UI testing

Dark/light theme testing

Production build validation

How I Fixed Them
The project structure was compared against the generated imports and route definitions.

Incorrect imports and exports were corrected.

The layout was reorganized so that the desktop sidebar occupies its own layout space instead of overlaying the main application.

Theme handling was connected to the root HTML element so the application's light/dark styles are applied consistently.

The application was then re-tested through the Vite development server.

26. Developer
Madhankumar GJ
Frontend / Full-Stack Developer

GitHub:
https://github.com/Madhankumar-GJ

Project:
https://github.com/Madhankumar-GJ/EdumergeAttendance

Live Application:
https://edumerge-attendance.vercel.app/

Add a professional email address and LinkedIn profile here before final submission if required.

27. Assignment Information
Detail	Information
Assignment	Edumerge Technical/Product Assignment
Submission Deadline	9:00 AM, 25 September 2026
Submission Email	tech_interview@edumerge.com
Source Repository	GitHub
Deployment	Vercel
AI Tool	ChatGPT

28. Submission Checklist
Before submitting, verify:

 GitHub repository contains the complete source code

 node_modules/ is excluded

 .env files are excluded

 npm install works

 npm run build succeeds

 Vercel deployment succeeds

 Live URL works

 Main routes work

 Attendance workflow can be demonstrated

 Timetable workflow can be demonstrated

 Dark/light theme works

 Responsive layout works

 README contains architecture and assumptions

 AI usage report is completed

 Developer contact information is included

 Live project URL is included

 GitHub repository URL is included

👨‍💻 Built by Madhankumar GJ
EduMerge Attendance Management System

A modular approach to connecting college attendance with the wider academic workflow.