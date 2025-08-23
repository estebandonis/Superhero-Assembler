import { useQuery } from "@tanstack/react-query";

import { powerLevelCalculation } from "@/utils/Calculations";

export type hero = {
  id: number;
  aliases: string[];
  fullName: string;
  imagePreview: string;
  image: string;
  powerLevel: number;
  powerstats: {
    [key: string]: number;
  };
};

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
      aliases: hero.biography.aliases,
      fullName: hero.biography.fullName,
      imagePreview: hero.images.xs,
      image: hero.images.md,
      powerLevel: powerLevelCalculation(hero.powerstats),
      powerstats: hero.powerstats,
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
