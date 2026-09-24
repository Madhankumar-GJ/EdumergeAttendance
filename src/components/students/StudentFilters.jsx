import React from "react";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

export default function StudentFilters({
  filters,
  setFilters,
  departments,
  courses,
}) {
  const updateFilter = (key, value) => {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      departmentId: "",
      courseId: "",
      year: "",
      semester: "",
      section: "",
      status: "",
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={18}
            className="text-indigo-500"
          />

          <h3 className="font-semibold text-slate-900 dark:text-white">
            Student Filters
          </h3>
        </div>

        <button
          onClick={resetFilters}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <RotateCcw size={15} />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        <div className="relative lg:col-span-2 xl:col-span-2">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={filters.search}
            onChange={(event) =>
              updateFilter("search", event.target.value)
            }
            placeholder="Search name, roll no, email..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <select
          value={filters.departmentId}
          onChange={(event) =>
            updateFilter(
              "departmentId",
              event.target.value
            )
          }
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="">All Departments</option>

          {departments.map((department) => (
            <option
              key={department.id}
              value={department.id}
            >
              {department.code}
            </option>
          ))}
        </select>

        <select
          value={filters.courseId}
          onChange={(event) =>
            updateFilter("courseId", event.target.value)
          }
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="">All Courses</option>

          {courses.map((course) => (
            <option
              key={course.id}
              value={course.id}
            >
              {course.code}
            </option>
          ))}
        </select>

        <select
          value={filters.year}
          onChange={(event) =>
            updateFilter("year", event.target.value)
          }
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="">All Years</option>
          <option value="1">Year 1</option>
          <option value="2">Year 2</option>
          <option value="3">Year 3</option>
          <option value="4">Year 4</option>
        </select>

        <select
          value={filters.section}
          onChange={(event) =>
            updateFilter("section", event.target.value)
          }
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="">All Sections</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
        </select>

        <select
          value={filters.status}
          onChange={(event) =>
            updateFilter("status", event.target.value)
          }
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}
