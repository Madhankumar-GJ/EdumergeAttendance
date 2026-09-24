import React, { useEffect, useState } from "react";

const DEFAULT_SETTINGS = {
  institutionName: "Attendance Management System",
  institutionCode: "AMS",
  academicYear: "2025-26",
  semester: "Semester 1",
  timezone: "Asia/Kolkata",
  attendanceThreshold: 75,
  criticalThreshold: 65,
  autoMarkLate: true,
  allowManualCorrection: true,
  requireCorrectionReason: true,
  enableNotifications: true,
  emailNotifications: false,
  lowAttendanceAlerts: true,
  leaveNotifications: true,
  timetableConflictAlerts: true,
  darkMode: true,
  compactTables: false,
  showStudentPhotos: true,
};

function Settings() {
  const [settings, setSettings] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            "ams_settings"
          );

        return saved
          ? {
              ...DEFAULT_SETTINGS,
              ...JSON.parse(saved),
            }
          : DEFAULT_SETTINGS;
      } catch {
        return DEFAULT_SETTINGS;
      }
    });

  const [activeSection, setActiveSection] =
    useState("general");

  const [saved, setSaved] =
    useState(false);

  const [resetting, setResetting] =
    useState(false);

  useEffect(() => {
    document.documentElement.classList.add(
      "dark"
    );
  }, []);

  const updateSetting = (
    key,
    value
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  };

  const saveSettings = () => {
    localStorage.setItem(
      "ams_settings",
      JSON.stringify(settings)
    );

    window.dispatchEvent(
      new Event("ams-settings-updated")
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const resetSettings = () => {
    const confirmed =
      window.confirm(
        "Reset all system settings to their default values?"
      );

    if (!confirmed) return;

    setResetting(true);

    setTimeout(() => {
      setSettings(DEFAULT_SETTINGS);

      localStorage.setItem(
        "ams_settings",
        JSON.stringify(DEFAULT_SETTINGS)
      );

      setResetting(false);
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    }, 300);
  };

  const sections = [
    {
      id: "general",
      label: "General",
      icon: "⚙️",
    },
    {
      id: "attendance",
      label: "Attendance",
      icon: "✓",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: "🔔",
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: "🎨",
    },
    {
      id: "system",
      label: "System",
      icon: "🛠️",
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Administration / Settings
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            System Settings
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Configure attendance rules,
            notifications, appearance and
            institution preferences.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={resetSettings}
            disabled={resetting}
            className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-50"
          >
            {resetting
              ? "Resetting..."
              : "Reset Defaults"}
          </button>

          <button
            type="button"
            onClick={saveSettings}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* SUCCESS MESSAGE */}
      {saved && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-400">
          ✓ Settings saved successfully.
        </div>
      )}

      {/* SETTINGS LAYOUT */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        {/* SIDEBAR */}
        <div className="h-fit rounded-2xl border border-slate-800 bg-slate-900 p-3">
          <div className="mb-3 px-3 pt-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-700">
              Configuration
            </p>
          </div>

          <div className="space-y-1">
            {sections.map(
              (section) => {
                const active =
                  activeSection ===
                  section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() =>
                      setActiveSection(
                        section.id
                      )
                    }
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                      active
                        ? "bg-blue-600/10 text-blue-400"
                        : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                    }`}
                  >
                    <span>
                      {section.icon}
                    </span>

                    <span className="font-medium">
                      {section.label}
                    </span>

                    {active && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400" />
                    )}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="min-w-0">
          {activeSection ===
            "general" && (
            <GeneralSettings
              settings={settings}
              updateSetting={
                updateSetting
              }
            />
          )}

          {activeSection ===
            "attendance" && (
            <AttendanceSettings
              settings={settings}
              updateSetting={
                updateSetting
              }
            />
          )}

          {activeSection ===
            "notifications" && (
            <NotificationSettings
              settings={settings}
              updateSetting={
                updateSetting
              }
            />
          )}

          {activeSection ===
            "appearance" && (
            <AppearanceSettings
              settings={settings}
              updateSetting={
                updateSetting
              }
            />
          )}

          {activeSection ===
            "system" && (
            <SystemSettings
              settings={settings}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================
   GENERAL SETTINGS
========================================= */

function GeneralSettings({
  settings,
  updateSetting,
}) {
  return (
    <SettingsCard
      title="General Settings"
      description="Basic information about your institution and current academic period."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Institution Name">
          <input
            value={settings.institutionName}
            onChange={(event) =>
              updateSetting(
                "institutionName",
                event.target.value
              )
            }
            className="settings-input"
          />
        </Field>

        <Field label="Institution Code">
          <input
            value={settings.institutionCode}
            onChange={(event) =>
              updateSetting(
                "institutionCode",
                event.target.value
              )
            }
            className="settings-input"
          />
        </Field>

        <Field label="Academic Year">
          <select
            value={settings.academicYear}
            onChange={(event) =>
              updateSetting(
                "academicYear",
                event.target.value
              )
            }
            className="settings-input"
          >
            <option>
              2025-26
            </option>
            <option>
              2026-27
            </option>
            <option>
              2027-28
            </option>
          </select>
        </Field>

        <Field label="Current Semester">
          <select
            value={settings.semester}
            onChange={(event) =>
              updateSetting(
                "semester",
                event.target.value
              )
            }
            className="settings-input"
          >
            <option>
              Semester 1
            </option>
            <option>
              Semester 2
            </option>
            <option>
              Semester 3
            </option>
            <option>
              Semester 4
            </option>
            <option>
              Semester 5
            </option>
            <option>
              Semester 6
            </option>
            <option>
              Semester 7
            </option>
            <option>
              Semester 8
            </option>
          </select>
        </Field>

        <Field label="Timezone">
          <select
            value={settings.timezone}
            onChange={(event) =>
              updateSetting(
                "timezone",
                event.target.value
              )
            }
            className="settings-input"
          >
            <option value="Asia/Kolkata">
              India Standard Time
            </option>

            <option value="UTC">
              UTC
            </option>

            <option value="Asia/Dubai">
              Gulf Standard Time
            </option>

            <option value="Asia/Singapore">
              Singapore Time
            </option>
          </select>
        </Field>
      </div>
    </SettingsCard>
  );
}

/* =========================================
   ATTENDANCE SETTINGS
========================================= */

function AttendanceSettings({
  settings,
  updateSetting,
}) {
  return (
    <div className="space-y-5">
      <SettingsCard
        title="Attendance Rules"
        description="Define the rules used when calculating student attendance status."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Minimum Attendance %">
            <input
              type="number"
              min="0"
              max="100"
              value={
                settings.attendanceThreshold
              }
              onChange={(event) =>
                updateSetting(
                  "attendanceThreshold",
                  Number(
                    event.target.value
                  )
                )
              }
              className="settings-input"
            />

            <p className="mt-2 text-[11px] text-slate-600">
              Students below this value are
              considered to have attendance
              shortage.
            </p>
          </Field>

          <Field label="Critical Attendance %">
            <input
              type="number"
              min="0"
              max="100"
              value={
                settings.criticalThreshold
              }
              onChange={(event) =>
                updateSetting(
                  "criticalThreshold",
                  Number(
                    event.target.value
                  )
                )
              }
              className="settings-input"
            />

            <p className="mt-2 text-[11px] text-slate-600">
              Students below this value are
              shown as critical.
            </p>
          </Field>
        </div>
      </SettingsCard>

      <SettingsCard
        title="Attendance Workflow"
        description="Control how attendance records can be created and corrected."
      >
        <div className="space-y-1">
          <Toggle
            label="Automatically mark late students"
            description="Apply the Late status when a student enters after the configured grace period."
            checked={
              settings.autoMarkLate
            }
            onChange={(value) =>
              updateSetting(
                "autoMarkLate",
                value
              )
            }
          />

          <Toggle
            label="Allow manual attendance correction"
            description="Teachers and authorized staff can correct previously submitted attendance."
            checked={
              settings.allowManualCorrection
            }
            onChange={(value) =>
              updateSetting(
                "allowManualCorrection",
                value
              )
            }
          />

          <Toggle
            label="Require correction reason"
            description="Require a reason whenever an existing attendance record is modified."
            checked={
              settings.requireCorrectionReason
            }
            onChange={(value) =>
              updateSetting(
                "requireCorrectionReason",
                value
              )
            }
          />
        </div>
      </SettingsCard>
    </div>
  );
}

/* =========================================
   NOTIFICATION SETTINGS
========================================= */

function NotificationSettings({
  settings,
  updateSetting,
}) {
  return (
    <SettingsCard
      title="Notification Settings"
      description="Choose which system events should generate notifications."
    >
      <div className="space-y-1">
        <Toggle
          label="Enable notifications"
          description="Enable in-app notifications throughout the system."
          checked={
            settings.enableNotifications
          }
          onChange={(value) =>
            updateSetting(
              "enableNotifications",
              value
            )
          }
        />

        <Toggle
          label="Email notifications"
          description="Allow the system to send supported notifications through email."
          checked={
            settings.emailNotifications
          }
          onChange={(value) =>
            updateSetting(
              "emailNotifications",
              value
            )
          }
        />

        <Toggle
          label="Low attendance alerts"
          description="Notify when a student's attendance falls below the configured threshold."
          checked={
            settings.lowAttendanceAlerts
          }
          onChange={(value) =>
            updateSetting(
              "lowAttendanceAlerts",
              value
            )
          }
        />

        <Toggle
          label="Leave notifications"
          description="Notify relevant staff and teachers about leave requests and decisions."
          checked={
            settings.leaveNotifications
          }
          onChange={(value) =>
            updateSetting(
              "leaveNotifications",
              value
            )
          }
        />

        <Toggle
          label="Timetable conflict alerts"
          description="Notify administrators when timetable generation detects resource conflicts."
          checked={
            settings.timetableConflictAlerts
          }
          onChange={(value) =>
            updateSetting(
              "timetableConflictAlerts",
              value
            )
          }
        />
      </div>
    </SettingsCard>
  );
}

/* =========================================
   APPEARANCE SETTINGS
========================================= */

function AppearanceSettings({
  settings,
  updateSetting,
}) {
  return (
    <div className="space-y-5">
      <SettingsCard
        title="Appearance"
        description="Customize the way the administration interface is displayed."
      >
        <div className="space-y-1">
          <Toggle
            label="Dark mode"
            description="Use the dark interface throughout the administration system."
            checked={
              settings.darkMode
            }
            onChange={(value) =>
              updateSetting(
                "darkMode",
                value
              )
            }
          />

          <Toggle
            label="Compact tables"
            description="Reduce row spacing in large student, staff and attendance tables."
            checked={
              settings.compactTables
            }
            onChange={(value) =>
              updateSetting(
                "compactTables",
                value
              )
            }
          />

          <Toggle
            label="Show student photos"
            description="Display student profile photographs in supported lists and attendance screens."
            checked={
              settings.showStudentPhotos
            }
            onChange={(value) =>
              updateSetting(
                "showStudentPhotos",
                value
              )
            }
          />
        </div>
      </SettingsCard>

      <SettingsCard
        title="Interface Preview"
        description="Preview some of the visual states used by the system."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <PreviewBox
            title="Normal"
            color="blue"
            text="Active"
          />

          <PreviewBox
            title="Warning"
            color="amber"
            text="Low Attendance"
          />

          <PreviewBox
            title="Critical"
            color="red"
            text="Shortage"
          />
        </div>
      </SettingsCard>
    </div>
  );
}

/* =========================================
   SYSTEM SETTINGS
========================================= */

function SystemSettings({
  settings,
}) {
  const [storageSize, setStorageSize] =
    useState("Calculating...");

  useEffect(() => {
    try {
      let total = 0;

      for (
        let index = 0;
        index < localStorage.length;
        index += 1
      ) {
        const key =
          localStorage.key(index);

        if (!key) continue;

        const value =
          localStorage.getItem(key) ||
          "";

        total +=
          key.length +
          value.length;
      }

      const kb =
        total / 1024;

      setStorageSize(
        `${kb.toFixed(2)} KB`
      );
    } catch {
      setStorageSize(
        "Unavailable"
      );
    }
  }, []);

  const clearApplicationCache =
    () => {
      const confirmed =
        window.confirm(
          "Clear application cache? This will remove locally stored application data."
        );

      if (!confirmed) return;

      const keysToRemove = [];

      for (
        let index = 0;
        index < localStorage.length;
        index += 1
      ) {
        const key =
          localStorage.key(index);

        if (
          key &&
          key.startsWith("ams_")
        ) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(
        (key) =>
          localStorage.removeItem(key)
      );

      window.location.reload();
    };

  return (
    <div className="space-y-5">
      <SettingsCard
        title="System Information"
        description="Technical information about the current application environment."
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <InfoRow
            label="Application"
            value={
              settings.institutionName
            }
          />

          <InfoRow
            label="Version"
            value="1.0.0"
          />

          <InfoRow
            label="Frontend"
            value="React + Vite"
          />

          <InfoRow
            label="Storage"
            value="Browser LocalStorage"
          />

          <InfoRow
            label="Local Data"
            value={storageSize}
          />

          <InfoRow
            label="Timezone"
            value={settings.timezone}
          />
        </div>
      </SettingsCard>

      <SettingsCard
        title="Data Management"
        description="Manage locally stored application data."
      >
        <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-red-400">
                Clear Application Data
              </h3>

              <p className="mt-1 max-w-xl text-xs leading-5 text-slate-600">
                Removes locally stored AMS data
                from this browser. Use this only
                when resetting a development
                environment.
              </p>
            </div>

            <button
              type="button"
              onClick={
                clearApplicationCache
              }
              className="rounded-xl border border-red-500/20 px-4 py-2.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/10"
            >
              Clear Data
            </button>
          </div>
        </div>
      </SettingsCard>
    </div>
  );
}

/* =========================================
   REUSABLE UI
========================================= */

function SettingsCard({
  title,
  description,
  children,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 px-6 py-5">
        <h2 className="text-base font-semibold text-white">
          {title}
        </h2>

        <p className="mt-1 text-xs leading-5 text-slate-600">
          {description}
        </p>
      </div>

      <div className="p-6">
        {children}
      </div>
    </section>
  );
}

function Field({
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

function Toggle({
  label,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-slate-800/70 py-4 last:border-0">
      <div>
        <p className="text-sm font-medium text-slate-300">
          {label}
        </p>

        <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() =>
          onChange(!checked)
        }
        className={`relative h-6 w-11 flex-shrink-0 rounded-full transition ${
          checked
            ? "bg-blue-600"
            : "bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function InfoRow({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
      <p className="text-[10px] uppercase tracking-wider text-slate-700">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-300">
        {value}
      </p>
    </div>
  );
}

function PreviewBox({
  title,
  color,
  text,
}) {
  const classes = {
    blue:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",

    amber:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",

    red:
      "border-red-500/20 bg-red-500/10 text-red-400",
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
      <p className="mb-3 text-xs text-slate-600">
        {title}
      </p>

      <span
        className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${classes[color]}`}
      >
        {text}
      </span>
    </div>
  );
}

export default Settings;
