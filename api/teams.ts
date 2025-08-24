import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getDBConnection,
  getAllTeams,
  createTeam,
} from "@/db";

const fetchTeams = async () => {
  const db = await getDBConnection();

  if (db) {
    const cachedTeams = await getAllTeams(db);
    if (cachedTeams) {
      return cachedTeams;
    }
  }

  return [];
};

export function useFetchTeams() {
  return useQuery({
    queryKey: ["teams"],
    queryFn: fetchTeams,
    staleTime: 1000 * 60 * 60 * 24,
  });
}

const addTeam = async (team: { name: string; members: number[] }) => {
  const db = await getDBConnection();

  if (db) {
    await createTeam(db, team.name, team.members);
  }

  return team;
};

export function useAddTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTeam,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["teams"],
      });
    },
  });
}
