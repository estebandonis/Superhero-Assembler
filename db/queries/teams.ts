import { SQLiteDatabase } from "react-native-sqlite-storage";

import { createTeamsTable, createHeroTeamTable } from "./safeQueries";
import { team } from "@/types";

/* Team Queries */
export const getAllTeams = async (db: SQLiteDatabase): Promise<team[]> => {
  await createTeamsTable(db);
  await createHeroTeamTable(db);
  // Use GROUP_CONCAT to aggregate hero ids for each team (DISTINCT to avoid duplicates)
  const query = `
    SELECT 
      t.id, 
      t.name, 
      GROUP_CONCAT(DISTINCT ht.hero_id) AS hero_ids
    FROM teams t
    LEFT JOIN hero_team ht ON t.id = ht.team_id
    GROUP BY t.id, t.name
    ORDER BY t.id;`;

  const result = await db.executeSql(query);
  const teams: team[] = [];
  const rows = result[0].rows;
  for (let i = 0; i < rows.length; i++) {
    const row = rows.item(i);
    const heroIds: number[] = row.hero_ids
      ? (row.hero_ids as string)
          .split(",")
          .filter(Boolean)
          .map((v: string) => Number(v))
      : [];
    teams.push({
      id: row.id,
      name: row.name,
      heroIds,
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

export const deleteHeroFromTeam = async (
  db: SQLiteDatabase,
  heroId: number,
  teamId: number
) => {
  await createHeroTeamTable(db);
  await db.executeSql(
    "DELETE FROM hero_team WHERE hero_id = ? AND team_id = ?",
    [heroId, teamId]
  );
};
