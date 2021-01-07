export default function () {
  if (typeof window !== 'undefined') {
    var ww = window.innerWidth
    const rootFontSize = ww * 100 / 750;
    document.documentElement.style.fontSize = rootFontSize + 'px';
  }
}