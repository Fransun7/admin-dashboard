// import "./App.css";
// import Dashboard from "./Components/Dashboard";

// function App() {
//   return (
//     <>
//       <Dashboard />
//     </>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import { supabase } from "./library/supabase";
import type { Session } from "@supabase/supabase-js";
import Dashboard from "./Components/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    async function checkUserRecord(currentSession: Session | null) {
      if (!currentSession) {
        setSession(null);
        setLoading(false);
        return;
      }

      try {
        // Query the database to see if this user_id exists in your members table
        const { data, error } = await supabase
          .from("members")
          .select("user_id")
          .eq("user_id", currentSession.user.id)
          .maybeSingle(); // Returns null safely instead of throwing an error if row is missing

        if (error || !data) {
          // 🚨 PROFILE ROW DELETED OR NOT FOUND! Force clear auth session.
          console.warn(
            "User auth exists, but database row is missing. Logging out...",
          );
          await supabase.auth.signOut();
          setSession(null);
        } else {
          // Profile exists, all good!
          setSession(currentSession);
        }
      } catch (err) {
        console.error("Error verifying user registration track:", err);
        setSession(null);
      } finally {
        setLoading(false);
      }
    }

    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkUserRecord(session);
    });

    // Listen for login/logout changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <p className="text-[#a17d4a] text-xl animate-pulse">
          Loading X3 Lab...
        </p>
      </div>
    );

  if (session) return <Dashboard session={session} />;

  if (showRegister) return <Register />;

  return <Login onShowRegister={() => setShowRegister(true)} />;
}

export default App;
