import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_CONFLICTS = [
  {
    id: 1,
    type: "Teacher Conflict",
    severity: "High",
    day: "Monday",
    period: "2",
    time: "10:00 - 11:00",
    teacher: "Dr. Priya Sharma",
    room: "Room 201",
    classA: "CSE - III A",
    classB: "CSE - III B",
    subjectA: "Algorithms",
    subjectB: "Data Structures",
    status: "Open",
  },
  {
    id: 2,
    type: "Room Conflict",
    severity: "High",
    day: "Tuesday",
    period: "3",
    time: "11:15 - 12:15",
    teacher: "Prof. Neha Verma",
    room: "Lab 102",
    classA: "CSE - III A",
    classB: "IT - III A",
    subjectA: "Web Technologies",
    subjectB: "Web Technologies",
    status: "Open",
  },
  {
    id: 3,
    type: "Teacher Conflict",
    severity: "Medium",
    day: "Wednesday",
    period: "5",
    time: "02:00 - 03:00",
    teacher: "Dr. Rajesh Kumar",
    room: "Room 205",
    classA: "CSE - III A",
    classB: "ECE - III A",
    subjectA: "Operating Systems",
    subjectB: "Computer Architecture",
    status: "Open",
  },
  {
    id: 4,
    type: "Room Conflict",
    severity: "Medium",
    day: "Thursday",
    period: "1",
    time: "09:00 - 10:00",
    teacher: "Dr. Priya Sharma",
    room: "Lab 301",
    classA: "CSE - III A",
    classB: "CSE - II A",
    subjectA: "Data Structures",
    subjectB: "Programming Lab",
    status: "Resolved",
  },
];

