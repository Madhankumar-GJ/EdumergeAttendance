import React, { useMemo, useState } from "react";

const initialRooms = [
  {
    id: 1,
    code: "R-101",
    name: "Smart Classroom 101",
    building: "Main Block",
    floor: "Ground Floor",
    capacity: 60,
    type: "Classroom",
    status: "Available",
    facilities: ["Projector", "Wi-Fi", "AC"],
  },
  {
    id: 2,
    code: "R-102",
    name: "Smart Classroom 102",
    building: "Main Block",
    floor: "Ground Floor",
    capacity: 60,
    type: "Classroom",
    status: "Occupied",
    facilities: ["Projector", "Wi-Fi", "AC"],
  },
  {
    id: 3,
    code: "LAB-201",
    name: "Computer Lab 1",
    building: "Science Block",
    floor: "First Floor",
    capacity: 40,
    type: "Laboratory",
    status: "Available",
    facilities: ["40 PCs", "Projector", "AC"],
  },
  {
    id: 4,
    code: "LAB-202",
    name: "Computer Lab 2",
    building: "Science Block",
    floor: "First Floor",
    capacity: 40,
    type: "Laboratory",
    status: "Maintenance",
    facilities: ["40 PCs", "Projector", "AC"],
  },
  {
    id: 5,
    code: "SEM-301",
    name: "Seminar Hall",
    building: "Admin Block",
    floor: "Second Floor",
    capacity: 180,
    type: "Seminar Hall",
    status: "Available",
    facilities: [
      "Projector",
      "Sound System",
      "AC",
      "Stage",
    ],
  },
  {
    id: 6,
    code: "R-304",
    name: "Lecture Room 304",
    building: "Main Block",
    floor: "Second Floor",
    capacity: 80,
    type: "Classroom",
    status: "Available",
    facilities: ["Projector", "Wi-Fi"],
  },
];

const roomTypes = [
  "All Types",
  "Classroom",
  "Laboratory",
  "Seminar Hall",
  "Auditorium",
];

const statusFilters = [
  "All Status",
  "Available",
  "Occupied",
  "Maintenance",
];

