import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialDepartments = [
  {
    id: "DEP-CSE",
    code: "CSE",
    name: "Computer Science & Engineering",
  },
  {
    id: "DEP-ECE",
    code: "ECE",
    name: "Electronics & Communication Engineering",
  },
  {
    id: "DEP-EEE",
    code: "EEE",
    name: "Electrical & Electronics Engineering",
  },
  {
    id: "DEP-MECH",
    code: "MECH",
    name: "Mechanical Engineering",
  },
];

const initialCourses = [
  {
    id: "CRS-CSE",
    code: "BTECH-CSE",
    name: "B.Tech Computer Science",
    departmentId: "DEP-CSE",
    duration: 4,
  },
  {
    id: "CRS-ECE",
    code: "BTECH-ECE",
    name: "B.Tech Electronics & Communication",
    departmentId: "DEP-ECE",
    duration: 4,
  },
  {
    id: "CRS-EEE",
    code: "BTECH-EEE",
    name: "B.Tech Electrical & Electronics",
    departmentId: "DEP-EEE",
    duration: 4,
  },
  {
    id: "CRS-MECH",
    code: "BTECH-MECH",
    name: "B.Tech Mechanical Engineering",
    departmentId: "DEP-MECH",
    duration: 4,
  },
];

const initialSubjects = [
  {
    id: "SUB-001",
    code: "CS501",
    name: "Advanced Database Systems",
    courseId: "CRS-CSE",
    departmentId: "DEP-CSE",
    semester: 5,
    credits: 4,
  },
  {
    id: "SUB-002",
    code: "CS502",
    name: "Computer Networks",
    courseId: "CRS-CSE",
    departmentId: "DEP-CSE",
    semester: 5,
    credits: 4,
  },
  {
    id: "SUB-003",
    code: "CS503",
    name: "Artificial Intelligence",
    courseId: "CRS-CSE",
    departmentId: "DEP-CSE",
    semester: 5,
    credits: 3,
  },
  {
    id: "SUB-004",
    code: "CS504",
    name: "Operating Systems",
    courseId: "CRS-CSE",
    departmentId: "DEP-CSE",
    semester: 5,
    credits: 4,
  },
  {
    id: "SUB-005",
    code: "EC501",
    name: "Digital Signal Processing",
    courseId: "CRS-ECE",
    departmentId: "DEP-ECE",
    semester: 5,
    credits: 4,
  },
];

const initialTeachers = [
  {
    id: "TCH-001",
    employeeId: "FAC001",
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@college.edu",
    departmentId: "DEP-CSE",
    designation: "Professor",
    status: "active",
  },
  {
    id: "TCH-002",
    employeeId: "FAC002",
    name: "Dr. Priya Sharma",
    email: "priya.sharma@college.edu",
    departmentId: "DEP-CSE",
    designation: "Associate Professor",
    status: "active",
  },
  {
    id: "TCH-003",
    employeeId: "FAC003",
    name: "Dr. Amit Verma",
    email: "amit.verma@college.edu",
    departmentId: "DEP-CSE",
    designation: "Assistant Professor",
    status: "active",
  },
  {
    id: "TCH-004",
    employeeId: "FAC004",
    name: "Dr. Sneha Rao",
    email: "sneha.rao@college.edu",
    departmentId: "DEP-ECE",
    designation: "Professor",
    status: "active",
  },
];

