"use client"

type gameList = {
    name: string,
    slug: string
}[]

export default function AddRecentlyPlayed({name, slug}: {name: string, slug: string}) {
        const recentlyPlayedGamesStore = localStorage.getItem("recentlyPlayedGames")
        const recentlyPlayedGames: gameList | null = recentlyPlayedGamesStore
        ? (JSON.parse(recentlyPlayedGamesStore) as gameList)
        : [];
    
        const newEntry = { name, slug };
        const updated = [newEntry, ...recentlyPlayedGames.filter(g => g.slug !== slug)];
        localStorage.setItem("recentlyPlayedGames", JSON.stringify(updated));
        return <div></div>
}