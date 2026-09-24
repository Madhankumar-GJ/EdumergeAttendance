import React, { useMemo, useState } from "react";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TIME_SLOTS = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 01:00",
  "01:00 - 02:00",
  "02:00 - 03:00",
  "03:00 - 04:00",
  "04:00 - 05:00",
];

const initialSchedule = {
  Monday: {
    "09:00 - 10:00": {
      subject: "Data Structures",
      code: "CS301",
      teacher: "Dr. Rahul Sharma",
      room: "Lab 101",
      type: "Lecture",
    },
    "10:00 - 11:00": {
      subject: "Database Management",
      code: "CS302",
      teacher: "Prof. Priya Nair",
      room: "Room 204",
      type: "Lecture",
    },
    "02:00 - 03:00": {
      subject: "Data Structures Lab",
      code: "CS301L",
      teacher: "Dr. Rahul Sharma",
      room: "Lab 201",
      type: "Lab",
    },
  },

  Tuesday: {
    "09:00 - 10:00": {
      subject: "Operating Systems",
      code: "CS303",
      teacher: "Dr. Vikram Singh",
      room: "Room 202",
      type: "Lecture",
    },
    "11:00 - 12:00": {
      subject: "Computer Networks",
      code: "CS304",
      teacher: "Prof. Ananya Rao",
      room: "Room 205",
      type: "Lecture",
    },
  },

  Wednesday: {
    "10:00 - 11:00": {
      subject: "Database Management",
      code: "CS302",
      teacher: "Prof. Priya Nair",
      room: "Room 204",
      type: "Lecture",
    },
    "01:00 - 02:00": {
      subject: "Web Technologies",
      code: "CS305",
      teacher: "Dr. Meera Joshi",
      room: "Room 203",
      type: "Lecture",
    },
  },

  Thursday: {
    "09:00 - 10:00": {
      subject: "Computer Networks",
      code: "CS304",
      teacher: "Prof. Ananya Rao",
      room: "Room 205",
      type: "Lecture",
    },
    "03:00 - 04:00": {
      subject: "Operating Systems Lab",
      code: "CS303L",
      teacher: "Dr. Vikram Singh",
      room: "Lab 202",
      type: "Lab",
    },
  },

  Friday: {
    "10:00 - 11:00": {
      subject: "Web Technologies",
      code: "CS305",
      teacher: "Dr. Meera Joshi",
      room: "Room 203",
      type: "Lecture",
    },
    "02:00 - 03:00": {
      subject: "Project Work",
      code: "PRJ401",
      teacher: "Dr. Rahul Sharma",
      room: "Innovation Lab",
      type: "Project",
    },
  },

  Saturday: {
    "09:00 - 10:00": {
      subject: "Soft Skills",
      code: "SS201",
      teacher: "Prof. Neha Kapoor",
      room: "Seminar Hall",
      type: "Activity",
    },
  },
};

const emptyEntry = {
  subject: "",
  code: "",
  teacher: "",
  room: "",
  type: "Lecture",
};