const initialStudents = [
  {
    id: "STU-001",
    name: "Arjun Kumar",
    rollNumber: "CSE3A001",
    email: "arjun.kumar@student.edu",
    phone: "9876500001",
    departmentId: "DEP-CSE",
    courseId: "CRS-CSE",
    year: 3,
    semester: 5,
    section: "A",
    status: "active",
    attendancePercentage: 92,
  },
  {
    id: "STU-002",
    name: "Priya Nair",
    rollNumber: "CSE3A002",
    email: "priya.nair@student.edu",
    phone: "9876500002",
    departmentId: "DEP-CSE",
    courseId: "CRS-CSE",
    year: 3,
    semester: 5,
    section: "A",
    status: "active",
    attendancePercentage: 88,
  },
  {
    id: "STU-003",
    name: "Rahul Sharma",
    rollNumber: "CSE3A003",
    email: "rahul.sharma@student.edu",
    phone: "9876500003",
    departmentId: "DEP-CSE",
    courseId: "CRS-CSE",
    year: 3,
    semester: 5,
    section: "A",
    status: "active",
    attendancePercentage: 73,
  },
  {
    id: "STU-004",
    name: "Sneha Patel",
    rollNumber: "CSE3A004",
    email: "sneha.patel@student.edu",
    phone: "9876500004",
    departmentId: "DEP-CSE",
    courseId: "CRS-CSE",
    year: 3,
    semester: 5,
    section: "A",
    status: "active",
    attendancePercentage: 81,
  },
  {
    id: "STU-005",
    name: "Vikram Singh",
    rollNumber: "CSE3A005",
    email: "vikram.singh@student.edu",
    phone: "9876500005",
    departmentId: "DEP-CSE",
    courseId: "CRS-CSE",
    year: 3,
    semester: 5,
    section: "A",
    status: "active",
    attendancePercentage: 67,
  },
  {
    id: "STU-006",
    name: "Ananya Reddy",
    rollNumber: "CSE3A006",
    email: "ananya.reddy@student.edu",
    phone: "9876500006",
    departmentId: "DEP-CSE",
    courseId: "CRS-CSE",
    year: 3,
    semester: 5,
    section: "A",
    status: "active",
    attendancePercentage: 95,
  },
  {
    id: "STU-007",
    name: "Karan Mehta",
    rollNumber: "CSE3A007",
    email: "karan.mehta@student.edu",
    phone: "9876500007",
    departmentId: "DEP-CSE",
    courseId: "CRS-CSE",
    year: 3,
    semester: 5,
    section: "A",
    status: "active",
    attendancePercentage: 78,
  },
  {
    id: "STU-008",
    name: "Meera Iyer",
    rollNumber: "CSE3A008",
    email: "meera.iyer@student.edu",
    phone: "9876500008",
    departmentId: "DEP-CSE",
    courseId: "CRS-CSE",
    year: 3,
    semester: 5,
    section: "A",
    status: "active",
    attendancePercentage: 91,
  },
  {
    id: "STU-009",
    name: "Aditya Rao",
    rollNumber: "CSE3A009",
    email: "aditya.rao@student.edu",
    phone: "9876500009",
    departmentId: "DEP-CSE",
    courseId: "CRS-CSE",
    year: 3,
    semester: 5,
    section: "A",
    status: "active",
    attendancePercentage: 84,
  },
  {
    id: "STU-010",
    name: "Neha Kapoor",
    rollNumber: "CSE3A010",
    email: "neha.kapoor@student.edu",
    phone: "9876500010",
    departmentId: "DEP-CSE",
    courseId: "CRS-CSE",
    year: 3,
    semester: 5,
    section: "A",
    status: "active",
    attendancePercentage: 76,
  },
  {
    id: "STU-011",
    name: "Rohan Das",
    rollNumber: "CSE3A011",
    email: "rohan.das@student.edu",
    phone: "9876500011",
    departmentId: "DEP-CSE",
    courseId: "CRS-CSE",
    year: 3,
    semester: 5,
    section: "B",
    status: "active",
    attendancePercentage: 89,
  },
  {
    id: "STU-012",
    name: "Divya Menon",
    rollNumber: "CSE3A012",
    email: "divya.menon@student.edu",
    phone: "9876500012",
    departmentId: "DEP-CSE",
    courseId: "CRS-CSE",
    year: 3,
    semester: 5,
    section: "B",
    status: "active",
    attendancePercentage: 94,
  },
];

const initialTimetable = [
  {
    id: "TT-001",
    day: "Monday",
    period: 1,
    startTime: "09:00",
    endTime: "10:00",
    departmentId: "DEP-CSE",
    courseId: "CRS-CSE",
    year: 3,
    semester: 5,
    section: "A",
    subjectId: "SUB-001",
    teacherId: "TCH-001",
    room: "B-204",
  },
  {
    id: "TT-002",
    day: "Monday",
    period: 2,
    startTime: "10:00",
    endTime: "11:00",
    departmentId: "DEP-CSE",
    courseId: "CRS-CSE",
    year: 3,
    semester: 5,
    section: "A",
    subjectId: "SUB-002",
    teacherId: "TCH-002",
    room: "B-204",
  },
  {
    id: "TT-003",
    day: "Monday",
    period: 3,
    startTime: "11:15",
    endTime: "12:15",
    departmentId: "DEP-CSE",
    courseId: "CRS-CSE",
    year: 3,
    semester: 5,
    section: "A",
    subjectId: "SUB-003",
    teacherId: "TCH-003",
    room: "B-204",
  },
  {
    id: "TT-004",
    day: "Tuesday",
    period: 1,
    startTime: "09:00",
    endTime: "10:00",
    departmentId: "DEP-CSE",
    courseId: "CRS-CSE",
    year: 3,
    semester: 5,
    section: "A",
    subjectId: "SUB-004",
    teacherId: "TCH-001",
    room: "B-204",
  },
  {
    id: "TT-005",
    day: "Tuesday",
    period: 2,
    startTime: "10:00",
    endTime: "11:00",
    departmentId: "DEP-CSE",
    courseId: "CRS-CSE",
    year: 3,
    semester: 5,
    section: "A",
    subjectId: "SUB-001",
    teacherId: "TCH-001",
    room: "B-204",
  },
];

