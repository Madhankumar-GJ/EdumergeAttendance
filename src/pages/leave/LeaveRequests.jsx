import React, { useMemo, useState } from "react";

const initialRequests = [
  {
    id: "LR-1001",
    employee: "Dr. Rahul Sharma",
    employeeId: "TCH-001",
    role: "Teacher",
    department: "Computer Science",
    leaveType: "Casual Leave",
    from: "2026-09-28",
    to: "2026-09-29",
    days: 2,
    reason: "Personal work",
    appliedOn: "2026-09-22",
    status: "Pending",
  },
  {
    id: "LR-1002",
    employee: "Priya Nair",
    employeeId: "STF-014",
    role: "Staff",
    department: "Administration",
    leaveType: "Medical Leave",
    from: "2026-09-25",
    to: "2026-09-26",
    days: 2,
    reason: "Medical appointment",
    appliedOn: "2026-09-20",
    status: "Approved",
  },
  {
    id: "LR-1003",
    employee: "Vikram Singh",
    employeeId: "TCH-007",
    role: "Teacher",
    department: "Computer Science",
    leaveType: "Earned Leave",
    from: "2026-10-05",
    to: "2026-10-07",
    days: 3,
    reason: "Family function",
    appliedOn: "2026-09-18",
    status: "Rejected",
  },
  {
    id: "LR-1004",
    employee: "Ananya Rao",
    employeeId: "TCH-011",
    role: "Teacher",
    department: "Information Technology",
    leaveType: "Casual Leave",
    from: "2026-09-30",
    to: "2026-10-01",
    days: 2,
    reason: "Personal work",
    appliedOn: "2026-09-23",
    status: "Pending",
  },
  {
    id: "LR-1005",
    employee: "Arjun Mehta",
    employeeId: "STF-021",
    role: "Staff",
    department: "Examination",
    leaveType: "Permission",
    from: "2026-09-27",
    to: "2026-09-27",
    days: 1,
    reason: "Personal appointment",
    appliedOn: "2026-09-23",
    status: "Pending",
  },
];

