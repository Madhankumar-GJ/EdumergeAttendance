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

const DEFAULT_SUBJECTS = [
  {
    id: 1,
    code: "CS301",
    name: "Data Structures",
    teacher: "Dr. Rahul Sharma",
    type: "Lecture",
    sessions: 3,
  },
  {
    id: 2,
    code: "CS302",
    name: "Database Management",
    teacher: "Prof. Priya Nair",
    type: "Lecture",
    sessions: 3,
  },
  {
    id: 3,
    code: "CS303",
    name: "Operating Systems",
    teacher: "Dr. Vikram Singh",
    type: "Lecture",
    sessions: 3,
  },
  {
    id: 4,
    code: "CS304",
    name: "Computer Networks",
    teacher: "Prof. Ananya Rao",
    type: "Lecture",
    sessions: 3,
  },
  {
    id: 5,
    code: "CS305",
    name: "Web Technologies",
    teacher: "Dr. Meera Joshi",
    type: "Lecture",
    sessions: 2,
  },
  {
    id: 6,
    code: "CS301L",
    name: "Data Structures Lab",
    teacher: "Dr. Rahul Sharma",
    type: "Lab",
    sessions: 1,
  },
  {
    id: 7,
    code: "CS303L",
    name: "Operating Systems Lab",
    teacher: "Dr. Vikram Singh",
    type: "Lab",
    sessions: 1,
  },
];

const DEFAULT_ROOMS = [
  {
    id: 1,
    name: "Room 201",
    capacity: 60,
    type: "Classroom",
  },
  {
    id: 2,
    name: "Room 202",
    capacity: 60,
    type: "Classroom",
  },
  {
    id: 3,
    name: "Room 203",
    capacity: 50,
    type: "Classroom",
  },
  {
    id: 4,
    name: "Room 204",
    capacity: 60,
    type: "Classroom",
  },
  {
    id: 5,
    name: "Room 205",
    capacity: 50,
    type: "Classroom",
  },
  {
    id: 6,
    name: "Lab 201",
    capacity: 40,
    type: "Lab",
  },
  {
    id: 7,
    name: "Lab 202",
    capacity: 40,
    type: "Lab",
  },
];

const DEFAULT_SETTINGS = {
  workingDays: 6,
  periodsPerDay: 7,
  lunchAfterPeriod: 4,
  maxClassesPerTeacher: 4,
  avoidConsecutiveSameSubject: true,
  useSaturday: true,
  reserveFreePeriods: true,
};

