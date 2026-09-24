import React, { useState } from "react";

const initialYears = [
  {
    id: 1,
    name: "2026-27",
    startDate: "2026-06-01",
    endDate: "2027-05-31",
    status: "Active",
  },
  {
    id: 2,
    name: "2025-26",
    startDate: "2025-06-01",
    endDate: "2026-05-31",
    status: "Completed",
  },
  {
    id: 3,
    name: "2024-25",
    startDate: "2024-06-01",
    endDate: "2025-05-31",
    status: "Completed",
  },
];

function AcademicYears() {
  const [years, setYears] = useState(initialYears);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name || !form.startDate || !form.endDate) {
      return;
    }

    const newYear = {
      id: Date.now(),
      name: form.name,
      startDate: form.startDate,
      endDate: form.endDate,
      status: "Upcoming",
    };

    setYears((current) => [newYear, ...current]);

    setForm({
      name: "",
      startDate: "",
      endDate: "",
    });

    setShowModal(false);
  };

  const setActiveYear = (id) => {
    setYears((current) =>
      current.map((year) => ({
        ...year,
        status: year.id === id ? "Active" : "Completed",
      }))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Academic Years
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Configure academic sessions used across attendance,
            timetable and reports.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          + Add Academic Year
        </button>
      </div>

      {/* Current academic year */}
      {years
        .filter((year) => year.status === "Active")
        .map((year) => (
          <div
            key={year.id}
            className="rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 to-cyan-500/5 p-6"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                    ACTIVE
                  </span>

                  <span className="text-sm text-slate-400">
                    Current Academic Year
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-bold text-white">
                  {year.name}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {year.startDate} → {year.endDate}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-5 py-4">
                <p className="text-xs text-slate-500">
                  System Status
                </p>

                <p className="mt-1 text-sm font-semibold text-emerald-400">
                  All modules synchronized
                </p>
              </div>
            </div>
          </div>
        ))}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-6 py-5">
          <h2 className="font-semibold text-white">
            Academic Sessions
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Manage sessions available to the college.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Academic Year
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Start Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  End Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {years.map((year) => (
                <tr
                  key={year.id}
                  className="transition hover:bg-slate-800/30"
                >
                  <td className="px-6 py-4">
                    <span className="font-medium text-white">
                      {year.name}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-300">
                    {year.startDate}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-300">
                    {year.endDate}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        year.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : year.status === "Upcoming"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {year.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    {year.status !== "Active" && (
                      <button
                        type="button"
                        onClick={() => setActiveYear(year.id)}
                        className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
                      >
                        Set Active
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Academic Year Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Add Academic Year
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Create a new academic session.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-xl text-slate-500 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Academic Year
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="2027-28"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    End Date
                  </label>

                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Create Academic Year
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AcademicYears;
