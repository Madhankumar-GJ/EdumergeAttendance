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

The system is designed around multiple college stakeholders:

Administrators

Teachers

Staff

Students

The long-term goal is to provide role-aware workflows for attendance management while connecting attendance data with academic structures and timetable information.

🎯 Problem Understanding
Traditional attendance systems often treat attendance as an isolated feature.

In a college environment, attendance is connected to:

Students

Teachers

Subjects

Classes

Departments

Courses

Rooms

Academic years

Timetables

Leave requests

Attendance shortage

Reports

Notifications

A useful attendance platform therefore needs to understand the academic context in which attendance is recorded.

EduMerge approaches attendance as part of a larger academic management workflow.

✨ Key Features
Dashboard
The dashboard provides a centralized overview of the system.

Planned/implemented dashboard capabilities include:

Attendance overview

Attendance statistics

Today's schedule

Quick actions

Alerts

Recent activity

Role-specific dashboards

👨‍🎓 Student Management
Student management is designed to support:

Student listing

Student search

Filtering

Student details

Academic information

Attendance information

Student statistics

Student attendance history

👨‍🏫 Teacher Management
Teacher management includes support for:

Teacher directory

Teacher details

Department association

Assigned subjects

Timetable integration

Attendance-related workflows

👥 Staff Management
The system also provides a dedicated staff management area for administrative and non-teaching staff.

📚 Academic Management
Academic entities are separated so that attendance and timetable information can reference the correct academic context.

Supported entities include:

Academic years

Departments

Courses

Classes

Subjects

Rooms

This structure allows the application to grow into a more complete college information system.

✅ Attendance Management
Attendance is one of the core modules.

The planned workflow supports:

Mark attendance

Attendance roster

Attendance status

Attendance history

Attendance calendar

Attendance summaries

Attendance reports

Shortage identification

Attendance filtering

Student-level attendance information

Possible attendance states include:

Present

Absent

Late

Excused

The architecture is designed so additional attendance states can be introduced later.

🗓️ Intelligent Timetable Management
The timetable module is designed to work together with academic data.

The generator considers inputs such as:

Classes

Subjects

Teachers

Rooms

Academic structure

Working days

Periods

Teacher availability

Room availability

Subject requirements

The system also contains conflict-detection functionality.

Potential timetable conflicts include:

Teacher assigned to two classes at the same time

Room assigned to multiple classes

Class assigned to multiple subjects in the same period

Teacher availability conflicts

Room availability conflicts

The architecture separates timetable generation and conflict detection into utility/service layers so the algorithm can be improved independently from the UI.

📊 Reports & Analytics
The reporting layer is designed to support:

Attendance reports

Attendance analytics

Student attendance analysis

Shortage identification

Data visualization

Export-oriented workflows

The project contains reusable chart components for presenting analytical information.

🔔 Notifications
The notification module is intended to provide a centralized place for:

Attendance alerts

Shortage alerts

Administrative notifications

System notifications

📝 Leave Management
The system includes leave-management workflows for:

Leave requests

Leave management

Approval/rejection workflows

This can later be connected directly with attendance calculation rules.

⚙️ Settings
The settings area provides a foundation for configurable application behaviour.

The project also supports:

Light theme

Dark theme

Persistent theme preference

🏗️ Technology Stack
Frontend
React

JavaScript

HTML

CSS

Tailwind CSS

UI / Animation
GSAP

Anime.js

Lucide Icons

Routing
React Router

Build Tool
Vite

Deployment
Vercel

Data / State Architecture
The current prototype uses frontend services, stores and local persistence to simulate application behaviour without requiring a backend server.

🧱 Architecture
The project follows a modular React architecture.

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

Components
Reusable UI and feature components.

Pages
Route-level screens and workflows.

Services
Application-level operations and data handling.

Stores
State management for major application domains.

Utils
Reusable business logic such as:

Attendance calculation

Conflict detection

Timetable generation

Validation

Formatting

CSV handling

Export utilities

Data
Seed/demo data used by the frontend prototype.

🧠 Design Approach
The system follows a separation-of-concerns approach.

Instead of putting all functionality inside individual pages, responsibilities are separated into:

UI
 ↓
Pages
 ↓
Components
 ↓
Stores / Services
 ↓
Utilities
 ↓
Data / Persistence

This makes individual modules easier to replace or expand.

For example, the timetable generator can eventually be replaced with a backend scheduling engine without requiring the entire timetable UI to be rewritten.

🔐 Authentication & Roles
The application architecture includes role concepts for:

Administrator

Teacher

Staff

Student

Role-aware routing and permissions can be expanded as backend authentication is introduced.

For the current prototype, some authentication/data behaviour is simulated on the client side.

💾 Data Persistence
The current prototype is frontend-focused.

Local storage is used where appropriate to preserve application state between browser sessions.

This is intentional for the prototype stage because it allows the complete UI and workflow to be demonstrated without requiring a separate backend deployment.

⚠️ Assumptions
The following assumptions were made during development:

A college has a structured academic hierarchy consisting of departments, courses, classes and subjects.

Students belong to academic classes/courses.

Teachers can be associated with subjects and timetable slots.

Rooms have limited availability.

A timetable should not assign the same teacher to multiple classes simultaneously.

A timetable should not assign the same room to multiple classes simultaneously.

Attendance is recorded in the context of a class, subject and timetable/session.

Attendance shortage can be calculated using configurable attendance thresholds.

Leave information may affect attendance calculations depending on institutional policy.