const initialStaff = [
  {
    id: "STF-001",
    employeeId: "STF001",
    name: "Ramesh Kumar",
    departmentId: "DEP-CSE",
    designation: "Administrative Officer",
    status: "active",
  },
  {
    id: "STF-002",
    employeeId: "STF002",
    name: "Lakshmi Devi",
    departmentId: "DEP-CSE",
    designation: "Lab Assistant",
    status: "active",
  },
];

const initialAttendanceSessions = [
  {
    id: "AS-001",
    date: "2026-09-21",
    subjectId: "SUB-001",
    teacherId: "TCH-001",
    departmentId: "DEP-CSE",
    courseId: "CRS-CSE",
    year: 3,
    semester: 5,
    section: "A",
    period: 1,
    startTime: "09:00",
    endTime: "10:00",
    room: "B-204",
    status: "completed",
    createdAt: "2026-09-21T09:30:00",
  },
];

const initialAttendance = [
  {
    id: "ATT-001",
    sessionId: "AS-001",
    studentId: "STU-001",
    subjectId: "SUB-001",
    teacherId: "TCH-001",
    date: "2026-09-21",
    period: 1,
    status: "present",
    markedAt: "2026-09-21T09:30:00",
  },
  {
    id: "ATT-002",
    sessionId: "AS-001",
    studentId: "STU-002",
    subjectId: "SUB-001",
    teacherId: "TCH-001",
    date: "2026-09-21",
    period: 1,
    status: "present",
    markedAt: "2026-09-21T09:30:00",
  },
  {
    id: "ATT-003",
    sessionId: "AS-001",
    studentId: "STU-003",
    subjectId: "SUB-001",
    teacherId: "TCH-001",
    date: "2026-09-21",
    period: 1,
    status: "absent",
    markedAt: "2026-09-21T09:30:00",
  },
  {
    id: "ATT-004",
    sessionId: "AS-001",
    studentId: "STU-004",
    subjectId: "SUB-001",
    teacherId: "TCH-001",
    date: "2026-09-21",
    period: 1,
    status: "late",
    markedAt: "2026-09-21T09:30:00",
  },
];

