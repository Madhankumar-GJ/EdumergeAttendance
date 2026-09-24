import React from "react";

import {
  CalendarDays,
  BookOpen,
  UserRound,
  GraduationCap,
  Layers3,
} from "lucide-react";

export default function AttendanceFilters({
  filters,
  setFilters,
  departments = [],
  courses = [],
  subjects = [],
  teachers = [],
  timetable = [],
}) {
  const update = (key, value) => {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const filteredCourses = courses.filter(
    (course) =>
      !filters.departmentId ||
      course.departmentId ===
        filters.departmentId
  );

  const filteredSubjects =
    subjects.filter(
      (subject) =>
        (!filters.courseId ||
          subject.courseId ===
            filters.courseId) &&
        (!filters.semester ||
          Number(subject.semester) ===
            Number(filters.semester))
    );

  const filteredTeachers =
    teachers.filter(
      (teacher) =>
        !filters.departmentId ||
        teacher.departmentId ===
          filters.departmentId
    );

  const periods = timetable
    .filter((item) => {
      if (
        filters.departmentId &&
        item.departmentId !==
          filters.departmentId
      ) {
        return false;
      }

      if (
        filters.courseId &&
        item.courseId !==
          filters.courseId
      ) {
        return false;
      }

      if (
        filters.year &&
        Number(item.year) !==
          Number(filters.year)
      ) {
        return false;
      }

      if (
        filters.semester &&
        Number(item.semester) !==
          Number(filters.semester)
      ) {
        return false;
      }

      if (
        filters.section &&
        item.section !==
          filters.section
      ) {
        return false;
      }

      if (
        filters.subjectId &&
        item.subjectId !==
          filters.subjectId
      ) {
        return false;
      }

      return true;
    })
    .sort(
      (a, b) =>
        Number(a.period || 0) -
        Number(b.period || 0)
    );

  const uniquePeriods = [
    ...new Map(
      periods.map((item) => [
        item.period,
        item,
      ])
    ).values(),
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10">
          <CalendarDays size={19} />
        </div>

        <div>
          <h2 className="font-bold text-slate-900 dark:text-white">
            Attendance Session
          </h2>

          <p className="text-xs text-slate-400">
            Select the class before marking
            attendance
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Field label="Date">
          <input
            type="date"
            value={filters.date}
            onChange={(event) =>
              update(
                "date",
                event.target.value
              )
            }
            className="form-input"
          />
        </Field>

        <Field label="Department">
          <select
            value={filters.departmentId}
            onChange={(event) => {
              update(
                "departmentId",
                event.target.value
              );

              setFilters((previous) => ({
                ...previous,
                courseId: "",
                subjectId: "",
                teacherId: "",
              }));
            }}
            className="form-input"
          >
            <option value="">
              Select Department
            </option>

            {departments.map(
              (department) => (
                <option
                  key={department.id}
                  value={department.id}
                >
                  {department.code}
                </option>
              )
            )}
          </select>
        </Field>

        <Field label="Course">
          <select
            value={filters.courseId}
            onChange={(event) => {
              update(
                "courseId",
                event.target.value
              );

              setFilters((previous) => ({
                ...previous,
                subjectId: "",
              }));
            }}
            className="form-input"
          >
            <option value="">
              Select Course
            </option>

            {filteredCourses.map(
              (course) => (
                <option
                  key={course.id}
                  value={course.id}
                >
                  {course.code}
                </option>
              )
            )}
          </select>
        </Field>

        <Field label="Subject">
          <div className="relative">
            <BookOpen
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={filters.subjectId}
              onChange={(event) =>
                update(
                  "subjectId",
                  event.target.value
                )
              }
              className="form-input pl-9"
            >
              <option value="">
                Select Subject
              </option>

              {filteredSubjects.map(
                (subject) => (
                  <option
                    key={subject.id}
                    value={subject.id}
                  >
                    {subject.code} —{" "}
                    {subject.name}
                  </option>
                )
              )}
            </select>
          </div>
        </Field>

        <Field label="Teacher">
          <div className="relative">
            <UserRound
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={filters.teacherId}
              onChange={(event) =>
                update(
                  "teacherId",
                  event.target.value
                )
              }
              className="form-input pl-9"
            >
              <option value="">
                Select Teacher
              </option>

              {filteredTeachers.map(
                (teacher) => (
                  <option
                    key={teacher.id}
                    value={teacher.id}
                  >
                    {teacher.name}
                  </option>
                )
              )}
            </select>
          </div>
        </Field>

        <Field label="Period">
          <div className="relative">
            <Layers3
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={filters.period}
              onChange={(event) =>
                update(
                  "period",
                  event.target.value
                )
              }
              className="form-input pl-9"
            >
              <option value="">
                Select Period
              </option>

              {uniquePeriods.length >
              0 ? (
                uniquePeriods.map(
                  (period) => (
                    <option
                      key={period.id}
                      value={period.period}
                    >
                      Period{" "}
                      {period.period} ·{" "}
                      {period.startTime}–
                      {period.endTime}
                    </option>
                  )
                )
              ) : (
                [1, 2, 3, 4, 5, 6, 7].map(
                  (period) => (
                    <option
                      key={period}
                      value={period}
                    >
                      Period {period}
                    </option>
                  )
                )
              )}
            </select>
          </div>
        </Field>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Field label="Year">
          <select
            value={filters.year}
            onChange={(event) =>
              update(
                "year",
                event.target.value
              )
            }
            className="form-input"
          >
            <option value="">
              Select Year
            </option>

            {[1, 2, 3, 4].map((year) => (
              <option
                key={year}
                value={year}
              >
                Year {year}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Semester">
          <select
            value={filters.semester}
            onChange={(event) =>
              update(
                "semester",
                event.target.value
              )
            }
            className="form-input"
          >
            <option value="">
              Select Semester
            </option>

            {Array.from(
              { length: 8 },
              (_, index) => (
                <option
                  key={index + 1}
                  value={index + 1}
                >
                  Semester {index + 1}
                </option>
              )
            )}
          </select>
        </Field>

        <Field label="Section">
          <select
            value={filters.section}
            onChange={(event) =>
              update(
                "section",
                event.target.value
              )
            }
            className="form-input"
          >
            <option value="">
              Select Section
            </option>

            <option value="A">
              Section A
            </option>

            <option value="B">
              Section B
            </option>

            <option value="C">
              Section C
            </option>
          </select>
        </Field>

        <div className="flex items-end">
          <div className="flex w-full items-center gap-2 rounded-xl bg-indigo-50 px-4 py-3 text-xs text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
            <GraduationCap size={16} />

            <span>
              {filters.section
                ? `Section ${filters.section}`
                : "Select a section"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </label>

      {children}
    </div>
  );
}
