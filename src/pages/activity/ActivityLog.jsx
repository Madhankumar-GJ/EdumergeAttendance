import React, { useMemo, useState } from "react";

const initialActivities = [
  {
    id: 1,
    type: "attendance",
    title: "Attendance marked",
    description: "CS-A attendance was marked for Data Structures.",
    user: "Dr. Ananya Sharma",
    role: "Teacher",
    time: "10 minutes ago",
    status: "Completed",
  },
  {
    id: 2,
    type: "student",
    title: "Student added",
    description: "A new student record was created.",
    user: "Administrator",
    role: "Admin",
    time: "32 minutes ago",
    status: "Completed",
  },
  {
    id: 3,
    type: "timetable",
    title: "Timetable generated",
    description: "The timetable for CSE Semester 4 was generated.",
    user: "Administrator",
    role: "Admin",
    time: "1 hour ago",
    status: "Completed",
  },
  {
    id: 4,
    type: "leave",
    title: "Leave request submitted",
    description: "A student submitted a medical leave request.",
    user: "Rahul Kumar",
    role: "Student",
    time: "2 hours ago",
    status: "Pending",
  },
  {
    id: 5,
    type: "settings",
    title: "Attendance threshold updated",
    description: "Minimum attendance requirement was changed to 75%.",
    user: "Administrator",
    role: "Admin",
    time: "Yesterday",
    status: "Completed",
  },
];

const activityIcons = {
  attendance: "✓",
  student: "🎓",
  timetable: "▦",
  leave: "📝",
  settings: "⚙",
};

const activityColors = {
  attendance: "bg-emerald-500/10 text-emerald-400",
  student: "bg-blue-500/10 text-blue-400",
  timetable: "bg-violet-500/10 text-violet-400",
  leave: "bg-amber-500/10 text-amber-400",
  settings: "bg-cyan-500/10 text-cyan-400",
};

function ActivityLog() {
  const [activities, setActivities] = useState(initialActivities);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredActivities = useMemo(() => {
    const query = search.trim().toLowerCase();

    return activities.filter((activity) => {
      const matchesFilter =
        filter === "all" || activity.type === filter;

      const matchesSearch =
        !query ||
        activity.title.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query) ||
        activity.user.toLowerCase().includes(query) ||
        activity.role.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [activities, filter, search]);

  const clearActivities = () => {
    setActivities([]);
  };

  const resetActivities = () => {
    setActivities(initialActivities);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Activity Log
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Track important actions and changes made across the
            attendance management system.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={resetActivities}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
          >
            Reset Demo Data
          </button>

          <button
            type="button"
            onClick={clearActivities}
            className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
          >
            Clear Log
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">Total Activities</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {activities.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Attendance Actions
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {
              activities.filter(
                (activity) => activity.type === "attendance"
              ).length
            }
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">Pending Actions</p>
          <p className="mt-2 text-3xl font-bold text-amber-400">
            {
              activities.filter(
                (activity) => activity.status === "Pending"
              ).length
            }
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">Filtered Results</p>
          <p className="mt-2 text-3xl font-bold text-blue-400">
            {filteredActivities.length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              ⌕
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search activity..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          {/* Type filter */}
          <div className="flex flex-wrap gap-2">
            {[
              ["all", "All"],
              ["attendance", "Attendance"],
              ["student", "Students"],
              ["timetable", "Timetable"],
              ["leave", "Leave"],
              ["settings", "Settings"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                  filter === value
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity list */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-6 py-5">
          <h2 className="font-semibold text-white">
            Recent Activity
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            System actions are displayed in chronological order.
          </p>
        </div>

        {filteredActivities.length > 0 ? (
          <div className="divide-y divide-slate-800">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-4 px-6 py-5 transition hover:bg-slate-800/30"
              >
                {/* Icon */}
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${
                    activityColors[activity.type]
                  }`}
                >
                  {activityIcons[activity.type]}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {activity.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        {activity.description}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs text-slate-600">
                      {activity.time}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                      {activity.user}
                    </span>

                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-500">
                      {activity.role}
                    </span>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ${
                        activity.status === "Pending"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-emerald-500/10 text-emerald-400"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-2xl">
              ◌
            </div>

            <h3 className="mt-4 font-semibold text-white">
              No activities found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your filters or search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityLog;
