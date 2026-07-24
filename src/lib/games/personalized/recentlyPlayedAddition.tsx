"use client"

import { useEffect } from "react";

type Game = {
    name: string;
    slug: string;
    categories: string[];
};

type gameList = Game[];

export default function AddRecentlyPlayed({ name, slug, categories }: Game) {
    useEffect(() => {
        if (typeof window === "undefined" || typeof window.localStorage === "undefined") return;

        try {
            const recentlyPlayedGamesStore = window.localStorage.getItem("recentlyPlayedGames");
            const recentlyPlayedGames: gameList = recentlyPlayedGamesStore
                ? (JSON.parse(recentlyPlayedGamesStore) as gameList)
                : [];

            const newEntry: Game = { name, slug, categories };
            const updated = [newEntry, ...recentlyPlayedGames.filter(g => g.slug !== slug)];
            window.localStorage.setItem("recentlyPlayedGames", JSON.stringify(updated));
        } catch {
            // ignore storage/parse errors
        }
    }, [name, slug]);

    return <div></div>;
}