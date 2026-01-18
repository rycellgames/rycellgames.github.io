"use client";

import React, { useEffect, useState } from "react";
import { GridCard } from "../cards/gridCard";

type gameList = {
    name: string,
    slug: string
}[]

export default function PlayAgainRow() {

    const [recentlyPlayedGames, setRecentlyPlayedGames] = useState<gameList | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const recentlyPlayedGamesStore = localStorage.getItem("recentlyPlayedGames")
        const parsed: gameList | null = recentlyPlayedGamesStore
            ? (JSON.parse(recentlyPlayedGamesStore) as gameList)
            : null;
        setRecentlyPlayedGames(parsed);
    }, []);

    return (
        recentlyPlayedGames ? <div>
            <h1>Keep Playing</h1>
            <div className="grid grid-cols-6 not-md:grid-cols-2 gap-5 grow max-h-full">
                {
                    recentlyPlayedGames.map((val, index) => {
                        return <GridCard key={val.slug ?? index} name={val.name} id={val.slug} />
                    })
                }
            </div>
        </div> : null
    )

    // return {    <div className="grid grid-cols-4 not-md:grid-cols-1 gap-5 overflow-hidden not-md:grid-rows-1"></div>}
}