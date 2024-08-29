document.addEventListener('DOMContentLoaded', function () {


  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.menu');

  if (menu) {
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
  }


  document.querySelectorAll('form').forEach(form => {
    if (form.classList.contains('is_ahunterSuggest')) {
      const options =
      {
        fields:
          [
            { id: 'js-last_name', tag: 'last_name' },
            { id: 'js-first_name', tag: 'first_name' },
            { id: 'js-patronym', tag: 'patronym' }
          ],
        ahunter_url: 'https://ahunter.ru/',
        limit: 5,
        suggest_on_focus: false
      };

      //запускаем дискретные подсказки
      AhunterSuggest.Person.Discrete(options);
    }
    // Обработчик отправки формы
    form.addEventListener('submit', function (event) {
      let isValid = true;

      form.querySelectorAll('[required]').forEach(field => {
        if (!validateField(field)) {
          isValid = false;
        }
      });

      if (!isValid) {
        event.preventDefault();
      }
    });

    // Обработчик события "blur" для каждого поля
    form.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('blur', function () {
        validateField(field);
      });

      // Обработчик события "input" для каждого поля
      field.addEventListener('input', function () {
        if (field.type === 'email') {
          field.classList.remove('error', 'success');
        } else {
          validateField(field);
        }
      });
    });

    function validateField(field) {
      if (field.value.trim() === '') {
        field.classList.add('error');
        field.classList.remove('success');
        return false;
      } else {
        field.classList.remove('error');

        if (field.type === 'email') {
          if (validateEmail(field.value)) {
            field.classList.add('success');
          } else {
            field.classList.add('error');
            return false;
          }
        } else {
          field.classList.add('success');
        }
        return true;
      }
    }

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  });

});
