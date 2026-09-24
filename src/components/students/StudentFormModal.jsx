import React, { useEffect, useState } from "react";
import {
  X,
  Save,
  UserPlus,
} from "lucide-react";

const emptyForm = {
  name: "",
  rollNumber: "",
  email: "",
  phone: "",
  departmentId: "",
  courseId: "",
  year: 1,
  semester: 1,
  section: "A",
  gender: "Male",
  admissionYear: new Date().getFullYear(),
  status: "active",
};

export default function StudentFormModal({
  open,
  student,
  departments,
  courses,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (student) {
      setForm({
        ...emptyForm,
        ...student,
      });
    } else {
      setForm(emptyForm);
    }
  }, [student, open]);

  if (!open) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        ["year", "semester", "admissionYear"].includes(name)
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) return;
    if (!form.rollNumber.trim()) return;
    if (!form.email.trim()) return;

    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10">
              <UserPlus size={20} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                {student ? "Edit Student" : "Add Student"}
              </h2>

              <p className="text-xs text-slate-500">
                Manage student academic information
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid max-h-[70vh] grid-cols-1 gap-5 overflow-y-auto p-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Full Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter student's full name"
                className="form-input"
                required
              />
            </div>

            <Field
              label="Roll Number"
              name="rollNumber"
              value={form.rollNumber}
              onChange={handleChange}
              placeholder="e.g. CSE3A001"
              required
            />

            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="student@college.edu"
              required
            />

            <Field
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
            />

            <Select
              label="Department"
              name="departmentId"
              value={form.departmentId}
              onChange={handleChange}
              options={departments.map((department) => ({
                value: department.id,
                label: department.name,
              }))}
            />

            <Select
              label="Course"
              name="courseId"
              value={form.courseId}
              onChange={handleChange}
              options={courses.map((course) => ({
                value: course.id,
                label: course.name,
              }))}
            />

            <Select
              label="Year"
              name="year"
              value={form.year}
              onChange={handleChange}
              options={[
                { value: 1, label: "Year 1" },
                { value: 2, label: "Year 2" },
                { value: 3, label: "Year 3" },
                { value: 4, label: "Year 4" },
              ]}
            />

            <Select
              label="Semester"
              name="semester"
              value={form.semester}
              onChange={handleChange}
              options={Array.from(
                { length: 8 },
                (_, index) => ({
                  value: index + 1,
                  label: `Semester ${index + 1}`,
                })
              )}
            />

            <Select
              label="Section"
              name="section"
              value={form.section}
              onChange={handleChange}
              options={[
                { value: "A", label: "Section A" },
                { value: "B", label: "Section B" },
                { value: "C", label: "Section C" },
              ]}
            />

            <Select
              label="Gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
            />

            <Field
              label="Admission Year"
              name="admissionYear"
              type="number"
              value={form.admissionYear}
              onChange={handleChange}
            />

            <Select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
            >
              <Save size={17} />
              {student ? "Save Changes" : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="form-input"
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>

      <select
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className="form-input"
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
