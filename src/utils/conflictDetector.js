export const CONFLICT_TYPES = {
  TEACHER: "teacher",
  ROOM: "room",
  CLASS: "class",
  DUPLICATE: "duplicate",
};

export function detectTimetableConflicts(
  entries = []
) {
  const conflicts = [];

  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const first = entries[i];
      const second = entries[j];

      if (
        first.day !== second.day ||
        first.periodId !== second.periodId
      ) {
        continue;
      }

      if (
        first.teacherId &&
        first.teacherId === second.teacherId
      ) {
        conflicts.push({
          id: `CON-${first.id}-${second.id}-T`,
          type: CONFLICT_TYPES.TEACHER,
          severity: "high",
          entries: [first.id, second.id],
          message: "Teacher is assigned to two classes at the same time.",
        });
      }

      if (
        first.roomId &&
        first.roomId === second.roomId
      ) {
        conflicts.push({
          id: `CON-${first.id}-${second.id}-R`,
          type: CONFLICT_TYPES.ROOM,
          severity: "high",
          entries: [first.id, second.id],
          message: "Room is assigned to multiple classes at the same time.",
        });
      }

      if (
        first.classId &&
        first.classId === second.classId
      ) {
        conflicts.push({
          id: `CON-${first.id}-${second.id}-C`,
          type: CONFLICT_TYPES.CLASS,
          severity: "high",
          entries: [first.id, second.id],
          message: "Class has multiple subjects at the same time.",
        });
      }
    }
  }

  return conflicts;
}

export function hasTimetableConflicts(entries) {
  return detectTimetableConflicts(entries).length > 0;
}
