'use client'
import { game } from "../global"

type favorited_game_type = {
    game: game
}

export const favorited_game_event = (params: favorited_game_type) => {
    if (typeof window === 'undefined') return null;
    
    if (!(window as any).gtag) { console.log("no gtag");  return null; }
    try {
        (window as any).gtag("event", "favorited_game", { ...params })
        return
    } catch (err) {
        console.error(err)
        return
    }
}