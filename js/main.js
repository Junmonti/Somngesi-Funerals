
document.addEventListener('DOMContentLoaded', () => {
  // =========================================
  // HEADER SCROLL EFFECT
  // =========================================

  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const backTop = document.querySelector('.back-top');

  const onScroll = () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }

    if (backTop) {
      backTop.classList.toggle('show', window.scrollY > 500);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  // =========================================
  // MOBILE NAVIGATION
  // =========================================

  const closeMenu = () => {
    if (!menuToggle || !nav) return;

    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    menuToggle.innerHTML = '&#9776;';
    document.body.classList.remove('menu-open');
  };

  if (menuToggle && nav) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');

    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');

      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
      );

      menuToggle.innerHTML = isOpen ? '&times;' : '&#9776;';
      document.body.classList.toggle('menu-open', isOpen);
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });
  }


  // =========================================
  // BACK TO TOP BUTTON
  // =========================================

  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // =========================================
  // SCROLL REVEAL ANIMATIONS
  // =========================================

  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealEls.forEach(element => observer.observe(element));
  } else {
    revealEls.forEach(element => {
      element.classList.add('visible');
    });
  }


  // =========================================
  // FAQ ACCORDION
  // =========================================

  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');

      if (!item) return;

      const isOpen = item.classList.toggle('open');

      button.setAttribute('aria-expanded', String(isOpen));
    });
  });


  // =========================================
  // FORM MESSAGE HELPERS
  // =========================================

  const showFormMessage = (selector, messageText) => {
    const message = document.querySelector(selector);

    if (!message) return;

    message.textContent = messageText;
    message.classList.add('show');
  };

  const clearFormMessage = (selector) => {
    const message = document.querySelector(selector);

    if (!message) return;

    message.textContent = '';
    message.classList.remove('show');
  };


  // =========================================
  // FUNERAL COVER APPLICATION FORM
  // =========================================

  const form = document.querySelector('#coverApplication');

  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();

      clearFormMessage('#formMessage');

      if (!form.reportValidity()) return;

      showFormMessage(
        '#formMessage',
        'Your form has passed the on-page checks. This demonstration form is NOT connected to a secure application-processing system. Your information has NOT been sent or stored. Please contact Somngesi Funerals directly to submit an official application.'
      );

      form.reset();
    });

    form.addEventListener('input', () => {
      clearFormMessage('#formMessage');
    });
  }


  // =========================================
  // CONTACT ENQUIRY FORM
  // =========================================

  const enquiry = document.querySelector('#contactEnquiry');

  if (enquiry) {
    enquiry.addEventListener('submit', event => {
      event.preventDefault();

      clearFormMessage('#contactMessage');

      if (!enquiry.reportValidity()) return;

      showFormMessage(
        '#contactMessage',
        'Thank you for your interest. This demonstration form is NOT connected to an email service. Your enquiry has NOT been sent or stored. Please contact Somngesi Funerals directly by telephone or WhatsApp.'
      );

      enquiry.reset();
    });

    enquiry.addEventListener('input', () => {
      clearFormMessage('#contactMessage');
    });
  }

});
