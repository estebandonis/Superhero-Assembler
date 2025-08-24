import { SQLiteDatabase } from "react-native-sqlite-storage";

export const createHeroesTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS heroes(
        id INTEGER PRIMARY KEY,
        alias TEXT,
        full_name TEXT,
        image_preview TEXT,
        image TEXT,
        power_level INTEGER,
        power_stats TEXT,
        alter_egos TEXT,
        is_favorite BOOLEAN DEFAULT False
    );`;

  await db.executeSql(query);
};

export const createTeamsTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS teams(
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
    );`;

  await db.executeSql(query);
};

export const createHeroTeamTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS hero_team(
        hero_id INTEGER,
        team_id INTEGER,
        PRIMARY KEY (hero_id, team_id),
        FOREIGN KEY (hero_id) REFERENCES heroes(id),
        FOREIGN KEY (team_id) REFERENCES teams(id)
    );`;

  await db.executeSql(query);
};
