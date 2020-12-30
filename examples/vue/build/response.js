module.exports = function () {
  var ww = window.innerWidth
  rootFontSize = ww * 100 / 750;
  document.documentElement.style.fontSize = rootFontSize + 'px';
}