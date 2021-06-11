const burgerContainer = document.querySelector('.burger');
const burger = document.querySelector('.burger__line');
const nav = document.querySelector('.nav');
const navLink = document.querySelectorAll('.nav__link');

burgerContainer.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('show-modal');
  nav.classList.toggle('modal-shadow');
});

navLink.forEach((link) => {
  return link.addEventListener('click', () => {
    burger.classList.toggle('open');
    const width = window.innerWidth;
    if (width < 1024) {
      nav.classList.toggle('show-modal');
      nav.classList.toggle('modal-shadow');
    }
  });
});
