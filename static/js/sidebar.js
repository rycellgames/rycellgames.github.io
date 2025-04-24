let cookieconsentloaded

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('script').forEach(element => {
        if (element.getAttribute('src') == '/static/js/cookieconsent.js') {cookieconsentloaded = true}
    });

    var script = document.createElement("script");
    script.src = '/static/js/cookieconsent.js'; 

if (!cookieconsentloaded) document.head.appendChild(script)
});



async function load() {
    const res = await fetch('/static/pre-html/sidebar.xml');
    const xmlstr = await res.text();

    const sidebar = document.querySelector('.sidebar');
    sidebar.innerHTML = ''
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlstr, 'application/xml');

    const categories = xmlDoc.querySelector('categories').querySelectorAll('category');

    categories.forEach(category => {
        const link = document.createElement('a');
        const iconHolder = document.createElement('div');
        const icon = document.createElement('i');
        const text = document.createElement('span');

        category.querySelectorAll('attribute').forEach(attr => {
            const name = attr.querySelector('name')?.textContent;
            const value = attr.querySelector('value')?.textContent;
            if (name && value) {
                link.setAttribute(name, value);
            }
        });

        link.classList.add('section');
        iconHolder.classList.add('iconholder');

        icon.className = category.querySelector('icon').textContent;
        iconHolder.appendChild(icon);

        text.textContent = category.querySelector('text').textContent;

        link.appendChild(iconHolder);
        link.appendChild(text);

        sidebar.appendChild(link);
    });
}

load();
