import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

// Authentication
import Login from "../pages/auth/Login";

// Dashboards
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import TeacherDashboard from "../pages/dashboard/TeacherDashboard";
import StaffDashboard from "../pages/dashboard/StaffDashboard";

// Students
import Students from "../pages/students/Students";
import StudentDetails from "../pages/students/StudentDetails";
import StudentAttendance from "../pages/students/StudentAttendance";

// Teachers
import Teachers from "../pages/teachers/Teachers";
import TeacherDetails from "../pages/teachers/TeacherDetails";

// Staff
import Staff from "../pages/staff/Staff";

// Attendance
import Attendance from "../pages/attendance/Attendance";
import MarkAttendance from "../pages/attendance/MarkAttendance";
import AttendanceHistory from "../pages/attendance/AttendanceHistory";
import AttendanceReports from "../pages/attendance/AttendanceReports";
import Shortage from "../pages/attendance/Shortage";

// Timetable
import Timetable from "../pages/timetable/Timetable";
import GenerateTimetable from "../pages/timetable/GenerateTimetable";
import EditTimetable from "../pages/timetable/EditTimetable";
import TimetableConflicts from "../pages/timetable/TimetableConflicts";

// Academics
import AcademicYears from "../pages/academics/AcademicYears";
import Departments from "../pages/academics/Departments";
import Courses from "../pages/academics/Courses";
import Classes from "../pages/academics/Classes";
import Subjects from "../pages/academics/Subjects";
import Rooms from "../pages/academics/Rooms";

// Leave
import LeaveManagement from "../pages/leave/LeaveManagement";
import LeaveRequests from "../pages/leave/LeaveRequests";

// Reports
import Reports from "../pages/reports/Reports";
import Analytics from "../pages/reports/Analytics";

// Activity
import ActivityLog from "../pages/activity/ActivityLog";

// Notifications
import Notifications from "../pages/notifications/Notifications";

// Settings
import Settings from "../pages/settings/Settings";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            AUTHENTICATION
        ========================== */}
        <Route path="/login" element={<Login />} />

        {/* =========================
            MAIN APPLICATION
        ========================== */}
        <Route path="/" element={<AppLayout />}>
          {/* Default */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* =========================
              DASHBOARDS
          ========================== */}
          <Route path="dashboard">
            <Route index element={<AdminDashboard />} />

            <Route
              path="admin"
              element={<AdminDashboard />}
            />

            <Route
              path="student"
              element={<StudentDashboard />}
            />

            <Route
              path="teacher"
              element={<TeacherDashboard />}
            />

            <Route
              path="staff"
              element={<StaffDashboard />}
            />
          </Route>

          {/* =========================
              STUDENTS
          ========================== */}
          <Route path="students">
            <Route index element={<Students />} />

            <Route
              path=":studentId"
              element={<StudentDetails />}
            />

            <Route
              path=":studentId/attendance"
              element={<StudentAttendance />}
            />
          </Route>

          {/* =========================
              TEACHERS
          ========================== */}
          <Route path="teachers">
            <Route index element={<Teachers />} />

            <Route
              path=":teacherId"
              element={<TeacherDetails />}
            />
          </Route>

          {/* =========================
              STAFF
          ========================== */}
          <Route
            path="staff"
            element={<Staff />}
          />

          {/* =========================
              ATTENDANCE
          ========================== */}
          <Route path="attendance">
            <Route
              index
              element={<Attendance />}
            />

            <Route
              path="mark"
              element={<MarkAttendance />}
            />

            <Route
              path="history"
              element={<AttendanceHistory />}
            />

            <Route
              path="reports"
              element={<AttendanceReports />}
            />

            <Route
              path="shortage"
              element={<Shortage />}
            />
          </Route>

          {/* =========================
              TIMETABLE
          ========================== */}
          <Route path="timetable">
            <Route
              index
              element={<Timetable />}
            />

            <Route
              path="generate"
              element={<GenerateTimetable />}
            />

            <Route
              path="edit"
              element={<EditTimetable />}
            />

            <Route
              path="conflicts"
              element={<TimetableConflicts />}
            />
          </Route>

          {/* =========================
              ACADEMICS
          ========================== */}
          <Route path="academics">
            <Route
              path="academic-years"
              element={<AcademicYears />}
            />

            <Route
              path="departments"
              element={<Departments />}
            />

            <Route
              path="courses"
              element={<Courses />}
            />

            <Route
              path="classes"
              element={<Classes />}
            />

            <Route
              path="subjects"
              element={<Subjects />}
            />

            <Route
              path="rooms"
              element={<Rooms />}
            />
          </Route>

          {/* =========================
              LEAVE
          ========================== */}
          <Route path="leave">
            <Route
              index
              element={<LeaveManagement />}
            />

            <Route
              path="requests"
              element={<LeaveRequests />}
            />
          </Route>

          {/* =========================
              REPORTS
          ========================== */}
          <Route path="reports">
            <Route
              index
              element={<Reports />}
            />

            <Route
              path="analytics"
              element={<Analytics />}
            />
          </Route>

          {/* =========================
              ACTIVITY
          ========================== */}
          <Route
            path="activity"
            element={<ActivityLog />}
          />

          {/* =========================
              NOTIFICATIONS
          ========================== */}
          <Route
            path="notifications"
            element={<Notifications />}
          />

          {/* =========================
              SETTINGS
          ========================== */}
          <Route
            path="settings"
            element={<Settings />}
          />

          {/* =========================
              FALLBACK
          ========================== */}
          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
