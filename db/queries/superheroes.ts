import { SQLiteDatabase } from "react-native-sqlite-storage";

import { createHeroesTable } from "./safeQueries";
import { hero } from "@/types";

/* Hero Queries */
export const getAllHeroes = async (db: SQLiteDatabase): Promise<hero[]> => {
  await createHeroesTable(db);

  const result = await db.executeSql("SELECT * FROM heroes");
  const heroes: hero[] = [];

  for (let i = 0; i < result[0].rows.length; i++) {
    const row = result[0].rows.item(i);
    heroes.push({
      id: row.id,
      alias: row.alias,
      fullName: row.full_name,
      imagePreview: row.image_preview,
      image: row.image,
      powerLevel: row.power_level,
      powerStats: JSON.parse(row.power_stats),
      alterEgos: JSON.parse(row.alter_egos),
      favorite: row.is_favorite,
    });
  }

  return heroes;
};

export const getHeroById = async (
  db: SQLiteDatabase,
  id: number
): Promise<hero | null> => {
  await createHeroesTable(db);
  const result = await db.executeSql("SELECT * FROM heroes WHERE id = ?", [id]);

  if (result[0].rows.length > 0) {
    const row = result[0].rows.item(0);
    return {
      id: row.id,
      alias: row.alias,
      fullName: row.full_name,
      imagePreview: row.image_preview,
      image: row.image,
      powerLevel: row.power_level,
      powerStats: JSON.parse(row.power_stats),
      alterEgos: JSON.parse(row.alter_egos),
      favorite: row.is_favorite,
    };
  }

  return null;
};

export const changeHerosFavorite = async (
  db: SQLiteDatabase,
  id: number,
  isFavorite: boolean
) => {
  await createHeroesTable(db);
  await db.executeSql("UPDATE heroes SET is_favorite = ? WHERE id = ?", [
    isFavorite,
    id,
  ]);
};

export const insertHeroes = async (db: SQLiteDatabase, heroes: hero[]) => {
  await createHeroesTable(db);

  for (const hero of heroes) {
    await db.executeSql(
      `INSERT OR REPLACE INTO heroes 
       (id, alias, full_name, image_preview, image, power_level, power_stats, alter_egos, is_favorite) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        hero.id,
        hero.alias,
        hero.fullName,
        hero.imagePreview,
        hero.image,
        hero.powerLevel,
        JSON.stringify(hero.powerStats),
        JSON.stringify(hero.alterEgos),
        hero.favorite || false,
      ]
    );
  }
};
