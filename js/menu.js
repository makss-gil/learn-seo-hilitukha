/*************************************************************************
 * For loading the menu.
 * The menu will not work if you open the file directly rather than on a web server.
 *************************************************************************/

(function () {
  "use strict";

  $(function () {
    $(".menu-container").load("menu.html");
  });
})();

document.addEventListener('DOMContentLoaded', function() {
  // 1. Відстеження кліків по номеру телефону
  document.querySelectorAll('a[href^="tel:"]').forEach(function(el) {
    el.addEventListener('click', function() {
      gtag('event', 'phone_click', {
        'phone_number': this.getAttribute('href').replace('tel:', '')
      });
    });
  });

  // 2. Відстеження кліків по соцмережах
  // ВАЖЛИВО: Додай клас "social-link" до своїх посилань на Instagram/Facebook
  document.querySelectorAll('.social-link').forEach(function(el) {
    el.addEventListener('click', function() {
      gtag('event', 'social_click', {
        'platform': this.dataset.platform || 'social_network'
      });
    });
  });

  // 3. Відстеження кліку по головних кнопках
  // ВАЖЛИВО: Додай клас "cta-button" до кнопок типу "Купити" або "В каталог"
  document.querySelectorAll('.cta-button').forEach(function(el) {
    el.addEventListener('click', function() {
      gtag('event', 'cta_click', {
        'button_text': this.innerText
      });
    });
  });

  // 4. Відстеження відправки форми
  // ВАЖЛИВО: Додай id="contact-form" до форми на сторінці контактів
  const form = document.getElementById('contact-form');
  if(form) {
    form.addEventListener('submit', function() {
      gtag('event', 'form_submit', {
        'form_name': 'contact_form'
      });
    });
  }

  // 5. Відстеження кліків по меню навігації
  document.querySelectorAll('nav a').forEach(function(el) {
    el.addEventListener('click', function() {
      gtag('event', 'menu_click', {
        'menu_name': this.innerText
      });
    });
  });
});