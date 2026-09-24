import {
  Activity,
  CalendarDays,
  GraduationCap,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "2,846",
    change: "+4.2%",
    icon: GraduationCap,
    color: "indigo",
  },
  {
    title: "Faculty",
    value: "184",
    change: "+3 this month",
    icon: Users,
    color: "emerald",
  },
  {
    title: "Today's Attendance",
    value: "87.4%",
    change: "+2.1%",
    icon: Activity,
    color: "blue",
  },
  {
    title: "Classes Today",
    value: "126",
    change: "8 currently active",
    icon: CalendarDays,
    color: "violet",
  },
];

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm text-slate-500">
              Thursday, September 24, 2026
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Good morning, Administrator
            </h1>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
            AD
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {stat.value}
                    </p>

                    <p className="mt-2 text-xs font-medium text-emerald-600">
                      {stat.change}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon size={21} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 xl:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Attendance Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Current semester attendance trend
                </p>
              </div>

              <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This semester</option>
              </select>
            </div>

            <div className="mt-8 flex h-64 items-end gap-2">
              {[62, 68, 65, 72, 75, 71, 78, 74, 82, 80, 84, 87].map(
                (height, index) => (
                  <div
                    key={index}
                    className="group flex h-full flex-1 items-end"
                  >
                    <div
                      className="w-full rounded-t-lg bg-indigo-500 transition-all duration-500 group-hover:bg-indigo-600"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                )
              )}
            </div>

            <div className="mt-4 flex justify-between text-xs text-slate-400">
              <span>Week 1</span>
              <span>Week 4</span>
              <span>Week 8</span>
              <span>Week 12</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-semibold text-slate-900">
              Attendance Alerts
            </h2>

            <div className="mt-5 space-y-4">
              <div className="rounded-xl bg-red-50 p-4">
                <p className="font-semibold text-red-700">
                  Critical shortage
                </p>

                <p className="mt-1 text-sm text-red-600">
                  12 students below 65%
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 p-4">
                <p className="font-semibold text-amber-700">
                  Attendance warning
                </p>

                <p className="mt-1 text-sm text-amber-600">
                  38 students below 75%
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="font-semibold text-emerald-700">
                  Normal
                </p>

                <p className="mt-1 text-sm text-emerald-600">
                  2,796 students within requirement
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Today's Schedule
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current academic timetable
              </p>
            </div>

            <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">
              View timetable
            </button>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-sm text-slate-500">
                  <th className="px-3 py-3">Time</th>
                  <th className="px-3 py-3">Subject</th>
                  <th className="px-3 py-3">Class</th>
                  <th className="px-3 py-3">Faculty</th>
                  <th className="px-3 py-3">Room</th>
                </tr>
              </thead>

              <tbody>
                {[
                  ["09:00 - 10:00", "Database Systems", "CSE 3A", "Dr. Sharma", "LH-201"],
                  ["10:00 - 11:00", "Operating Systems", "CSE 3B", "Prof. Rao", "LH-105"],
                  ["11:30 - 12:30", "Computer Networks", "CSE 3A", "Dr. Kumar", "LH-201"],
                  ["14:00 - 15:00", "Mathematics", "CSE 2A", "Dr. Patel", "LH-102"],
                ].map((row) => (
                  <tr
                    key={row[0] + row[1]}
                    className="border-b border-slate-50 hover:bg-slate-50"
                  >
                    {row.map((cell) => (
                      <td
                        key={cell}
                        className="px-3 py-4 text-sm text-slate-700"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
