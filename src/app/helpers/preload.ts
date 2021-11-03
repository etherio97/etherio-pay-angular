export default function preload() {
  let el: any = document.querySelector('div#preload');
  if (el instanceof HTMLElement) {
    el.classList.add('opacity-0');
    setTimeout(() => el.remove(), 550);
  }
}
