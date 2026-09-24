import React from "react";

import {
  CalendarDays,
  BookOpen,
  UserRound,
  Trash2,
  Eye,
} from "lucide-react";

export default function AttendanceHistory({
  sessions = [],
  subjects = [],
  teachers = [],
  attendance = [],
  onView,
  onDelete,
}) {
  const getSubject = (id) =>
    subjects.find(
      (subject) => subject.id === id
    );

  const getTeacher = (id) =>
    teachers.find(
      (teacher) => teacher.id === id
    );

  const getSessionRecords = (id) =>
    attendance.filter(
      (record) =>
        record.sessionId === id
    );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-200 p-5 dark:border-slate-800">
        <h2 className="font-bold text-slate-900 dark:text-white">
          Attendance History
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          Previously completed attendance
          sessions
        </p>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {sessions.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">
            No attendance sessions yet.
          </div>
        ) : (
          sessions
            .slice()
            .reverse()
            .map((session) => {
              const subject =
                getSubject(
                  session.subjectId
                );

              const teacher =
                getTeacher(
                  session.teacherId
                );

              const records =
                getSessionRecords(
                  session.id
                );

              const present =
                records.filter(
                  (record) =>
                    record.status ===
                    "present"
                ).length;

              const percentage =
                records.length
                  ? Math.round(
                      (present /
                        records.length) *
                        100
                    )
                  : 0;

              return (
                <div
                  key={session.id}
                  className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 dark:hover:bg-slate-800/30 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10">
                      <CalendarDays
                        size={19}
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                          {subject?.name ||
                            "Unknown Subject"}
                        </h3>

                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
                          {session.status}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                        <span>
                          {session.date}
                        </span>

                        <span className="flex items-center gap-1">
                          <BookOpen
                            size={12}
                          />
                          {subject?.code ||
                            "—"}
                        </span>

                        <span className="flex items-center gap-1">
                          <UserRound
                            size={12}
                          />
                          {teacher?.name ||
                            "—"}
                        </span>

                        <span>
                          Period{" "}
                          {session.period}
                        </span>

                        {session.room && (
                          <span>
                            Room{" "}
                            {session.room}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="text-right">
                      <p className="text-xs text-slate-400">
                        Present
                      </p>

                      <p className="font-bold text-indigo-600">
                        {percentage}%
                      </p>

                      <p className="text-xs text-slate-400">
                        {records.length} students
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        onView(session)
                      }
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/10"
                      title="Edit session"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(session)
                      }
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                      title="Delete session"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}
