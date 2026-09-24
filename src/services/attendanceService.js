import {
  calculateAttendance,
  calculateStudentAttendance,
  calculateSubjectAttendance,
  calculateClassAttendance,
} from "../utils/attendanceCalculator";

export function getAttendanceSummary(records) {
  return calculateAttendance(records);
}

export function getStudentAttendance(
  studentId,
  records
) {
  return calculateStudentAttendance(
    studentId,
    records
  );
}

export function getSubjectAttendance(
  subjectId,
  records
) {
  return calculateSubjectAttendance(
    subjectId,
    records
  );
}

export function getClassAttendance(
  classId,
  records
) {
  return calculateClassAttendance(
    classId,
    records
  );
}

export function getAttendanceByDate(
  records,
  date
) {
  return records.filter(
    (record) => record.date === date
  );
}

export function getAttendanceByPeriod(
  records,
  date,
  period
) {
  return records.filter(
    (record) =>
      record.date === date &&
      record.period === Number(period)
  );
}

export function getShortageStudents(
  students,
  attendance,
  threshold = 75
) {
  return students
    .map((student) => ({
      student,
      attendance: getStudentAttendance(
        student.id,
        attendance
      ),
    }))
    .filter(
      ({ attendance }) =>
        attendance.percentage < threshold
    )
    .sort(
      (a, b) =>
        a.attendance.percentage -
        b.attendance.percentage
    );
}