function Rooms() {
  const [rooms, setRooms] =
    useState(initialRooms);

  const [search, setSearch] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("All Types");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [showModal, setShowModal] =
    useState(false);

  const [editingRoom, setEditingRoom] =
    useState(null);

  const [selectedRoom, setSelectedRoom] =
    useState(null);

  const [toast, setToast] =
    useState("");

  const [form, setForm] = useState({
    code: "",
    name: "",
    building: "Main Block",
    floor: "Ground Floor",
    capacity: 60,
    type: "Classroom",
    status: "Available",
    facilities: "",
  });

  const filteredRooms = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return rooms.filter((room) => {
      const matchesSearch =
        !query ||
        room.code
          .toLowerCase()
          .includes(query) ||
        room.name
          .toLowerCase()
          .includes(query) ||
        room.building
          .toLowerCase()
          .includes(query);

      const matchesType =
        typeFilter === "All Types" ||
        room.type === typeFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        room.status === statusFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });
  }, [
    rooms,
    search,
    typeFilter,
    statusFilter,
  ]);

  const stats = useMemo(() => {
    return {
      total: rooms.length,

      available: rooms.filter(
        (room) =>
          room.status === "Available"
      ).length,

      occupied: rooms.filter(
        (room) =>
          room.status === "Occupied"
      ).length,

      maintenance: rooms.filter(
        (room) =>
          room.status === "Maintenance"
      ).length,

      capacity: rooms.reduce(
        (sum, room) =>
          sum + Number(room.capacity || 0),
        0
      ),
    };
  }, [rooms]);

  const openAddModal = () => {
    setEditingRoom(null);

    setForm({
      code: "",
      name: "",
      building: "Main Block",
      floor: "Ground Floor",
      capacity: 60,
      type: "Classroom",
      status: "Available",
      facilities: "",
    });

    setShowModal(true);
  };

  const openEditModal = (room) => {
    setEditingRoom(room);

    setForm({
      code: room.code,
      name: room.name,
      building: room.building,
      floor: room.floor,
      capacity: room.capacity,
      type: room.type,
      status: room.status,
      facilities:
        room.facilities.join(", "),
    });

    setShowModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.code.trim() ||
      !form.name.trim()
    ) {
      showToast(
        "Room code and room name are required."
      );

      return;
    }

    const roomData = {
      ...form,
      code: form.code
        .trim()
        .toUpperCase(),

      name: form.name.trim(),

      capacity: Number(
        form.capacity
      ),

      facilities: form.facilities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    if (editingRoom) {
      setRooms((current) =>
        current.map((room) =>
          room.id === editingRoom.id
            ? {
                ...room,
                ...roomData,
              }
            : room
        )
      );

      showToast(
        "Room updated successfully."
      );
    } else {
      const newRoom = {
        id: Date.now(),
        ...roomData,
      };

      setRooms((current) => [
        ...current,
        newRoom,
      ]);

      showToast(
        "Room added successfully."
      );
    }

    setShowModal(false);
  };

  const deleteRoom = (id) => {
    const room = rooms.find(
      (item) => item.id === id
    );

    if (!room) return;

    const confirmed = window.confirm(
      `Delete ${room.name}?`
    );

    if (!confirmed) return;

    setRooms((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );

    if (
      selectedRoom?.id === id
    ) {
      setSelectedRoom(null);
    }

    showToast(
      "Room deleted successfully."
    );
  };

  const updateStatus = (
    id,
    status
  ) => {
    setRooms((current) =>
      current.map((room) =>
        room.id === id
          ? {
              ...room,
              status,
            }
          : room
      )
    );

    showToast(
      `Room status changed to ${status}.`
    );
  };

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("All Types");
    setStatusFilter("All Status");
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
            Academics / Rooms
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Rooms & Facilities
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Manage classrooms, laboratories,
            seminar halls and other academic
            spaces used by the timetable system.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500"
        >
          + Add Room
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard
          label="Total Rooms"
          value={stats.total}
          icon="🏫"
          color="blue"
        />

        <StatCard
          label="Available"
          value={stats.available}
          icon="✓"
          color="emerald"
        />

        <StatCard
          label="Occupied"
          value={stats.occupied}
          icon="●"
          color="amber"
        />

        <StatCard
          label="Maintenance"
          value={stats.maintenance}
          icon="🔧"
          color="red"
        />

        <StatCard
          label="Total Capacity"
          value={stats.capacity}
          icon="👥"
          color="purple"
        />
      </div>

      {/* FILTERS */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_200px_200px_auto]">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
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
              placeholder="Search room code, name or building..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
          >
            {roomTypes.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
          >
            {statusFilters.map(
              (status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              )
            )}
          </select>

          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl border border-slate-700 px-4 py-3 text-xs font-medium text-slate-500 transition hover:bg-slate-800 hover:text-white"
          >
            Reset
          </button>
        </div>
      </div>

      {/* ROOM GRID */}
      {filteredRooms.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-16 text-center">
          <div className="text-5xl">
            🏫
          </div>

          <h3 className="mt-4 font-semibold text-white">
            No rooms found
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            Try changing your filters or
            add a new room.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredRooms.map(
            (room) => (
              <RoomCard
                key={room.id}
                room={room}
                onView={() =>
                  setSelectedRoom(
                    room
                  )
                }
                onEdit={() =>
                  openEditModal(
                    room
                  )
                }
                onDelete={() =>
                  deleteRoom(
                    room.id
                  )
                }
                onStatusChange={(
                  status
                ) =>
                  updateStatus(
                    room.id,
                    status
                  )
                }
              />
            )
          )}
        </div>
      )}

      {/* FOOTER */}
      <div className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-600">
          Showing{" "}
          <span className="font-semibold text-slate-400">
            {filteredRooms.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-400">
            {rooms.length}
          </span>{" "}
          rooms
        </p>

        <p className="text-xs text-slate-600">
          Total capacity:{" "}
          <span className="font-semibold text-slate-400">
            {stats.capacity}
          </span>{" "}
          seats
        </p>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <RoomFormModal
          form={form}
          setForm={setForm}
          editingRoom={editingRoom}
          onClose={() =>
            setShowModal(false)
          }
          onSubmit={handleSubmit}
        />
      )}

      {/* DETAILS MODAL */}
      {selectedRoom && (
        <RoomDetailsModal
          room={selectedRoom}
          onClose={() =>
            setSelectedRoom(null)
          }
          onEdit={() => {
            openEditModal(
              selectedRoom
            );

            setSelectedRoom(null);
          }}
        />
      )}
    </div>
  );
}

