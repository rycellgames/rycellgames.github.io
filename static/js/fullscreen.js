const elem = document.documentElement;
let settings = JSON.parse(localStorage.getItem('settings')) || {};
let reloadOnFullscreen = settings.reloadonfullscreen;

if (reloadOnFullscreen === undefined) {
  reloadOnFullscreen = true;
}


document.addEventListener('fullscreenchange', async () => {
  const iframe = document.querySelector('.gameFrame');
  console.log('fullscreen');
  if (document.fullscreenElement) {
    iframe.requestFullscreen()
    if (reloadOnFullscreen) {iframe.contentWindow.location.reload()}
  } else {
    iframe.classList.remove('fullscreen');
    if (reloadOnFullscreen) { iframe.contentWindow.location.reload() }
    try { await screen.orientation.lock('landscape'); } catch(err) {console.log(err)}
  }
});

document.querySelector(".mainContent").style.height =
  `calc(100vh - ${document.querySelector("header").clientHeight}px)`;
  
document.querySelector('#fullscreen').addEventListener('click', () => {
  const iframe = document.querySelector('.gameFrame');
  iframe.requestFullscreen()
  if (reloadOnFullscreen) {iframe.contentWindow.location.reload()}
  openFullscreen();
});

document.getElementById('share').addEventListener('click', () => {
  console.log('check');
  document.querySelector('.shareFrame').style.opacity = 1;
  document.querySelector('.shareFrame').style.display = 'flex';
});

function closeShareWidget() {document.querySelector('.shareFrame').style.display = 'none'} 

window.addEventListener('keydown', (ev) => { 
  if (ev.key === 'Escape') {
    closeShareWidget()
  }
});

document.querySelector('.shareFrame').addEventListener('click', function (event) {
  if (event.target === this) {
    closeShareWidget()
  }
});

document.querySelector('.link').value = window.location.href

document.querySelector('.copy').addEventListener('click', function () {

  document.querySelector('input').select()
  document.execCommand('copy')

});


async function openFullscreen() {
 try { await screen.orientation.lock('landscape'); } catch(err) {console.log(err)}
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

