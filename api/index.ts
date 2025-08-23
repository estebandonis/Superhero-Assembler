import { useQuery } from "@tanstack/react-query";

import { powerLevelCalculation } from "@/utils/Calculations";
import { hero } from "@/types";

const fetchHeroes = async () => {
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
    });
  }

  return heroes;
};

export function useFetchHeroes() {
  return useQuery({
    queryKey: ["heroes"],
    queryFn: fetchHeroes,
  });
}