/* =========================================
   ROOM CARD
========================================= */

function RoomCard({
  room,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700 hover:shadow-xl hover:shadow-black/10">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-xl">
          {getRoomIcon(room.type)}
        </div>

        <StatusBadge
          status={room.status}
        />
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-white">
            {room.name}
          </h3>
        </div>

        <p className="mt-1 text-xs font-medium text-blue-400">
          {room.code}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <InfoItem
          label="Building"
          value={room.building}
        />

        <InfoItem
          label="Floor"
          value={room.floor}
        />

        <InfoItem
          label="Capacity"
          value={`${room.capacity} seats`}
        />

        <InfoItem
          label="Type"
          value={room.type}
        />
      </div>

      <div className="mt-5">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
          Facilities
        </p>

        <div className="flex flex-wrap gap-1.5">
          {room.facilities.map(
            (facility) => (
              <span
                key={facility}
                className="rounded-lg border border-slate-800 bg-slate-800/50 px-2.5 py-1.5 text-[10px] text-slate-500"
              >
                {facility}
              </span>
            )
          )}
        </div>
      </div>

      <div className="mt-5 flex gap-2 border-t border-slate-800 pt-4">
        <button
          type="button"
          onClick={onView}
          className="flex-1 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          View
        </button>

        <button
          type="button"
          onClick={onEdit}
          className="flex-1 rounded-lg border border-blue-500/20 px-3 py-2 text-xs font-medium text-blue-400 transition hover:bg-blue-500/10"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg border border-red-500/20 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
        >
          Delete
        </button>
      </div>

      <div className="mt-3">
        <select
          value={room.status}
          onChange={(event) =>
            onStatusChange(
              event.target.value
            )
          }
          className="w-full rounded-lg border border-slate-800 bg-slate-800/50 px-3 py-2 text-xs text-slate-500 outline-none focus:border-blue-500"
        >
          <option value="Available">
            Available
          </option>

          <option value="Occupied">
            Occupied
          </option>

          <option value="Maintenance">
            Maintenance
          </option>
        </select>
      </div>
    </div>
  );
}

/* =========================================
   FORM MODAL
========================================= */

