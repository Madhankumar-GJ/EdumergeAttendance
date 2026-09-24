import { nanoid } from "nanoid";
import { DAYS, PERIODS, ATTENDANCE_STATUS, LEAVE_STATUS } from "../config/constants";

const firstNames = [
  "Arjun",
  "Rahul",
  "Aarav",
  "Aditya",
  "Rohan",
  "Karan",
  "Vikram",
  "Ananya",
  "Priya",
  "Sneha",
  "Ishita",
  "Kavya",
  "Meera",
  "Neha",
  "Diya",
  "Aisha",
];

const lastNames = [
  "Kumar",
  "Sharma",
  "Patel",
  "Reddy",
  "Nair",
  "Iyer",
  "Singh",
  "Verma",
  "Joshi",
  "Mehta",
];

const departments = [
  {
    id: "DEP-CSE",
    code: "CSE",
    name: "Computer Science & Engineering",
    hod: "Dr. Ananya Sharma",
  },
  {
    id: "DEP-ECE",
    code: "ECE",
    name: "Electronics & Communication Engineering",
    hod: "Dr. Rajesh Kumar",
  },
  {
    id: "DEP-MEC",
    code: "ME",
    name: "Mechanical Engineering",
    hod: "Dr. Suresh Nair",
  },
  {
    id: "DEP-CIV",
    code: "CE",
    name: "Civil Engineering",
    hod: "Dr. Priya Menon",
  },
];

const courses = [
  {
    id: "CRS-CSE",
    code: "BTECH-CSE",
    name: "B.Tech Computer Science & Engineering",
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
    id: "CRS-MEC",
    code: "BTECH-ME",
    name: "B.Tech Mechanical Engineering",
    departmentId: "DEP-MEC",
    duration: 4,
  },
  {
    id: "CRS-CIV",
    code: "BTECH-CE",
    name: "B.Tech Civil Engineering",
    departmentId: "DEP-CIV",
    duration: 4,
  },
];

const subjectTemplates = [
  ["Data Structures", "CS301", 4, "theory"],
  ["Database Management Systems", "CS302", 4, "theory"],
  ["Operating Systems", "CS303", 4, "theory"],
  ["Computer Networks", "CS304", 4, "theory"],
  ["Software Engineering", "CS305", 3, "theory"],
  ["Web Technologies", "CS306", 3, "theory"],
  ["Data Structures Lab", "CS307L", 2, "lab"],
  ["DBMS Lab", "CS308L", 2, "lab"],
  ["Operating Systems Lab", "CS309L", 2, "lab"],
  ["Artificial Intelligence", "CS401", 4, "theory"],
  ["Machine Learning", "CS402", 4, "theory"],
  ["Cloud Computing", "CS403", 3, "theory"],
];

const roomTemplates = [
  ["Room 101", "A Block", 60, "classroom"],
  ["Room 102", "A Block", 60, "classroom"],
  ["Room 103", "A Block", 60, "classroom"],
  ["Room 201", "B Block", 80, "classroom"],
  ["Room 202", "B Block", 80, "classroom"],
  ["Room 203", "B Block", 80, "classroom"],
  ["Lab 1", "C Block", 40, "lab"],
  ["Lab 2", "C Block", 40, "lab"],
  ["Lab 3", "C Block", 40, "lab"],
  ["Seminar Hall", "Main Block", 200, "hall"],
];

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateStudents(count = 120) {
  return Array.from({ length: count }, (_, index) => {
    const firstName = firstNames[index % firstNames.length];
    const lastName = lastNames[
      Math.floor(index / firstNames.length) % lastNames.length
    ];

    const department = departments[index % departments.length];
    const year = (index % 4) + 1;
    const section = String.fromCharCode(65 + (index % 3));

    return {
      id: `STU-${String(index + 1).padStart(4, "0")}`,
      rollNumber: `${department.code}${year}${section}${String(
        index + 1
      ).padStart(3, "0")}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index + 1}@college.edu`,
      phone: `98${String(10000000 + index * 731).slice(0, 8)}`,
      departmentId: department.id,
      courseId:
        courses.find((course) => course.departmentId === department.id)?.id ||
        courses[0].id,
      year,
      semester: year * 2,
      section,
      gender: index % 2 === 0 ? "Male" : "Female",
      admissionYear: 2026 - year + 1,
      status: "active",
      attendancePercentage: 65 + ((index * 7) % 31),
      avatar: `${firstName[0]}${lastName[0]}`,
    };
  });
}

