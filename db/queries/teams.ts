import { SQLiteDatabase } from "react-native-sqlite-storage";

import { createTeamsTable, createHeroTeamTable } from "./safeQueries";
import { team } from "@/types";

/* Team Queries */
export const getAllTeams = async (db: SQLiteDatabase): Promise<team[]> => {
  await createTeamsTable(db);
  await createHeroTeamTable(db);
  const result = await db.executeSql("SELECT * FROM teams");
  const teams: team[] = [];

  for (let i = 0; i < result[0].rows.length; i++) {
    const row = result[0].rows.item(i);
    teams.push({
      id: row.id,
      name: row.name,
    });
  }

  return teams;
};

export const getTeamById = async (
  db: SQLiteDatabase,
  id: number
): Promise<team | null> => {
  await createTeamsTable(db);
  await createHeroTeamTable(db);
  const result = await db.executeSql("SELECT * FROM teams WHERE id = ?", [id]);

  if (result[0].rows.length > 0) {
    const row = result[0].rows.item(0);
    return {
      id: row.id,
      name: row.name,
    };
  }

  return null;
};

export const createTeam = async (
  db: SQLiteDatabase,
  name: string,
  herosIds: number[]
) => {
  await createTeamsTable(db);
  const result = await db.executeSql("INSERT INTO teams (name) VALUES (?)", [
    name,
  ]);
  const teamId = result[0].insertId;

  await createHeroTeamTable(db);
  herosIds.forEach(async (heroId) => {
    await db.executeSql(
      "INSERT INTO hero_team (hero_id, team_id) VALUES (?, ?)",
      [heroId, teamId]
    );
  });
};

export const addHeroToTeam = async (
  db: SQLiteDatabase,
  heroId: number,
  teamId: number
) => {
  await createHeroTeamTable(db);
  await db.executeSql(
    "INSERT INTO hero_team (hero_id, team_id) VALUES (?, ?)",
    [heroId, teamId]
  );
};