export const useAppStore = create(
  persist(
    (set) => ({
      /* =========================
         MASTER DATA
      ========================= */

      departments: initialDepartments,
      courses: initialCourses,
      subjects: initialSubjects,
      teachers: initialTeachers,
      students: initialStudents,
      staff: initialStaff,
      timetable: initialTimetable,

      /* =========================
         ATTENDANCE
      ========================= */

      attendance: initialAttendance,
      attendanceSessions:
        initialAttendanceSessions,

      /* =========================
         DEPARTMENTS
      ========================= */

      addDepartment: (department) =>
        set((state) => ({
          departments: [
            ...state.departments,
            department,
          ],
        })),

      updateDepartment: (
        id,
        updates
      ) =>
        set((state) => ({
          departments:
            state.departments.map(
              (department) =>
                department.id === id
                  ? {
                      ...department,
                      ...updates,
                    }
                  : department
            ),
        })),

      deleteDepartment: (id) =>
        set((state) => ({
          departments:
            state.departments.filter(
              (department) =>
                department.id !== id
            ),
        })),

      /* =========================
         COURSES
      ========================= */

      addCourse: (course) =>
        set((state) => ({
          courses: [
            ...state.courses,
            course,
          ],
        })),

      updateCourse: (id, updates) =>
        set((state) => ({
          courses:
            state.courses.map((course) =>
              course.id === id
                ? {
                    ...course,
                    ...updates,
                  }
                : course
            ),
        })),

      deleteCourse: (id) =>
        set((state) => ({
          courses:
            state.courses.filter(
              (course) =>
                course.id !== id
            ),
        })),

      /* =========================
         SUBJECTS
      ========================= */

      addSubject: (subject) =>
        set((state) => ({
          subjects: [
            ...state.subjects,
            subject,
          ],
        })),

      updateSubject: (
        id,
        updates
      ) =>
        set((state) => ({
          subjects:
            state.subjects.map(
              (subject) =>
                subject.id === id
                  ? {
                      ...subject,
                      ...updates,
                    }
                  : subject
            ),
        })),

      deleteSubject: (id) =>
        set((state) => ({
          subjects:
            state.subjects.filter(
              (subject) =>
                subject.id !== id
            ),
        })),

      /* =========================
         TEACHERS
      ========================= */

      addTeacher: (teacher) =>
        set((state) => ({
          teachers: [
            ...state.teachers,
            teacher,
          ],
        })),

      updateTeacher: (
        id,
        updates
      ) =>
        set((state) => ({
          teachers:
            state.teachers.map(
              (teacher) =>
                teacher.id === id
                  ? {
                      ...teacher,
                      ...updates,
                    }
                  : teacher
            ),
        })),

      deleteTeacher: (id) =>
        set((state) => ({
          teachers:
            state.teachers.filter(
              (teacher) =>
                teacher.id !== id
            ),
        })),

      /* =========================
         STUDENTS
      ========================= */

      addStudent: (student) =>
        set((state) => ({
          students: [
            ...state.students,
            student,
          ],
        })),

      updateStudent: (
        id,
        updates
      ) =>
        set((state) => ({
          students:
            state.students.map(
              (student) =>
                student.id === id
                  ? {
                      ...student,
                      ...updates,
                    }
                  : student
            ),
        })),

      deleteStudent: (id) =>
        set((state) => ({
          students:
            state.students.filter(
              (student) =>
                student.id !== id
            ),
        })),

      /* =========================
         STAFF
      ========================= */

      addStaff: (staffMember) =>
        set((state) => ({
          staff: [
            ...state.staff,
            staffMember,
          ],
        })),

      updateStaff: (
        id,
        updates
      ) =>
        set((state) => ({
          staff:
            state.staff.map(
              (member) =>
                member.id === id
                  ? {
                      ...member,
                      ...updates,
                    }
                  : member
            ),
        })),

      deleteStaff: (id) =>
        set((state) => ({
          staff:
            state.staff.filter(
              (member) =>
                member.id !== id
            ),
        })),

      /* =========================
         TIMETABLE
      ========================= */

      addTimetableEntry: (entry) =>
        set((state) => ({
          timetable: [
            ...state.timetable,
            entry,
          ],
        })),

      updateTimetableEntry: (
        id,
        updates
      ) =>
        set((state) => ({
          timetable:
            state.timetable.map(
              (entry) =>
                entry.id === id
                  ? {
                      ...entry,
                      ...updates,
                    }
                  : entry
            ),
        })),

      deleteTimetableEntry: (id) =>
        set((state) => ({
          timetable:
            state.timetable.filter(
              (entry) =>
                entry.id !== id
            ),
        })),

      /* =========================
         ATTENDANCE SESSIONS
      ========================= */

      addAttendanceSession: (
        session
      ) =>
        set((state) => ({
          attendanceSessions: [
            ...state.attendanceSessions,
            session,
          ],
        })),

      updateAttendanceSession: (
        id,
        updates
      ) =>
        set((state) => ({
          attendanceSessions:
            state.attendanceSessions.map(
              (session) =>
                session.id === id
                  ? {
                      ...session,
                      ...updates,
                    }
                  : session
            ),
        })),

      deleteAttendanceSession: (
        id
      ) =>
        set((state) => ({
          attendanceSessions:
            state.attendanceSessions.filter(
              (session) =>
                session.id !== id
            ),
        })),

      /* =========================
         ATTENDANCE RECORDS
      ========================= */

      addAttendanceRecord: (
        record
      ) =>
        set((state) => ({
          attendance: [
            ...state.attendance,
            record,
          ],
        })),

      updateAttendanceRecord: (
        id,
        updates
      ) =>
        set((state) => ({
          attendance:
            state.attendance.map(
              (record) =>
                record.id === id
                  ? {
                      ...record,
                      ...updates,
                    }
                  : record
            ),
        })),

      deleteAttendanceRecord: (
        id
      ) =>
        set((state) => ({
          attendance:
            state.attendance.filter(
              (record) =>
                record.id !== id
            ),
        })),

      /* =========================
         RESET
      ========================= */

      resetDemoData: () =>
        set({
          departments:
            initialDepartments,
          courses: initialCourses,
          subjects: initialSubjects,
          teachers: initialTeachers,
          students: initialStudents,
          staff: initialStaff,
          timetable: initialTimetable,
          attendance:
            initialAttendance,
          attendanceSessions:
            initialAttendanceSessions,
        }),
    }),
    {
      name: "college-attendance-system",
    }
  )
);
