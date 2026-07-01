import { useState } from "react";
import { supabase } from "../library/supabase";

interface LoginProps {
  onShowRegister: () => void;
}

function Login({ onShowRegister }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
    setLoading(false);
  }

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 w-[380px] flex flex-col gap-4">
        <h1 className="text-white font-bold text-2xl">X3 Lab</h1>
        <p className="text-gray-400 text-sm">Sign in to your dashboard</p>

        {error && <p className="text-red-400 text-sm">{error}</p>}

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

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full h-12 bg-[#a17d4a] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-gray-400 text-sm text-center">
          No account yet?{" "}
          <span
            onClick={onShowRegister}
            className="text-[#a17d4a] cursor-pointer hover:underline"
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
