import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
            <ShieldCheck size={28} />
          </div>

          <h1 className="text-3xl font-bold text-white">
            CampusPulse
          </h1>

          <p className="mt-2 text-slate-400">
            College Attendance & Timetable Management
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7 shadow-2xl">
          <h2 className="text-xl font-semibold text-white">
            Welcome back
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Sign in to continue to your dashboard.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Email
              </label>

              <input
                type="email"
                placeholder="admin@college.edu"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-500 active:scale-[0.98]"
            >
              Sign In
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Demo environment
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
