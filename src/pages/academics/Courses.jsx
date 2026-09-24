import React, { useMemo, useState } from "react";

const initialCourses = [
  {
    id: 1,
    code: "CS601",
    name: "Machine Learning",
    department: "Computer Science",
    semester: "6",
    credits: 4,
    type: "Core",
    hours: 4,
    teacher: "Dr. Ananya Sharma",
    status: "Active",
  },
  {
    id: 2,
    code: "CS602",
    name: "Web Technologies",
    department: "Computer Science",
    semester: "6",
    credits: 3,
    type: "Core",
    hours: 4,
    teacher: "Prof. Rahul Mehta",
    status: "Active",
  },
  {
    id: 3,
    code: "CS603",
    name: "Cloud Computing",
    department: "Computer Science",
    semester: "6",
    credits: 3,
    type: "Elective",
    hours: 3,
    teacher: "Dr. Priya Nair",
    status: "Active",
  },
  {
    id: 4,
    code: "IT601",
    name: "Information Security",
    department: "Information Technology",
    semester: "6",
    credits: 4,
    type: "Core",
    hours: 4,
    teacher: "Prof. Vikram Singh",
    status: "Active",
  },
  {
    id: 5,
    code: "EC501",
    name: "Digital Signal Processing",
    department: "Electronics",
    semester: "5",
    credits: 4,
    type: "Core",
    hours: 5,
    teacher: "Dr. Neha Kapoor",
    status: "Active",
  },
  {
    id: 6,
    code: "ME401",
    name: "Thermodynamics",
    department: "Mechanical",
    semester: "4",
    credits: 4,
    type: "Core",
    hours: 5,
    teacher: "Prof. Arjun Rao",
    status: "Active",
  },
  {
    id: 7,
    code: "HS301",
    name: "Professional Communication",
    department: "Humanities",
    semester: "3",
    credits: 2,
    type: "Foundation",
    hours: 2,
    teacher: "Dr. Meera Joshi",
    status: "Active",
  },
];

const emptyForm = {
  code: "",
  name: "",
  department: "Computer Science",
  semester: "1",
  credits: "3",
  type: "Core",
  hours: "3",
  teacher: "",
  status: "Active",
};

