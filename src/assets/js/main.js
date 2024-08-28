document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.menu');

  function toggleMenu() {
    burger.classList.toggle('burger-close');
    menu.classList.toggle('menu-open');
  }

  function closeMenu() {
    burger.classList.remove('burger-close');
    menu.classList.remove('menu-open');
  }

  burger.addEventListener('click', function (event) {
    event.stopPropagation();
    toggleMenu();
  });

  document.addEventListener('click', function (event) {
    if (!menu.contains(event.target) && !burger.contains(event.target)) {
      closeMenu();
    }
  });

});
