import { calculateStudentAttendance } from "../utils/attendanceCalculator";

export function getStudents(store) {
  return store.students;
}

export function searchStudents(
  students,
  search = ""
) {
  const query = search.trim().toLowerCase();

  if (!query) return students;

  return students.filter((student) =>
    [
      student.name,
      student.rollNumber,
      student.email,
      student.phone,
    ].some((value) =>
      String(value)
        .toLowerCase()
        .includes(query)
    )
  );
}

export function filterStudents(
  students,
  {
    departmentId,
    courseId,
    year,
    semester,
    section,
    status,
  } = {}
) {
  return students.filter((student) => {
    if (
      departmentId &&
      student.departmentId !== departmentId
    ) {
      return false;
    }

    if (courseId && student.courseId !== courseId) {
      return false;
    }

    if (year && student.year !== Number(year)) {
      return false;
    }

    if (
      semester &&
      student.semester !== Number(semester)
    ) {
      return false;
    }

    if (section && student.section !== section) {
      return false;
    }

    if (status && student.status !== status) {
      return false;
    }

    return true;
  });
}

export function getStudentAttendance(
  studentId,
  attendance
) {
  return calculateStudentAttendance(
    studentId,
    attendance
  );
}
