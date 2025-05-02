async function load() {

    if (document.querySelector('.gameGrid').getAttribute('preloaded')) return;

    const res = await fetch('/static/pre-html/games.xml')
    const text = await res.text()

    const parser = new DOMParser()

    const xml = parser.parseFromString(text, 'application/xml')

    let category = document.querySelector('.subheader').textContent.replaceAll('.html', '').toLocaleLowerCase()
    console.log(category)

    if (window.location.href.endsWith('.html')) {category.replaceAll('.html', '')}


    xml.querySelector('games').querySelectorAll('game').forEach(element => {
        const gameTile = document.createElement('a')
        const gameTileImage = document.createElement('img')
        const gameTileTextHolder = document.createElement('div')
        const gameTileText = document.createElement('p')

        const categories = element.querySelector('category').textContent.toLocaleLowerCase().split(',')


        if (!categories.includes(category)) return;

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

load()