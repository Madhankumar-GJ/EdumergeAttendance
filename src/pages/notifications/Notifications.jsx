import React, { useMemo, useState } from "react";

const initialNotifications = [
  {
    id: 1,
    title: "Attendance shortage alert",
    message:
      "12 students in BCA - III A have attendance below the required threshold.",
    type: "warning",
    category: "Attendance",
    time: "10 minutes ago",
    date: "2026-09-24",
    read: false,
  },
  {
    id: 2,
    title: "Leave request pending",
    message:
      "Dr. Rahul Sharma submitted a new casual leave request for approval.",
    type: "leave",
    category: "Leave",
    time: "32 minutes ago",
    date: "2026-09-24",
    read: false,
  },
  {
    id: 3,
    title: "Timetable conflict detected",
    message:
      "A room conflict was detected for Room 204 during Period 4.",
    type: "timetable",
    category: "Timetable",
    time: "1 hour ago",
    date: "2026-09-24",
    read: true,
  },
  {
    id: 4,
    title: "Attendance submitted",
    message:
      "Attendance for Database Management Systems has been successfully submitted.",
    type: "success",
    category: "Attendance",
    time: "2 hours ago",
    date: "2026-09-24",
    read: true,
  },
  {
    id: 5,
    title: "New student added",
    message:
      "A new student profile has been added to BCA - II A.",
    type: "info",
    category: "Students",
    time: "Yesterday",
    date: "2026-09-23",
    read: true,
  },
  {
    id: 6,
    title: "Report generated",
    message:
      "Monthly attendance report for August has been generated.",
    type: "success",
    category: "Reports",
    time: "Yesterday",
    date: "2026-09-23",
    read: true,
  },
  {
    id: 7,
    title: "Teacher profile updated",
    message:
      "The profile information for Prof. Ananya Rao was updated.",
    type: "info",
    category: "Staff",
    time: "2 days ago",
    date: "2026-09-22",
    read: true,
  },
];

const categories = [
  "All",
  "Attendance",
  "Leave",
  "Timetable",
  "Students",
  "Reports",
  "Staff",
];