function TimetableConflicts() {
  const navigate = useNavigate();

  const [conflicts, setConflicts] =
    useState(INITIAL_CONFLICTS);

  const [severityFilter, setSeverityFilter] =
    useState("All");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [selectedConflict, setSelectedConflict] =
    useState(null);

  const [toast, setToast] =
    useState("");

  const showToast = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const filteredConflicts = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return conflicts.filter((conflict) => {
      const severityMatch =
        severityFilter === "All" ||
        conflict.severity === severityFilter;

      const typeMatch =
        typeFilter === "All" ||
        conflict.type === typeFilter;

      const statusMatch =
        statusFilter === "All" ||
        conflict.status === statusFilter;

      const searchMatch =
        !query ||
        [
          conflict.type,
          conflict.teacher,
          conflict.room,
          conflict.classA,
          conflict.classB,
          conflict.subjectA,
          conflict.subjectB,
          conflict.day,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return (
        severityMatch &&
        typeMatch &&
        statusMatch &&
        searchMatch
      );
    });
  }, [
    conflicts,
    severityFilter,
    typeFilter,
    statusFilter,
    search,
  ]);

  const highCount = conflicts.filter(
    (item) =>
      item.severity === "High" &&
      item.status === "Open"
  ).length;

  const mediumCount = conflicts.filter(
    (item) =>
      item.severity === "Medium" &&
      item.status === "Open"
  ).length;

  const openCount = conflicts.filter(
    (item) =>
      item.status === "Open"
  ).length;

  const resolvedCount = conflicts.filter(
    (item) =>
      item.status === "Resolved"
  ).length;

  const resolveConflict = (id) => {
    setConflicts((previous) =>
      previous.map((conflict) =>
        conflict.id === id
          ? {
              ...conflict,
              status: "Resolved",
            }
          : conflict
      )
    );

    setSelectedConflict(null);

    showToast(
      "Conflict marked as resolved."
    );
  };

  const reopenConflict = (id) => {
    setConflicts((previous) =>
      previous.map((conflict) =>
        conflict.id === id
          ? {
              ...conflict,
              status: "Open",
            }
          : conflict
      )
    );

    setSelectedConflict(null);

    showToast(
      "Conflict reopened."
    );
  };

  const deleteConflict = (id) => {
    const confirmed =
      window.confirm(
        "Remove this conflict record?"
      );

    if (!confirmed) return;

    setConflicts((previous) =>
      previous.filter(
        (conflict) =>
          conflict.id !== id
      )
    );

    setSelectedConflict(null);

    showToast(
      "Conflict record removed."
    );
  };

  const resolveAll = () => {
    const openConflicts =
      conflicts.filter(
        (item) =>
          item.status === "Open"
      );

    if (openConflicts.length === 0) {
      showToast(
        "There are no open conflicts."
      );
      return;
    }

    const confirmed =
      window.confirm(
        `Mark ${openConflicts.length} open conflict(s) as resolved?`
      );

    if (!confirmed) return;

    setConflicts((previous) =>
      previous.map((conflict) => ({
        ...conflict,
        status: "Resolved",
      }))
    );

    showToast(
      "All open conflicts resolved."
    );
  };

  const runConflictScan = () => {
    showToast(
      "Conflict scan completed. 4 records checked."
    );
  };

  const exportConflicts = () => {
    const headers = [
      "Type",
      "Severity",
      "Day",
      "Period",
      "Time",
      "Teacher",
      "Room",
      "Class A",
      "Class B",
      "Subject A",
      "Subject B",
      "Status",
    ];

    const rows = conflicts.map(
      (conflict) => [
        conflict.type,
        conflict.severity,
        conflict.day,
        conflict.period,
        conflict.time,
        conflict.teacher,
        conflict.room,
        conflict.classA,
        conflict.classB,
        conflict.subjectA,
        conflict.subjectB,
        conflict.status,
      ]
    );

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map(
            (value) =>
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
      "timetable-conflicts.csv";

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

    showToast(
      "Conflict report exported."
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
            Timetable / Validation
          </p>

          <h1 className="mt-1 text-2xl font-bold text-white">
            Timetable Conflicts
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            Detect and resolve teacher, room and
            scheduling conflicts.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={exportConflicts}
            className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-[10px] font-semibold text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            ↓ Export
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/timetable")
            }
            className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-[10px] font-semibold text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            ← Timetable
          </button>

          <button
            type="button"
            onClick={runConflictScan}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-[10px] font-semibold text-white transition hover:bg-blue-500"
          >
            Scan Timetable
          </button>
        </div>
      </div>

      {/* SUMMARY */}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <ConflictStat
          label="Open Conflicts"
          value={openCount}
          color="red"
        />

        <ConflictStat
          label="High Severity"
          value={highCount}
          color="orange"
        />

        <ConflictStat
          label="Medium Severity"
          value={mediumCount}
          color="amber"
        />

        <ConflictStat
          label="Resolved"
          value={resolvedCount}
          color="emerald"
        />
      </div>

      {/* FILTERS */}

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_180px]">
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
                placeholder="Search teacher, room, class, subject..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-9 pr-3 text-xs text-slate-300 outline-none placeholder:text-slate-700 focus:border-blue-500/50"
              />
            </div>
          </div>

          <FilterSelect
            label="Severity"
            value={severityFilter}
            onChange={setSeverityFilter}
            options={[
              "All",
              "High",
              "Medium",
              "Low",
            ]}
          />

          <FilterSelect
            label="Conflict Type"
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              "All",
              "Teacher Conflict",
              "Room Conflict",
            ]}
          />

          <FilterSelect
            label="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              "All",
              "Open",
              "Resolved",
            ]}
          />
        </div>
      </section>

      {/* WARNING */}

      {highCount > 0 && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
            !
          </div>

          <div>
            <p className="text-[10px] font-bold text-red-400">
              Immediate attention required
            </p>

            <p className="mt-1 text-[9px] leading-4 text-red-400/60">
              There are {highCount} high-severity
              open conflict
              {highCount === 1 ? "" : "s"} in
              the current timetable.
            </p>
          </div>
        </div>
      )}

      {/* ACTION BAR */}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[9px] text-slate-600">
          Showing{" "}
          <span className="font-bold text-slate-400">
            {filteredConflicts.length}
          </span>{" "}
          of{" "}
          <span className="font-bold text-slate-400">
            {conflicts.length}
          </span>{" "}
          conflict records
        </p>

        <button
          type="button"
          onClick={resolveAll}
          disabled={openCount === 0}
          className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-2.5 text-[9px] font-semibold text-emerald-400 transition hover:bg-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ✓ Resolve All Open
        </button>
      </div>

      {/* CONFLICT TABLE */}

      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/30">
                <TableHeader>
                  Conflict
                </TableHeader>

                <TableHeader>
                  Schedule
                </TableHeader>

                <TableHeader>
                  Teacher / Room
                </TableHeader>

                <TableHeader>
                  Classes
                </TableHeader>

                <TableHeader>
                  Severity
                </TableHeader>

                <TableHeader>
                  Status
                </TableHeader>

                <TableHeader>
                  Action
                </TableHeader>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {filteredConflicts.length ===
              0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="p-12 text-center"
                  >
                    <div className="text-3xl">
                      ✓
                    </div>

                    <p className="mt-3 text-xs font-semibold text-slate-400">
                      No conflicts found
                    </p>

                    <p className="mt-1 text-[9px] text-slate-700">
                      Try changing the filters
                      or search query.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredConflicts.map(
                  (conflict) => (
                    <ConflictRow
                      key={conflict.id}
                      conflict={conflict}
                      onView={() =>
                        setSelectedConflict(
                          conflict
                        )
                      }
                    />
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* INFORMATION CARDS */}

      <div className="grid gap-4 lg:grid-cols-3">
        <InfoCard
          icon="👨‍🏫"
          title="Teacher Conflicts"
          text="A faculty member is assigned to two classes during the same period."
        />

        <InfoCard
          icon="🏫"
          title="Room Conflicts"
          text="The same room or laboratory is allocated to multiple classes at the same time."
        />

        <InfoCard
          icon="⏱"
          title="Schedule Conflicts"
          text="Periods, breaks or class constraints overlap with another timetable requirement."
        />
      </div>

      {/* DETAILS MODAL */}

      {selectedConflict && (
        <ConflictDetailsModal
          conflict={selectedConflict}
          onClose={() =>
            setSelectedConflict(null)
          }
          onResolve={() =>
            resolveConflict(
              selectedConflict.id
            )
          }
          onReopen={() =>
            reopenConflict(
              selectedConflict.id
            )
          }
          onDelete={() =>
            deleteConflict(
              selectedConflict.id
            )
          }
        />
      )}
    </div>
  );
}

