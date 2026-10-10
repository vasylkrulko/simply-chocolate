const menuLinks = document.querySelectorAll('.header-menu-link');

const homeLink = document.querySelector('.header-menu-link[href="#"]');

const sectionLinks = [...menuLinks]
  .filter((link) => link.getAttribute('href') !== '#')
  .map((link) => {
    const section = document.querySelector(link.getAttribute('href'));

    return {
      link,
      section,
    };
  })
  .filter(({ section }) => section !== null);

function setActiveLink(activeLink) {
  if (!activeLink) return;

  menuLinks.forEach((link) => {
    link.classList.remove('is-active');
  });

  activeLink.classList.add('is-active');
}

function updateActiveLink() {
  const header = document.querySelector('.header');

  if (!header) return;

  const headerHeight = header.offsetHeight;
  let activeLink = homeLink;

  sectionLinks.forEach(({ link, section }) => {
    if (section.getBoundingClientRect().top <= headerHeight) {
      activeLink = link;
    }
  });

  setActiveLink(activeLink);
}

menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    setActiveLink(link);
  });
});

window.addEventListener('scroll', updateActiveLink);

updateActiveLink();