function Notifications() {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [selectedNotification, setSelectedNotification] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [toast, setToast] =
    useState("");

  const filteredNotifications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return notifications.filter((notification) => {
      const matchesCategory =
        activeCategory === "All" ||
        notification.category === activeCategory;

      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Unread" &&
          !notification.read) ||
        (activeFilter === "Read" &&
          notification.read);

      const matchesSearch =
        !query ||
        notification.title
          .toLowerCase()
          .includes(query) ||
        notification.message
          .toLowerCase()
          .includes(query) ||
        notification.category
          .toLowerCase()
          .includes(query);

      return (
        matchesCategory &&
        matchesFilter &&
        matchesSearch
      );
    });
  }, [
    notifications,
    activeCategory,
    activeFilter,
    search,
  ]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const readCount = notifications.filter(
    (notification) => notification.read
  ).length;

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };

  const markAsUnread = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: false,
            }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );

    showToast(
      "All notifications marked as read."
    );
  };

  const deleteNotification = (id) => {
    setNotifications((current) =>
      current.filter(
        (notification) =>
          notification.id !== id
      )
    );

    setShowDetails(false);

    showToast(
      "Notification deleted."
    );
  };

  const clearReadNotifications = () => {
    setNotifications((current) =>
      current.filter(
        (notification) =>
          !notification.read
      )
    );

    showToast(
      "Read notifications cleared."
    );
  };

  const openNotification = (notification) => {
    setSelectedNotification(
      notification
    );

    setShowDetails(true);

    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* TOAST */}
      {toast && (
        <div className="fixed right-6 top-6 z-[100] rounded-xl border border-emerald-500/20 bg-slate-900 px-5 py-4 text-sm font-medium text-emerald-400 shadow-2xl">
          ✓ {toast}
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            System / Notifications
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Notifications
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Stay updated with attendance,
            leave requests, timetable
            changes and system activity.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ✓ Mark all as read
          </button>

          <button
            type="button"
            onClick={clearReadNotifications}
            disabled={readCount === 0}
            className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear read
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Total Notifications"
          value={notifications.length}
          icon="🔔"
          color="blue"
        />

        <SummaryCard
          label="Unread"
          value={unreadCount}
          icon="●"
          color="amber"
        />

        <SummaryCard
          label="Read"
          value={readCount}
          icon="✓"
          color="emerald"
        />
      </div>

      {/* FILTER AREA */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="flex flex-col gap-4">
          {/* SEARCH */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              🔍
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search notifications..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          {/* CATEGORY FILTER */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setActiveCategory(category)
                }
                className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-medium transition ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "border border-slate-700 bg-slate-800 text-slate-500 hover:text-slate-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* READ FILTER */}
          <div className="flex gap-2">
            {["All", "Unread", "Read"].map(
              (filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() =>
                    setActiveFilter(filter)
                  }
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                    activeFilter === filter
                      ? "bg-slate-700 text-white"
                      : "text-slate-600 hover:bg-slate-800 hover:text-slate-300"
                  }`}
                >
                  {filter}
                  {filter === "Unread" &&
                    unreadCount > 0 && (
                      <span className="ml-2 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] text-white">
                        {unreadCount}
                      </span>
                    )}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* NOTIFICATIONS */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-16 text-center">
            <div className="text-5xl">
              🔕
            </div>

            <h3 className="mt-4 font-semibold text-white">
              No notifications found
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Try changing your filters or
              search term.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
                setActiveFilter("All");
              }}
              className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredNotifications.map(
            (notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onOpen={() =>
                  openNotification(
                    notification
                  )
                }
                onMarkRead={() =>
                  markAsRead(
                    notification.id
                  )
                }
                onMarkUnread={() =>
                  markAsUnread(
                    notification.id
                  )
                }
                onDelete={() =>
                  deleteNotification(
                    notification.id
                  )
                }
              />
            )
          )
        )}
      </div>

      {/* FOOTER */}
      {filteredNotifications.length > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-5 py-4">
          <p className="text-xs text-slate-600">
            Showing{" "}
            <span className="font-medium text-slate-400">
              {filteredNotifications.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-400">
              {notifications.length}
            </span>{" "}
            notifications
          </p>

          {unreadCount > 0 && (
            <span className="text-xs font-medium text-amber-400">
              {unreadCount} unread
            </span>
          )}
        </div>
      )}

      {/* DETAILS MODAL */}
      {showDetails &&
        selectedNotification && (
          <NotificationModal
            notification={
              selectedNotification
            }
            onClose={() =>
              setShowDetails(false)
            }
            onDelete={() =>
              deleteNotification(
                selectedNotification.id
              )
            }
            onToggleRead={() => {
              if (
                selectedNotification.read
              ) {
                markAsUnread(
                  selectedNotification.id
                );

                setSelectedNotification(
                  (current) => ({
                    ...current,
                    read: false,
                  })
                );
              } else {
                markAsRead(
                  selectedNotification.id
                );

                setSelectedNotification(
                  (current) => ({
                    ...current,
                    read: true,
                  })
                );
              }
            }}
          />
        )}
    </div>
  );
}

/* =========================================
   NOTIFICATION ITEM
========================================= */

function NotificationItem({
  notification,
  onOpen,
  onMarkRead,
  onMarkUnread,
  onDelete,
}) {
  const colors = getNotificationColors(
    notification.type
  );

  return (
    <div
      className={`group rounded-2xl border bg-slate-900 transition hover:border-slate-700 ${
        notification.read
          ? "border-slate-800"
          : "border-blue-500/20 bg-blue-500/[0.025]"
      }`}
    >
      <div className="flex gap-4 p-5">
        {/* ICON */}
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-lg ${colors.icon}`}
        >
          {getNotificationIcon(
            notification.type
          )}
        </div>

        {/* CONTENT */}
        <button
          type="button"
          onClick={onOpen}
          className="min-w-0 flex-1 text-left"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {!notification.read && (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                )}

                <h3
                  className={`truncate text-sm font-semibold ${
                    notification.read
                      ? "text-slate-300"
                      : "text-white"
                  }`}
                >
                  {notification.title}
                </h3>
              </div>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                {notification.message}
              </p>
            </div>

            <span className="shrink-0 text-xs text-slate-600">
              {notification.time}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${colors.badge}`}
            >
              {notification.category}
            </span>

            <span className="text-[11px] text-slate-700">
              {notification.read
                ? "Read"
                : "Unread"}
            </span>
          </div>
        </button>

        {/* ACTIONS */}
        <div className="flex shrink-0 items-start gap-1 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
          <button
            type="button"
            title={
              notification.read
                ? "Mark as unread"
                : "Mark as read"
            }
            onClick={
              notification.read
                ? onMarkUnread
                : onMarkRead
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-800 hover:text-blue-400"
          >
            {notification.read
              ? "●"
              : "✓"}
          </button>

          <button
            type="button"
            title="Delete"
            onClick={onDelete}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-red-500/10 hover:text-red-400"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   MODAL
========================================= */

function NotificationModal({
  notification,
  onClose,
  onDelete,
  onToggleRead,
}) {
  const colors = getNotificationColors(
    notification.type
  );

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
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl border ${colors.icon}`}
            >
              {getNotificationIcon(
                notification.type
              )}
            </div>

            <div>
              <p className="text-xs text-slate-600">
                {notification.category}
              </p>

              <h2 className="mt-1 text-lg font-semibold text-white">
                Notification Details
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="space-y-5 p-6">
          <div>
            <h3 className="text-xl font-semibold text-white">
              {notification.title}
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${colors.badge}`}
              >
                {notification.category}
              </span>

              <span className="text-xs text-slate-600">
                {notification.time}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-5">
            <p className="text-sm leading-7 text-slate-400">
              {notification.message}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Detail
              label="Date"
              value={formatDate(
                notification.date
              )}
            />

            <Detail
              label="Status"
              value={
                notification.read
                  ? "Read"
                  : "Unread"
              }
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex flex-wrap justify-end gap-2 border-t border-slate-800 px-6 py-5">
          <button
            type="button"
            onClick={onToggleRead}
            className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            {notification.read
              ? "Mark as unread"
              : "Mark as read"}
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="rounded-xl border border-red-500/20 px-4 py-2.5 text-xs font-medium text-red-400 hover:bg-red-500/10"
          >
            Delete
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   SUMMARY CARD
========================================= */

function SummaryCard({
  label,
  value,
  icon,
  color,
}) {
  const colors = {
    blue: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    amber:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",
    emerald:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${colors[color]}`}
        >
          {icon}
        </div>

        <span className="text-2xl font-bold text-white">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {label}
      </p>
    </div>
  );
}

