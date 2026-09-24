import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const PERIODS = [
  { id: 1, time: "09:00 - 10:00" },
  { id: 2, time: "10:00 - 11:00" },
  { id: 3, time: "11:15 - 12:15" },
  { id: 4, time: "12:15 - 01:15" },
  { id: 5, time: "02:00 - 03:00" },
  { id: 6, time: "03:00 - 04:00" },
];

const INITIAL_TIMETABLE = {
  Monday: {
    1: {
      subject: "Data Structures",
      code: "CS301",
      teacher: "Dr. Priya Sharma",
      room: "Lab 301",
      type: "Lecture",
    },
    2: {
      subject: "Database Systems",
      code: "CS302",
      teacher: "Prof. Neha Verma",
      room: "Room 204",
      type: "Lecture",
    },
    3: {
      subject: "Operating Systems",
      code: "CS303",
      teacher: "Dr. Rajesh Kumar",
      room: "Room 205",
      type: "Lecture",
    },
    4: {
      subject: "Break",
      code: "",
      teacher: "",
      room: "",
      type: "Break",
    },
    5: {
      subject: "Algorithms",
      code: "CS304",
      teacher: "Dr. Priya Sharma",
      room: "Room 201",
      type: "Lecture",
    },
    6: {
      subject: "Web Technologies",
      code: "IT301",
      teacher: "Prof. Neha Verma",
      room: "Lab 102",
      type: "Practical",
    },
  },

  Tuesday: {
    1: {
      subject: "Computer Networks",
      code: "CS305",
      teacher: "Dr. Rajesh Kumar",
      room: "Room 203",
      type: "Lecture",
    },
    2: {
      subject: "Algorithms",
      code: "CS304",
      teacher: "Dr. Priya Sharma",
      room: "Room 201",
      type: "Lecture",
    },
    3: {
      subject: "Web Technologies",
      code: "IT301",
      teacher: "Prof. Neha Verma",
      room: "Lab 102",
      type: "Practical",
    },
    4: {
      subject: "Lunch Break",
      code: "",
      teacher: "",
      room: "",
      type: "Break",
    },
    5: {
      subject: "Database Systems",
      code: "CS302",
      teacher: "Prof. Neha Verma",
      room: "Room 204",
      type: "Lecture",
    },
    6: {
      subject: "Operating Systems",
      code: "CS303",
      teacher: "Dr. Rajesh Kumar",
      room: "Room 205",
      type: "Lecture",
    },
  },

  Wednesday: {
    1: {
      subject: "Operating Systems",
      code: "CS303",
      teacher: "Dr. Rajesh Kumar",
      room: "Room 205",
      type: "Lecture",
    },
    2: {
      subject: "Data Structures",
      code: "CS301",
      teacher: "Dr. Priya Sharma",
      room: "Lab 301",
      type: "Practical",
    },
    3: {
      subject: "Computer Networks",
      code: "CS305",
      teacher: "Dr. Rajesh Kumar",
      room: "Room 203",
      type: "Lecture",
    },
    4: {
      subject: "Lunch Break",
      code: "",
      teacher: "",
      room: "",
      type: "Break",
    },
    5: {
      subject: "Web Technologies",
      code: "IT301",
      teacher: "Prof. Neha Verma",
      room: "Lab 102",
      type: "Practical",
    },
    6: {
      subject: "Algorithms",
      code: "CS304",
      teacher: "Dr. Priya Sharma",
      room: "Room 201",
      type: "Lecture",
    },
  },

  Thursday: {
    1: {
      subject: "Database Systems",
      code: "CS302",
      teacher: "Prof. Neha Verma",
      room: "Room 204",
      type: "Lecture",
    },
    2: {
      subject: "Computer Networks",
      code: "CS305",
      teacher: "Dr. Rajesh Kumar",
      room: "Room 203",
      type: "Lecture",
    },
    3: {
      subject: "Algorithms",
      code: "CS304",
      teacher: "Dr. Priya Sharma",
      room: "Room 201",
      type: "Lecture",
    },
    4: {
      subject: "Lunch Break",
      code: "",
      teacher: "",
      room: "",
      type: "Break",
    },
    5: {
      subject: "Data Structures",
      code: "CS301",
      teacher: "Dr. Priya Sharma",
      room: "Lab 301",
      type: "Practical",
    },
    6: {
      subject: "Operating Systems",
      code: "CS303",
      teacher: "Dr. Rajesh Kumar",
      room: "Room 205",
      type: "Lecture",
    },
  },

  Friday: {
    1: {
      subject: "Web Technologies",
      code: "IT301",
      teacher: "Prof. Neha Verma",
      room: "Lab 102",
      type: "Practical",
    },
    2: {
      subject: "Operating Systems",
      code: "CS303",
      teacher: "Dr. Rajesh Kumar",
      room: "Room 205",
      type: "Lecture",
    },
    3: {
      subject: "Data Structures",
      code: "CS301",
      teacher: "Dr. Priya Sharma",
      room: "Lab 301",
      type: "Lecture",
    },
    4: {
      subject: "Lunch Break",
      code: "",
      teacher: "",
      room: "",
      type: "Break",
    },
    5: {
      subject: "Database Systems",
      code: "CS302",
      teacher: "Prof. Neha Verma",
      room: "Room 204",
      type: "Lecture",
    },
    6: {
      subject: "Computer Networks",
      code: "CS305",
      teacher: "Dr. Rajesh Kumar",
      room: "Room 203",
      type: "Lecture",
    },
  },

  Saturday: {
    1: {
      subject: "Algorithms",
      code: "CS304",
      teacher: "Dr. Priya Sharma",
      room: "Room 201",
      type: "Lecture",
    },
    2: {
      subject: "Project Work",
      code: "CS399",
      teacher: "Dr. Priya Sharma",
      room: "Innovation Lab",
      type: "Project",
    },
    3: {
      subject: "Project Work",
      code: "CS399",
      teacher: "Dr. Priya Sharma",
      room: "Innovation Lab",
      type: "Project",
    },
    4: {
      subject: "Break",
      code: "",
      teacher: "",
      room: "",
      type: "Break",
    },
    5: {
      subject: "Seminar",
      code: "SEM01",
      teacher: "Faculty Panel",
      room: "Seminar Hall",
      type: "Seminar",
    },
    6: {
      subject: "Free Period",
      code: "",
      teacher: "",
      room: "",
      type: "Free",
    },
  },
};

