import { enablePromise, openDatabase } from "react-native-sqlite-storage";
import {
  getAllHeroes,
  getHeroById,
  setHeroFavorite,
  getAllTeams,
  getTeamById,
  createTeam,
  addHeroToTeam,
} from "./queries";

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: "superheroe.db", location: "default" });
};

export {
  getAllHeroes,
  getHeroById,
  setHeroFavorite,
  getAllTeams,
  getTeamById,
  createTeam,
  addHeroToTeam,
};
