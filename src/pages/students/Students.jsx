import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Plus,
  Download,
  Upload,
  Trash2,
  Users,
  RefreshCw,
} from "lucide-react";

import { useAppStore } from "../../store/appStore";

import StudentStats from "../../components/students/StudentStats";
import StudentFilters from "../../components/students/StudentFilters";
import StudentTable from "../../components/students/StudentTable";
import StudentFormModal from "../../components/students/StudentFormModal";
import StudentDetailsModal from "../../components/students/StudentDetailsModal";

import {
  filterStudents,
  searchStudents,
} from "../../services/studentService";

export default function Students() {
  const students = useAppStore(
    (state) => state.students
  );

  const departments = useAppStore(
    (state) => state.departments
  );

  const courses = useAppStore(
    (state) => state.courses
  );

  const attendance = useAppStore(
    (state) => state.attendance
  );

  const subjects = useAppStore(
    (state) => state.subjects
  );

  const addStudent = useAppStore(
    (state) => state.addStudent
  );

  const updateStudent = useAppStore(
    (state) => state.updateStudent
  );

  const deleteStudent = useAppStore(
    (state) => state.deleteStudent
  );

  const resetData = useAppStore(
    (state) => state.resetData
  );

  const [filters, setFilters] = useState({
    search: "",
    departmentId: "",
    courseId: "",
    year: "",
    semester: "",
    section: "",
    status: "",
  });

  const [selectedIds, setSelectedIds] =
    useState([]);

  const [formOpen, setFormOpen] =
    useState(false);

  const [editingStudent, setEditingStudent] =
    useState(null);

  const [viewingStudent, setViewingStudent] =
    useState(null);

  const [page, setPage] = useState(1);

  const [pageSize] = useState(15);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const filteredStudents = useMemo(() => {
    let result = searchStudents(
      students,
      filters.search
    );

    result = filterStudents(
      result,
      filters
    );

    return result;
  }, [students, filters]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredStudents.length / pageSize
    )
  );

  const paginatedStudents = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filteredStudents.slice(
      start,
      start + pageSize
    );
  }, [
    filteredStudents,
    page,
    pageSize,
  ]);

  const openAddModal = () => {
    setEditingStudent(null);
    setFormOpen(true);
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setFormOpen(true);
  };

  const handleSaveStudent = (form) => {
    if (editingStudent) {
      updateStudent(
        editingStudent.id,
        form
      );
    } else {
      addStudent(form);
    }

    setFormOpen(false);
    setEditingStudent(null);
  };

  const handleDelete = (student) => {
    const confirmed = window.confirm(
      `Delete ${student.name}? This action cannot be undone.`
    );

    if (!confirmed) return;

    deleteStudent(student.id);

    setSelectedIds((previous) =>
      previous.filter(
        (id) => id !== student.id
      )
    );
  };

  const handleBulkDelete = () => {
    if (!selectedIds.length) return;

    const confirmed = window.confirm(
      `Delete ${selectedIds.length} selected student(s)?`
    );

    if (!confirmed) return;

    selectedIds.forEach((id) =>
      deleteStudent(id)
    );

    setSelectedIds([]);
  };

  const handleExport = () => {
    const headers = [
      "ID",
      "Roll Number",
      "Name",
      "Email",
      "Phone",
      "Department",
      "Course",
      "Year",
      "Semester",
      "Section",
      "Gender",
      "Status",
      "Attendance",
    ];

    const rows = filteredStudents.map(
      (student) => {
        const department =
          departments.find(
            (item) =>
              item.id ===
              student.departmentId
          );

        const course = courses.find(
          (item) =>
            item.id === student.courseId
        );

        return [
          student.id,
          student.rollNumber,
          student.name,
          student.email,
          student.phone,
          department?.code || "",
          course?.code || "",
          student.year,
          student.semester,
          student.section,
          student.gender,
          student.status,
          student.attendancePercentage,
        ];
      }
    );

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value ?? "").replace(
              /"/g,
              '""'
            )}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "students-export.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleResetData = () => {
    const confirmed = window.confirm(
      "Reset all application data to the original demo dataset?"
    );

    if (!confirmed) return;

    resetData();

    setSelectedIds([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10">
              <Users size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Student Management
              </h1>

              <p className="text-sm text-slate-500">
                Manage student records, academic
                information and attendance.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Download size={17} />
            Export
          </button>

          <button
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Upload size={17} />
            Import
          </button>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Student
          </button>
        </div>
      </div>

      <StudentStats
        students={students}
      />

      <StudentFilters
        filters={filters}
        setFilters={setFilters}
        departments={departments}
        courses={courses}
      />

      {selectedIds.length > 0 && (
        <div className="flex flex-col justify-between gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 dark:border-indigo-500/20 dark:bg-indigo-500/5 sm:flex-row sm:items-center">
          <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            {selectedIds.length} student
            {selectedIds.length !== 1
              ? "s"
              : ""}{" "}
            selected
          </p>

          <button
            onClick={handleBulkDelete}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            <Trash2 size={16} />
            Delete Selected
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {filteredStudents.length}
            </span>{" "}
            students
          </p>
        </div>

        <button
          onClick={handleResetData}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <RefreshCw size={14} />
          Reset Demo Data
        </button>
      </div>

      <StudentTable
        students={paginatedStudents}
        departments={departments}
        courses={courses}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        onView={setViewingStudent}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      {filteredStudents.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() =>
                setPage((value) =>
                  Math.max(1, value - 1)
                )
              }
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700"
            >
              Previous
            </button>

            <button
              disabled={page >= totalPages}
              onClick={() =>
                setPage((value) =>
                  Math.min(
                    totalPages,
                    value + 1
                  )
                )
              }
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <StudentFormModal
        open={formOpen}
        student={editingStudent}
        departments={departments}
        courses={courses}
        onClose={() => {
          setFormOpen(false);
          setEditingStudent(null);
        }}
        onSave={handleSaveStudent}
      />

      <StudentDetailsModal
        student={viewingStudent}
        attendance={attendance}
        departments={departments}
        courses={courses}
        subjects={subjects}
        onClose={() =>
          setViewingStudent(null)
        }
      />
    </div>
  );
}
