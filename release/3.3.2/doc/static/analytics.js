var s = document.createElement("script");
s.src = "https://www.googletagmanager.com/gtag/js?id=UA-141911582-2";

document.head.appendChild(s);

s.onload = function() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-141911582-2');
}
