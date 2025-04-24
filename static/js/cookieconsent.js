/* Cookie Consent script (used later) */
function consent() {
    if (localStorage.getItem('accepted')) return;
    const newElement = document.createElement('div')
    newElement.classList.add('cookieconsent')
    newElement.innerText = `This website uses cookies to collect and analyze information about your use of the site in order to improve functionality and performance. By continuing to browse or by clicking “Accept,” you consent to the use of cookies.`
    document.querySelector('.secondaryBody').append(newElement)

    const btn = document.createElement('button')

    btn.textContent = 'Accept'
    newElement.append(btn)

    btn.addEventListener('click', () => { 
        localStorage.setItem('accepted', 'y')
        newElement.style.display = 'none'
    });
}

consent()