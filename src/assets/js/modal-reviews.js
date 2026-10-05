// Звязок з кнопкою

const reviewOpenBtn = document.querySelector('.reviews-link');
const reviewModal = document.querySelector('.review-modal-overlay');
const reviewCloseBtn = document.querySelector('.review-btn-close');

reviewOpenBtn.addEventListener('click', () => {
  reviewModal.classList.add('is-open');
});

reviewCloseBtn.addEventListener('click', () => {
  reviewModal.classList.remove('is-open');
});

// Focus trap: Tab не виходить за межі review-modal

const modal = document.querySelector('.review-modal');

modal.addEventListener('keydown', (event) => {
  if (event.key !== 'Tab') return;

  const focusableElements = modal.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  }

  if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
});