function generateTeachers(count = 24) {
  const teacherNames = [
    "Ananya Sharma",
    "Rajesh Kumar",
    "Suresh Nair",
    "Priya Menon",
    "Vivek Reddy",
    "Megha Iyer",
    "Amit Verma",
    "Divya Patel",
    "Nikhil Singh",
    "Kavita Joshi",
    "Rakesh Mehta",
    "Sneha Rao",
  ];

  return Array.from({ length: count }, (_, index) => {
    const name = teacherNames[index % teacherNames.length];
    const department = departments[index % departments.length];

    return {
      id: `TCH-${String(index + 1).padStart(3, "0")}`,
      employeeId: `FAC${String(index + 1).padStart(4, "0")}`,
      name: `${name}${index >= teacherNames.length ? ` ${Math.floor(index / teacherNames.length) + 1}` : ""}`,
      email: `${name.split(" ")[0].toLowerCase()}.${name
        .split(" ")[1]
        .toLowerCase()}${index + 1}@college.edu`,
      phone: `97${String(10000000 + index * 937).slice(0, 8)}`,
      departmentId: department.id,
      designation:
        index % 5 === 0
          ? "Professor"
          : index % 3 === 0
            ? "Associate Professor"
            : "Assistant Professor",
      specialization: subjectTemplates[index % subjectTemplates.length][0],
      joiningDate: `202${2 + (index % 4)}-0${(index % 9) + 1}-15`,
      status: "active",
      avatar: name
        .split(" ")
        .map((part) => part[0])
        .join(""),
    };
  });
}

function generateStaff(count = 16) {
  const staffNames = [
    "Priya Nair",
    "Manoj Kumar",
    "Lakshmi Rao",
    "Vijay Menon",
    "Pooja Sharma",
    "Sanjay Patel",
    "Deepa Iyer",
    "Naveen Reddy",
  ];

  return Array.from({ length: count }, (_, index) => {
    const name = staffNames[index % staffNames.length];

    return {
      id: `STF-${String(index + 1).padStart(3, "0")}`,
      employeeId: `STF${String(index + 1).padStart(4, "0")}`,
      name: `${name}${index >= staffNames.length ? ` ${Math.floor(index / staffNames.length) + 1}` : ""}`,
      email: `${name.split(" ")[0].toLowerCase()}.${name
        .split(" ")[1]
        .toLowerCase()}${index + 1}@college.edu`,
      departmentId: departments[index % departments.length].id,
      designation:
        index % 4 === 0
          ? "Office Administrator"
          : index % 3 === 0
            ? "Lab Assistant"
            : "Administrative Staff",
      status: "active",
      avatar: name
        .split(" ")
        .map((part) => part[0])
        .join(""),
    };
  });
}

function generateSubjects() {
  return subjectTemplates.map(
    ([name, code, credits, type], index) => ({
      id: `SUB-${String(index + 1).padStart(3, "0")}`,
      code,
      name,
      credits,
      type,
      departmentId: "DEP-CSE",
      semester: index < 9 ? 5 : 7,
      weeklyHours: type === "lab" ? 2 : credits,
      color: [
        "#6366f1",
        "#0ea5e9",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
      ][index % 6],
    })
  );
}

function generateRooms() {
  return roomTemplates.map(
    ([name, block, capacity, type], index) => ({
      id: `ROOM-${String(index + 1).padStart(3, "0")}`,
      name,
      block,
      capacity,
      type,
      floor: index < 3 ? 1 : index < 6 ? 2 : 3,
      facilities:
        type === "lab"
          ? ["Computers", "Projector", "Air Conditioning"]
          : ["Projector", "Whiteboard"],
      status: "available",
    })
  );
}

function generateClasses() {
  return courses.flatMap((course) =>
    [1, 2, 3, 4].flatMap((year) =>
      ["A", "B"].map((section) => ({
        id: `CLS-${course.code}-${year}-${section}`,
        name: `${course.code} - Year ${year} - Section ${section}`,
        courseId: course.id,
        departmentId: course.departmentId,
        year,
        semester: year * 2,
        section,
        studentCount: 25 + ((year * 7 + section.charCodeAt(0)) % 16),
        classTeacherId: null,
      }))
    )
  );
}

