import { game } from "../global"

type favorited_game_type = {
    game: game
}

export const favorited_game_event = (params: favorited_game_type) => {
    try {
        (window as any).gtag("event", "favorited_game", {params})
        return
    } catch (err) {
        console.error(err)
        return
    }
}