import { SQLiteDatabase } from "react-native-sqlite-storage";

const createHeroesTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS heroes(
        id INTEGER PRIMARY KEY,
        alias TEXT,
        full_name TEXT,
        image_preview TEXT,
        image TEXT,
        power_level INTEGER,
        power_stats TEXT,
        is_favorite BOOLEAN DEFAULT False
    );`;

  await db.executeSql(query);
};

const createTeamsTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS teams(
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
    );`;

  await db.executeSql(query);
};

const createHeroTeamTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS hero_team(
        hero_id INTEGER,
        team_id INTEGER,
        PRIMARY KEY (hero_id, team_id),
        FOREIGN KEY (hero_id) REFERENCES heroes(id),
        FOREIGN KEY (team_id) REFERENCES teams(id)
    );`;

  await db.executeSql(query);
};

/* Hero Queries */
export const getAllHeroes = async (db: SQLiteDatabase) => {
  await createHeroesTable(db);
  const heroes = await db.executeSql("SELECT * FROM heroes");
  return heroes;
};

export const getHeroById = async (db: SQLiteDatabase, id: number) => {
  await createHeroesTable(db);
  const hero = await db.executeSql("SELECT * FROM heroes WHERE id = ?", [id]);
  return hero;
};

export const setHeroFavorite = async (
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

/* Team Queries */
export const getAllTeams = async (db: SQLiteDatabase) => {
  await createTeamsTable(db);
  await createHeroTeamTable(db);
  const teams = await db.executeSql("SELECT * FROM teams");
  return teams;
};

export const getTeamById = async (db: SQLiteDatabase, id: number) => {
  await createTeamsTable(db);
  await createHeroTeamTable(db);
  const team = await db.executeSql("SELECT * FROM teams WHERE id = ?", [id]);
  return team;
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
