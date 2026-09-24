import React, { useMemo, useState } from "react";

const initialHistory = [
  {
    id: 1,
    date: "2026-09-24",
    className: "CSE - A",
    subject: "Data Structures",
    teacher: "Dr. Ananya Sharma",
    present: 42,
    absent: 4,
    late: 2,
    total: 48,
    status: "Completed",
  },
  {
    id: 2,
    date: "2026-09-24",
    className: "CSE - B",
    subject: "Database Management",
    teacher: "Prof. Rahul Mehta",
    present: 39,
    absent: 5,
    late: 1,
    total: 45,
    status: "Completed",
  },
  {
    id: 3,
    date: "2026-09-23",
    className: "IT - A",
    subject: "Operating Systems",
    teacher: "Dr. Priya Nair",
    present: 36,
    absent: 5,
    late: 1,
    total: 42,
    status: "Completed",
  },
  {
    id: 4,
    date: "2026-09-23",
    className: "ECE - A",
    subject: "Digital Electronics",
    teacher: "Prof. Vikram Singh",
    present: 40,
    absent: 3,
    late: 1,
    total: 44,
    status: "Completed",
  },
  {
    id: 5,
    date: "2026-09-22",
    className: "CSE - A",
    subject: "Computer Networks",
    teacher: "Dr. Ananya Sharma",
    present: 44,
    absent: 3,
    late: 1,
    total: 48,
    status: "Completed",
  },
  {
    id: 6,
    date: "2026-09-22",
    className: "ME - A",
    subject: "Thermodynamics",
    teacher: "Prof. Arjun Rao",
    present: 31,
    absent: 6,
    late: 2,
    total: 39,
    status: "Completed",
  },
];

const getPercentage = (present, total) => {
  if (!total) return 0;
  return Math.round((present / total) * 100);
};

const getPercentageColor = (percentage) => {
  if (percentage >= 90) return "text-emerald-400";
  if (percentage >= 75) return "text-amber-400";
  return "text-red-400";
};

function AttendanceHistory() {
  const [history, setHistory] = useState(initialHistory);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const classNames = useMemo(() => {
    return [...new Set(history.map((item) => item.className))];
  }, [history]);

  const filteredHistory = useMemo(() => {
    const query = search.trim().toLowerCase();

    return history.filter((record) => {
      const matchesSearch =
        !query ||
        record.className.toLowerCase().includes(query) ||
        record.subject.toLowerCase().includes(query) ||
        record.teacher.toLowerCase().includes(query);

      const matchesDate =
        !dateFilter || record.date === dateFilter;

      const matchesClass =
        classFilter === "all" ||
        record.className === classFilter;

      return matchesSearch && matchesDate && matchesClass;
    });
  }, [history, search, dateFilter, classFilter]);

  const statistics = useMemo(() => {
    const total = filteredHistory.reduce(
      (sum, record) => sum + record.total,
      0
    );

    const present = filteredHistory.reduce(
      (sum, record) => sum + record.present,
      0
    );

    const absent = filteredHistory.reduce(
      (sum, record) => sum + record.absent,
      0
    );

    const late = filteredHistory.reduce(
      (sum, record) => sum + record.late,
      0
    );

    return {
      total,
      present,
      absent,
      late,
      attendance: getPercentage(present, total),
    };
  }, [filteredHistory]);

  const clearFilters = () => {
    setSearch("");
    setDateFilter("");
    setClassFilter("all");
  };

  const deleteRecord = (id) => {
    setHistory((current) =>
      current.filter((record) => record.id !== id)
    );

    setSelectedRecord(null);
  };

  const resetHistory = () => {
    setHistory(initialHistory);
    clearFilters();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Attendance History
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            View, filter and inspect previously recorded attendance
            sessions.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={resetHistory}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Reset Demo Data
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Export / Print
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">Sessions</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {filteredHistory.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">Students</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {statistics.total}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">Present</p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {statistics.present}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">Absent</p>
          <p className="mt-2 text-3xl font-bold text-red-400">
            {statistics.absent}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Attendance Rate
          </p>
          <p
            className={`mt-2 text-3xl font-bold ${getPercentageColor(
              statistics.attendance
            )}`}
          >
            {statistics.attendance}%
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">
              Search
            </label>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search class, subject or teacher..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">
              Date
            </label>

            <input
              type="date"
              value={dateFilter}
              onChange={(event) =>
                setDateFilter(event.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">
              Class
            </label>

            <select
              value={classFilter}
              onChange={(event) =>
                setClassFilter(event.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
            >
              <option value="all">All Classes</option>

              {classNames.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={clearFilters}
              className="w-full rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* History table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div>
            <h2 className="font-semibold text-white">
              Recorded Sessions
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {filteredHistory.length} session
              {filteredHistory.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-500">
              Attendance records
            </span>
          </div>
        </div>

        {filteredHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-slate-800/40">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Class
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Subject
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Teacher
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Present
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Absent
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Late
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Rate
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {filteredHistory.map((record) => {
                  const percentage = getPercentage(
                    record.present,
                    record.total
                  );

                  return (
                    <tr
                      key={record.id}
                      className="transition hover:bg-slate-800/30"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-300">
                          {record.date}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-lg bg-blue-500/10 px-2.5 py-1.5 text-xs font-semibold text-blue-400">
                          {record.className}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-white">
                          {record.subject}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-400">
                          {record.teacher}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-emerald-400">
                          {record.present}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-red-400">
                          {record.absent}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-amber-400">
                          {record.late}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`font-bold ${getPercentageColor(
                            percentage
                          )}`}
                        >
                          {percentage}%
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedRecord(record)
                          }
                          className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-2xl text-slate-500">
              ◌
            </div>

            <h3 className="mt-4 font-semibold text-white">
              No attendance records found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Change your filters or clear the search.
            </p>
          </div>
        )}
      </div>

      {/* Record details modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Attendance Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedRecord.date}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="text-xl text-slate-500 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-800/70 p-4">
                  <p className="text-xs text-slate-500">
                    Class
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    {selectedRecord.className}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-800/70 p-4">
                  <p className="text-xs text-slate-500">
                    Subject
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    {selectedRecord.subject}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-800/70 p-4">
                <p className="text-xs text-slate-500">
                  Teacher
                </p>
                <p className="mt-1 font-semibold text-white">
                  {selectedRecord.teacher}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl bg-emerald-500/10 p-4 text-center">
                  <p className="text-2xl font-bold text-emerald-400">
                    {selectedRecord.present}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Present
                  </p>
                </div>

                <div className="rounded-xl bg-red-500/10 p-4 text-center">
                  <p className="text-2xl font-bold text-red-400">
                    {selectedRecord.absent}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Absent
                  </p>
                </div>

                <div className="rounded-xl bg-amber-500/10 p-4 text-center">
                  <p className="text-2xl font-bold text-amber-400">
                    {selectedRecord.late}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Late
                  </p>
                </div>

                <div className="rounded-xl bg-blue-500/10 p-4 text-center">
                  <p className="text-2xl font-bold text-blue-400">
                    {getPercentage(
                      selectedRecord.present,
                      selectedRecord.total
                    )}
                    %
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Rate
                  </p>
                </div>
              </div>

              <div className="flex justify-between gap-3 border-t border-slate-800 pt-5">
                <button
                  type="button"
                  onClick={() =>
                    deleteRecord(selectedRecord.id)
                  }
                  className="rounded-xl border border-red-500/20 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                >
                  Delete Record
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRecord(null)}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttendanceHistory;