/* =========================================
   CONFLICT STAT
========================================= */

function ConflictStat({
  label,
  value,
  color,
}) {
  const colors = {
    red: "text-red-400",
    orange: "text-orange-400",
    amber: "text-amber-400",
    emerald: "text-emerald-400",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <p className="text-[8px] font-semibold uppercase tracking-wider text-slate-700">
        {label}
      </p>

      <p
        className={`mt-2 text-2xl font-bold ${colors[color]}`}
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================
   FILTER SELECT
========================================= */

function FilterSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <label>
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
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

/* =========================================
   TABLE HEADER
========================================= */

function TableHeader({
  children,
}) {
  return (
    <th className="px-4 py-3 text-left text-[8px] font-semibold uppercase tracking-wider text-slate-700">
      {children}
    </th>
  );
}

/* =========================================
   CONFLICT ROW
========================================= */

function ConflictRow({
  conflict,
  onView,
}) {
  return (
    <tr className="transition hover:bg-slate-800/20">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              conflict.type ===
              "Teacher Conflict"
                ? "bg-purple-500/10 text-purple-400"
                : "bg-blue-500/10 text-blue-400"
            }`}
          >
            {conflict.type ===
            "Teacher Conflict"
              ? "👤"
              : "⌂"}
          </div>

          <div>
            <p className="text-[10px] font-semibold text-slate-300">
              {conflict.type}
            </p>

            <p className="mt-1 text-[8px] text-slate-700">
              Conflict #{conflict.id}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-4">
        <p className="text-[9px] font-semibold text-slate-400">
          {conflict.day}
        </p>

        <p className="mt-1 text-[8px] text-slate-700">
          Period {conflict.period} •{" "}
          {conflict.time}
        </p>
      </td>

      <td className="px-4 py-4">
        <p className="text-[9px] text-slate-400">
          {conflict.teacher}
        </p>

        <p className="mt-1 text-[8px] text-slate-700">
          {conflict.room}
        </p>
      </td>

      <td className="px-4 py-4">
        <div className="space-y-1">
          <p className="text-[8px] text-slate-500">
            {conflict.classA}
          </p>

          <p className="text-[8px] text-slate-700">
            ↕ {conflict.classB}
          </p>
        </div>
      </td>

      <td className="px-4 py-4">
        <SeverityBadge
          severity={
            conflict.severity
          }
        />
      </td>

      <td className="px-4 py-4">
        <StatusBadge
          status={conflict.status}
        />
      </td>

      <td className="px-4 py-4">
        <button
          type="button"
          onClick={onView}
          className="rounded-lg border border-slate-800 px-3 py-2 text-[8px] font-semibold text-slate-500 transition hover:bg-slate-800 hover:text-white"
        >
          View
        </button>
      </td>
    </tr>
  );
}

/* =========================================
   SEVERITY BADGE
========================================= */

function SeverityBadge({
  severity,
}) {
  const styles = {
    High: "bg-red-500/10 text-red-400 border-red-500/20",
    Medium:
      "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Low: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[8px] font-semibold ${
        styles[severity]
      }`}
    >
      {severity}
    </span>
  );
}

