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
    status: "Pending",
    appliedOn: "2026-09-22",
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
    status: "Approved",
    appliedOn: "2026-09-20",
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
    status: "Rejected",
    appliedOn: "2026-09-18",
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
    status: "Pending",
    appliedOn: "2026-09-23",
  },
];

const leaveTypes = [
  "Casual Leave",
  "Earned Leave",
  "Medical Leave",
  "Half Day",
  "Permission",
  "On Duty",
  "Maternity Leave",
  "Other",
];

function LeaveManagement() {
  const [requests, setRequests] =
    useState(initialRequests);

  const [activeTab, setActiveTab] =
    useState("all");

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [departmentFilter, setDepartmentFilter] =
    useState("All");

  const [showApplyModal, setShowApplyModal] =
    useState(false);

  const [selectedRequest, setSelectedRequest] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [toast, setToast] =
    useState("");

  const [form, setForm] = useState({
    employee: "",
    employeeId: "",
    role: "Teacher",
    department: "Computer Science",
    leaveType: "Casual Leave",
    from: "",
    to: "",
    reason: "",
  });

  const departments = useMemo(() => {
    return [
      "All",
      ...new Set(
        requests.map(
          (request) =>
            request.department
        )
      ),
    ];
  }, [requests]);

  const statistics = useMemo(() => {
    return {
      total: requests.length,

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

      totalDays: requests.reduce(
        (sum, request) =>
          sum + Number(request.days || 0),
        0
      ),
    };
  }, [requests]);

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesSearch =
        search.trim() === "" ||
        request.employee
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        request.employeeId
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        request.id
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All" ||
        request.status ===
          statusFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        request.department ===
          departmentFilter;

      const matchesTab =
        activeTab === "all" ||
        request.status.toLowerCase() ===
          activeTab;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDepartment &&
        matchesTab
      );
    });
  }, [
    requests,
    search,
    statusFilter,
    departmentFilter,
    activeTab,
  ]);

  const showToast = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const calculateDays = (
    from,
    to
  ) => {
    if (!from || !to) return 0;

    const start =
      new Date(from);

    const end =
      new Date(to);

    if (
      Number.isNaN(
        start.getTime()
      ) ||
      Number.isNaN(
        end.getTime()
      )
    ) {
      return 0;
    }

    const difference =
      end.getTime() -
      start.getTime();

    return (
      Math.floor(
        difference /
          (1000 *
            60 *
            60 *
            24)
      ) + 1
    );
  };

  const updateForm = (
    field,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const submitLeaveRequest = (
    event
  ) => {
    event.preventDefault();

    if (
      !form.employee ||
      !form.employeeId ||
      !form.from ||
      !form.to ||
      !form.reason
    ) {
      showToast(
        "Please complete all required fields."
      );

      return;
    }

    const days =
      calculateDays(
        form.from,
        form.to
      );

    if (days <= 0) {
      showToast(
        "The end date must be on or after the start date."
      );

      return;
    }

    const newRequest = {
      id: `LR-${1000 + requests.length + 1}`,
      employee: form.employee,
      employeeId:
        form.employeeId,
      role: form.role,
      department:
        form.department,
      leaveType:
        form.leaveType,
      from: form.from,
      to: form.to,
      days,
      reason: form.reason,
      status: "Pending",
      appliedOn:
        new Date()
          .toISOString()
          .split("T")[0],
    };

    setRequests((current) => [
      newRequest,
      ...current,
    ]);

    setForm({
      employee: "",
      employeeId: "",
      role: "Teacher",
      department: "Computer Science",
      leaveType: "Casual Leave",
      from: "",
      to: "",
      reason: "",
    });

    setShowApplyModal(false);

    showToast(
      "Leave request submitted successfully."
    );
  };

  const updateRequestStatus = (
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

    showToast(
      `Leave request ${status.toLowerCase()}.`
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

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <span>Leave</span>
            <span>/</span>
            <span className="text-slate-300">
              Management
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white">
            Leave Management
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage leave applications,
            approvals, staff availability
            and leave history.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setShowApplyModal(true)
          }
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
        >
          + Apply Leave
        </button>
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed right-6 top-6 z-[100] rounded-xl border border-emerald-500/20 bg-slate-900 px-5 py-4 text-sm text-emerald-400 shadow-2xl">
          ✓ {toast}
        </div>
      )}

      {/* STATISTICS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total Requests"
          value={statistics.total}
          icon="📋"
          color="blue"
        />

        <StatCard
          title="Pending"
          value={statistics.pending}
          icon="⏳"
          color="amber"
        />

        <StatCard
          title="Approved"
          value={statistics.approved}
          icon="✓"
          color="emerald"
        />

        <StatCard
          title="Rejected"
          value={statistics.rejected}
          icon="✕"
          color="red"
        />

        <StatCard
          title="Leave Days"
          value={statistics.totalDays}
          icon="📅"
          color="purple"
        />
      </div>

      {/* TABS */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex flex-wrap gap-1 border-b border-slate-800 px-4 pt-4">
          {[
            ["all", "All Requests"],
            ["pending", "Pending"],
            ["approved", "Approved"],
            ["rejected", "Rejected"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() =>
                setActiveTab(value)
              }
              className={`rounded-t-xl px-4 py-3 text-sm font-medium transition ${
                activeTab === value
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search employee or request ID..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

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

          <select
            value={departmentFilter}
            onChange={(event) =>
              setDepartmentFilter(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
          >
            {departments.map(
              (department) => (
                <option
                  key={department}
                  value={department}
                >
                  {department ===
                  "All"
                    ? "All Departments"
                    : department}
                </option>
              )
            )}
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-y border-slate-800 bg-slate-800/30 text-left">
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Request
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Employee
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Leave Type
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Duration
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
                    className="px-6 py-16 text-center"
                  >
                    <div className="text-3xl">
                      📭
                    </div>

                    <p className="mt-3 font-medium text-white">
                      No leave requests found
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Try changing your
                      filters or search
                      query.
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
                          <p className="font-semibold text-blue-400 hover:text-blue-300">
                            {
                              request.id
                            }
                          </p>

                          <p className="mt-1 text-xs text-slate-600">
                            Applied{" "}
                            {
                              request.appliedOn
                            }
                          </p>
                        </button>
                      </td>

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

                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-300">
                          {
                            request.leaveType
                          }
                        </span>
                      </td>

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

                      <td className="px-5 py-4">
                        <StatusBadge
                          status={
                            request.status
                          }
                        />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              openDetails(
                                request
                              )
                            }
                            className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 hover:bg-slate-800 hover:text-white"
                          >
                            View
                          </button>

                          {request.status ===
                            "Pending" && (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  updateRequestStatus(
                                    request.id,
                                    "Approved"
                                  )
                                }
                                className="rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20"
                              >
                                Approve
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  updateRequestStatus(
                                    request.id,
                                    "Rejected"
                                  )
                                }
                                className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/20"
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

        {/* FOOTER */}
        <div className="flex items-center justify-between border-t border-slate-800 px-5 py-4">
          <p className="text-xs text-slate-600">
            Showing{" "}
            {filteredRequests.length}{" "}
            of {requests.length} requests
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
              setDepartmentFilter(
                "All"
              );
              setActiveTab("all");
            }}
            className="text-xs font-medium text-blue-400 hover:text-blue-300"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* APPLY LEAVE MODAL */}
      {showApplyModal && (
        <Modal
          title="Apply for Leave"
          onClose={() =>
            setShowApplyModal(false)
          }
        >
          <form
            onSubmit={
              submitLeaveRequest
            }
            className="space-y-5"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormInput
                label="Employee Name"
                required
                value={
                  form.employee
                }
                onChange={(value) =>
                  updateForm(
                    "employee",
                    value
                  )
                }
                placeholder="Enter employee name"
              />

              <FormInput
                label="Employee ID"
                required
                value={
                  form.employeeId
                }
                onChange={(value) =>
                  updateForm(
                    "employeeId",
                    value
                  )
                }
                placeholder="e.g. TCH-001"
              />

              <FormSelect
                label="Role"
                value={form.role}
                onChange={(value) =>
                  updateForm(
                    "role",
                    value
                  )
                }
                options={[
                  "Teacher",
                  "Staff",
                ]}
              />

              <FormSelect
                label="Department"
                value={
                  form.department
                }
                onChange={(value) =>
                  updateForm(
                    "department",
                    value
                  )
                }
                options={[
                  "Computer Science",
                  "Information Technology",
                  "Administration",
                  "Human Resources",
                  "Finance",
                  "Library",
                  "Examination",
                ]}
              />

              <FormSelect
                label="Leave Type"
                value={
                  form.leaveType
                }
                onChange={(value) =>
                  updateForm(
                    "leaveType",
                    value
                  )
                }
                options={
                  leaveTypes
                }
              />

              <FormInput
                label="From"
                required
                type="date"
                value={form.from}
                onChange={(value) =>
                  updateForm(
                    "from",
                    value
                  )
                }
              />

              <FormInput
                label="To"
                required
                type="date"
                value={form.to}
                onChange={(value) =>
                  updateForm(
                    "to",
                    value
                  )
                }
              />

              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                <p className="text-xs text-slate-500">
                  Calculated Duration
                </p>

                <p className="mt-1 text-2xl font-bold text-blue-400">
                  {calculateDays(
                    form.from,
                    form.to
                  ) || 0}{" "}
                  <span className="text-sm font-normal text-slate-500">
                    day(s)
                  </span>
                </p>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Reason{" "}
                <span className="text-red-400">
                  *
                </span>
              </label>

              <textarea
                rows="4"
                value={form.reason}
                onChange={(event) =>
                  updateForm(
                    "reason",
                    event.target.value
                  )
                }
                placeholder="Enter the reason for leave..."
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
              <button
                type="button"
                onClick={() =>
                  setShowApplyModal(
                    false
                  )
                }
                className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Submit Request
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* DETAILS MODAL */}
      {showDetails &&
        selectedRequest && (
          <Modal
            title={`Leave Request ${selectedRequest.id}`}
            onClose={() =>
              setShowDetails(false)
            }
          >
            <div className="space-y-5">
              <div className="flex items-start justify-between rounded-xl border border-slate-800 bg-slate-800/40 p-5">
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

              <div className="grid grid-cols-2 gap-4">
                <DetailItem
                  label="Department"
                  value={
                    selectedRequest.department
                  }
                />

                <DetailItem
                  label="Leave Type"
                  value={
                    selectedRequest.leaveType
                  }
                />

                <DetailItem
                  label="From"
                  value={formatDate(
                    selectedRequest.from
                  )}
                />

                <DetailItem
                  label="To"
                  value={formatDate(
                    selectedRequest.to
                  )}
                />

                <DetailItem
                  label="Duration"
                  value={`${selectedRequest.days} day(s)`}
                />

                <DetailItem
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

              <div className="flex flex-wrap justify-end gap-2 border-t border-slate-800 pt-5">
                {selectedRequest.status ===
                  "Pending" && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        updateRequestStatus(
                          selectedRequest.id,
                          "Approved"
                        );

                        setSelectedRequest(
                          (
                            current
                          ) => ({
                            ...current,
                            status:
                              "Approved",
                          })
                        );
                      }}
                      className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500"
                    >
                      Approve
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        updateRequestStatus(
                          selectedRequest.id,
                          "Rejected"
                        );

                        setSelectedRequest(
                          (
                            current
                          ) => ({
                            ...current,
                            status:
                              "Rejected",
                          })
                        );
                      }}
                      className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-500"
                    >
                      Reject
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
                  className="rounded-xl border border-red-500/20 px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        )}
    </div>
  );
}

/* ================================
   COMPONENTS
================================ */

function StatCard({
  title,
  value,
  icon,
  color,
}) {
  const colors = {
    blue:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",

    amber:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",

    emerald:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",

    red:
      "border-red-500/20 bg-red-500/10 text-red-400",

    purple:
      "border-purple-500/20 bg-purple-500/10 text-purple-400",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl border text-lg ${colors[color]}`}
        >
          {icon}
        </div>

        <span className="text-2xl font-bold text-white">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}) {
  const styles = {
    Pending:
      "bg-amber-500/10 text-amber-400 border-amber-500/20",

    Approved:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",

    Rejected:
      "bg-red-500/10 text-red-400 border-red-500/20",
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
      <span>
        {icons[status]}
      </span>

      {status}
    </span>
  );
}

function FormInput({
  label,
  required = false,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}

        {required && (
          <span className="ml-1 text-red-400">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
      />
    </div>
  );
}

function FormSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
      >
        {options.map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          )
        )}
      </select>
    </div>
  );
}

function DetailItem({
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

function Modal({
  title,
  children,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-5">
          <h2 className="text-lg font-semibold text-white">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
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

export default LeaveManagement;
