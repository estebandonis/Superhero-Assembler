import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getDBConnection,
  getAllHeroes,
  insertHeroes,
  getHeroById,
  changeHerosFavorite,
} from "@/db";
import { powerLevelCalculation } from "@/utils/Calculations";
import { hero } from "@/types";

const fetchHeroes = async () => {
  const db = await getDBConnection();

  if (db) {
    const cachedHeroes = await getAllHeroes(db);
    if (cachedHeroes && cachedHeroes.length > 0) {
      return cachedHeroes;
    }
  }

  const response = await fetch(
    "https://akabab.github.io/superhero-api/api/all.json"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const responseJson = await response.json();
  const heroes: hero[] = [];

  for (const hero of responseJson) {
    heroes.push({
      id: hero.id,
      alias: hero.biography.aliases[0],
      fullName: hero.biography.fullName,
      imagePreview: hero.images.sm,
      image: hero.images.lg,
      powerLevel: powerLevelCalculation(hero.powerstats),
      powerStats: hero.powerstats,
      alterEgos: hero.biography.alterEgos,
      favorite: false,
    });
  }

  await insertHeroes(db, heroes);

  return heroes;
};

export function useFetchHeroes() {
  return useQuery({
    queryKey: ["heroes"],
    queryFn: fetchHeroes,
    staleTime: 1000 * 60 * 60 * 24,
  });
}

const fetchHero = async (id: number) => {
  const db = await getDBConnection();

  if (db) {
    const cachedHero = await getHeroById(db, id);
    if (cachedHero) {
      return cachedHero;
    }
  }
  throw new Error("Local db not working");
};

export function useFetchHero(id: number) {
  return useQuery({
    queryKey: ["hero", id],
    queryFn: () => fetchHero(id),
    staleTime: 1000 * 60 * 60 * 24,
  });
}

const setHeroFavorite = async (id: number, favorite: boolean) => {
  const db = await getDBConnection();

  if (db) {
    await changeHerosFavorite(db, id, favorite);
  }

  return id;
};

export function useSetHeroFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, favorite }: { id: number; favorite: boolean }) =>
      setHeroFavorite(id, favorite),
    onSuccess: async (id) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["hero", id?.toString()],
        }),
        queryClient.invalidateQueries({
          queryKey: ["heroes"],
        }),
      ]);
    },
    onError: (error) => {
      console.error("Error updating hero favorite status:", error);
    },
  });
}
