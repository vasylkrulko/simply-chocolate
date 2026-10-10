const mobileMenu = document.querySelector('.mobile-menu');
const openBtn = document.querySelector('.mobile-menu-burger');
const closeBtn = document.querySelector('.mobile-menu-btn-close');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

console.log({ mobileMenu, openBtn, closeBtn, mobileMenuLinks });

openBtn?.addEventListener('click', () => {
  mobileMenu?.classList.add('is-open');
});

closeBtn?.addEventListener('click', () => {
  mobileMenu?.classList.remove('is-open');
});

mobileMenuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu?.classList.remove('is-open');
  });
});
