'use client';

import React, { useEffect, useState } from 'react';
import { getRecentlyPlayed } from "@/lib/client/data";
import { getGamesList } from "@/lib/client/games/list";
import { isClient } from "@/lib/client/checkIsClient";
import { game } from "@/lib/global";
import { GridCard } from '../cards/gridCard';

type MatchedGame = game & {
    from: string; // The name of the game that led to this match
}

type Props = {
    games: game[];
}

export function BasedOnWhatYouPlay({ games }: Props) {
    if (!isClient()) return null;
    const [matchingGames, setMatchingGames] = useState<MatchedGame[] | null>(null);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                console.log("   Getting recently played games");
                const recentlyPlayed = await Promise.resolve(getRecentlyPlayed());
                const allGames = games

                if (!mounted) return;
                console.log(recentlyPlayed);
                console.log(allGames);
                if (!recentlyPlayed || !allGames) {
                    setMatchingGames([]);
                    return;
                }

                const matches: MatchedGame[] = [];

                for (const played of recentlyPlayed) {
                    console.log(played);
                    if (matches.length === 6) break;
                    for (const comparedGame of allGames) {
                        if (matches.length === 6) break;
                        if (comparedGame.name === played.name) continue; // skip same game

                        const comparedCategories = comparedGame.categories ?? [];
                        for (const category of comparedCategories) {
                            if (played.categories?.includes(category)) {
                                console.log("Found match: " + comparedGame.name);
                                if (!matches.some(m => m.folder === comparedGame.folder)) {
                                    if (!matches.some(m => m.from === played.name)) {
                                    
                                    matches.push({ ...comparedGame, from: played.name || "" });
                                    }
                                }
                                break; // stop checking more categories for this comparedGame
                            }
                        }
                    }
                }

                if (mounted) setMatchingGames(matches);
            } catch (err) {
                if (mounted) setMatchingGames([]);
            }
        })();

        return () => { mounted = false; };
    }, []);

    console.log(matchingGames)

    if (matchingGames === null) return <h1>Loading...</h1>;
    if (matchingGames.length === 0) return null;

    const matchingGamesCards = []

    for (const game of matchingGames) {
        if (!game.name || !game.folder) continue;
        matchingGamesCards.push(<GridCard name={game.name} id={game.folder} key={game.folder} />);
    }

    console.log(matchingGames);

    return (
        <>
            <h1>Based on what you play</h1>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {matchingGamesCards}
            </div>
        </>
    );
}