async function load() {
    const res = await fetch('/static/pre-html/games.xml')
    const text = await res.text()

    const parser = new DOMParser()

    const xml = parser.parseFromString(text, 'application/xml')

    if (document.querySelector('.gameGrid').getAttribute('preloaded')) return;

    xml.querySelector('games').querySelectorAll('game').forEach(element => {
        const gameTile = document.createElement('a')
        const gameTileImage = document.createElement('img')
        const gameTileTextHolder = document.createElement('div')
        const gameTileText = document.createElement('p')

        gameTile.classList.add('gameTile')
        gameTileImage.src = element.querySelector('thumbnail').textContent
        gameTileImage.alt = element.querySelector('name').textContent + ' Game Thumbnail'
        gameTileTextHolder.classList.add('else')
        gameTileText.innerText = element.querySelector('name').textContent
        gameTile.href = element.querySelector('link').textContent

        gameTileImage.loading = 'lazy'

        gameTileTextHolder.append(gameTileText)

        gameTile.append(gameTileImage)
        gameTile.append(gameTileTextHolder)

        document.querySelector('.gameGrid').append(gameTile)

    });
}

document.addEventListener('DOMContentLoaded', load)