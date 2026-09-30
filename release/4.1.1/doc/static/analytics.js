// Google tag (gtag.js)
var s = document.createElement("script");
s.src = "https://www.googletagmanager.com/gtag/js?id=G-YHK0PNR1LP";

document.head.appendChild(s);

s.onload = function() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-YHK0PNR1LP');
}
