"use client";
import { DynamicIcon } from "lucide-react/dynamic";
import { useEffect, useState } from "react";
import { game } from "@/lib/global";
import { favorited_game_event } from "@/lib/analytics/gtag";

type params = {
    game: game;
};

type gameList = game[];

export function FavoriteStar({ game }: params) {
    const [favorited, setFavorited] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === "undefined" || typeof window.localStorage === "undefined") return;
        setFavorited(isFavorited(game));
    }, [game.name]);

    if (typeof window === "undefined" || typeof window.localStorage === "undefined") return null;

    return (
        <DynamicIcon
            name="bookmark"
            fill={favorited ? "white" : "transparent"}
            color="white"
            onClick={() => {
                const newFavorited = !favorited;
                if (newFavorited) favorited_game_event({ game: game });
                setFavorited(newFavorited);
                favoriteGame(game, newFavorited);
            }}
        />
    );
}

function fetchFavoritedGames() {
    const favGamesStore = window.localStorage.getItem("favoriteGames");
    const favGames: gameList = favGamesStore
        ? (JSON.parse(favGamesStore) as gameList)
        : [];

    return favGames;
}

function isFavorited(Game: game) {
    const favGames = fetchFavoritedGames();
    return favGames.some((favGame) => favGame.name === Game.name);
}

function favoriteGame(Game: game, favorited: boolean) {
    let favGames = fetchFavoritedGames();
    const gameInFavorites = isFavorited(Game);

    if (!gameInFavorites && favorited) {
        favGames.push(Game);
    } else if (gameInFavorites && !favorited) {
        favGames = favGames.filter((favGame) => favGame.name !== Game.name);
    }

    window.localStorage.setItem("favoriteGames", JSON.stringify(favGames));
    window.dispatchEvent(new Event("favoritesChanged"));
}