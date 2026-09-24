import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Save,
  RotateCcw,
  ClipboardCheck,
} from "lucide-react";

import { nanoid } from "nanoid";

import { useAppStore } from "../../store/appStore";

import AttendanceFilters from "../../components/attendance/AttendanceFilters";
import AttendanceSummary from "../../components/attendance/AttendanceSummary";
import AttendanceRoster from "../../components/attendance/AttendanceRoster";
import AttendanceHistory from "../../components/attendance/AttendanceHistory";

export default function Attendance() {
  const students = useAppStore(
    (state) => state.students
  );

  const departments = useAppStore(
    (state) => state.departments
  );

  const courses = useAppStore(
    (state) => state.courses
  );

  const subjects = useAppStore(
    (state) => state.subjects
  );

  const teachers = useAppStore(
    (state) => state.teachers
  );

  const timetable = useAppStore(
    (state) => state.timetable
  );

  const attendance = useAppStore(
    (state) => state.attendance
  );

  const attendanceSessions =
    useAppStore(
      (state) =>
        state.attendanceSessions
    );

  const addAttendanceSession =
    useAppStore(
      (state) =>
        state.addAttendanceSession
    );

  const addAttendanceRecord =
    useAppStore(
      (state) =>
        state.addAttendanceRecord
    );

  const updateAttendanceSession =
    useAppStore(
      (state) =>
        state.updateAttendanceSession
    );

  const updateAttendanceRecord =
    useAppStore(
      (state) =>
        state.updateAttendanceRecord
    );

  const deleteAttendanceSession =
    useAppStore(
      (state) =>
        state.deleteAttendanceSession
    );

  const deleteAttendanceRecord =
    useAppStore(
      (state) =>
        state.deleteAttendanceRecord
    );

  const [filters, setFilters] =
    useState({
      date: new Date()
        .toISOString()
        .split("T")[0],

      departmentId: "",
      courseId: "",
      subjectId: "",
      teacherId: "",
      year: "",
      semester: "",
      section: "",
      period: "",
    });

  const [attendanceMap, setAttendanceMap] =
    useState({});

  const [editingSession, setEditingSession] =
    useState(null);

  const [activeTab, setActiveTab] =
    useState("mark");

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      if (
        filters.departmentId &&
        student.departmentId !==
          filters.departmentId
      ) {
        return false;
      }

      if (
        filters.courseId &&
        student.courseId !==
          filters.courseId
      ) {
        return false;
      }

      if (
        filters.year &&
        Number(student.year) !==
          Number(filters.year)
      ) {
        return false;
      }

      if (
        filters.semester &&
        Number(student.semester) !==
          Number(filters.semester)
      ) {
        return false;
      }

      if (
        filters.section &&
        student.section !==
          filters.section
      ) {
        return false;
      }

      return student.status === "active";
    });
  }, [students, filters]);

  const sessionReady =
    Boolean(
      filters.date &&
        filters.departmentId &&
        filters.courseId &&
        filters.subjectId &&
        filters.teacherId &&
        filters.year &&
        filters.semester &&
        filters.section &&
        filters.period
    );

  const currentRecords = useMemo(() => {
    return filteredStudents.map(
      (student) => ({
        id: `TEMP-${student.id}`,
        studentId: student.id,
        status:
          attendanceMap[student.id] ||
          null,
      })
    );
  }, [
    filteredStudents,
    attendanceMap,
  ]);

  useEffect(() => {
    if (!editingSession) {
      return;
    }

    const sessionRecords =
      attendance.filter(
        (record) =>
          record.sessionId ===
          editingSession.id
      );

    const map = {};

    sessionRecords.forEach((record) => {
      map[record.studentId] =
        record.status;
    });

    setAttendanceMap(map);

    setFilters({
      date: editingSession.date,
      departmentId:
        editingSession.departmentId,
      courseId:
        editingSession.courseId,
      subjectId:
        editingSession.subjectId,
      teacherId:
        editingSession.teacherId,
      year: String(
        editingSession.year
      ),
      semester: String(
        editingSession.semester
      ),
      section:
        editingSession.section,
      period: String(
        editingSession.period
      ),
    });

    setActiveTab("mark");
  }, [
    editingSession,
    attendance,
  ]);

  const resetSession = () => {
    setAttendanceMap({});
    setEditingSession(null);

    setFilters({
      date: filters.date,
      departmentId: "",
      courseId: "",
      subjectId: "",
      teacherId: "",
      year: "",
      semester: "",
      section: "",
      period: "",
    });
  };

  const getTimeFromTimetable =
    () => {
      const matchingEntry =
        timetable.find((item) => {
          return (
            item.departmentId ===
              filters.departmentId &&
            item.courseId ===
              filters.courseId &&
            Number(item.year) ===
              Number(filters.year) &&
            Number(item.semester) ===
              Number(filters.semester) &&
            item.section ===
              filters.section &&
            Number(item.period) ===
              Number(filters.period) &&
            item.subjectId ===
              filters.subjectId &&
            item.teacherId ===
              filters.teacherId
          );
        });

      return matchingEntry;
    };

  const saveAttendance = () => {
    if (!sessionReady) {
      alert(
        "Please select all attendance session details."
      );

      return;
    }

    if (
      filteredStudents.length === 0
    ) {
      alert(
        "No active students found for this class."
      );

      return;
    }

    const unmarked =
      filteredStudents.filter(
        (student) =>
          !attendanceMap[student.id]
      );

    if (unmarked.length > 0) {
      const proceed =
        window.confirm(
          `${unmarked.length} student(s) are unmarked. Save attendance anyway?`
        );

      if (!proceed) {
        return;
      }
    }

    const timetableEntry =
      getTimeFromTimetable();

    if (editingSession) {
      const oldRecords =
        attendance.filter(
          (record) =>
            record.sessionId ===
            editingSession.id
        );

      oldRecords.forEach((record) => {
        deleteAttendanceRecord(
          record.id
        );
      });

      filteredStudents.forEach(
        (student) => {
          const status =
            attendanceMap[
              student.id
            ];

          if (!status) {
            return;
          }

          addAttendanceRecord({
            id: nanoid(),
            sessionId:
              editingSession.id,
            studentId:
              student.id,
            subjectId:
              filters.subjectId,
            teacherId:
              filters.teacherId,
            date: filters.date,
            period: Number(
              filters.period
            ),
            status,
            markedAt:
              new Date().toISOString(),
          });
        }
      );

      updateAttendanceSession(
        editingSession.id,
        {
          date: filters.date,
          subjectId:
            filters.subjectId,
          teacherId:
            filters.teacherId,
          departmentId:
            filters.departmentId,
          courseId:
            filters.courseId,
          year: Number(filters.year),
          semester: Number(
            filters.semester
          ),
          section: filters.section,
          period: Number(
            filters.period
          ),
          startTime:
            timetableEntry?.startTime ||
            editingSession.startTime ||
            "",
          endTime:
            timetableEntry?.endTime ||
            editingSession.endTime ||
            "",
          room:
            timetableEntry?.room ||
            editingSession.room ||
            "",
          status: "completed",
          updatedAt:
            new Date().toISOString(),
        }
      );

      alert(
        "Attendance session updated successfully."
      );
    } else {
      const sessionId =
        `AS-${nanoid(8)}`;

      addAttendanceSession({
        id: sessionId,
        date: filters.date,
        subjectId:
          filters.subjectId,
        teacherId:
          filters.teacherId,
        departmentId:
          filters.departmentId,
        courseId:
          filters.courseId,
        year: Number(filters.year),
        semester: Number(
          filters.semester
        ),
        section: filters.section,
        period: Number(
          filters.period
        ),
        startTime:
          timetableEntry?.startTime ||
          "",
        endTime:
          timetableEntry?.endTime ||
          "",
        room:
          timetableEntry?.room ||
          "",
        status: "completed",
        createdAt:
          new Date().toISOString(),
      });

      filteredStudents.forEach(
        (student) => {
          const status =
            attendanceMap[
              student.id
            ];

          if (!status) {
            return;
          }

          addAttendanceRecord({
            id: nanoid(),
            sessionId,
            studentId:
              student.id,
            subjectId:
              filters.subjectId,
            teacherId:
              filters.teacherId,
            date: filters.date,
            period: Number(
              filters.period
            ),
            status,
            markedAt:
              new Date().toISOString(),
          });
        }
      );

      alert(
        "Attendance saved successfully."
      );
    }

    resetSession();
  };

  const handleDeleteSession = (
    session
  ) => {
    const confirmed =
      window.confirm(
        "Delete this attendance session and all its records?"
      );

    if (!confirmed) {
      return;
    }

    attendance
      .filter(
        (record) =>
          record.sessionId ===
          session.id
      )
      .forEach((record) =>
        deleteAttendanceRecord(
          record.id
        )
      );

    deleteAttendanceSession(
      session.id
    );
  };

  const handleViewSession = (
    session
  ) => {
    setEditingSession(session);
    setActiveTab("mark");
  };

  const sessionRecords =
    editingSession
      ? attendance.filter(
          (record) =>
            record.sessionId ===
            editingSession.id
        )
      : currentRecords;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10">
            <ClipboardCheck size={23} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Attendance Management
            </h1>

            <p className="text-sm text-slate-500">
              Mark, manage and analyze daily
              attendance.
            </p>
          </div>
        </div>

        <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            onClick={() =>
              setActiveTab("mark")
            }
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeTab === "mark"
                ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700"
                : "text-slate-500"
            }`}
          >
            Mark Attendance
          </button>

          <button
            onClick={() =>
              setActiveTab("history")
            }
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeTab === "history"
                ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700"
                : "text-slate-500"
            }`}
          >
            History
          </button>
        </div>
      </div>

      {activeTab === "mark" ? (
        <>
          <AttendanceFilters
            filters={filters}
            setFilters={setFilters}
            departments={departments}
            courses={courses}
            subjects={subjects}
            teachers={teachers}
            timetable={timetable}
          />

          {sessionReady ? (
            <>
              <AttendanceSummary
                records={sessionRecords}
              />

              <AttendanceRoster
                students={filteredStudents}
                attendanceMap={
                  attendanceMap
                }
                setAttendanceMap={
                  setAttendanceMap
                }
              />

              <div className="flex flex-col justify-end gap-3 sm:flex-row">
                <button
                  onClick={resetSession}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <RotateCcw size={17} />
                  Clear
                </button>

                <button
                  onClick={saveAttendance}
                  className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
                >
                  <Save size={17} />

                  {editingSession
                    ? "Update Attendance"
                    : "Save Attendance"}
                </button>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center dark:border-slate-700 dark:bg-slate-900">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10">
                <ClipboardCheck
                  size={28}
                />
              </div>

              <h2 className="mt-5 text-lg font-bold text-slate-800 dark:text-slate-200">
                Configure Attendance Session
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
                Select date, department,
                course, subject, teacher,
                year, semester, section and
                period to load the student
                roster.
              </p>
            </div>
          )}
        </>
      ) : (
        <AttendanceHistory
          sessions={
            attendanceSessions
          }
          subjects={subjects}
          teachers={teachers}
          attendance={attendance}
          onView={handleViewSession}
          onDelete={
            handleDeleteSession
          }
        />
      )}
    </div>
  );
}
