"use client";

import React, { useEffect, useRef, useState } from "react";
import { GridCard } from "../cards/gridCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

type gameList = {
    name: string,
    slug: string
}[]

export default function PlayAgainRow() {

    const [recentlyPlayedGames, setRecentlyPlayedGames] = useState<gameList | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const recentlyPlayedGamesStore = localStorage.getItem("recentlyPlayedGames")
        const parsed: gameList | null = recentlyPlayedGamesStore
            ? (JSON.parse(recentlyPlayedGamesStore) as gameList)
            : null;

        setRecentlyPlayedGames(parsed);
        setActiveIndex(0);
    }, []);

    const scrollGame = (direction: 1 | -1) => {
        if (!recentlyPlayedGames) return;

        const nextIndex = Math.max(0, Math.min(recentlyPlayedGames.length - 1, activeIndex + direction));
        if (nextIndex === activeIndex) return;

        setActiveIndex(nextIndex);

        const targetCard = cardRefs.current[nextIndex];
        targetCard?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
        });
    }

    if (!recentlyPlayedGames) return null;

    const showArrows = recentlyPlayedGames.length > 6;

    return (
        <div className="flex flex-col gap-5">
            <h1>Keep Playing</h1>
            <div className="relative flex flex-row">
                {
                    showArrows ?
                        <div className="absolute flex right-0 top-0 h-full w-40 z-21 not-md:hidden">
                            <div className="grow h-full bg-gradient-to-r via-main-900 to-main-900 flex flex-col items-end p-5">
                                <button
                                    className="h-full flex flex-col items-center disabled:opacity-50"
                                    onClick={() => scrollGame(1)}
                                    disabled={activeIndex >= recentlyPlayedGames.length - 1}
                                >
                                    <ChevronRight className="h-full stroke-main-400 hover:stroke-main-300 hover:cursor-pointer transition-all" />
                                </button>
                            </div>
                        </div> : null
                }
                <div className={`${showArrows ? 'pr-30' : ''} flex flex-row not-md:flex-col overflow-auto gap-5 grow max-h-full relative utility-scrollbar-none`}>
                    {
                        recentlyPlayedGames.map((val, index) => {
                            return <div
                                key={val.slug ?? index}
                                ref={(node) => {
                                    cardRefs.current[index] = node;
                                }}
                                className="shrink-0"
                            >
                                <GridCard className="h-63 w-63" name={val.name} id={val.slug} />
                            </div>
                        })
                    }

                </div>
                {
                    showArrows ?
                        <div className="absolute flex left-0 top-0 h-full w-40 z-21 not-md:hidden">
                            <div className={`${activeIndex > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all ease duration-500 grow h-full bg-gradient-to-l via-main-900 to-main-900 flex flex-col items-start p-5`}>
                                <button
                                    className="h-full flex flex-col items-center disabled:opacity-50"
                                    onClick={() => scrollGame(-1)}
                                    disabled={activeIndex <= 0}
                                >
                                    <ChevronLeft className="h-full stroke-main-400 hover:stroke-main-300 hover:cursor-pointer transition-all" />
                                </button>
                            </div>
                        </div> : null
                }
            </div>
        </div>
    )
}