function GenerateTimetable() {
  const [subjects, setSubjects] =
    useState(DEFAULT_SUBJECTS);

  const [rooms] = useState(DEFAULT_ROOMS);

  const [settings, setSettings] =
    useState(DEFAULT_SETTINGS);

  const [selectedClass, setSelectedClass] =
    useState("BCA - 3rd Year - A");

  const [semester, setSemester] =
    useState("Semester 5");

  const [academicYear, setAcademicYear] =
    useState("2026-27");

  const [generationMode, setGenerationMode] =
    useState("balanced");

  const [generatedTimetable, setGeneratedTimetable] =
    useState({});

  const [conflicts, setConflicts] =
    useState([]);

  const [isGenerating, setIsGenerating] =
    useState(false);

  const [isSaved, setIsSaved] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [showSubjects, setShowSubjects] =
    useState(false);

  const [showSettings, setShowSettings] =
    useState(false);

  const [generationProgress, setGenerationProgress] =
    useState(0);

  const showMessage = (text, duration = 3000) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, duration);
  };

  const workingDays = useMemo(() => {
    return settings.useSaturday
      ? DAYS.slice(0, settings.workingDays)
      : DAYS.slice(
          0,
          Math.min(5, settings.workingDays)
        );
  }, [settings]);

  const timeSlots = useMemo(() => {
    return TIME_SLOTS.slice(
      0,
      Math.min(
        settings.periodsPerDay,
        TIME_SLOTS.length
      )
    );
  }, [settings]);

  const totalRequiredSessions = useMemo(() => {
    return subjects.reduce(
      (total, subject) =>
        total + Number(subject.sessions || 0),
      0
    );
  }, [subjects]);

  const totalGeneratedSessions = useMemo(() => {
    return Object.values(generatedTimetable).reduce(
      (total, day) =>
        total +
        Object.values(day || {}).filter(Boolean)
          .length,
      0
    );
  }, [generatedTimetable]);

  const generationPercentage =
    totalRequiredSessions === 0
      ? 0
      : Math.min(
          100,
          Math.round(
            (totalGeneratedSessions /
              totalRequiredSessions) *
              100
          )
        );

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const generateTimetable = async () => {
    setIsGenerating(true);
    setIsSaved(false);
    setGenerationProgress(0);
    setConflicts([]);

    let progress = 10;

    setGenerationProgress(progress);

    await delay(250);

    const result = {};
    const teacherBusy = {};
    const roomBusy = {};
    const subjectDayCount = {};

    workingDays.forEach((day) => {
      result[day] = {};
    });

    let failedSessions = [];

    const shuffledSubjects =
      [...subjects].sort(() => {
        if (generationMode === "compact") {
          return 0;
        }

        return Math.random() - 0.5;
      });

    const availableSlots = [];

    workingDays.forEach((day) => {
      timeSlots.forEach((slot, index) => {
        if (
          settings.reserveFreePeriods &&
          index ===
            settings.lunchAfterPeriod - 1
        ) {
          return;
        }

        availableSlots.push({
          day,
          slot,
          index,
        });
      });
    });

    const findRoom = (subject) => {
      const preferredType =
        subject.type === "Lab"
          ? "Lab"
          : "Classroom";

      return rooms.find(
        (room) =>
          room.type === preferredType
      );
    };

    for (const subject of shuffledSubjects) {
      const requiredSessions =
        Number(subject.sessions) || 0;

      subjectDayCount[subject.code] = {};

      for (
        let session = 0;
        session < requiredSessions;
        session++
      ) {
        let candidates = [...availableSlots];

        candidates = candidates.filter(
          ({ day, slot }) => {
            if (result[day]?.[slot]) {
              return false;
            }

            const teacherKey =
              `${subject.teacher}-${day}-${slot}`;

            if (teacherBusy[teacherKey]) {
              return false;
            }

            const room = findRoom(subject);

            if (!room) {
              return false;
            }

            const roomKey =
              `${room.name}-${day}-${slot}`;

            if (roomBusy[roomKey]) {
              return false;
            }

            if (
              settings.avoidConsecutiveSameSubject
            ) {
              const slotIndex =
                timeSlots.indexOf(slot);

              const previousSlot =
                timeSlots[slotIndex - 1];

              const nextSlot =
                timeSlots[slotIndex + 1];

              if (
                previousSlot &&
                result[day]?.[previousSlot]
                  ?.code === subject.code
              ) {
                return false;
              }

              if (
                nextSlot &&
                result[day]?.[nextSlot]
                  ?.code === subject.code
              ) {
                return false;
              }
            }

            const count =
              subjectDayCount[
                subject.code
              ]?.[day] || 0;

            if (count >= 1) {
              return false;
            }

            return true;
          }
        );

        if (candidates.length === 0) {
          candidates = availableSlots.filter(
            ({ day, slot }) => {
              if (result[day]?.[slot]) {
                return false;
              }

              const teacherKey =
                `${subject.teacher}-${day}-${slot}`;

              return !teacherBusy[teacherKey];
            }
          );
        }

        if (candidates.length === 0) {
          failedSessions.push(subject);
          continue;
        }

        let selected;

        if (generationMode === "compact") {
          selected = candidates[0];
        } else {
          selected =
            candidates[
              Math.floor(
                Math.random() *
                  candidates.length
              )
            ];
        }

        const room = findRoom(subject);

        if (!room) {
          failedSessions.push(subject);
          continue;
        }

        const entry = {
          id: `${subject.code}-${selected.day}-${selected.slot}`,
          subject: subject.name,
          code: subject.code,
          teacher: subject.teacher,
          room: room.name,
          type: subject.type,
          className: selectedClass,
        };

        result[selected.day][
          selected.slot
        ] = entry;

        teacherBusy[
          `${subject.teacher}-${selected.day}-${selected.slot}`
        ] = true;

        roomBusy[
          `${room.name}-${selected.day}-${selected.slot}`
        ] = true;

        if (
          !subjectDayCount[
            subject.code
          ][selected.day]
        ) {
          subjectDayCount[
            subject.code
          ][selected.day] = 0;
        }

        subjectDayCount[
          subject.code
        ][selected.day] += 1;

        progress = Math.min(
          95,
          progress +
            Math.max(
              1,
              Math.round(
                70 /
                  Math.max(
                    1,
                    totalRequiredSessions
                  )
              )
            )
        );

        setGenerationProgress(progress);

        await delay(40);
      }
    }

    const detectedConflicts =
      detectConflicts(result);

    setGeneratedTimetable(result);
    setConflicts([
      ...detectedConflicts,
      ...failedSessions.map(
        (subject) => ({
          type: "warning",
          title:
            "Session could not be scheduled",
          description: `${subject.name} (${subject.code}) could not be placed in an available slot.`,
        })
      ),
    ]);

    setGenerationProgress(100);
    setIsGenerating(false);

    if (
      detectedConflicts.length === 0 &&
      failedSessions.length === 0
    ) {
      showMessage(
        "Timetable generated successfully without conflicts."
      );
    } else {
      showMessage(
        "Timetable generated. Please review the conflict panel."
      );
    }
  };

  const detectConflicts = (timetable) => {
    const found = [];

    const teacherSchedule = {};
    const roomSchedule = {};

    Object.entries(timetable).forEach(
      ([day, slots]) => {
        Object.entries(slots).forEach(
          ([slot, entry]) => {
            if (!entry) return;

            const teacherKey =
              `${entry.teacher}-${day}-${slot}`;

            const roomKey =
              `${entry.room}-${day}-${slot}`;

            if (
              teacherSchedule[teacherKey]
            ) {
              found.push({
                type: "error",
                title:
                  "Teacher conflict",
                description: `${entry.teacher} has multiple classes at ${day}, ${slot}.`,
              });
            }

            if (roomSchedule[roomKey]) {
              found.push({
                type: "error",
                title: "Room conflict",
                description: `${entry.room} is assigned to multiple classes at ${day}, ${slot}.`,
              });
            }

            teacherSchedule[
              teacherKey
            ] = true;

            roomSchedule[
              roomKey
            ] = true;
          }
        );
      }
    );

    return found;
  };

  const regenerate = () => {
    generateTimetable();
  };

  const saveGeneratedTimetable = () => {
    if (
      Object.keys(generatedTimetable)
        .length === 0
    ) {
      showMessage(
        "Generate a timetable before saving."
      );
      return;
    }

    const payload = {
      className: selectedClass,
      semester,
      academicYear,
      generatedAt:
        new Date().toISOString(),
      timetable: generatedTimetable,
      conflicts,
    };

    localStorage.setItem(
      "college_generated_timetable",
      JSON.stringify(payload)
    );

    setIsSaved(true);

    showMessage(
      "Timetable saved to local storage."
    );
  };

  const clearGenerated = () => {
    setGeneratedTimetable({});
    setConflicts([]);
    setIsSaved(false);
    setGenerationProgress(0);

    showMessage(
      "Generated timetable cleared."
    );
  };

  const addSubject = () => {
    const nextId =
      Math.max(
        ...subjects.map(
          (subject) => Number(subject.id)
        ),
        0
      ) + 1;

    setSubjects((current) => [
      ...current,
      {
        id: nextId,
        code: `SUB${nextId}`,
        name: "New Subject",
        teacher: "Unassigned Teacher",
        type: "Lecture",
        sessions: 2,
      },
    ]);
  };

  const updateSubject = (
    id,
    field,
    value
  ) => {
    setSubjects((current) =>
      current.map((subject) =>
        subject.id === id
          ? {
              ...subject,
              [field]:
                field === "sessions"
                  ? Number(value)
                  : value,
            }
          : subject
      )
    );
  };

  const removeSubject = (id) => {
    setSubjects((current) =>
      current.filter(
        (subject) =>
          subject.id !== id
      )
    );
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
              Generate
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white">
            Smart Timetable Generator
          </h1>

          <p className="mt-1 max-w-3xl text-sm text-slate-400">
            Generate a conflict-aware timetable
            using subjects, teachers, rooms,
            working days and institutional
            scheduling rules.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              setShowSettings(
                (current) => !current
              )
            }
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
          >
            ⚙ Settings
          </button>

          <button
            type="button"
            onClick={clearGenerated}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={saveGeneratedTimetable}
            disabled={
              Object.keys(
                generatedTimetable
              ).length === 0
            }
            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSaved
              ? "✓ Saved"
              : "Save Timetable"}
          </button>
        </div>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-5 py-4 text-sm text-blue-300">
          {message}
        </div>
      )}

      {/* CONFIGURATION */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 xl:col-span-2">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">
              Generation Configuration
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select the academic context before
              generating the timetable.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormSelect
              label="Class / Section"
              value={selectedClass}
              onChange={setSelectedClass}
              options={[
                "BCA - 3rd Year - A",
                "BCA - 3rd Year - B",
                "BCA - 2nd Year - A",
                "BCA - 2nd Year - B",
                "B.Tech CSE - 3rd Year - A",
                "B.Tech CSE - 3rd Year - B",
              ]}
            />

            <FormSelect
              label="Semester"
              value={semester}
              onChange={setSemester}
              options={[
                "Semester 1",
                "Semester 2",
                "Semester 3",
                "Semester 4",
                "Semester 5",
                "Semester 6",
                "Semester 7",
                "Semester 8",
              ]}
            />

            <FormSelect
              label="Academic Year"
              value={academicYear}
              onChange={setAcademicYear}
              options={[
                "2025-26",
                "2026-27",
                "2027-28",
              ]}
            />

            <FormSelect
              label="Generation Strategy"
              value={generationMode}
              onChange={setGenerationMode}
              options={[
                "balanced",
                "compact",
              ]}
              labels={{
                balanced:
                  "Balanced Distribution",
                compact:
                  "Compact Schedule",
              }}
            />
          </div>

          {/* GENERATE BUTTON */}
          <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="font-semibold text-white">
                  Ready to generate
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {subjects.length} subjects •{" "}
                  {totalRequiredSessions} weekly
                  sessions •{" "}
                  {workingDays.length} working days
                </p>
              </div>

              <button
                type="button"
                onClick={generateTimetable}
                disabled={isGenerating}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-wait disabled:opacity-60"
              >
                {isGenerating
                  ? "Generating..."
                  : "✨ Generate Timetable"}
              </button>
            </div>

            {isGenerating && (
              <div className="mt-5">
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-slate-500">
                    Generating schedule...
                  </span>

                  <span className="text-blue-400">
                    {generationProgress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-300"
                    style={{
                      width: `${generationProgress}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SUMMARY */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold text-white">
            Generation Summary
          </h2>

          <div className="mt-5 space-y-4">
            <SummaryItem
              label="Subjects"
              value={subjects.length}
            />

            <SummaryItem
              label="Weekly Sessions"
              value={totalRequiredSessions}
            />

            <SummaryItem
              label="Working Days"
              value={workingDays.length}
            />

            <SummaryItem
              label="Periods / Day"
              value={timeSlots.length}
            />

            <SummaryItem
              label="Rooms Available"
              value={rooms.length}
            />

            <SummaryItem
              label="Generated"
              value={`${generationPercentage}%`}
              color={
                generationPercentage ===
                100
                  ? "text-emerald-400"
                  : "text-blue-400"
              }
            />
          </div>
        </div>
      </div>

      {/* SUBJECTS */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900">
        <button
          type="button"
          onClick={() =>
            setShowSubjects(
              (current) => !current
            )
          }
          className="flex w-full items-center justify-between px-6 py-5 text-left"
        >
          <div>
            <h2 className="font-semibold text-white">
              Subjects & Teaching Load
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              These inputs are used by the
              generator.
            </p>
          </div>

          <span className="text-slate-500">
            {showSubjects ? "▲" : "▼"}
          </span>
        </button>

        {showSubjects && (
          <div className="border-t border-slate-800 p-6">
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={addSubject}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
              >
                + Add Subject
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">
                <thead>
                  <tr className="border-b border-slate-800 text-left">
                    <th className="px-3 py-3 text-xs uppercase tracking-wide text-slate-500">
                      Code
                    </th>

                    <th className="px-3 py-3 text-xs uppercase tracking-wide text-slate-500">
                      Subject
                    </th>

                    <th className="px-3 py-3 text-xs uppercase tracking-wide text-slate-500">
                      Teacher
                    </th>

                    <th className="px-3 py-3 text-xs uppercase tracking-wide text-slate-500">
                      Type
                    </th>

                    <th className="px-3 py-3 text-xs uppercase tracking-wide text-slate-500">
                      Sessions
                    </th>

                    <th />
                  </tr>
                </thead>

                <tbody>
                  {subjects.map(
                    (subject) => (
                      <tr
                        key={subject.id}
                        className="border-b border-slate-800 last:border-0"
                      >
                        <td className="px-3 py-3">
                          <input
                            value={
                              subject.code
                            }
                            onChange={(
                              event
                            ) =>
                              updateSubject(
                                subject.id,
                                "code",
                                event
                                  .target
                                  .value
                              )
                            }
                            className="w-24 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
                          />
                        </td>

                        <td className="px-3 py-3">
                          <input
                            value={
                              subject.name
                            }
                            onChange={(
                              event
                            ) =>
                              updateSubject(
                                subject.id,
                                "name",
                                event
                                  .target
                                  .value
                              )
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
                          />
                        </td>

                        <td className="px-3 py-3">
                          <input
                            value={
                              subject.teacher
                            }
                            onChange={(
                              event
                            ) =>
                              updateSubject(
                                subject.id,
                                "teacher",
                                event
                                  .target
                                  .value
                              )
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
                          />
                        </td>

                        <td className="px-3 py-3">
                          <select
                            value={
                              subject.type
                            }
                            onChange={(
                              event
                            ) =>
                              updateSubject(
                                subject.id,
                                "type",
                                event
                                  .target
                                  .value
                              )
                            }
                            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
                          >
                            <option>
                              Lecture
                            </option>

                            <option>
                              Lab
                            </option>

                            <option>
                              Project
                            </option>

                            <option>
                              Activity
                            </option>
                          </select>
                        </td>

                        <td className="px-3 py-3">
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={
                              subject.sessions
                            }
                            onChange={(
                              event
                            ) =>
                              updateSubject(
                                subject.id,
                                "sessions",
                                event
                                  .target
                                  .value
                              )
                            }
                            className="w-20 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
                          />
                        </td>

                        <td className="px-3 py-3 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              removeSubject(
                                subject.id
                              )
                            }
                            className="rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* SETTINGS */}
      {showSettings && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5">
            <h2 className="font-semibold text-white">
              Scheduling Rules
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Configure the constraints used during
              generation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <NumberSetting
              label="Working Days"
              value={settings.workingDays}
              min={5}
              max={6}
              onChange={(value) =>
                updateSetting(
                  "workingDays",
                  value
                )
              }
            />

            <NumberSetting
              label="Periods Per Day"
              value={settings.periodsPerDay}
              min={4}
              max={8}
              onChange={(value) =>
                updateSetting(
                  "periodsPerDay",
                  value
                )
              }
            />

            <NumberSetting
              label="Lunch After Period"
              value={settings.lunchAfterPeriod}
              min={2}
              max={6}
              onChange={(value) =>
                updateSetting(
                  "lunchAfterPeriod",
                  value
                )
              }
            />

            <NumberSetting
              label="Max Classes / Teacher"
              value={
                settings.maxClassesPerTeacher
              }
              min={1}
              max={8}
              onChange={(value) =>
                updateSetting(
                  "maxClassesPerTeacher",
                  value
                )
              }
            />

            <ToggleSetting
              label="Avoid consecutive subjects"
              checked={
                settings.avoidConsecutiveSameSubject
              }
              onChange={(value) =>
                updateSetting(
                  "avoidConsecutiveSameSubject",
                  value
                )
              }
            />

            <ToggleSetting
              label="Reserve free periods"
              checked={
                settings.reserveFreePeriods
              }
              onChange={(value) =>
                updateSetting(
                  "reserveFreePeriods",
                  value
                )
              }
            />

            <ToggleSetting
              label="Use Saturday"
              checked={
                settings.useSaturday
              }
              onChange={(value) =>
                updateSetting(
                  "useSaturday",
                  value
                )
              }
            />
          </div>
        </div>
      )}

      {/* GENERATED RESULT */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-800 px-6 py-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Generated Timetable
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {selectedClass} • {semester} •{" "}
              {academicYear}
            </p>
          </div>

          {Object.keys(
            generatedTimetable
          ).length > 0 && (
            <button
              type="button"
              onClick={regenerate}
              disabled={isGenerating}
              className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-2.5 text-sm font-semibold text-blue-400 hover:bg-blue-500/20"
            >
              ↻ Regenerate
            </button>
          )}
        </div>

        {Object.keys(generatedTimetable)
          .length === 0 ? (
          <div className="px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-3xl">
              📅
            </div>

            <h3 className="mt-5 font-semibold text-white">
              No timetable generated yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Configure your class, subjects and
              scheduling rules, then click Generate
              Timetable.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/30">
                  <th className="w-40 px-4 py-4 text-left text-xs uppercase tracking-wide text-slate-500">
                    Time
                  </th>

                  {workingDays.map(
                    (day) => (
                      <th
                        key={day}
                        className="px-4 py-4 text-center text-xs uppercase tracking-wide text-slate-500"
                      >
                        {day}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {timeSlots.map(
                  (slot, index) => {
                    const isLunch =
                      settings.reserveFreePeriods &&
                      index ===
                        settings.lunchAfterPeriod -
                          1;

                    return (
                      <tr
                        key={slot}
                        className="border-b border-slate-800 last:border-0"
                      >
                        <td className="px-4 py-4 text-xs font-medium text-slate-500">
                          {slot}
                        </td>

                        {workingDays.map(
                          (day) => {
                            if (
                              isLunch
                            ) {
                              return (
                                <td
                                  key={`${day}-${slot}`}
                                  className="border-l border-slate-800 bg-amber-500/[0.03] px-4 py-4 text-center"
                                >
                                  <span className="text-xs font-medium text-amber-500/60">
                                    Lunch
                                  </span>
                                </td>
                              );
                            }

                            const entry =
                              generatedTimetable[
                                day
                              ]?.[
                                slot
                              ];

                            return (
                              <td
                                key={`${day}-${slot}`}
                                className="border-l border-slate-800 p-2 align-top"
                              >
                                {entry ? (
                                  <div
                                    className={`rounded-xl border p-3 ${
                                      entry.type ===
                                      "Lab"
                                        ? "border-purple-500/20 bg-purple-500/10"
                                        : "border-blue-500/20 bg-blue-500/10"
                                    }`}
                                  >
                                    <p className="text-sm font-semibold text-white">
                                      {
                                        entry.subject
                                      }
                                    </p>

                                    <p className="mt-1 text-[11px] text-slate-500">
                                      {
                                        entry.code
                                      }
                                    </p>

                                    <div className="mt-3 space-y-1 text-xs text-slate-400">
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

                                    <span className="mt-3 inline-block rounded-full bg-slate-900/50 px-2 py-1 text-[10px] text-slate-400">
                                      {
                                        entry.type
                                      }
                                    </span>
                                  </div>
                                ) : (
                                  <div className="flex min-h-[100px] items-center justify-center rounded-xl border border-dashed border-slate-800">
                                    <span className="text-xs text-slate-700">
                                      Free
                                    </span>
                                  </div>
                                )}
                              </td>
                            );
                          }
                        )}
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CONFLICTS */}
      {Object.keys(
        generatedTimetable
      ).length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">
                Validation & Conflicts
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Automatic validation of the generated
                schedule.
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                conflicts.length === 0
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-amber-500/10 text-amber-400"
              }`}
            >
              {conflicts.length === 0
                ? "No Conflicts"
                : `${conflicts.length} Issue${
                    conflicts.length ===
                    1
                      ? ""
                      : "s"
                  }`}
            </span>
          </div>

          {conflicts.length === 0 ? (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <div className="flex gap-4">
                <span className="text-xl text-emerald-400">
                  ✓
                </span>

                <div>
                  <p className="font-semibold text-emerald-300">
                    Timetable passed validation
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    No teacher or room conflicts
                    were detected.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {conflicts.map(
                (conflict, index) => (
                  <div
                    key={`${conflict.title}-${index}`}
                    className={`rounded-xl border p-4 ${
                      conflict.type ===
                      "error"
                        ? "border-red-500/20 bg-red-500/5"
                        : "border-amber-500/20 bg-amber-500/5"
                    }`}
                  >
                    <p
                      className={`font-medium ${
                        conflict.type ===
                        "error"
                          ? "text-red-400"
                          : "text-amber-400"
                      }`}
                    >
                      {conflict.title}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {
                        conflict.description
                      }
                    </p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* --------------------------------
   HELPER COMPONENTS
-------------------------------- */

function FormSelect({
  label,
  value,
  onChange,
  options,
  labels = {},
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
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {labels[option] || option}
          </option>
        ))}
      </select>
    </div>
  );
}

function SummaryItem({
  label,
  value,
  color = "text-white",
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-4 last:border-0 last:pb-0">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span
        className={`text-lg font-bold ${color}`}
      >
        {value}
      </span>
    </div>
  );
}

function NumberSetting({
  label,
  value,
  min,
  max,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) =>
          onChange(
            Math.max(
              min,
              Math.min(
                max,
                Number(event.target.value)
              )
            )
          )
        }
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
      />
    </div>
  );
}

function ToggleSetting({
  label,
  checked,
  onChange,
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-800 bg-slate-800/30 p-4">
      <span className="text-sm text-slate-300">
        {label}
      </span>

      <button
        type="button"
        onClick={() =>
          onChange(!checked)
        }
        className={`relative h-6 w-11 rounded-full transition ${
          checked
            ? "bg-blue-600"
            : "bg-slate-700"
        }`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>
    </label>
  );
}

function delay(ms) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}

export default GenerateTimetable;
