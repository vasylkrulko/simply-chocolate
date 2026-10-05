const reviewOpenBtn = document.querySelector('.reviews-link');
const reviewModal = document.querySelector('.review-modal-overlay');
const reviewCloseBtn = document.querySelector('.review-btn-close');

reviewOpenBtn.addEventListener('click', () => {
  reviewModal.classList.add('is-open');
});

reviewCloseBtn.addEventListener('click', () => {
  reviewModal.classList.remove('is-open');
});