function EditTimetable() {
  const [schedule, setSchedule] =
    useState(initialSchedule);

  const [selectedDay, setSelectedDay] =
    useState("Monday");

  const [selectedSlot, setSelectedSlot] =
    useState("09:00 - 10:00");

  const [form, setForm] = useState(emptyEntry);

  const [showEditor, setShowEditor] =
    useState(false);

  const [isSaving, setIsSaving] =
    useState(false);

  const [message, setMessage] = useState("");

  const [history, setHistory] = useState([]);

  const [viewMode, setViewMode] =
    useState("grid");

  const [search, setSearch] = useState("");

  const currentEntry =
    schedule[selectedDay]?.[selectedSlot];

  const totalClasses = useMemo(() => {
    return DAYS.reduce((total, day) => {
      return (
        total +
        Object.keys(schedule[day] || {}).length
      );
    }, 0);
  }, [schedule]);

  const occupiedSlots = useMemo(() => {
    return TIME_SLOTS.filter(
      (slot) => schedule[selectedDay]?.[slot]
    ).length;
  }, [schedule, selectedDay]);

  const filteredDays = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return DAYS;

    return DAYS.filter((day) => {
      if (day.toLowerCase().includes(query)) {
        return true;
      }

      return Object.values(
        schedule[day] || {}
      ).some((entry) =>
        Object.values(entry).some((value) =>
          String(value)
            .toLowerCase()
            .includes(query)
        )
      );
    });
  }, [search, schedule]);

  const showMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const selectCell = (day, slot) => {
    setSelectedDay(day);
    setSelectedSlot(slot);

    const entry = schedule[day]?.[slot];

    setForm(entry ? { ...entry } : emptyEntry);

    setShowEditor(true);
  };

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const saveEntry = async (event) => {
    event.preventDefault();

    if (!form.subject.trim()) {
      showMessage(
        "Please enter a subject name."
      );
      return;
    }

    if (!form.teacher.trim()) {
      showMessage(
        "Please enter the teacher name."
      );
      return;
    }

    setIsSaving(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 400)
    );

    setHistory((current) => [
      ...current,
      schedule,
    ]);

    setSchedule((current) => ({
      ...current,
      [selectedDay]: {
        ...(current[selectedDay] || {}),
        [selectedSlot]: {
          ...form,
          subject: form.subject.trim(),
          code: form.code.trim(),
          teacher: form.teacher.trim(),
          room: form.room.trim(),
        },
      },
    }));

    setIsSaving(false);
    setShowEditor(false);

    showMessage(
      `${selectedDay} ${selectedSlot} updated successfully.`
    );
  };

  const deleteEntry = () => {
    if (!currentEntry) {
      setShowEditor(false);
      return;
    }

    const confirmed = window.confirm(
      "Remove this timetable entry?"
    );

    if (!confirmed) return;

    setHistory((current) => [
      ...current,
      schedule,
    ]);

    setSchedule((current) => {
      const updatedDay = {
        ...(current[selectedDay] || {}),
      };

      delete updatedDay[selectedSlot];

      return {
        ...current,
        [selectedDay]: updatedDay,
      };
    });

    setShowEditor(false);

    showMessage(
      "Timetable entry removed successfully."
    );
  };

  const undoLastChange = () => {
    if (history.length === 0) {
      showMessage("There is nothing to undo.");
      return;
    }

    const previous =
      history[history.length - 1];

    setSchedule(previous);

    setHistory((current) =>
      current.slice(0, -1)
    );

    showMessage("Last timetable change undone.");
  };

  const saveTimetable = async () => {
    setIsSaving(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    setIsSaving(false);

    showMessage(
      "Timetable saved successfully."
    );
  };

  const clearAll = () => {
    const confirmed = window.confirm(
      "Clear the entire timetable? This action can be undone once."
    );

    if (!confirmed) return;

    setHistory((current) => [
      ...current,
      schedule,
    ]);

    const cleared = {};

    DAYS.forEach((day) => {
      cleared[day] = {};
    });

    setSchedule(cleared);

    showMessage(
      "All timetable entries have been cleared."
    );
  };

  const generateSample = () => {
    setHistory((current) => [
      ...current,
      schedule,
    ]);

    setSchedule(initialSchedule);

    showMessage(
      "Sample timetable restored."
    );
  };

  const getTypeClasses = (type) => {
    switch (type) {
      case "Lab":
        return "border-purple-500/30 bg-purple-500/10 text-purple-300";

      case "Project":
        return "border-amber-500/30 bg-amber-500/10 text-amber-300";

      case "Activity":
        return "border-pink-500/30 bg-pink-500/10 text-pink-300";

      default:
        return "border-blue-500/30 bg-blue-500/10 text-blue-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <span>Timetable</span>
            <span>/</span>
            <span className="text-slate-300">
              Edit Timetable
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white">
            Edit Timetable
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Modify classes, teachers, rooms and time
            slots directly from the timetable.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={undoLastChange}
            disabled={history.length === 0}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ↶ Undo
          </button>

          <button
            type="button"
            onClick={clearAll}
            className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
          >
            Clear All
          </button>

          <button
            type="button"
            onClick={saveTimetable}
            disabled={isSaving}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60"
          >
            {isSaving
              ? "Saving..."
              : "Save Timetable"}
          </button>
        </div>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-400">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
            ✓
          </span>

          {message}
        </div>
      )}

      {/* CONTROLS */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <label className="mb-2 block text-xs font-medium text-slate-500">
              Search timetable
            </label>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search day, subject, teacher, room..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">
              View
            </label>

            <div className="flex rounded-xl border border-slate-700 bg-slate-800 p-1">
              <button
                type="button"
                onClick={() =>
                  setViewMode("grid")
                }
                className={`flex-1 rounded-lg px-3 py-2 text-sm ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-slate-400"
                }`}
              >
                Grid
              </button>

              <button
                type="button"
                onClick={() =>
                  setViewMode("list")
                }
                className={`flex-1 rounded-lg px-3 py-2 text-sm ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-slate-400"
                }`}
              >
                List
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">
              Selected Day
            </label>

            <select
              value={selectedDay}
              onChange={(event) =>
                setSelectedDay(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
            >
              {DAYS.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat
          label="Total Classes"
          value={totalClasses}
          color="blue"
        />

        <Stat
          label={`${selectedDay} Classes`}
          value={occupiedSlots}
          color="purple"
        />

        <Stat
          label="Available Slots"
          value={
            TIME_SLOTS.length -
            occupiedSlots
          }
          color="emerald"
        />

        <Stat
          label="Pending Changes"
          value={history.length}
          color="amber"
        />
      </div>

      {/* GRID */}
      {viewMode === "grid" ? (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px] border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/50">
                  <th className="w-36 px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Time
                  </th>

                  {filteredDays.map(
                    (day) => (
                      <th
                        key={day}
                        className={`min-w-[180px] px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${
                          day === selectedDay
                            ? "text-blue-400"
                            : "text-slate-500"
                        }`}
                      >
                        {day}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {TIME_SLOTS.map(
                  (slot) => (
                    <tr
                      key={slot}
                      className="border-b border-slate-800 last:border-b-0"
                    >
                      <td className="px-4 py-4 align-top">
                        <span className="text-xs font-semibold text-slate-400">
                          {slot}
                        </span>
                      </td>

                      {filteredDays.map(
                        (day) => {
                          const entry =
                            schedule[
                              day
                            ]?.[slot];

                          return (
                            <td
                              key={`${day}-${slot}`}
                              className="border-l border-slate-800 p-2 align-top"
                            >
                              {entry ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    selectCell(
                                      day,
                                      slot
                                    )
                                  }
                                  className={`group w-full rounded-xl border p-3 text-left transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-lg ${getTypeClasses(
                                    entry.type
                                  )}`}
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <p className="text-sm font-semibold text-white">
                                        {
                                          entry.subject
                                        }
                                      </p>

                                      <p className="mt-1 text-xs opacity-70">
                                        {
                                          entry.code
                                        }
                                      </p>
                                    </div>

                                    <span className="rounded-md bg-black/10 px-2 py-1 text-[10px] font-semibold">
                                      {
                                        entry.type
                                      }
                                    </span>
                                  </div>

                                  <div className="mt-3 space-y-1 text-xs opacity-80">
                                    <p>
                                      👤{" "}
                                      {
                                        entry.teacher
                                      }
                                    </p>

                                    <p>
                                      ◉{" "}
                                      {
                                        entry.room
                                      }
                                    </p>
                                  </div>

                                  <p className="mt-3 text-[10px] opacity-50">
                                    Click to edit
                                  </p>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    selectCell(
                                      day,
                                      slot
                                    )
                                  }
                                  className="flex min-h-[120px] w-full items-center justify-center rounded-xl border border-dashed border-slate-700 text-slate-600 transition hover:border-blue-500 hover:bg-blue-500/5 hover:text-blue-400"
                                >
                                  <span className="text-2xl">
                                    +
                                  </span>
                                </button>
                              )}
                            </td>
                          );
                        }
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* LIST VIEW */
        <div className="space-y-3">
          {DAYS.flatMap((day) =>
            TIME_SLOTS.map(
              (slot) => ({
                day,
                slot,
                entry:
                  schedule[day]?.[slot],
              })
            )
          )
            .filter(({ day, slot, entry }) => {
              if (!entry) return false;

              if (!search.trim()) {
                return true;
              }

              const query =
                search.toLowerCase();

              return (
                day
                  .toLowerCase()
                  .includes(query) ||
                slot
                  .toLowerCase()
                  .includes(query) ||
                Object.values(entry).some(
                  (value) =>
                    String(value)
                      .toLowerCase()
                      .includes(query)
                )
              );
            })
            .map(
              ({
                day,
                slot,
                entry,
              }) => (
                <button
                  type="button"
                  key={`${day}-${slot}`}
                  onClick={() =>
                    selectCell(day, slot)
                  }
                  className="flex w-full flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500/40 hover:bg-slate-800/60 md:flex-row md:items-center"
                >
                  <div className="w-32">
                    <p className="font-semibold text-white">
                      {day}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {slot}
                    </p>
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold text-white">
                      {entry.subject}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {entry.code}
                    </p>
                  </div>

                  <div className="text-sm text-slate-400">
                    {entry.teacher}
                  </div>

                  <div className="text-sm text-slate-500">
                    {entry.room}
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs ${getTypeClasses(
                      entry.type
                    )}`}
                  >
                    {entry.type}
                  </span>
                </button>
              )
            )}

          {DAYS.flatMap((day) =>
            TIME_SLOTS.map(
              (slot) =>
                schedule[day]?.[slot]
            )
          ).filter(Boolean).length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 px-6 py-16 text-center">
              <p className="font-semibold text-white">
                No timetable entries found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Click an empty slot in Grid view to
                create a class.
              </p>
            </div>
          )}
        </div>
      )}

      {/* QUICK ACTIONS */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="font-semibold text-white">
              Timetable Tools
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Quickly manage your timetable data.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={generateSample}
              className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800"
            >
              Restore Sample
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedDay("Monday");
                setSelectedSlot(
                  "09:00 - 10:00"
                );
                setForm(emptyEntry);
                setShowEditor(true);
              }}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              + Add Class
            </button>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {showEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {currentEntry
                    ? "Edit Class"
                    : "Add Class"}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedDay} •{" "}
                  {selectedSlot}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowEditor(false)
                }
                className="text-xl text-slate-500 hover:text-white"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={saveEntry}
              className="space-y-5 p-6"
            >
              {/* DAY / TIME */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormSelect
                  label="Day"
                  value={selectedDay}
                  options={DAYS}
                  onChange={(value) =>
                    setSelectedDay(value)
                  }
                />

                <FormSelect
                  label="Time Slot"
                  value={selectedSlot}
                  options={TIME_SLOTS}
                  onChange={(value) => {
                    setSelectedSlot(value);

                    const entry =
                      schedule[
                        selectedDay
                      ]?.[value];

                    setForm(
                      entry
                        ? { ...entry }
                        : emptyEntry
                    );
                  }}
                />
              </div>

              {/* SUBJECT */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Subject *
                </label>

                <input
                  type="text"
                  value={form.subject}
                  onChange={(event) =>
                    updateForm(
                      "subject",
                      event.target.value
                    )
                  }
                  placeholder="e.g. Data Structures"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>

              {/* CODE / TYPE */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormInput
                  label="Subject Code"
                  value={form.code}
                  placeholder="e.g. CS301"
                  onChange={(value) =>
                    updateForm(
                      "code",
                      value
                    )
                  }
                />

                <FormSelect
                  label="Class Type"
                  value={form.type}
                  options={[
                    "Lecture",
                    "Lab",
                    "Project",
                    "Activity",
                  ]}
                  onChange={(value) =>
                    updateForm(
                      "type",
                      value
                    )
                  }
                />
              </div>

              {/* TEACHER / ROOM */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormInput
                  label="Teacher *"
                  value={form.teacher}
                  placeholder="Teacher name"
                  onChange={(value) =>
                    updateForm(
                      "teacher",
                      value
                    )
                  }
                />

                <FormInput
                  label="Room"
                  value={form.room}
                  placeholder="e.g. Room 204"
                  onChange={(value) =>
                    updateForm(
                      "room",
                      value
                    )
                  }
                />
              </div>

              {/* ACTIONS */}
              <div className="flex items-center justify-between border-t border-slate-800 pt-5">
                <div>
                  {currentEntry && (
                    <button
                      type="button"
                      onClick={
                        deleteEntry
                      }
                      className="rounded-xl border border-red-500/20 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                    >
                      Delete Class
                    </button>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setShowEditor(false)
                    }
                    className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60"
                  >
                    {isSaving
                      ? "Saving..."
                      : "Save Class"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({
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
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p
        className={`mt-2 text-3xl font-bold ${colors[color]}`}
      >
        {value}
      </p>
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
      />
    </div>
  );
}

function FormSelect({
  label,
  value,
  options,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EditTimetable;
