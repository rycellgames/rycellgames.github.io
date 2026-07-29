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
            <div className="flex flex-row overflow-auto gap-5 grow max-h-full relative utility-scrollbar-none">
                {
                    recentlyPlayedGames.map((val, index) => {
                        return <GridCard key={val.slug ?? index} className="h-63 w-63" name={val.name} id={val.slug} />
                    })
                }
                {
                    recentlyPlayedGames.length > 5 ? <div className="absolute flex right-0 h-full w-30 z-21">
                        <div className="grow h-full bg-gradient-to-r from-transparent to-main-900"></div>
                        <div className="w-1/4 h-full bg-main-900"></div>
                    </div> : null
                }
            </div>
        </div> : null
    )

    // return {    <div className="grid grid-cols-4 not-md:grid-cols-1 gap-5 overflow-hidden not-md:grid-rows-1"></div>}
}