/* =========================================
   DETAIL
========================================= */

function Detail({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
      <p className="text-xs text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-300">
        {value}
      </p>
    </div>
  );
}

/* =========================================
   HELPERS
========================================= */

function getNotificationIcon(type) {
  const icons = {
    warning: "⚠",
    leave: "📄",
    timetable: "🗓",
    success: "✓",
    info: "ℹ",
  };

  return icons[type] || "🔔";
}

function getNotificationColors(type) {
  const colors = {
    warning: {
      icon:
        "border-amber-500/20 bg-amber-500/10 text-amber-400",
      badge:
        "border-amber-500/20 bg-amber-500/10 text-amber-400",
    },

    leave: {
      icon:
        "border-purple-500/20 bg-purple-500/10 text-purple-400",
      badge:
        "border-purple-500/20 bg-purple-500/10 text-purple-400",
    },

    timetable: {
      icon:
        "border-blue-500/20 bg-blue-500/10 text-blue-400",
      badge:
        "border-blue-500/20 bg-blue-500/10 text-blue-400",
    },

    success: {
      icon:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
      badge:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    },

    info: {
      icon:
        "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
      badge:
        "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
    },
  };

  return (
    colors[type] || colors.info
  );
}

function formatDate(date) {
  if (!date) return "—";

  const parsed =
    new Date(`${date}T00:00:00`);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return date;
  }

  return parsed.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export default Notifications;
