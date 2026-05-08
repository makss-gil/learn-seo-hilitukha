/**
 * Події GA4 через делегування: працює з меню/футером, що підвантажуються через .load().
 * Потрібен gtag у <head> (config уже з measurement ID).
 */
(function () {
  'use strict';

  function send() {
    if (typeof gtag !== 'function') return;
    gtag.apply(null, arguments);
  }

  function text(el) {
    return (el && (el.innerText || el.textContent) || '').replace(/\s+/g, ' ').trim().slice(0, 120);
  }

  document.addEventListener(
    'click',
    function (e) {
      var tel = e.target.closest && e.target.closest('a[href^="tel:"]');
      if (tel) {
        send('event', 'phone_click', {
          transport_type: 'beacon',
        });
        return;
      }

      var social = e.target.closest && e.target.closest('a.social-link');
      if (social) {
        send('event', 'social_click', {
          transport_type: 'beacon',
          social_platform: social.dataset.platform || 'social_network',
        });
        return;
      }

      var cta = e.target.closest && e.target.closest('.cta-button');
      if (cta) {
        send('event', 'cta_click', {
          transport_type: 'beacon',
          button_text: text(cta),
        });
        return;
      }

      var menu = e.target.closest && e.target.closest('.menu-items a, nav a');
      if (menu) {
        var href = menu.getAttribute('href') || '';
        if (href.indexOf('javascript:') === 0) return;
        send('event', 'menu_click', {
          transport_type: 'beacon',
          menu_name: text(menu),
          menu_section: menu.closest('header') ? 'site_header' : 'page_nav',
        });
      }
    },
    true
  );

  document.addEventListener(
    'submit',
    function (e) {
      var form = e.target;
      if (!form || form.nodeName !== 'FORM') return;

      var formName = null;
      if (form.id === 'contact-form' || form.id === 'contactForm') {
        formName = 'contact_form';
      } else if (form.id === 'tasting-form' || form.classList.contains('custom-survey')) {
        formName = 'tasting_survey';
      }
      if (!formName) return;

      send('event', 'form_submit', {
        transport_type: 'beacon',
        form_name: formName,
      });
    },
    true
  );
})();