const SUBJECT_COLORS = {
  "Data Structures": {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-400",
    dot: "bg-blue-500",
  },
  "Database Systems": {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-400",
    dot: "bg-purple-500",
  },
  "Operating Systems": {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
    dot: "bg-emerald-500",
  },
  Algorithms: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-400",
    dot: "bg-amber-500",
  },
  "Web Technologies": {
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    text: "text-pink-400",
    dot: "bg-pink-500",
  },
  "Computer Networks": {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    text: "text-cyan-400",
    dot: "bg-cyan-500",
  },
};

function Timetable() {
  const navigate = useNavigate();

  const [timetable, setTimetable] =
    useState(INITIAL_TIMETABLE);

  const [selectedClass, setSelectedClass] =
    useState("CSE - III A");

  const [selectedSemester, setSelectedSemester] =
    useState("Semester 5");

  const [selectedDay, setSelectedDay] =
    useState("All Days");

  const [search, setSearch] =
    useState("");

  const [viewMode, setViewMode] =
    useState("grid");

  const [selectedCell, setSelectedCell] =
    useState(null);

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [showStats, setShowStats] =
    useState(false);

  const [toast, setToast] =
    useState("");

  const [form, setForm] = useState({
    day: "Monday",
    period: "1",
    subject: "Data Structures",
    code: "CS301",
    teacher: "Dr. Priya Sharma",
    room: "Room 201",
    type: "Lecture",
  });

  const showToast = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const updateForm = (
    field,
    value
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const filteredDays =
    selectedDay === "All Days"
      ? DAYS
      : DAYS.filter(
          (day) => day === selectedDay
        );

  const allClasses = useMemo(() => {
    const items = [];

    DAYS.forEach((day) => {
      PERIODS.forEach((period) => {
        const item =
          timetable?.[day]?.[period.id];

        if (
          item &&
          item.type !== "Break" &&
          item.type !== "Free"
        ) {
          items.push({
            ...item,
            day,
            period: period.id,
          });
        }
      });
    });

    return items;
  }, [timetable]);

  const displayedClasses = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) return allClasses;

    return allClasses.filter(
      (item) =>
        item.subject
          .toLowerCase()
          .includes(query) ||
        item.code
          .toLowerCase()
          .includes(query) ||
        item.teacher
          .toLowerCase()
          .includes(query) ||
        item.room
          .toLowerCase()
          .includes(query)
    );
  }, [allClasses, search]);

  const weeklyClasses =
    allClasses.length;

  const practicalClasses =
    allClasses.filter(
      (item) =>
        item.type === "Practical"
    ).length;

  const uniqueTeachers =
    new Set(
      allClasses.map(
        (item) => item.teacher
      )
    ).size;

  const uniqueRooms =
    new Set(
      allClasses.map(
        (item) => item.room
      )
    ).size;

  const isCellVisible = (
    day,
    periodId
  ) => {
    if (
      selectedDay !== "All Days" &&
      selectedDay !== day
    ) {
      return false;
    }

    const query = search
      .trim()
      .toLowerCase();

    if (!query) return true;

    const cell =
      timetable?.[day]?.[periodId];

    if (!cell) return false;

    return (
      cell.subject
        ?.toLowerCase()
        .includes(query) ||
      cell.code
        ?.toLowerCase()
        .includes(query) ||
      cell.teacher
        ?.toLowerCase()
        .includes(query) ||
      cell.room
        ?.toLowerCase()
        .includes(query)
    );
  };

  const saveCell = () => {
    if (
      !form.subject.trim() ||
      !form.teacher.trim()
    ) {
      showToast(
        "Subject and teacher are required."
      );
      return;
    }

    const day = form.day;
    const period = form.period;

    setTimetable((previous) => ({
      ...previous,
      [day]: {
        ...previous[day],
        [period]: {
          subject: form.subject,
          code: form.code,
          teacher: form.teacher,
          room: form.room,
          type: form.type,
        },
      },
    }));

    setShowAddModal(false);
    showToast(
      "Timetable slot saved successfully."
    );
  };

  const deleteCell = (
    day,
    period
  ) => {
    const confirmed =
      window.confirm(
        "Remove this timetable slot?"
      );

    if (!confirmed) return;

    setTimetable((previous) => {
      const updatedDay = {
        ...previous[day],
      };

      delete updatedDay[period];

      return {
        ...previous,
        [day]: updatedDay,
      };
    });

    setSelectedCell(null);

    showToast(
      "Timetable slot removed."
    );
  };

  const openEdit = (
    day,
    periodId
  ) => {
    const cell =
      timetable?.[day]?.[periodId];

    setForm({
      day,
      period: String(periodId),
      subject:
        cell?.subject || "",
      code: cell?.code || "",
      teacher:
        cell?.teacher || "",
      room:
        cell?.room || "",
      type:
        cell?.type || "Lecture",
    });

    setShowAddModal(true);
  };

  const resetTimetable = () => {
    const confirmed =
      window.confirm(
        "Reset the timetable to the default schedule?"
      );

    if (!confirmed) return;

    setTimetable(INITIAL_TIMETABLE);

    showToast(
      "Timetable reset successfully."
    );
  };

  const exportTimetable = () => {
    const headers = [
      "Day",
      "Period",
      "Time",
      "Subject",
      "Code",
      "Teacher",
      "Room",
      "Type",
    ];

    const rows = [];

    DAYS.forEach((day) => {
      PERIODS.forEach(
        (period) => {
          const item =
            timetable?.[day]?.[
              period.id
            ];

          if (!item) return;

          rows.push([
            day,
            period.id,
            period.time,
            item.subject,
            item.code,
            item.teacher,
            item.room,
            item.type,
          ]);
        }
      );
    });

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(
              value ?? ""
            ).replaceAll(
              '"',
              '""'
            )}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "college-timetable.csv";

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

    showToast(
      "Timetable exported as CSV."
    );
  };

  const printTimetable = () => {
    window.print();
  };

  const openGenerator = () => {
    navigate(
      "/timetable/generate"
    );
  };

  return (
    <div className="space-y-6">
      {/* TOAST */}

      {toast && (
        <div className="fixed right-6 top-6 z-[100] rounded-xl border border-emerald-500/20 bg-slate-900 px-5 py-4 text-xs font-semibold text-emerald-400 shadow-2xl">
          ✓ {toast}
        </div>
      )}

      {/* HEADER */}

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-[10px] text-slate-600">
            Academics / Timetable
          </p>

          <h1 className="mt-1 text-2xl font-bold text-white">
            Timetable
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            Manage classes, faculty schedules,
            rooms and academic periods.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={exportTimetable}
            className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-[10px] font-semibold text-slate-400 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white"
          >
            ↓ Export
          </button>

          <button
            type="button"
            onClick={printTimetable}
            className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-[10px] font-semibold text-slate-400 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white"
          >
            ⎙ Print
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/timetable/conflicts"
              )
            }
            className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-[10px] font-semibold text-red-400 transition hover:bg-red-500/10"
          >
            ⚠ Conflicts
          </button>

          <button
            type="button"
            onClick={openGenerator}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-[10px] font-semibold text-white transition hover:bg-blue-500"
          >
            ✦ Generate Timetable
          </button>
        </div>
      </div>

      {/* CONTROLS */}

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <div className="grid gap-3 xl:grid-cols-[1fr_180px_180px_1fr_auto]">
          <div>
            <label className="mb-2 block text-[8px] font-semibold uppercase tracking-wider text-slate-600">
              Class
            </label>

            <select
              value={selectedClass}
              onChange={(event) =>
                setSelectedClass(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-3 text-xs text-slate-400 outline-none focus:border-blue-500/50"
            >
              <option>
                CSE - III A
              </option>

              <option>
                CSE - III B
              </option>

              <option>
                IT - III A
              </option>

              <option>
                ECE - III A
              </option>

              <option>
                ME - III A
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[8px] font-semibold uppercase tracking-wider text-slate-600">
              Semester
            </label>

            <select
              value={
                selectedSemester
              }
              onChange={(event) =>
                setSelectedSemester(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-3 text-xs text-slate-400 outline-none focus:border-blue-500/50"
            >
              <option>
                Semester 1
              </option>

              <option>
                Semester 2
              </option>

              <option>
                Semester 3
              </option>

              <option>
                Semester 4
              </option>

              <option>
                Semester 5
              </option>

              <option>
                Semester 6
              </option>

              <option>
                Semester 7
              </option>

              <option>
                Semester 8
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[8px] font-semibold uppercase tracking-wider text-slate-600">
              Day
            </label>

            <select
              value={selectedDay}
              onChange={(event) =>
                setSelectedDay(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-3 text-xs text-slate-400 outline-none focus:border-blue-500/50"
            >
              <option>
                All Days
              </option>

              {DAYS.map((day) => (
                <option
                  key={day}
                  value={day}
                >
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[8px] font-semibold uppercase tracking-wider text-slate-600">
              Search
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-700">
                ⌕
              </span>

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Subject, teacher, room..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-9 pr-3 text-xs text-slate-300 outline-none placeholder:text-slate-700 focus:border-blue-500/50"
              />
            </div>
          </div>

          <div className="flex items-end">
            <div className="flex w-full rounded-xl border border-slate-800 bg-slate-950 p-1">
              <button
                type="button"
                onClick={() =>
                  setViewMode("grid")
                }
                className={`flex-1 rounded-lg px-3 py-2 text-[9px] font-semibold ${
                  viewMode ===
                  "grid"
                    ? "bg-slate-800 text-white"
                    : "text-slate-600"
                }`}
              >
                Grid
              </button>

              <button
                type="button"
                onClick={() =>
                  setViewMode("list")
                }
                className={`flex-1 rounded-lg px-3 py-2 text-[9px] font-semibold ${
                  viewMode ===
                  "list"
                    ? "bg-slate-800 text-white"
                    : "text-slate-600"
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SUMMARY */}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MiniStat
          label="Weekly Classes"
          value={weeklyClasses}
          color="blue"
        />

        <MiniStat
          label="Practical Sessions"
          value={practicalClasses}
          color="purple"
        />

        <MiniStat
          label="Faculty Involved"
          value={uniqueTeachers}
          color="emerald"
        />

        <MiniStat
          label="Rooms Used"
          value={uniqueRooms}
          color="amber"
        />
      </div>

      {/* GRID VIEW */}

      {viewMode === "grid" && (
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
            <div>
              <h2 className="text-xs font-bold text-white">
                {selectedClass}
              </h2>

              <p className="mt-1 text-[9px] text-slate-600">
                {selectedSemester} • Weekly
                schedule
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setForm({
                  day: "Monday",
                  period: "1",
                  subject:
                    "Data Structures",
                  code: "CS301",
                  teacher:
                    "Dr. Priya Sharma",
                  room: "Room 201",
                  type: "Lecture",
                });

                setShowAddModal(true);
              }}
              className="rounded-lg border border-slate-800 px-3 py-2 text-[9px] font-semibold text-slate-500 hover:bg-slate-800 hover:text-white"
            >
              + Add Slot
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[1200px]">
              {/* DAYS HEADER */}

              <div
                className="grid border-b border-slate-800"
                style={{
                  gridTemplateColumns:
                    "130px repeat(6, minmax(170px, 1fr))",
                }}
              >
                <div className="border-r border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-[8px] font-semibold uppercase tracking-wider text-slate-700">
                    Time
                  </p>
                </div>

                {DAYS.map((day) => (
                  <div
                    key={day}
                    className={`border-r border-slate-800 p-4 ${
                      selectedDay ===
                      day
                        ? "bg-blue-500/5"
                        : ""
                    }`}
                  >
                    <p className="text-[10px] font-bold text-slate-300">
                      {day}
                    </p>

                    <p className="mt-1 text-[8px] text-slate-700">
                      {
                        allClasses.filter(
                          (item) =>
                            item.day ===
                            day
                        ).length
                      }{" "}
                      classes
                    </p>
                  </div>
                ))}
              </div>

              {/* PERIOD ROWS */}

              {PERIODS.map(
                (period) => (
                  <div
                    key={period.id}
                    className="grid border-b border-slate-800 last:border-b-0"
                    style={{
                      gridTemplateColumns:
                        "130px repeat(6, minmax(170px, 1fr))",
                    }}
                  >
                    <div className="border-r border-slate-800 bg-slate-950/30 p-3">
                      <p className="text-[9px] font-bold text-slate-500">
                        Period{" "}
                        {period.id}
                      </p>

                      <p className="mt-1 text-[8px] text-slate-700">
                        {period.time}
                      </p>
                    </div>

                    {DAYS.map(
                      (day) => {
                        const cell =
                          timetable?.[
                            day
                          ]?.[
                            period.id
                          ];

                        const visible =
                          isCellVisible(
                            day,
                            period.id
                          );

                        return (
                          <div
                            key={`${day}-${period.id}`}
                            className={`relative min-h-[125px] border-r border-slate-800 p-2 ${
                              selectedDay !==
                                "All Days" &&
                              selectedDay !==
                                day
                                ? "opacity-25"
                                : ""
                            }`}
                          >
                            {cell ? (
                              <TimetableCard
                                cell={
                                  cell
                                }
                                hidden={
                                  !visible
                                }
                                onClick={() =>
                                  setSelectedCell(
                                    {
                                      day,
                                      period:
                                        period.id,
                                      cell,
                                    }
                                  )
                                }
                              />
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  openEdit(
                                    day,
                                    period.id
                                  )
                                }
                                className="group flex h-full min-h-[105px] w-full items-center justify-center rounded-xl border border-dashed border-slate-800 text-slate-700 transition hover:border-blue-500/30 hover:bg-blue-500/5 hover:text-blue-400"
                              >
                                <span className="text-lg">
                                  +
                                </span>
                              </button>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* LIST VIEW */}

      {viewMode === "list" && (
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <div className="border-b border-slate-800 px-5 py-4">
            <h2 className="text-xs font-bold text-white">
              Schedule List
            </h2>
          </div>

          <div className="divide-y divide-slate-800">
            {displayedClasses.length ===
            0 ? (
              <div className="p-10 text-center text-xs text-slate-600">
                No timetable entries match
                your search.
              </div>
            ) : (
              displayedClasses.map(
                (item, index) => (
                  <div
                    key={`${item.day}-${item.period}-${index}`}
                    className="flex flex-col gap-3 p-4 transition hover:bg-slate-800/20 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20">
                        <p className="text-[10px] font-bold text-white">
                          {item.day}
                        </p>

                        <p className="mt-1 text-[8px] text-slate-600">
                          Period{" "}
                          {
                            item.period
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-300">
                          {
                            item.subject
                          }
                        </p>

                        <p className="mt-1 text-[9px] text-slate-600">
                          {item.code} •{" "}
                          {
                            item.teacher
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-[9px] text-slate-600">
                        {item.room}
                      </span>

                      <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[8px] font-semibold text-blue-400">
                        {item.type}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          openEdit(
                            item.day,
                            item.period
                          )
                        }
                        className="rounded-lg border border-slate-800 px-3 py-2 text-[9px] text-slate-500 hover:bg-slate-800 hover:text-white"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </section>
      )}

      {/* FOOTER ACTIONS */}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <div>
          <p className="text-[10px] font-semibold text-slate-400">
            Timetable management
          </p>

          <p className="mt-1 text-[9px] text-slate-700">
            Changes made here are reflected
            immediately in this session.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              setShowStats(
                !showStats
              )
            }
            className="rounded-xl border border-slate-800 px-4 py-2.5 text-[9px] font-semibold text-slate-500 hover:bg-slate-800 hover:text-white"
          >
            {showStats
              ? "Hide Analytics"
              : "View Analytics"}
          </button>

          <button
            type="button"
            onClick={resetTimetable}
            className="rounded-xl border border-red-500/20 px-4 py-2.5 text-[9px] font-semibold text-red-400 hover:bg-red-500/5"
          >
            Reset Schedule
          </button>
        </div>
      </div>

      {/* ANALYTICS */}

      {showStats && (
        <TimetableAnalytics
          classes={allClasses}
        />
      )}

      {/* CELL MODAL */}

      {selectedCell && (
        <CellDetails
          selected={selectedCell}
          onClose={() =>
            setSelectedCell(null)
          }
          onEdit={() => {
            openEdit(
              selectedCell.day,
              selectedCell.period
            );

            setSelectedCell(null);
          }}
          onDelete={() =>
            deleteCell(
              selectedCell.day,
              selectedCell.period
            )
          }
        />
      )}

      {/* ADD / EDIT MODAL */}

      {showAddModal && (
        <EditSlotModal
          form={form}
          updateForm={updateForm}
          onClose={() =>
            setShowAddModal(false)
          }
          onSave={saveCell}
        />
      )}
    </div>
  );
}

/* =========================================
   TIMETABLE CARD
========================================= */

function TimetableCard({
  cell,
  hidden,
  onClick,
}) {
  if (hidden) {
    return (
      <div className="flex h-full min-h-[105px] items-center justify-center rounded-xl border border-dashed border-slate-800/50 text-[8px] text-slate-800">
        Filtered
      </div>
    );
  }

  if (
    cell.type === "Break" ||
    cell.type === "Free"
  ) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex h-full min-h-[105px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950/30 transition hover:border-slate-700"
      >
        <span className="text-[9px] font-semibold text-slate-600">
          {cell.subject}
        </span>

        <span className="mt-1 text-[8px] text-slate-800">
          {cell.type}
        </span>
      </button>
    );
  }

  const colors =
    SUBJECT_COLORS[
      cell.subject
    ] || {
      bg: "bg-slate-800/50",
      border: "border-slate-700",
      text: "text-slate-300",
      dot: "bg-slate-500",
    };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex h-full min-h-[105px] w-full flex-col rounded-xl border ${colors.border} ${colors.bg} p-3 text-left transition hover:-translate-y-0.5 hover:shadow-lg`}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={`h-2 w-2 shrink-0 rounded-full ${colors.dot}`}
        />

        <span
          className={`rounded-md bg-slate-950/40 px-1.5 py-1 text-[7px] font-semibold ${colors.text}`}
        >
          {cell.type}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-[10px] font-bold leading-4 text-slate-300">
        {cell.subject}
      </p>

      <p className="mt-1 text-[8px] font-medium text-slate-600">
        {cell.code}
      </p>

      <div className="mt-auto pt-3">
        <p className="truncate text-[8px] text-slate-500">
          {cell.teacher}
        </p>

        <p className="mt-1 truncate text-[8px] text-slate-700">
          {cell.room}
        </p>
      </div>

      <span className="absolute bottom-2 right-2 hidden text-[8px] text-slate-700 group-hover:block">
        ↗
      </span>
    </button>
  );
}

/* =========================================
   MINI STAT
========================================= */

function MiniStat({
  label,
  value,
  color,
}) {
  const colors = {
    blue: "text-blue-400",
    purple: "text-purple-400",
    emerald: "text-emerald-400",
    amber: "text-amber-400",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <p className="text-[8px] font-semibold uppercase tracking-wider text-slate-700">
        {label}
      </p>

      <p
        className={`mt-2 text-xl font-bold ${colors[color]}`}
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================
   CELL DETAILS
========================================= */

function CellDetails({
  selected,
  onClose,
  onEdit,
  onDelete,
}) {
  const { cell, day, period } =
    selected;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <div>
            <p className="text-[8px] uppercase tracking-wider text-slate-700">
              {day} • Period {period}
            </p>

            <h2 className="mt-1 text-lg font-bold text-white">
              {cell.subject}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-600 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 p-5">
          <Info
            label="Code"
            value={
              cell.code || "—"
            }
          />

          <Info
            label="Type"
            value={cell.type}
          />

          <Info
            label="Teacher"
            value={
              cell.teacher || "—"
            }
          />

          <Info
            label="Room"
            value={
              cell.room || "—"
            }
          />
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-800 p-5">
          <button
            type="button"
            onClick={onDelete}
            className="rounded-xl border border-red-500/20 px-4 py-2.5 text-[9px] font-semibold text-red-400 hover:bg-red-500/5"
          >
            Delete
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-[9px] font-semibold text-white hover:bg-blue-500"
          >
            Edit Slot
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   INFO
========================================= */

function Info({
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-950/50 p-3">
      <p className="text-[8px] uppercase tracking-wider text-slate-700">
        {label}
      </p>

      <p className="mt-1 break-words text-[10px] font-semibold text-slate-400">
        {value}
      </p>
    </div>
  );
}

/* =========================================
   EDIT SLOT MODAL
========================================= */

function EditSlotModal({
  form,
  updateForm,
  onClose,
  onSave,
}) {
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <div>
            <h2 className="text-lg font-bold text-white">
              Edit Timetable Slot
            </h2>

            <p className="mt-1 text-[9px] text-slate-600">
              Assign subject, faculty and room
              to an academic period.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-600 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <SelectInput
            label="Day"
            value={form.day}
            onChange={(value) =>
              updateForm(
                "day",
                value
              )
            }
            options={DAYS}
          />

          <SelectInput
            label="Period"
            value={form.period}
            onChange={(value) =>
              updateForm(
                "period",
                value
              )
            }
            options={PERIODS.map(
              (item) =>
                String(item.id)
            )}
            labels={PERIODS.map(
              (item) =>
                `Period ${item.id} — ${item.time}`
            )}
          />

          <TextInput
            label="Subject"
            value={form.subject}
            onChange={(value) =>
              updateForm(
                "subject",
                value
              )
            }
            placeholder="Subject name"
          />

          <TextInput
            label="Subject Code"
            value={form.code}
            onChange={(value) =>
              updateForm(
                "code",
                value
              )
            }
            placeholder="e.g. CS301"
          />

          <TextInput
            label="Teacher"
            value={form.teacher}
            onChange={(value) =>
              updateForm(
                "teacher",
                value
              )
            }
            placeholder="Faculty name"
          />

          <TextInput
            label="Room"
            value={form.room}
            onChange={(value) =>
              updateForm(
                "room",
                value
              )
            }
            placeholder="Room / Lab"
          />

          <SelectInput
            label="Class Type"
            value={form.type}
            onChange={(value) =>
              updateForm(
                "type",
                value
              )
            }
            options={[
              "Lecture",
              "Practical",
              "Tutorial",
              "Project",
              "Seminar",
              "Break",
              "Free",
            ]}
          />
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-800 p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-5 py-2.5 text-[9px] font-semibold text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-[9px] font-semibold text-white hover:bg-blue-500"
          >
            Save Slot
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   TEXT INPUT
========================================= */

function TextInput({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[8px] font-semibold uppercase tracking-wider text-slate-600">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-3 text-xs text-slate-300 outline-none placeholder:text-slate-700 focus:border-blue-500/50"
      />
    </label>
  );
}

/* =========================================
   SELECT INPUT
========================================= */

function SelectInput({
  label,
  value,
  onChange,
  options,
  labels,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[8px] font-semibold uppercase tracking-wider text-slate-600">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-3 text-xs text-slate-400 outline-none focus:border-blue-500/50"
      >
        {options.map(
          (option, index) => (
            <option
              key={option}
              value={option}
            >
              {labels?.[index] ||
                option}
            </option>
          )
        )}
      </select>
    </label>
  );
}

/* =========================================
   ANALYTICS
========================================= */

function TimetableAnalytics({
  classes,
}) {
  const subjectCounts =
    classes.reduce(
      (accumulator, item) => {
        accumulator[item.subject] =
          (accumulator[
            item.subject
          ] || 0) + 1;

        return accumulator;
      },
      {}
    );

  const sortedSubjects =
    Object.entries(
      subjectCounts
    ).sort(
      (a, b) => b[1] - a[1]
    );

  const teacherCounts =
    classes.reduce(
      (accumulator, item) => {
        accumulator[item.teacher] =
          (accumulator[
            item.teacher
          ] || 0) + 1;

        return accumulator;
      },
      {}
    );

  const roomCounts =
    classes.reduce(
      (accumulator, item) => {
        accumulator[item.room] =
          (accumulator[
            item.room
          ] || 0) + 1;

        return accumulator;
      },
      {}
    );

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-5">
        <h2 className="text-sm font-bold text-white">
          Timetable Analytics
        </h2>

        <p className="mt-1 text-[9px] text-slate-600">
          Distribution of subjects, faculty and
          rooms across the weekly schedule.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <AnalyticsList
          title="Subject Distribution"
          data={sortedSubjects}
          color="blue"
        />

        <AnalyticsList
          title="Faculty Load"
          data={Object.entries(
            teacherCounts
          ).sort(
            (a, b) => b[1] - a[1]
          )}
          color="emerald"
        />

        <AnalyticsList
          title="Room Utilization"
          data={Object.entries(
            roomCounts
          ).sort(
            (a, b) => b[1] - a[1]
          )}
          color="purple"
        />
      </div>
    </section>
  );
}

/* =========================================
   ANALYTICS LIST
========================================= */

function AnalyticsList({
  title,
  data,
  color,
}) {
  const max =
    data[0]?.[1] || 1;

  const colors = {
    blue: "bg-blue-500",
    emerald: "bg-emerald-500",
    purple: "bg-purple-500",
  };

  return (
    <div>
      <h3 className="text-[10px] font-semibold text-slate-400">
        {title}
      </h3>

      <div className="mt-4 space-y-3">
        {data
          .slice(0, 6)
          .map(([name, count]) => (
            <div key={name}>
              <div className="mb-1 flex items-center justify-between gap-3">
                <span className="truncate text-[9px] text-slate-600">
                  {name}
                </span>

                <span className="text-[9px] font-bold text-slate-400">
                  {count}
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full ${colors[color]}`}
                  style={{
                    width: `${
                      (count /
                        max) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Timetable;