/* =========================================
   STATUS BADGE
========================================= */

function StatusBadge({
  status,
}) {
  const isResolved =
    status === "Resolved";

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[8px] font-semibold ${
        isResolved
          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
          : "border-red-500/20 bg-red-500/10 text-red-400"
      }`}
    >
      {status}
    </span>
  );
}

/* =========================================
   INFO CARD
========================================= */

function InfoCard({
  icon,
  title,
  text,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm">
        {icon}
      </div>

      <h3 className="mt-4 text-[10px] font-bold text-slate-300">
        {title}
      </h3>

      <p className="mt-2 text-[9px] leading-5 text-slate-700">
        {text}
      </p>
    </div>
  );
}

/* =========================================
   DETAILS MODAL
========================================= */

function ConflictDetailsModal({
  conflict,
  onClose,
  onResolve,
  onReopen,
  onDelete,
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
        {/* MODAL HEADER */}

        <div className="flex items-start justify-between border-b border-slate-800 p-5">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                conflict.severity ===
                "High"
                  ? "bg-red-500/10 text-red-400"
                  : "bg-amber-500/10 text-amber-400"
              }`}
            >
              ⚠
            </div>

            <div>
              <p className="text-[8px] uppercase tracking-wider text-slate-700">
                Conflict #
                {conflict.id}
              </p>

              <h2 className="mt-1 text-lg font-bold text-white">
                {conflict.type}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-600 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* DETAILS */}

        <div className="grid gap-3 p-5 sm:grid-cols-2">
          <DetailItem
            label="Day"
            value={conflict.day}
          />

          <DetailItem
            label="Period"
            value={`Period ${conflict.period}`}
          />

          <DetailItem
            label="Time"
            value={conflict.time}
          />

          <DetailItem
            label="Severity"
            value={conflict.severity}
          />

          <DetailItem
            label="Teacher"
            value={conflict.teacher}
          />

          <DetailItem
            label="Room"
            value={conflict.room}
          />

          <DetailItem
            label="First Class"
            value={`${conflict.classA} — ${conflict.subjectA}`}
          />

          <DetailItem
            label="Second Class"
            value={`${conflict.classB} — ${conflict.subjectB}`}
          />
        </div>

        {/* EXPLANATION */}

        <div className="mx-5 rounded-xl border border-red-500/10 bg-red-500/5 p-4">
          <p className="text-[9px] font-bold text-red-400">
            Conflict Explanation
          </p>

          <p className="mt-2 text-[9px] leading-5 text-red-400/60">
            {conflict.type ===
            "Teacher Conflict"
              ? `${conflict.teacher} is assigned to ${conflict.classA} and ${conflict.classB} during the same academic period. One of the assignments should be moved to another available period or faculty member.`
              : `${conflict.room} is allocated to ${conflict.classA} and ${conflict.classB} during the same period. One class should be moved to another available room or time slot.`}
          </p>
        </div>

        {/* ACTIONS */}

        <div className="flex flex-wrap justify-end gap-2 border-t border-slate-800 p-5">
          <button
            type="button"
            onClick={onDelete}
            className="mr-auto rounded-xl border border-red-500/20 px-4 py-2.5 text-[9px] font-semibold text-red-400 hover:bg-red-500/5"
          >
            Delete
          </button>

          {conflict.status ===
          "Open" ? (
            <button
              type="button"
              onClick={onResolve}
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-[9px] font-semibold text-white hover:bg-emerald-500"
            >
              ✓ Mark Resolved
            </button>
          ) : (
            <button
              type="button"
              onClick={onReopen}
              className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-2.5 text-[9px] font-semibold text-amber-400 hover:bg-amber-500/10"
            >
              Reopen Conflict
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-5 py-2.5 text-[9px] font-semibold text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   DETAIL ITEM
========================================= */

function DetailItem({
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-950/50 p-3">
      <p className="text-[8px] font-semibold uppercase tracking-wider text-slate-700">
        {label}
      </p>

      <p className="mt-1 text-[10px] font-semibold text-slate-400">
        {value}
      </p>
    </div>
  );
}

export default TimetableConflicts;
