import fs from 'fs'

document.addEventListener("DOMContentLoaded", function() {
  function addHeader() {
    const html = fs.readFileSync(`src/components/header/index.html`, 'utf8')
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const node = doc.body.firstChild;

    document.querySelector('.page').parentNode.prepend(node)
  }
  addHeader();

  function goTo(route: string) {
    const html = fs.readFileSync(`src/pages/${route}/index.html`, 'utf8')

    document.querySelector('.page').innerHTML = html
    document.querySelectorAll('[data-ref]').forEach(selector => selector.classList.remove('active'))
    document.querySelector(`[data-ref=${route}]`).classList.add('active')
  }

  // start
  goTo('home')

  if (document.querySelector('[data-goto]')) {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLButtonElement;

      if (target && target.getAttribute('data-goto')) {
        goTo(target.getAttribute('data-goto'))
      }
    })
  }
});