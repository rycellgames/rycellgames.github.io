"use client";

import React, { useEffect, useState } from "react";
import { FavoriteCard, GridCard } from "../cards/gridCard";
import { game } from "@/lib/global";

type gameList = game[]

export default function FavoritedGamesRow() {

    const [favoritedGames, setFavoritedGames] = useState<gameList | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const favoriteGamesStore = localStorage.getItem("favoriteGames")
        const parsed: gameList | null = favoriteGamesStore
            ? (JSON.parse(favoriteGamesStore) as gameList)
            : null;
        setFavoritedGames(parsed);
    }, []);

    return (
        favoritedGames ? <div>
            <h1>Favorites</h1>
            <div className="grid grid-cols-6 not-md:grid-cols-2 gap-5 grow max-h-full">
                {
                    favoritedGames.map((val, index) => {
                        return <FavoriteCard game={val} />
                    })
                }
            </div>
        </div> : null
    )

    // return {    <div className="grid grid-cols-4 not-md:grid-cols-1 gap-5 overflow-hidden not-md:grid-rows-1"></div>}
}