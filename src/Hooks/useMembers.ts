import { useState, useEffect } from "react";
import { supabase } from "../library/supabase";

// I NEED TO HAVE AN INTERFACE FOR MEMBERS THAT DEFINES HOW EACH MEMBER OJECT WILL LOOK LIKE
export interface Member {
  id: string;
  user_id: string;
  name: string;
  role: "Intern" | "Mentor" | "Staff";
  stack: string;
  week: number;
  total_weeks: number;
  date_joined: string;
  status: "Active" | "Inactive";
}

// I NEED TO SPECIFICALLY MAKE THE TYPE STRICT
interface UseMembersReturn {
  members: Member[];
  loading: boolean;
  error: string | null;
}

const mockMembers: Member[] = [
  {
    name: "Francis Omotayo",
    role: "Intern",
    stack: "Frontend Development",
    week: 9,
    status: "Active",
  },

  {
    name: "Ona-Ara Favour",
    role: "Intern",
    stack: "Frontend Development",
    week: 8,
    status: "Active",
  },

  {
    name: "Olowoye Oluwaseun",
    role: "Intern",
    stack: "Frontend Development",
    week: 8,
    status: "Active",
  },

  {
    name: "Kemi Balogun",
    role: "Intern",
    stack: "UI/UX",
    week: 8,
    status: "Active",
  },
  {
    name: "Chidi Okafor",
    role: "Intern",
    stack: "Backend",
    week: 10,
    status: "Active",
  },
  {
    name: "Sade Martins",
    role: "Mentor",
    stack: "Fullstack",
    week: 0,
    status: "Active",
  },
  {
    name: "Emeka Eze",
    role: "Intern",
    stack: "Frontend",
    week: 7,
    status: "Active",
  },
  {
    name: "Ngozi Obi",
    role: "Intern",
    stack: "Backend",
    week: 6,
    status: "Inactive",
  },
  {
    name: "Dare Afolabi",
    role: "Staff",
    stack: "DevOps",
    week: 0,
    status: "Active",
  },
  {
    name: "Zara Lawal",
    role: "Intern",
    stack: "UI/UX",
    week: 9,
    status: "Active",
  },
];

function useMembers(): UseMembersReturn {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       try {
  //         setMembers(mockMembers);
  //         setLoading(false);
  //       } catch {
  //         setError("failes to load members");
  //         setLoading(false);
  //       }
  //     }, 1000);
  //     return () => clearTimeout(timer);
  //   }, []);

  useEffect(() => {
    async function fetchMembers() {
      const { data, error } = await supabase.from("members").select("*");

      if (error) {
        setError("Failed to load members");
      } else {
        setMembers(data as Member[]);
      }
      setLoading(false);
    }
    fetchMembers();
  }, []);

  return { members, loading, error };
}

export default useMembers;
