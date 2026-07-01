import { useState } from "react";
import { supabase } from "../library/supabase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"Intern" | "Mentor" | "Staff">("Intern");
  const [stack, setStack] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [totalWeeks, setTotalWeeks] = useState<number>(12);
  const [currentWeek, setCurrentWeek] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleRegister() {
    setLoading(true);
    setError(null);

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const userId = data.user?.id;

    const { error: insertError } = await supabase.from("members").insert([
      {
        user_id: userId,
        name,
        role,
        stack,
        date_joined: dateJoined,
        total_weeks: totalWeeks,
        week: currentWeek,
        status: "Active",
      },
    ]);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success)
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 w-[380px] flex flex-col gap-4 items-center">
          <p className="text-green-400 text-lg font-semibold">
            Account created!
          </p>
          <p className="text-gray-400 text-sm text-center">
            You can now sign in with your email and password.
          </p>
        </div>
      </div>
    );

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center overflow-y-auto py-10">
      <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 w-[420px] flex flex-col gap-4">
        <h1 className="text-white font-bold text-2xl">X3 Lab</h1>
        <p className="text-gray-400 text-sm">Create your member account</p>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-[#a17d4a]"
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-[#a17d4a]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-[#a17d4a]"
        />

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value as "Intern" | "Mentor" | "Staff")
          }
          className="bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-[#a17d4a]"
        >
          <option value="Intern">Intern</option>
          <option value="Mentor">Mentor</option>
          <option value="Staff">Staff</option>
        </select>

        <input
          type="text"
          placeholder="Stack (e.g. Frontend, Backend, UI/UX)"
          value={stack}
          onChange={(e) => setStack(e.target.value)}
          className="bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-[#a17d4a]"
        />

        <div className="flex flex-col gap-1">
          <label className="text-gray-400 text-xs">Date Joined</label>
          <input
            type="date"
            value={dateJoined}
            onChange={(e) => setDateJoined(e.target.value)}
            className="bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-[#a17d4a]"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-gray-400 text-xs">Total Weeks</label>
            <input
              type="number"
              value={totalWeeks}
              onChange={(e) => setTotalWeeks(Number(e.target.value))}
              className="bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-[#a17d4a]"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-gray-400 text-xs">Current Week</label>
            <input
              type="number"
              value={currentWeek}
              onChange={(e) => setCurrentWeek(Number(e.target.value))}
              className="bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-[#a17d4a]"
            />
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full h-12 bg-[#a17d4a] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </div>
    </div>
  );
}

export default Register;
