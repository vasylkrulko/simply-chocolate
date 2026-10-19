const mobileMenu = document.querySelector('.mobile-menu');
const openBtn = document.querySelector('.mobile-menu-burger');
const closeBtn = document.querySelector('.mobile-menu-btn-close');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

if (mobileMenu && openBtn && closeBtn) {
  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  let previousFocus = null;
  let backgroundElements = [];

  // Блокуємо фон, не блокуючи контейнер самого меню
  function disableBackground() {
    let current = mobileMenu;

    while (current.parentElement && current.parentElement !== document.body) {
      const parent = current.parentElement;

      [...parent.children].forEach((element) => {
        if (element !== current) {
          backgroundElements.push({
            element,
            wasInert: element.inert,
          });

          element.inert = true;
        }
      });

      current = parent;
    }

    [...document.body.children].forEach((element) => {
      if (element !== current) {
        backgroundElements.push({
          element,
          wasInert: element.inert,
        });

        element.inert = true;
      }
    });
  }

  // Відновлюємо взаємодію з фоновою сторінкою
  function enableBackground() {
    backgroundElements.forEach(({ element, wasInert }) => {
      element.inert = wasInert;
    });

    backgroundElements = [];
  }

  // Відкриття меню
  function openMobileMenu() {
    if (mobileMenu.classList.contains('is-open')) return;

    previousFocus = document.activeElement;

    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');

    disableBackground();

    // Початковий фокус — кнопка закриття
    closeBtn.focus();
  }

  // Закриття меню
  function closeMobileMenu(restoreFocus = true) {
    if (!mobileMenu.classList.contains('is-open')) return;

    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');

    enableBackground();

    if (restoreFocus && previousFocus?.isConnected) {
      previousFocus.focus();
    }
  }

  // Focus Trap + Escape
  mobileMenu.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMobileMenu();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusableElements = [
      ...mobileMenu.querySelectorAll(focusableSelector),
    ].filter(
      (element) =>
        element.getClientRects().length > 0 &&
        !element.closest('[inert]') &&
        element.getAttribute('aria-hidden') !== 'true',
    );

    if (focusableElements.length === 0) {
      event.preventDefault();
      mobileMenu.setAttribute('tabindex', '-1');
      mobileMenu.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (
      event.shiftKey &&
      (document.activeElement === firstElement ||
        !mobileMenu.contains(document.activeElement))
    ) {
      event.preventDefault();
      lastElement.focus();
    } else if (
      !event.shiftKey &&
      (document.activeElement === lastElement ||
        !mobileMenu.contains(document.activeElement))
    ) {
      event.preventDefault();
      firstElement.focus();
    }
  });

  // Обробники кнопок
  openBtn.addEventListener('click', openMobileMenu);

  closeBtn.addEventListener('click', () => {
    closeMobileMenu();
  });

  // Закриваємо меню після вибору пункту навігації
  mobileMenuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu(false);
    });
  });
}