function generateAttendance(students, subjects) {
  const records = [];

  const dates = Array.from({ length: 20 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);

    return date.toISOString().split("T")[0];
  });

  for (const student of students.slice(0, 80)) {
    for (const subject of subjects.slice(0, 8)) {
      for (const date of dates.slice(0, 10)) {
        const random = Math.random();

        let status = ATTENDANCE_STATUS.PRESENT;

        if (random < 0.08) {
          status = ATTENDANCE_STATUS.ABSENT;
        } else if (random < 0.13) {
          status = ATTENDANCE_STATUS.LATE;
        } else if (random < 0.16) {
          status = ATTENDANCE_STATUS.EXCUSED;
        }

        records.push({
          id: nanoid(),
          studentId: student.id,
          subjectId: subject.id,
          classId: `CLS-${student.courseId}-1-${student.section}`,
          date,
          period: (Math.floor(Math.random() * 7) + 1),
          status,
          markedBy: "TCH-001",
          markedAt: `${date}T09:00:00`,
        });
      }
    }
  }

  return records;
}

function generateTimetable(classes, subjects, teachers, rooms) {
  const entries = [];

  classes.slice(0, 16).forEach((classItem, classIndex) => {
    for (let periodIndex = 0; periodIndex < 5; periodIndex++) {
      const day = DAYS[classIndex % DAYS.length];
      const period = PERIODS[periodIndex];

      const subject =
        subjects[(classIndex + periodIndex) % subjects.length];

      const teacher =
        teachers[(classIndex + periodIndex) % teachers.length];

      const room =
        rooms[(classIndex + periodIndex) % rooms.length];

      entries.push({
        id: nanoid(),
        day,
        periodId: period.id,
        startTime: period.start,
        endTime: period.end,
        classId: classItem.id,
        subjectId: subject.id,
        teacherId: teacher.id,
        roomId: room.id,
        type: subject.type,
        status: "published",
      });
    }
  });

  return entries;
}

function generateLeaveRequests(students) {
  return students.slice(0, 12).map((student, index) => ({
    id: `LR-${String(index + 1).padStart(4, "0")}`,
    studentId: student.id,
    type: index % 2 === 0 ? "Medical" : "Personal",
    fromDate: "2026-09-21",
    toDate: "2026-09-22",
    reason:
      index % 2 === 0
        ? "Medical appointment"
        : "Family function",
    status:
      index < 4
        ? LEAVE_STATUS.PENDING
        : index < 8
          ? LEAVE_STATUS.APPROVED
          : LEAVE_STATUS.REJECTED,
    appliedOn: "2026-09-20",
    reviewedBy: index < 4 ? null : "USR-ADMIN-001",
  }));
}

export function createSeedData() {
  const students = generateStudents();
  const teachers = generateTeachers();
  const staff = generateStaff();
  const subjects = generateSubjects();
  const rooms = generateRooms();
  const classes = generateClasses();

  const attendance = generateAttendance(
    students,
    subjects
  );

  const timetable = generateTimetable(
    classes,
    subjects,
    teachers,
    rooms
  );

  const leaveRequests = generateLeaveRequests(students);

  return {
    departments,
    courses,
    classes,
    subjects,
    rooms,
    students,
    teachers,
    staff,
    attendance,
    timetable,
    leaveRequests,

    academicYears: [
      {
        id: "AY-2026-27",
        name: "2026-2027",
        startDate: "2026-06-01",
        endDate: "2027-05-31",
        status: "active",
      },
      {
        id: "AY-2025-26",
        name: "2025-2026",
        startDate: "2025-06-01",
        endDate: "2026-05-31",
        status: "completed",
      },
    ],

    notifications: [
      {
        id: "NOT-001",
        title: "Attendance shortage alert",
        message: "12 students are below the critical attendance threshold.",
        type: "warning",
        read: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: "NOT-002",
        title: "Timetable generated",
        message: "The latest timetable has been generated successfully.",
        type: "success",
        read: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: "NOT-003",
        title: "Leave request",
        message: "New student leave requests require review.",
        type: "info",
        read: false,
        createdAt: new Date().toISOString(),
      },
    ],

    activityLog: [
      {
        id: "ACT-001",
        action: "TIMETABLE_GENERATED",
        description: "New timetable generated for CSE.",
        user: "Administrator",
        timestamp: new Date().toISOString(),
      },
      {
        id: "ACT-002",
        action: "ATTENDANCE_MARKED",
        description: "Attendance marked for CSE 3A.",
        user: "Dr. Ananya Sharma",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
    ],
  };
}

export default createSeedData;