The frontend prototype can use seeded data before integration with a production backend.

🔄 Important Edge Cases
The system is designed with the following edge cases in mind.

Attendance
Duplicate attendance submission

Attendance for a non-existent student

Empty attendance roster

Invalid attendance date

Attendance modification after submission

Student below attendance threshold

Teacher attempting to mark attendance for an unauthorized class

Timetable
Same teacher assigned to multiple classes

Same room assigned to multiple classes

Same class assigned to multiple subjects

Insufficient rooms

Insufficient available periods

Teacher unavailable during a selected period

Subject requiring more periods than available

Empty timetable input

Impossible timetable constraints

Data
Empty datasets

Missing fields

Invalid identifiers

Duplicate records

Invalid academic relationships

UI
Mobile navigation

Long tables

Empty states

Loading states

Modal interactions

Dark/light theme switching

Responsive layouts

🧪 Validation Approach
Validation was performed incrementally during development.

The application was tested through:

Vite development server

Browser console

Route navigation

Component rendering

Manual interaction testing

Responsive layout checks

Theme switching

Import/export verification

Timetable conflict scenarios

Runtime errors were investigated through browser error messages and corrected at the source.

One example was resolving missing default exports in route-level React page modules.

Another was correcting the dashboard layout so the sidebar and header participate correctly in the page layout rather than incorrectly overlapping the main content.

⚖️ Trade-offs
Frontend-first architecture
Advantage
The entire prototype can be demonstrated without setting up a backend.

Trade-off
Production authentication, authorization and persistent multi-user data are not yet backed by a server.

Local storage
Advantage
Simple persistence during development and demonstration.

Trade-off
Local storage is not suitable for real multi-user institutional data.

Client-side timetable generation
Advantage
The timetable generation workflow can be demonstrated immediately in the browser.

Trade-off
A production scheduling system would likely require stronger constraint solving, optimization and potentially backend processing.

Modular frontend architecture
Advantage
Features can be developed independently.

Trade-off
The project has more files and abstractions than a simple single-page prototype.

🤖 Mandatory AI / Tool Usage Report
AI TOOL USED
ChatGPT

WHAT I ASKED AI TO DO
Design the architecture and feature structure for an advanced college attendance management system.

Generate and troubleshoot React components, routing, layouts, attendance modules and timetable-management functionality.

Help debug runtime/build issues and improve the application's UI architecture, responsive layout and dark/light theme implementation.

PROMPT THAT WAS MOST USEFUL
"Build this complete project using React so that it will be easy to render and smart and advanced. Give all commands from creating folder structure and installing packages to dependencies and complete everything."

CODE GENERATED BY AI
AI assistance was used across multiple parts of the frontend, including:

React page/component scaffolding

Routing structure

Attendance components

Timetable components

Dashboard components

Layout components

Utility/service structure

Styling

Theme implementation

Debugging fixes

CODE I MODIFIED
The generated code was reviewed and modified during implementation, particularly around:

Project structure

React Router integration

Layout behaviour

Sidebar positioning

Header behaviour

Dark/light theme implementation

Component integration

Runtime error fixes

UI behaviour

AI OUTPUT THAT WAS WRONG
Some generated modules initially did not match the project's actual file structure or export conventions.

This resulted in errors such as:

Failed to resolve import

and:

does not provide an export named 'default'

There was also an issue where the sidebar/header layout overlapped the main application content and the initial theme implementation changed the theme icon without correctly applying the visual theme throughout the application.

HOW I IDENTIFIED THE PROBLEM
I identified these problems using:

Vite error messages

Browser developer console

Import/export errors

Visual inspection of the rendered application

Route navigation testing

Theme switching testing

Checking the actual project directory structure

HOW I FIXED IT
I compared the generated imports against the actual project structure and corrected the relevant modules and exports.

For the layout issue, the application layout was reorganized so that the desktop sidebar participates in the main flex layout rather than incorrectly overlaying the content.

For dark mode, the theme state was connected to the root HTML element and the UI components were updated to use appropriate light/dark styles.

The implementation was then re-tested through the Vite development server.

🚧 Current Prototype Status
The project is currently a frontend prototype focused on demonstrating:

Application architecture

UI/UX

Navigation

Attendance workflows

Academic management structure

Timetable workflows

Reporting

Role-oriented interfaces

Responsive behaviour

Theme support

A production version would add a backend API, database, secure authentication, authorization, audit logging and server-side validation.

🔮 Future Improvements
Potential production improvements include:

PostgreSQL/MySQL database

REST/GraphQL API

Secure authentication

Role-based access control

Server-side attendance validation

Real-time notifications

Email/SMS integration

QR-based attendance

Biometric integration

Advanced timetable optimization

Audit logs

Cloud file storage

Automated scheduled reports

Institution-level configuration

Multi-college/tenant support

👨‍💻 Developer
Madhankumar GJ

Frontend / Full-Stack Developer

Contact
GitHub: https://github.com/Madhankumar-GJ

Project Repository: https://github.com/Madhankumar-GJ/EdumergeAttendance


📄 Assignment Submission
This repository was developed as part of the Edumerge technical/product assignment.


The repository contains the source code and documentation necessary to review the prototype and understand the major architectural decisions.

⭐ Acknowledgement
This project was developed with AI-assisted development tools. AI-generated code was reviewed, tested, debugged and modified during implementation.

The developer remains responsible for the final implementation and validation of the submitted solution.

#   E d u m e r g e A t t e n d a n c e  
 