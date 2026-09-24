import { useMemo } from "react";

import { useAppStore } from "../store/appStore";
import { getShortageStudents } from "../services/attendanceService";

export function useDashboardStats() {
  const students = useAppStore(
    (state) => state.students
  );

  const teachers = useAppStore(
    (state) => state.teachers
  );

  const staff = useAppStore(
    (state) => state.staff
  );

  const attendance = useAppStore(
    (state) => state.attendance
  );

  const classes = useAppStore(
    (state) => state.classes
  );

  const timetable = useAppStore(
    (state) => state.timetable
  );

  const leaveRequests = useAppStore(
    (state) => state.leaveRequests
  );

  return useMemo(() => {
    const present = attendance.filter(
      (record) =>
        record.status === "present" ||
        record.status === "late" ||
        record.status === "on-duty"
    ).length;

    const attendancePercentage =
      attendance.length === 0
        ? 0
        : Math.round(
            (present / attendance.length) * 100
          );

    const shortageStudents =
      getShortageStudents(
        students,
        attendance,
        75
      );

    return {
      students: students.length,
      teachers: teachers.length,
      staff: staff.length,
      classes: classes.length,
      timetableEntries: timetable.length,

      attendancePercentage,

      shortageStudents,
      shortageCount: shortageStudents.length,

      pendingLeaves: leaveRequests.filter(
        (request) =>
          request.status === "pending"
      ).length,

      totalAttendanceRecords: attendance.length,
    };
  }, [
    students,
    teachers,
    staff,
    attendance,
    classes,
    timetable,
    leaveRequests,
  ]);
}
