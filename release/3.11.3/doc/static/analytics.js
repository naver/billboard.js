var s = document.createElement("script");
s.src = "https://www.googletagmanager.com/gtag/js?id=G-DL3B3PRHQM";

document.head.appendChild(s);

s.onload = function() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-DL3B3PRHQM');
}
