import React, { useState } from "react";

function Students() {
  const [search, setSearch] = useState("");

  const students = [
    {
      id: "STU001",
      name: "Aarav Sharma",
      department: "Computer Science",
      year: "3rd Year",
      attendance: 94,
      status: "Active",
    },
    {
      id: "STU002",
      name: "Ananya Patel",
      department: "Information Technology",
      year: "2nd Year",
      attendance: 89,
      status: "Active",
    },
    {
      id: "STU003",
      name: "Rahul Kumar",
      department: "Electronics",
      year: "4th Year",
      attendance: 76,
      status: "Active",
    },
    {
      id: "STU004",
      name: "Priya Singh",
      department: "Computer Science",
      year: "1st Year",
      attendance: 97,
      status: "Active",
    },
  ];

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.id} ${student.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Students</h1>
          <p className="mt-1 text-slate-400">
            Manage student profiles and attendance records.
          </p>
        </div>

        <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
          + Add Student
        </button>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 p-5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-400">
                  Student
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-400">
                  Department
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-400">
                  Year
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-400">
                  Attendance
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-400">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="transition hover:bg-slate-800/40">
                  <td className="px-5 py-4">
                    <div className="font-medium text-white">
                      {student.name}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {student.id}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-300">
                    {student.department}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-300">
                    {student.year}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={
                        student.attendance >= 75
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }
                    >
                      {student.attendance}%
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Students;
