import useMembers from "../Hooks/useMembers";
// import type { Member } from "../Hooks/useMembers";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../library/supabase";

interface DashboardProps {
  session: Session;
}

// I NEED TO HAVE AN INTERFACE FOR MEMBERS THAT DEFINES HOW EACH MEMBER OJECT WILL LOOK LIKE

// I NEED TO CREATE AN INTERFACE FOR THE BADGES
interface Badges {
  label: string;
  type: "role" | "status" | "stack";
  value: string;
}

// A FUNCTION TO USE FOR BADGES SO I CAN ASSIGN IT A COLOR DEPENDING ON THE LABEL AND VALUE
function Badge({ label, value }: Badges) {
  const colors: Record<string, string> = {
    Intern: "bg-blue-900 text-blue-300",
    Mentor: "bg-purple-900 text-purple-300",
    Staff: "bg-gray-700 text-gray-300",
    Active: "bg-green-900 text-green-300",
    Inactive: "bg-red-900 text-red-400",
    Frontend: "bg-yellow-900 text-yellow-300",
    Backend: "bg-cyan-900 text-cyan-300",
    "UI/UX": "bg-pink-900 text-pink-300",
    Fullstack: "bg-orange-900 text-orange-300",
    DevOps: "bg-teal-900 text-teal-300",
  };

  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-semibold ${colors[value] || "bg-gray-700 text-white"}`}
    >
      {label}
    </span>
  );
}

// I NEED AN INTERFACE  FOR THE STATS CARD
interface StatCardProps {
  title: string;
  value: number;
  icon: string;
}

// A FUNCTION FOR THAT RETURNS WHAT WILL BE DISPLAYED IN THE STATSCARD
function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="flex-1 bg-white rounded-xl p-4  flex  gap-4 items-center shadow-md shadow-[#a17d4a]">
      <div className="border-white bg-[#ebd8c0] p-2 rounded-xl">
        <span className="text-[#a17d4a] text-xl">{icon}</span>
      </div>

      <div className="flex flex-col w-full">
        <p className="text-black text-2xl font-bold">{value}</p>
        <p className="text-black text-xs font-medium">{title}</p>
      </div>
    </div>
  );
}

function Dashboard({ session }: DashboardProps) {
  const { members, loading, error } = useMembers();

  if (loading)
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <p className="text-[#a17d4a] text-xl font-semibold animate-pulse">
          Loading X3 Lab...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <p className="text-red-400 text-xl">{error}</p>
      </div>
    );

  const totalMembers = members.length;

  const activeInterns = members.filter(
    (m) => m.role === "Intern" && m.status === "Active",
  ).length;

  const mentors = members.filter(
    (m) => m.role === "Mentor" && m.status === "Active",
  ).length;

  const myRealProfile = members.find((m) => m.user_id === session.user.id);
  const currentWeek = myRealProfile?.week ?? 0;

  const activeUser = myRealProfile || {
    name: session.user.email?.split("@")[0] || "New User",
    role: "Intern" as const,
    stack: "Not Assigned",
    week: 1,
    status: "Active" as const,
  };
  async function handleLogout() {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Error signing out:", err);
    }
  }

  return (
    <div className="w-full h-screen bg-black flex pl-3 pr-3 pt-3 pb-3 gap-4">
      <div className="w-[20%] h-full bg-black border-white">
        <div className="p-5">
          <h1 className="text-white font-bold text-xl">X3 Lab</h1>
          <button className="w-full h-12 rounded-lg bg-[#a17d4a] mt-5 text-white font-semibold text-md">
            <i className="fa-solid fa-gauge"></i>
            <span className="ml-2">Dashboard</span>
          </button>

          <button className="w-full h-12 rounded-lg mt-5 text-white font-semibold text-md">
            <i className="fa-solid fa-briefcase"></i>
            <span className="ml-2 hover:text-[#a17d4a]">Meetings</span>
          </button>

          <button className="w-full h-12 rounded-lg mt-5 text-white font-semibold text-md">
            <i className="fa-solid fa-chalkboard"></i>
            <span className="ml-2 hover:text-[#a17d4a]">Lessons</span>
          </button>

          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="w-full h-12 rounded-lg text-red-400 font-semibold text-sm flex items-center gap-2 px-4 hover:text-red-300"
            >
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-[60%] h-full flex rounded-4xl bg-black">
        <div className=" bg-white w-full p-5 rounded-4xl">
          <h1 className="text-black font-bold text-xl">Dashboard</h1>
          <div className="w-full h-45 bg-[#a17d4a] rounded-2xl p-10 text-lg mt-5 flex flex-col gap-5 shadow-sm shadow-[#a17d4a]">
            <p className="font-medium text-white text-3xl">
              Welcome back, {myRealProfile?.name ?? session.user.email}
            </p>
            <div className="bg-white rounded-lg w-30 flex items-center p-2">
              <p className="-lg text-[#a17d4a] font-bold text-xl">
                {myRealProfile?.role}
              </p>
            </div>
          </div>

          <div className="w-full h-40 flex items-center justify-between p-4 gap-4">
            <StatCard title="Active Interns" value={activeInterns} icon="🎓" />
            <StatCard title="Mentors" value={mentors} icon="🧑‍💼" />
            <StatCard title="Current Week" value={currentWeek} icon="📅" />
            <StatCard title="Total Members" value={totalMembers} icon="🧑‍💼" />
          </div>

          <div className="bg-white  shadow-[#a17d4a] shadow-md rounded-2xl p-4">
            <h2 className="text-black font-semibold mb-4">All Members</h2>
            <div className="max-h-25 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="">
                  <tr className="text-gray-400 text-left border-b border-[#2a2a2a] sticky top-0 bg-white">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Stack</th>
                    <th className="pb-3">Week</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>

                <tbody className="">
                  {members.map((member) => (
                    <tr
                      key={member.id}
                      className={`border-b border-[#1e1e1e] ${member.user_id === session.user.id ? "bg-[#fff8ee]" : ""}`}
                    >
                      <td className="py-6 text-black font-medium">
                        {member.name}
                        {member.user_id === session.user.id && (
                          <span className="ml-2 text-[#a17d4a] text-xs">
                            (you)
                          </span>
                        )}
                      </td>

                      <td className="py-3">
                        <Badge
                          label={member.role}
                          value={member.role}
                          type="role"
                        />
                      </td>

                      <td className="py-3">
                        <Badge
                          label={member.stack}
                          value={member.stack}
                          type="stack"
                        />
                      </td>

                      <td className="py-3 text-gray-300">
                        {member.role === "Intern" ? `Week ${member.week}` : "—"}
                      </td>

                      <td className="py-3">
                        <Badge
                          label={member.status}
                          value={member.status}
                          type="status"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVITY SECTION */}

      <div className="bg-[#F5F5DC] w-[20%] p-5 h-full rounded-4xl border-2">
        <h1 className="text-black font-bold text-xl">My activity</h1>

        <div className=" bg-[#F5F5DC] rounded-3xl p-5 flex flex-col justify-between h-[90%]">
          <div className="bg-white rounded-2xl p-4 flex flex-col gap-2 shadow-sm">
            <p className="text-gray-500 text-xs">Your Profile</p>
            <p className="text-black font-bold text-base">{activeUser.name}</p>
            <Badge
              label={activeUser.role}
              value={activeUser.role}
              type="role"
            />
            <Badge
              label={activeUser.stack}
              value={activeUser.stack}
              type="stack"
            />
          </div>

          <div className="bg-white rounded-2xl p-4 flex flex-col gap-2 shadow-sm">
            <p className="text-gray-500 text-xs">Progress</p>
            <p className="text-black font-semibold">
              Week {activeUser.week} of 24
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#a17d4a] h-2 rounded-full"
                style={{ width: `${(activeUser.week / 24) * 100}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-xs">
              {Math.round((activeUser.week / 24) * 100)}% complete
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 flex flex-col gap-2 shadow-sm">
            <p className="text-gray-500 text-xs">Status</p>
            <Badge
              label={activeUser.status}
              value={activeUser.status}
              type="status"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
