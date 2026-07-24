import { game } from "@/lib/global";

type gamesList = game[]

/**
  * Get favorited games from local storage.
  */
export function getFavoritedGames(): gamesList | undefined | null {

    if (typeof window === "undefined") return;

    const favoriteGamesStore = localStorage.getItem("favoriteGames");
    const parsed = favoriteGamesStore ? JSON.parse(favoriteGamesStore) as gamesList : null
    if (!parsed) return;

    return parsed;

}

/**
* Get recently played from local storage.

    @example 
    const recentlyPlayed = getRecentlyPlayed();

    console.log("Players most recently played game was " + (recentlyPlayed?.[0] ?? "nothing"))
*/
export function getRecentlyPlayed(): gamesList | undefined | null {

    if (typeof window === "undefined") return;
    const recentlyPlayedGamesStore = localStorage.getItem("recentlyPlayedGames")
    const parsed: gamesList | null = recentlyPlayedGamesStore
        ? (JSON.parse(recentlyPlayedGamesStore) as gamesList)
        : null;

    if (!parsed) return null
    return parsed;
}