import { DAYS, PERIODS } from "../config/constants";
import { detectTimetableConflicts } from "./conflictDetector";

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function isSlotAvailable({
  entries,
  day,
  periodId,
  teacherId,
  roomId,
  classId,
}) {
  return !entries.some(
    (entry) =>
      entry.day === day &&
      entry.periodId === periodId &&
      (
        entry.teacherId === teacherId ||
        entry.roomId === roomId ||
        entry.classId === classId
      )
  );
}

function getCandidateRooms(rooms, subject) {
  if (subject.type === "lab") {
    return rooms.filter((room) => room.type === "lab");
  }

  return rooms.filter(
    (room) =>
      room.type === "classroom" ||
      room.type === "hall"
  );
}

export function generateTimetable({
  classes = [],
  subjects = [],
  teachers = [],
  rooms = [],
  days = DAYS,
  periods = PERIODS,
  maxAttempts = 5000,
}) {
  const entries = [];

  const subjectPool = shuffle(subjects);
  const teacherPool = shuffle(teachers);
  const roomPool = shuffle(rooms);

  let attempts = 0;

  for (const classItem of classes) {
    const classSubjects = subjectPool.filter(
      (subject) =>
        subject.departmentId ===
        classItem.departmentId
    );

    if (!classSubjects.length) {
      continue;
    }

    const requiredSubjects =
      classSubjects.slice(0, Math.min(6, classSubjects.length));

    for (const subject of requiredSubjects) {
      let placed = false;

      while (!placed && attempts < maxAttempts) {
        attempts++;

        const day =
          days[Math.floor(Math.random() * days.length)];

        const period =
          periods[Math.floor(Math.random() * periods.length)];

        const teacher =
          teacherPool[
            Math.floor(Math.random() * teacherPool.length)
          ];

        const candidateRooms = getCandidateRooms(
          roomPool,
          subject
        );

        const room =
          candidateRooms[
            Math.floor(
              Math.random() * candidateRooms.length
            )
          ];

        if (!teacher || !room) {
          break;
        }

        if (
          !isSlotAvailable({
            entries,
            day,
            periodId: period.id,
            teacherId: teacher.id,
            roomId: room.id,
            classId: classItem.id,
          })
        ) {
          continue;
        }

        entries.push({
          id: `TT-${Date.now()}-${attempts}`,
          day,
          periodId: period.id,
          startTime: period.start,
          endTime: period.end,
          classId: classItem.id,
          subjectId: subject.id,
          teacherId: teacher.id,
          roomId: room.id,
          type: subject.type,
          status: "draft",
        });

        placed = true;
      }
    }
  }

  const conflicts = detectTimetableConflicts(entries);

  return {
    entries,
    conflicts,
    success: conflicts.length === 0,
    attempts,
  };
}

export function scoreTimetable(entries, conflicts = []) {
  let score = 100;

  score -= conflicts.length * 10;

  const classDayMap = {};

  entries.forEach((entry) => {
    const key = `${entry.classId}-${entry.day}`;

    classDayMap[key] =
      (classDayMap[key] || 0) + 1;
  });

  Object.values(classDayMap).forEach((count) => {
    if (count > 6) {
      score -= (count - 6) * 3;
    }
  });

  return Math.max(0, Math.min(100, score));
}
