export const ATTENDANCE_STATUSES = [
  "present",
  "absent",
  "late",
  "excused",
  "on-duty",
];

export const ATTENDANCE_STATUS_LABELS = {
  present: "Present",
  absent: "Absent",
  late: "Late",
  excused: "Excused",
  "on-duty": "On Duty",
};

export function calculateAttendancePercentage(
  records = []
) {
  if (!records.length) {
    return 0;
  }

  const countedAsPresent =
    records.filter((record) =>
      [
        "present",
        "late",
        "excused",
        "on-duty",
      ].includes(record.status)
    ).length;

  return Math.round(
    (countedAsPresent /
      records.length) *
      100
  );
}

export function calculateStudentAttendance(
  studentId,
  attendance = []
) {
  const records = attendance.filter(
    (record) =>
      record.studentId === studentId
  );

  const total = records.length;

  const present = records.filter(
    (record) =>
      record.status === "present"
  ).length;

  const absent = records.filter(
    (record) =>
      record.status === "absent"
  ).length;

  const late = records.filter(
    (record) =>
      record.status === "late"
  ).length;

  const excused = records.filter(
    (record) =>
      record.status === "excused"
  ).length;

  const onDuty = records.filter(
    (record) =>
      record.status === "on-duty"
  ).length;

  return {
    total,
    present,
    absent,
    late,
    excused,
    onDuty,
    percentage:
      calculateAttendancePercentage(
        records
      ),
  };
}

export function calculateSubjectAttendance(
  studentId,
  subjectId,
  attendance = []
) {
  const records = attendance.filter(
    (record) =>
      record.studentId === studentId &&
      record.subjectId === subjectId
  );

  return {
    total: records.length,
    percentage:
      calculateAttendancePercentage(
        records
      ),
  };
}

export function getAttendanceStatus(
  percentage,
  minimum = 75
) {
  if (percentage >= 85) {
    return "safe";
  }

  if (percentage >= minimum) {
    return "warning";
  }

  return "shortage";
}

export function getAttendanceStatusColor(
  percentage,
  minimum = 75
) {
  const status = getAttendanceStatus(
    percentage,
    minimum
  );

  if (status === "safe") {
    return "emerald";
  }

  if (status === "warning") {
    return "amber";
  }

  return "red";
}

export function calculateRequiredClasses(
  attended,
  total,
  target = 75
) {
  if (total <= 0) {
    return 0;
  }

  const current =
    (attended / total) * 100;

  if (current >= target) {
    return 0;
  }

  let additional = 0;

  while (
    ((attended + additional) /
      (total + additional)) *
      100 <
      target &&
    additional < 10000
  ) {
    additional++;
  }

  return additional;
}

export function calculateSafeAbsences(
  attended,
  total,
  minimum = 75
) {
  if (total <= 0) {
    return 0;
  }

  let allowed = 0;

  while (
    ((attended /
      (total + allowed + 1)) *
      100) >= minimum &&
    allowed < 10000
  ) {
    allowed++;
  }

  return allowed;
}
