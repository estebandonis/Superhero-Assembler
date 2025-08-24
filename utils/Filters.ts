import { hero } from "@/types";

export const filteredHeroes = (heroes: hero[] | undefined, searchTerm: string) : hero[] => {
    if (!heroes) {
        return [];
    }

    return heroes?.filter((hero) =>
        hero.fullName.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        hero.alias.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
}