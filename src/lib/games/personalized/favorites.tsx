"use client";

import React, { useEffect, useState } from "react";
import { GridCard } from "../cards/gridCard";
import { game } from "@/lib/global";

type gameList = game[];

export default function FavoritedGamesRow() {
    const [favoritedGames, setFavoritedGames] = useState<gameList | null>(null);

    const loadFavoritedGames = () => {
        if (typeof window === "undefined") return;

        const favoriteGamesStore = localStorage.getItem("favoriteGames");
        const parsed: gameList | null = favoriteGamesStore
            ? (JSON.parse(favoriteGamesStore) as gameList)
            : null;

        setFavoritedGames(parsed);
    };

    useEffect(() => {
        loadFavoritedGames();

        const handleFavoritesChanged = () => {
            loadFavoritedGames();
        };

        window.addEventListener("favoritesChanged", handleFavoritesChanged);
        window.addEventListener("storage", handleFavoritesChanged);

        return () => {
            window.removeEventListener("favoritesChanged", handleFavoritesChanged);
            window.removeEventListener("storage", handleFavoritesChanged);
        };
    }, []);

    return favoritedGames && favoritedGames.length > 0 ? (
        <div>
            <h1>Favorites</h1>
            <div className="grid grid-cols-6 not-md:grid-cols-2 gap-5 grow max-h-full">
                {favoritedGames.map((val) => (
                    <GridCard key={val.id ?? val.name} name={val.name} id={val.id} />
                ))}
            </div>
        </div>
    ) : null;
}