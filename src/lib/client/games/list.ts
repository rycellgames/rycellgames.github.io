import { game } from "@/lib/global";
import { isClient } from "../checkIsClient";

export async function getGamesList() : Promise<game[] | null> {
    if (isClient()) return null;
    
    try {
         const gamesListFetched = await fetch("/games.json");
         const gamesList = await gamesListFetched.json() as game[];

         return gamesList;

    } catch (err) {
        console.error(err)
        return null
    }

}