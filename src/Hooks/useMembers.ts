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

//
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