function LeaveRequests() {
  const [requests, setRequests] =
    useState(initialRequests);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [selectedRequest, setSelectedRequest] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [toast, setToast] =
    useState("");

  const leaveTypes = useMemo(
    () => [
      "All",
      ...new Set(
        requests.map(
          (request) =>
            request.leaveType
        )
      ),
    ],
    [requests]
  );

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const query =
        search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        request.employee
          .toLowerCase()
          .includes(query) ||
        request.employeeId
          .toLowerCase()
          .includes(query) ||
        request.id
          .toLowerCase()
          .includes(query) ||
        request.department
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        request.status ===
          statusFilter;

      const matchesType =
        typeFilter === "All" ||
        request.leaveType ===
          typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    requests,
    search,
    statusFilter,
    typeFilter,
  ]);

  const counts = {
    all: requests.length,
    pending: requests.filter(
      (request) =>
        request.status === "Pending"
    ).length,
    approved: requests.filter(
      (request) =>
        request.status === "Approved"
    ).length,
    rejected: requests.filter(
      (request) =>
        request.status === "Rejected"
    ).length,
  };

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const updateStatus = (
    id,
    status
  ) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === id
          ? {
              ...request,
              status,
            }
          : request
      )
    );

    if (
      selectedRequest?.id === id
    ) {
      setSelectedRequest(
        (current) => ({
          ...current,
          status,
        })
      );
    }

    showToast(
      `Request ${status.toLowerCase()}.`
    );
  };

  const deleteRequest = (id) => {
    setRequests((current) =>
      current.filter(
        (request) =>
          request.id !== id
      )
    );

    setShowDetails(false);

    showToast(
      "Leave request deleted."
    );
  };

  const openDetails = (request) => {
    setSelectedRequest(request);
    setShowDetails(true);
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setTypeFilter("All");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Leave Management / Requests
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Leave Requests
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Review, approve and manage
            leave applications from
            teachers and staff.
          </p>
        </div>

        <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3">
          <p className="text-xs text-slate-500">
            Pending approvals
          </p>

          <p className="mt-1 text-2xl font-bold text-blue-400">
            {counts.pending}
          </p>
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed right-6 top-6 z-[100] rounded-xl border border-emerald-500/20 bg-slate-900 px-5 py-4 text-sm font-medium text-emerald-400 shadow-2xl">
          ✓ {toast}
        </div>
      )}

      {/* SUMMARY */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <SummaryCard
          label="All Requests"
          value={counts.all}
          color="blue"
          icon="📋"
        />

        <SummaryCard
          label="Pending"
          value={counts.pending}
          color="amber"
          icon="⏳"
        />

        <SummaryCard
          label="Approved"
          value={counts.approved}
          color="emerald"
          icon="✓"
        />

        <SummaryCard
          label="Rejected"
          value={counts.rejected}
          color="red"
          icon="✕"
        />
      </div>

      {/* FILTER CARD */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-white">
              Request Queue
            </h2>

            <p className="text-xs text-slate-600">
              {filteredRequests.length}{" "}
              matching request
              {filteredRequests.length !==
              1
                ? "s"
                : ""}
            </p>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-medium text-blue-400 hover:text-blue-300"
          >
            Reset filters
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* SEARCH */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              🔍
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search requests..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          {/* STATUS */}
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
          >
            <option value="All">
              All Statuses
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>
          </select>

          {/* TYPE */}
          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
          >
            {leaveTypes.map(
              (type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type === "All"
                    ? "All Leave Types"
                    : type}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* REQUEST LIST */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/30 text-left">
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Request
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Employee
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Leave
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Dates
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Days
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRequests.length ===
              0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-16 text-center"
                  >
                    <div className="text-4xl">
                      📭
                    </div>

                    <p className="mt-3 font-medium text-white">
                      No requests found
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      Change the filters
                      and try again.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredRequests.map(
                  (request) => (
                    <tr
                      key={request.id}
                      className="border-b border-slate-800 transition hover:bg-slate-800/30"
                    >
                      {/* REQUEST */}
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            openDetails(
                              request
                            )
                          }
                          className="text-left"
                        >
                          <p className="font-semibold text-blue-400">
                            {
                              request.id
                            }
                          </p>

                          <p className="mt-1 text-xs text-slate-600">
                            Applied{" "}
                            {formatDate(
                              request.appliedOn
                            )}
                          </p>
                        </button>
                      </td>

                      {/* EMPLOYEE */}
                      <td className="px-5 py-4">
                        <p className="font-medium text-white">
                          {
                            request.employee
                          }
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {
                            request.employeeId
                          }{" "}
                          •{" "}
                          {
                            request.role
                          }
                        </p>

                        <p className="mt-1 text-xs text-slate-600">
                          {
                            request.department
                          }
                        </p>
                      </td>

                      {/* LEAVE */}
                      <td className="px-5 py-4">
                        <span className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-300">
                          {
                            request.leaveType
                          }
                        </span>
                      </td>

                      {/* DATES */}
                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-300">
                          {formatDate(
                            request.from
                          )}
                        </p>

                        <p className="mt-1 text-xs text-slate-600">
                          to{" "}
                          {formatDate(
                            request.to
                          )}
                        </p>
                      </td>

                      {/* DAYS */}
                      <td className="px-5 py-4">
                        <span className="font-semibold text-white">
                          {
                            request.days
                          }
                        </span>

                        <span className="ml-1 text-xs text-slate-600">
                          day
                          {request.days !==
                          1
                            ? "s"
                            : ""}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <StatusBadge
                          status={
                            request.status
                          }
                        />
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              openDetails(
                                request
                              )
                            }
                            className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 transition hover:bg-slate-800 hover:text-white"
                          >
                            View
                          </button>

                          {request.status ===
                            "Pending" && (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  updateStatus(
                                    request.id,
                                    "Approved"
                                  )
                                }
                                className="rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-400 transition hover:bg-emerald-500/20"
                              >
                                Approve
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  updateStatus(
                                    request.id,
                                    "Rejected"
                                  )
                                }
                                className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILS MODAL */}
      {showDetails &&
        selectedRequest && (
          <div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setShowDetails(false);
              }
            }}
          >
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
              {/* MODAL HEADER */}
              <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
                <div>
                  <p className="text-xs text-slate-600">
                    Leave Request
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-white">
                    {
                      selectedRequest.id
                    }
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowDetails(
                      false
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-800 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* MODAL BODY */}
              <div className="space-y-5 p-6">
                <div className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-800/30 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {
                        selectedRequest.employee
                      }
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {
                        selectedRequest.employeeId
                      }{" "}
                      •{" "}
                      {
                        selectedRequest.role
                      }
                    </p>
                  </div>

                  <StatusBadge
                    status={
                      selectedRequest.status
                    }
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Detail
                    label="Department"
                    value={
                      selectedRequest.department
                    }
                  />

                  <Detail
                    label="Leave Type"
                    value={
                      selectedRequest.leaveType
                    }
                  />

                  <Detail
                    label="Start Date"
                    value={formatDate(
                      selectedRequest.from
                    )}
                  />

                  <Detail
                    label="End Date"
                    value={formatDate(
                      selectedRequest.to
                    )}
                  />

                  <Detail
                    label="Duration"
                    value={`${selectedRequest.days} day(s)`}
                  />

                  <Detail
                    label="Applied On"
                    value={formatDate(
                      selectedRequest.appliedOn
                    )}
                  />
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Reason
                  </p>

                  <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4 text-sm leading-6 text-slate-400">
                    {
                      selectedRequest.reason
                    }
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-wrap justify-end gap-2 border-t border-slate-800 pt-5">
                  {selectedRequest.status ===
                    "Pending" && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          updateStatus(
                            selectedRequest.id,
                            "Approved"
                          )
                        }
                        className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500"
                      >
                        ✓ Approve
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateStatus(
                            selectedRequest.id,
                            "Rejected"
                          )
                        }
                        className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-500"
                      >
                        ✕ Reject
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      deleteRequest(
                        selectedRequest.id
                      )
                    }
                    className="rounded-xl border border-red-500/20 px-5 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

/* =========================================
   SMALL COMPONENTS
========================================= */

function SummaryCard({
  label,
  value,
  icon,
  color,
}) {
  const styles = {
    blue: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    amber: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    emerald:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    red: "border-red-500/20 bg-red-500/10 text-red-400",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${styles[color]}`}
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

function StatusBadge({
  status,
}) {
  const styles = {
    Pending:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",

    Approved:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",

    Rejected:
      "border-red-500/20 bg-red-500/10 text-red-400",
  };

  const icons = {
    Pending: "⏳",
    Approved: "✓",
    Rejected: "✕",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${styles[status]}`}
    >
      {icons[status]} {status}
    </span>
  );
}

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

function formatDate(date) {
  if (!date) return "—";

  const parsed =
    new Date(date);

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

export default LeaveRequests;
