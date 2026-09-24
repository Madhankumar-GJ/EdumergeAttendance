import React from "react";

const stats = [
  {
    title: "Total Students",
    value: "2,486",
    change: "+8.2%",
    color: "blue",
  },
  {
    title: "Today's Attendance",
    value: "92.6%",
    change: "+2.4%",
    color: "emerald",
  },
  {
    title: "Teaching Staff",
    value: "142",
    change: "+4",
    color: "violet",
  },
  {
    title: "Absent Today",
    value: "184",
    change: "-12.5%",
    color: "rose",
  },
];

const colorClasses = {
  blue: "bg-blue-500/10 text-blue-400",
  emerald: "bg-emerald-500/10 text-emerald-400",
  violet: "bg-violet-500/10 text-violet-400",
  rose: "bg-rose-500/10 text-rose-400",
};

function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-slate-400">
          Overview of your college attendance system.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-400">{stat.title}</p>
                <h2 className="mt-2 text-3xl font-bold text-white">
                  {stat.value}
                </h2>
              </div>

              <span
                className={`rounded-lg px-2 py-1 text-xs font-semibold ${colorClasses[stat.color]}`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Attendance overview */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Attendance Overview
              </h2>
              <p className="text-sm text-slate-400">
                Weekly attendance performance
              </p>
            </div>

            <select className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300 outline-none">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Semester</option>
            </select>
          </div>

          <div className="mt-8 flex h-64 items-end justify-between gap-3">
            {[
              ["Mon", 88],
              ["Tue", 94],
              ["Wed", 91],
              ["Thu", 96],
              ["Fri", 89],
              ["Sat", 82],
            ].map(([day, value]) => (
              <div
                key={day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-3"
              >
                <span className="text-xs text-slate-400">{value}%</span>

                <div className="flex h-48 w-full items-end rounded-lg bg-slate-800">
                  <div
                    className="w-full rounded-lg bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-500"
                    style={{ height: `${value}%` }}
                  />
                </div>

                <span className="text-xs text-slate-500">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
          <p className="mt-1 text-sm text-slate-400">
            Frequently used operations
          </p>

          <div className="mt-6 space-y-3">
            {[
              "Mark Attendance",
              "Add Student",
              "Generate Timetable",
              "View Reports",
            ].map((action) => (
              <button
                key={action}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-left text-sm font-medium text-slate-200 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold text-white">Recent Activity</h2>

        <div className="mt-5 divide-y divide-slate-800">
          {[
            ["Attendance marked", "CSE - 3rd Year", "10 minutes ago"],
            ["New student added", "Rahul Sharma", "32 minutes ago"],
            ["Timetable generated", "Computer Science", "1 hour ago"],
            ["Monthly report generated", "August 2026", "2 hours ago"],
          ].map(([title, detail, time]) => (
            <div
              key={`${title}-${detail}`}
              className="flex items-center justify-between py-4"
            >
              <div>
                <p className="text-sm font-medium text-white">{title}</p>
                <p className="mt-1 text-xs text-slate-500">{detail}</p>
              </div>

              <span className="text-xs text-slate-500">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
