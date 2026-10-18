const reviewOpenBtn = document.querySelector('.reviews-link');
const reviewOverlay = document.querySelector('.review-modal-overlay');
const reviewModal = document.querySelector('.review-modal');
const reviewCloseBtn = document.querySelector('.review-btn-close');

if (reviewOpenBtn && reviewOverlay && reviewModal && reviewCloseBtn) {
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

  // Відкриття модального вікна
  function openReviewModal(event) {
    event.preventDefault();

    previousFocus = document.activeElement;

    reviewOverlay.classList.add('is-open');
    reviewOverlay.setAttribute('aria-hidden', 'false');

    // Блокуємо фонові елементи сторінки.
    // Передбачається, що overlay є прямою дитиною body.
    backgroundElements = [...document.body.children]
      .filter((element) => element !== reviewOverlay)
      .map((element) => ({
        element,
        wasInert: element.inert,
      }));

    backgroundElements.forEach(({ element }) => {
      element.inert = true;
    });

    // Початковий фокус — кнопка закриття
    reviewCloseBtn.focus();
  }

  // Закриття модального вікна
  function closeReviewModal() {
    if (!reviewOverlay.classList.contains('is-open')) return;

    reviewOverlay.classList.remove('is-open');
    reviewOverlay.setAttribute('aria-hidden', 'true');

    // Відновлюємо попередній стан фонових елементів
    backgroundElements.forEach(({ element, wasInert }) => {
      element.inert = wasInert;
    });

    backgroundElements = [];

    // Повертаємо фокус на елемент, який відкрив вікно
    if (previousFocus?.isConnected) {
      previousFocus.focus();
    }
  }

  // Focus Trap: утримуємо фокус у модальному вікні
  reviewModal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeReviewModal();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusableElements = [
      ...reviewModal.querySelectorAll(focusableSelector),
    ].filter(
      (element) =>
        element.getClientRects().length > 0 &&
        !element.closest('[inert]') &&
        element.getAttribute('aria-hidden') !== 'true',
    );

    if (focusableElements.length === 0) {
      event.preventDefault();
      reviewModal.setAttribute('tabindex', '-1');
      reviewModal.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (
      event.shiftKey &&
      (document.activeElement === firstElement ||
        !reviewModal.contains(document.activeElement))
    ) {
      event.preventDefault();
      lastElement.focus();
    } else if (
      !event.shiftKey &&
      (document.activeElement === lastElement ||
        !reviewModal.contains(document.activeElement))
    ) {
      event.preventDefault();
      firstElement.focus();
    }
  });

  reviewOpenBtn.addEventListener('click', openReviewModal);
  reviewCloseBtn.addEventListener('click', closeReviewModal);
}