function RoomFormModal({
  form,
  setForm,
  editingRoom,
  onClose,
  onSubmit,
}) {
  const updateField = (
    field,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div>
            <p className="text-xs text-slate-600">
              Academic Facilities
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              {editingRoom
                ? "Edit Room"
                : "Add Room"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-5 p-6"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Room Code">
              <input
                required
                value={form.code}
                onChange={(event) =>
                  updateField(
                    "code",
                    event.target.value
                  )
                }
                placeholder="e.g. R-401"
                className="form-input"
              />
            </FormField>

            <FormField label="Room Name">
              <input
                required
                value={form.name}
                onChange={(event) =>
                  updateField(
                    "name",
                    event.target.value
                  )
                }
                placeholder="e.g. Smart Classroom 401"
                className="form-input"
              />
            </FormField>

            <FormField label="Building">
              <select
                value={form.building}
                onChange={(event) =>
                  updateField(
                    "building",
                    event.target.value
                  )
                }
                className="form-input"
              >
                <option>
                  Main Block
                </option>

                <option>
                  Science Block
                </option>

                <option>
                  Admin Block
                </option>

                <option>
                  Library Block
                </option>

                <option>
                  Management Block
                </option>
              </select>
            </FormField>

            <FormField label="Floor">
              <select
                value={form.floor}
                onChange={(event) =>
                  updateField(
                    "floor",
                    event.target.value
                  )
                }
                className="form-input"
              >
                <option>
                  Ground Floor
                </option>

                <option>
                  First Floor
                </option>

                <option>
                  Second Floor
                </option>

                <option>
                  Third Floor
                </option>

                <option>
                  Fourth Floor
                </option>
              </select>
            </FormField>

            <FormField label="Capacity">
              <input
                type="number"
                min="1"
                max="1000"
                value={form.capacity}
                onChange={(event) =>
                  updateField(
                    "capacity",
                    event.target.value
                  )
                }
                className="form-input"
              />
            </FormField>

            <FormField label="Room Type">
              <select
                value={form.type}
                onChange={(event) =>
                  updateField(
                    "type",
                    event.target.value
                  )
                }
                className="form-input"
              >
                <option>
                  Classroom
                </option>

                <option>
                  Laboratory
                </option>

                <option>
                  Seminar Hall
                </option>

                <option>
                  Auditorium
                </option>
              </select>
            </FormField>

            <FormField label="Status">
              <select
                value={form.status}
                onChange={(event) =>
                  updateField(
                    "status",
                    event.target.value
                  )
                }
                className="form-input"
              >
                <option>
                  Available
                </option>

                <option>
                  Occupied
                </option>

                <option>
                  Maintenance
                </option>
              </select>
            </FormField>

            <FormField label="Facilities">
              <input
                value={form.facilities}
                onChange={(event) =>
                  updateField(
                    "facilities",
                    event.target.value
                  )
                }
                placeholder="Projector, Wi-Fi, AC"
                className="form-input"
              />
            </FormField>
          </div>

          <div className="rounded-xl border border-blue-500/10 bg-blue-500/5 p-4">
            <p className="text-xs leading-5 text-slate-500">
              Tip: Separate multiple facilities
              with commas. These room details
              can later be consumed by the
              timetable generator for automatic
              room allocation and conflict
              detection.
            </p>
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-800 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 px-5 py-2.5 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
            >
              {editingRoom
                ? "Save Changes"
                : "Add Room"}
            </button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}

/* =========================================
   DETAILS MODAL
========================================= */

function RoomDetailsModal({
  room,
  onClose,
  onEdit,
}) {
  return (
    <ModalOverlay onClose={onClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="border-b border-slate-800 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-2xl">
                {getRoomIcon(
                  room.type
                )}
              </div>

              <div>
                <p className="text-xs font-semibold text-blue-400">
                  {room.code}
                </p>

                <h2 className="mt-1 text-xl font-semibold text-white">
                  {room.name}
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
        </div>

        <div className="space-y-5 p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Current Status
            </span>

            <StatusBadge
              status={room.status}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InfoBox
              label="Building"
              value={room.building}
            />

            <InfoBox
              label="Floor"
              value={room.floor}
            />

            <InfoBox
              label="Capacity"
              value={`${room.capacity} seats`}
            />

            <InfoBox
              label="Type"
              value={room.type}
            />
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
              Facilities
            </p>

            <div className="flex flex-wrap gap-2">
              {room.facilities.map(
                (facility) => (
                  <span
                    key={facility}
                    className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-400"
                  >
                    ✓ {facility}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-800 p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-5 py-2.5 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
          >
            Edit Room
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

/* =========================================
   COMMON COMPONENTS
========================================= */

function StatCard({
  label,
  value,
  icon,
  color,
}) {
  const colors = {
    blue:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",

    emerald:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",

    amber:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",

    red:
      "border-red-500/20 bg-red-500/10 text-red-400",

    purple:
      "border-purple-500/20 bg-purple-500/10 text-purple-400",
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

      <p className="mt-4 text-xs text-slate-500">
        {label}
      </p>
    </div>
  );
}

function InfoItem({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-slate-700">
        {label}
      </p>

      <p className="mt-1 truncate text-xs text-slate-400">
        {value}
      </p>
    </div>
  );
}

function InfoBox({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
      <p className="text-[10px] uppercase tracking-wide text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-300">
        {value}
      </p>
    </div>
  );
}

function FormField({
  label,
  children,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-500">
        {label}
      </label>

      {children}
    </div>
  );
}

function ModalOverlay({
  children,
  onClose,
}) {
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      {children}
    </div>
  );
}

function StatusBadge({
  status,
}) {
  const config = {
    Available: {
      classes:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
      dot: "bg-emerald-400",
    },

    Occupied: {
      classes:
        "border-amber-500/20 bg-amber-500/10 text-amber-400",
      dot: "bg-amber-400",
    },

    Maintenance: {
      classes:
        "border-red-500/20 bg-red-500/10 text-red-400",
      dot: "bg-red-400",
    },
  };

  const current =
    config[status] ||
    config.Available;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-semibold ${current.classes}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${current.dot}`}
      />

      {status}
    </span>
  );
}

function getRoomIcon(type) {
  const icons = {
    Classroom: "🏫",
    Laboratory: "💻",
    "Seminar Hall": "🎤",
    Auditorium: "🎭",
  };

  return icons[type] || "🏫";
}

export default Rooms;