function Courses() {
  const [courses, setCourses] = useState(initialCourses);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [semesterFilter, setSemesterFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [notification, setNotification] = useState("");

  const departments = useMemo(
    () => [...new Set(courses.map((course) => course.department))],
    [courses]
  );

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesSearch =
        !query ||
        course.code.toLowerCase().includes(query) ||
        course.name.toLowerCase().includes(query) ||
        course.department.toLowerCase().includes(query) ||
        course.teacher.toLowerCase().includes(query);

      const matchesDepartment =
        departmentFilter === "all" ||
        course.department === departmentFilter;

      const matchesType =
        typeFilter === "all" ||
        course.type === typeFilter;

      const matchesSemester =
        semesterFilter === "all" ||
        course.semester === semesterFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesType &&
        matchesSemester
      );
    });
  }, [
    courses,
    search,
    departmentFilter,
    typeFilter,
    semesterFilter,
  ]);

  const statistics = useMemo(() => {
    const totalCredits = courses.reduce(
      (sum, course) => sum + Number(course.credits || 0),
      0
    );

    const totalHours = courses.reduce(
      (sum, course) => sum + Number(course.hours || 0),
      0
    );

    const coreCourses = courses.filter(
      (course) => course.type === "Core"
    ).length;

    const electiveCourses = courses.filter(
      (course) => course.type === "Elective"
    ).length;

    return {
      total: courses.length,
      totalCredits,
      totalHours,
      coreCourses,
      electiveCourses,
    };
  }, [courses]);

  const showNotification = (message) => {
    setNotification(message);

    window.setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const openAddModal = () => {
    setEditingCourse(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (course) => {
    setEditingCourse(course);

    setForm({
      code: course.code,
      name: course.name,
      department: course.department,
      semester: course.semester,
      credits: String(course.credits),
      type: course.type,
      hours: String(course.hours),
      teacher: course.teacher,
      status: course.status,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCourse(null);
    setForm(emptyForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.code.trim() ||
      !form.name.trim() ||
      !form.teacher.trim()
    ) {
      showNotification(
        "Please complete all required fields."
      );
      return;
    }

    const courseData = {
      ...form,
      code: form.code.trim().toUpperCase(),
      name: form.name.trim(),
      teacher: form.teacher.trim(),
      credits: Number(form.credits || 0),
      hours: Number(form.hours || 0),
    };

    if (editingCourse) {
      setCourses((current) =>
        current.map((course) =>
          course.id === editingCourse.id
            ? {
                ...course,
                ...courseData,
              }
            : course
        )
      );

      showNotification("Course updated successfully.");
    } else {
      setCourses((current) => [
        {
          id: Date.now(),
          ...courseData,
        },
        ...current,
      ]);

      showNotification("Course created successfully.");
    }

    closeModal();
  };

  const deleteCourse = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) return;

    setCourses((current) =>
      current.filter((course) => course.id !== id)
    );

    if (selectedCourse?.id === id) {
      setSelectedCourse(null);
    }

    showNotification("Course deleted successfully.");
  };

  const toggleStatus = (id) => {
    setCourses((current) =>
      current.map((course) =>
        course.id === id
          ? {
              ...course,
              status:
                course.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : course
      )
    );

    showNotification("Course status updated.");
  };

  const clearFilters = () => {
    setSearch("");
    setDepartmentFilter("all");
    setTypeFilter("all");
    setSemesterFilter("all");
  };

  const resetData = () => {
    setCourses(initialCourses);
    clearFilters();
    setSelectedCourse(null);
    showNotification("Course data restored.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Courses
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage subjects, course credits, teaching hours
            and faculty assignments.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={resetData}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Reset Data
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            + Add Course
          </button>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-400">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
            ✓
          </span>

          {notification}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Total Courses"
          value={statistics.total}
          color="text-white"
        />

        <StatCard
          label="Total Credits"
          value={statistics.totalCredits}
          color="text-blue-400"
        />

        <StatCard
          label="Weekly Hours"
          value={statistics.totalHours}
          color="text-purple-400"
        />

        <StatCard
          label="Core Courses"
          value={statistics.coreCourses}
          color="text-emerald-400"
        />

        <StatCard
          label="Electives"
          value={statistics.electiveCourses}
          color="text-amber-400"
        />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-5">
          <h2 className="font-semibold text-white">
            Search & Filters
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Filter courses by department, semester and
            course category.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div className="xl:col-span-2">
            <label className="mb-2 block text-xs font-medium text-slate-500">
              Search
            </label>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search code, course, teacher..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">
              Department
            </label>

            <select
              value={departmentFilter}
              onChange={(event) =>
                setDepartmentFilter(event.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
            >
              <option value="all">
                All Departments
              </option>

              {departments.map((department) => (
                <option
                  key={department}
                  value={department}
                >
                  {department}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">
              Semester
            </label>

            <select
              value={semesterFilter}
              onChange={(event) =>
                setSemesterFilter(event.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
            >
              <option value="all">
                All Semesters
              </option>

              {Array.from(
                { length: 8 },
                (_, index) => String(index + 1)
              ).map((semester) => (
                <option key={semester} value={semester}>
                  Semester {semester}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">
              Type
            </label>

            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="Core">Core</option>
              <option value="Elective">Elective</option>
              <option value="Foundation">
                Foundation
              </option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Course Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-6 py-5">
          <h2 className="font-semibold text-white">
            Course Directory
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            {filteredCourses.length} course
            {filteredCourses.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="bg-slate-800/40">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Course
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Department
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Semester
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Credits
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Hours
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Faculty
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Type
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {filteredCourses.map((course) => (
                  <tr
                    key={course.id}
                    className="transition hover:bg-slate-800/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-xs font-bold text-blue-400">
                          {course.code.slice(0, 2)}
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            {course.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {course.code}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-400">
                      {course.department}
                    </td>

                    <td className="px-6 py-4 text-center text-sm text-slate-300">
                      {course.semester}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold text-white">
                        {course.credits}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center text-sm text-slate-300">
                      {course.hours}h
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-400">
                      {course.teacher}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          course.type === "Core"
                            ? "bg-blue-500/10 text-blue-400"
                            : course.type === "Elective"
                            ? "bg-purple-500/10 text-purple-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {course.type}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          toggleStatus(course.id)
                        }
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          course.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-slate-700 text-slate-400"
                        }`}
                      >
                        {course.status}
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedCourse(course)
                          }
                          className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(course)
                          }
                          className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-amber-500 hover:text-amber-400"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteCourse(course.id)
                          }
                          className="rounded-lg border border-red-500/20 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-2xl text-slate-500">
              ◌
            </div>

            <h3 className="mt-4 font-semibold text-white">
              No courses found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {editingCourse
                    ? "Edit Course"
                    : "Add New Course"}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Configure course, academic and faculty
                  information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="text-xl text-slate-500 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormInput
                  label="Course Code *"
                  value={form.code}
                  placeholder="e.g. CS601"
                  onChange={(value) =>
                    updateForm("code", value)
                  }
                />

                <FormInput
                  label="Course Name *"
                  value={form.name}
                  placeholder="e.g. Machine Learning"
                  onChange={(value) =>
                    updateForm("name", value)
                  }
                />

                <FormSelect
                  label="Department"
                  value={form.department}
                  onChange={(value) =>
                    updateForm("department", value)
                  }
                  options={[
                    "Computer Science",
                    "Information Technology",
                    "Electronics",
                    "Mechanical",
                    "Civil",
                    "Humanities",
                  ]}
                />

                <FormSelect
                  label="Semester"
                  value={form.semester}
                  onChange={(value) =>
                    updateForm("semester", value)
                  }
                  options={Array.from(
                    { length: 8 },
                    (_, index) =>
                      String(index + 1)
                  )}
                  prefix="Semester "
                />

                <FormInput
                  label="Credits"
                  type="number"
                  min="0"
                  value={form.credits}
                  placeholder="3"
                  onChange={(value) =>
                    updateForm("credits", value)
                  }
                />

                <FormInput
                  label="Weekly Hours"
                  type="number"
                  min="1"
                  value={form.hours}
                  placeholder="3"
                  onChange={(value) =>
                    updateForm("hours", value)
                  }
                />

                <FormSelect
                  label="Course Type"
                  value={form.type}
                  onChange={(value) =>
                    updateForm("type", value)
                  }
                  options={[
                    "Core",
                    "Elective",
                    "Foundation",
                  ]}
                />

                <FormInput
                  label="Assigned Faculty *"
                  value={form.teacher}
                  placeholder="Teacher name"
                  onChange={(value) =>
                    updateForm("teacher", value)
                  }
                />

                <FormSelect
                  label="Status"
                  value={form.status}
                  onChange={(value) =>
                    updateForm("status", value)
                  }
                  options={["Active", "Inactive"]}
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  {editingCourse
                    ? "Save Changes"
                    : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Course Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedCourse.code}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="text-xl text-slate-500 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <p className="text-xs text-slate-500">
                  Course
                </p>

                <p className="mt-1 text-xl font-semibold text-white">
                  {selectedCourse.name}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Detail
                  label="Department"
                  value={selectedCourse.department}
                />

                <Detail
                  label="Semester"
                  value={`Semester ${selectedCourse.semester}`}
                />

                <Detail
                  label="Credits"
                  value={selectedCourse.credits}
                />

                <Detail
                  label="Weekly Hours"
                  value={`${selectedCourse.hours} hours`}
                />

                <Detail
                  label="Course Type"
                  value={selectedCourse.type}
                />

                <Detail
                  label="Status"
                  value={selectedCourse.status}
                />
              </div>

              <div className="rounded-xl bg-slate-800/70 p-4">
                <p className="text-xs text-slate-500">
                  Assigned Faculty
                </p>

                <p className="mt-1 font-medium text-white">
                  {selectedCourse.teacher}
                </p>
              </div>

              <div className="flex justify-end border-t border-slate-800 pt-5">
                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
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

function StatCard({ label, value, color }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-slate-500">{label}</p>

      <p
        className={`mt-2 text-3xl font-bold ${color}`}
      >
        {value}
      </p>
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        type={type}
        min={min}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
      />
    </div>
  );
}

function FormSelect({
  label,
  value,
  onChange,
  options,
  prefix = "",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {prefix}
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-800/70 p-4">
      <p className="text-xs text-slate-500">{label}</p>

      <p className="mt-1 text-sm font-medium text-white">
        {value}
      </p>
    </div>
  );
}

export default Courses;
