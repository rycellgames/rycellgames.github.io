var config = {
    enabled: true,
    tileLimit: 4,
    gameListsHolder: '.gameLists',
    defaultTagRoute: '/static/pre-html/tags.json',
    searchRoute: '/static/pre-html/search.json',
    elementTagVar: 'gametag'
}

async function loadGames() {
    if (!config.enabled) return;

    try {

        const res = await fetch(config.defaultTagRoute)
        const tags = await res.json()
        

        for (const tagName in tags) {
            console.log(`${tagName}: ${tags[tagName]}`)

            const tag = tags[tagName]

            for (const gameGridNum in document.querySelector(config.gameListsHolder).querySelectorAll('.gameGrid')) {

               // const gameGrid = document.querySelector(config.gameListsHolder).querySelectorAll('.gameGrid')[gameGridNum]

                const gameGrid = document.querySelector(`${config.gameListsHolder} .gameGrid[gametag="${tagName}"]`)

                console.log(gameGrid)
                try {
                    if (gameGrid) {

                        gameGrid.innerHTML = ''

                        for (gameNum in tag) {

                            const game = tag[gameNum]

                            console.log(game)

                            gameGrid.innerHTML +=
                            `<a class="gameTile" href="${game.link}">
                            <img src="${game.thumbnail}" alt="${game.name} Game Thumbnail" loading="lazy">
                            <div class="else">
                            <p>${game.name}</p>
                            </div>
                            </a>`
                        }
                    }
                } catch (err) { console.log(err) }
            }

        
        }

        loadRelativeGames()

    } catch (err) {
        console.error(err)
    }
}

async function filter(tag) {

    let returnedGames = []

    const res = await fetch(config.searchRoute)

    const games = await res.json()

    const tags = tag.split(',')

    for (const inputTag in tags) {

        if (returnedGames.length >= config.tileLimit) return returnedGames;

        const searchTag = tags[inputTag]

        const filtered = games.game.filter(game => game.category.includes(searchTag));

        console.log(filter)

        for (const json in filtered) {
            if (returnedGames.length >= config.tileLimit) return returnedGames;

            returnedGames.push(filtered[json])
        }

    

    }

    return returnedGames;

    


}

async function loadRelativeGames() {
    try {
        const metaTag = document.querySelector('meta[name="game_tags"]');
        try {
            const gameGrid = document.querySelector('.gameGrid[gametag="personalised"]')
            const tags = metaTag.getAttribute('content')
            const resGames = await filter(tags)
            await resGames

            gameGrid.innerHTML = ''

            for (gameNumeral in resGames) {
                const game = resGames[gameNumeral]



                

                gameGrid.innerHTML += `<a class="gameTile" href="${game.link}">
                            <img src="${game.thumbnail}" alt="${game.name} Game Thumbnail" loading="lazy">
                            <div class="else">
                            <p>${game.name}</p>
                            </div>
                            </a>`
            }
        } catch (err) {
            console.log(err)
            document.querySelector('.gameGrid[gametag="personalised"]').remove()
            document.querySelector('h2[header_gametag="personalised"]').remove()
        }
    } catch (err) {
        console.error(err)
    }
}

document.addEventListener('DOMContentLoaded', loadGames)