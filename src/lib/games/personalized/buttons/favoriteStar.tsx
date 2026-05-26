"use client";
import { Star } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic"
import { useState, useEffect } from "react";
import { game } from "@/lib/global"

type params = {
    game: game
}

type gameList = game[];

export function FavoriteStar({ game }: params) {

    if (typeof window === "undefined" || typeof window.localStorage === "undefined") return null;
    const [favorited, setFavorited] = useState<boolean>(false)

    useEffect(() => {
        if (isFavorited(game)) {
            setFavorited(true)
            console.log("We have now set game favorited to true.")
      }
    }, [game.name]);

    return (
        <DynamicIcon
            name="bookmark"
            fill={favorited ? "white" : "transparent"}
            color="white"
            onClick={
                () => {
                    const newFavorited = !favorited;
                    setFavorited(newFavorited)
                    favoriteGame(game, newFavorited)
                }}
        />
    )
}

function fetchFavoritedGames() {
    const favGamesStore = window.localStorage.getItem("favoriteGames");
    const favGames: gameList = favGamesStore
        ? (JSON.parse(favGamesStore) as gameList)
        : [];
    return favGames
}

function isFavorited(Game: game, setFavorited?: (value: boolean) => void ) {

    const favGames = fetchFavoritedGames()
    // follow similar logic to the recently played
    const gameFavorited = favGames.find(favGame => favGame.name === Game.name);
    if (gameFavorited && setFavorited) {
        setFavorited(true);
    } else if (!gameFavorited && setFavorited) {
        setFavorited(false);
    }
    return gameFavorited ?? false
}

function favoriteGame(Game: game, favorited: boolean) {

    let favGames = fetchFavoritedGames();
    const gameInFavorites = isFavorited(Game);
  
    console.log("In fav game func, fav is " + favorited);

    if (!gameInFavorites && favorited) {
        // Add to favorites
        favGames.push(Game);
    } else if (gameInFavorites && !favorited) {
        // Remove from favorites
        favGames = favGames.filter(favGame => favGame.name !== Game.name);
    }

    // Save back to localStorage
    window.localStorage.setItem("favoriteGames", JSON.stringify(favGames));

}