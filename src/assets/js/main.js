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

  const tabButtons = document.querySelectorAll('.about-services__buttons button');
  const tabs = document.querySelectorAll('.about-services__tab');

  if (tabs && tabs.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function () {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const tabId = this.getAttribute('data-tab');

        tabs.forEach(tab => tab.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
      });
    });
  }

  class PhoneMask {
    constructor(input) {
      this.input = input;
      this.attachEvents();
    }

    static extractDigits(value) {
      return value.replace(/\D/g, '');
    }

    handlePaste(event) {
      const input = event.target;
      const digits = PhoneMask.extractDigits(input.value);
      const pastedData = event.clipboardData || window.clipboardData;
      if (pastedData) {
        const pastedText = pastedData.getData('Text');
        if (/\D/g.test(pastedText)) {
          input.value = digits;
          event.preventDefault();
        }
      }
    }

    handleInput(event) {
      const input = event.target;
      let digits = PhoneMask.extractDigits(input.value);
      let cursorPosition = input.selectionStart;
      let formattedValue = '';

      if (!digits) {
        input.value = '';
        return;
      }

      if (input.value.length !== cursorPosition) {
        if (event.data && /\D/g.test(event.data)) {
          input.value = digits;
        }
        return;
      }

      if (['7', '8', '9'].includes(digits[0])) {
        if (digits[0] === '9') digits = '7' + digits;
        const countryCode = (digits[0] === '8') ? '8' : '+7';
        formattedValue = countryCode + ' ';
        if (digits.length > 1) {
          formattedValue += '(' + digits.substring(1, 4);
        }
        if (digits.length >= 5) {
          formattedValue += ') ' + digits.substring(4, 7);
        }
        if (digits.length >= 8) {
          formattedValue += '-' + digits.substring(7, 9);
        }
        if (digits.length >= 10) {
          formattedValue += '-' + digits.substring(9, 11);
        }
      } else {
        formattedValue = '+' + digits.substring(0, 16);
      }

      input.value = formattedValue;
    }

    handleKeyDown(event) {
      const digits = PhoneMask.extractDigits(event.target.value);
      if (event.key === 'Backspace' && digits.length === 1) {
        event.target.value = '';
      }
    }

    validatePhone() {
      const digits = PhoneMask.extractDigits(this.input.value);
      const isValid = digits.length === 11 && digits.startsWith('7');
      if (!isValid) {
        this.input.classList.add('error');
      } else {
        this.input.classList.remove('error');
      }
    }

    attachEvents() {
      this.input.addEventListener('keydown', this.handleKeyDown.bind(this));
      this.input.addEventListener('input', this.handleInput.bind(this));
      this.input.addEventListener('paste', this.handlePaste.bind(this));
      this.input.addEventListener('blur', this.validatePhone.bind(this));
    }
  }

  document.querySelectorAll('input[type="tel"]').forEach(input => new PhoneMask(input));

  document.querySelectorAll('form').forEach(form => {
    if (form.classList.contains('is_ahunterSuggest')) {
      const options = {
        fields: [
          { id: 'js-last_name', tag: 'last_name' },
          { id: 'js-first_name', tag: 'first_name' },
          { id: 'js-patronym', tag: 'patronym' }
        ],
        ahunter_url: 'https://ahunter.ru/',
        limit: 5,
        suggest_on_focus: false
      };
      const optionsAddress = {
        fields: [
          {
            id: 'js-AddressField', levels: ['Region', 'District', 'City', 'Place']
          }
        ],
        ahunter_url: 'https://ahunter.ru/',
        limit: 5,
        suggest_on_focus: false
      };

      // Запускаем модуль
      AhunterSuggest.Address.Discrete(optionsAddress);
      AhunterSuggest.Person.Discrete(options);
    }

    // Обработчик отправки формы
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Предотвращаем отправку формы по умолчанию

      // Выполняем валидацию формы перед отправкой
      const isValid = checkFormValidity(form);

      if (isValid) {
        form.submit(); // Отправляем форму, если все поля валидны
      } else {
        toggleFormState(form); // Обновляем состояние формы (добавляем класс .error и отключаем кнопку)
      }
    });

    // Обработчик события "blur" для каждого поля
    form.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('blur', function () {
        validateField(field);
        toggleFormState(form);
      });

      // Обработчик события "change" для чекбоксов и календаря
      if (field.type === 'checkbox' || field.id === 'calendar-input') {
        field.addEventListener('change', function () {
          validateField(field);
          toggleFormState(form);
        });
      } else {
        // Обработчик события "input" для всех остальных полей
        field.addEventListener('input', function () {
          if (field.type === 'email' || field.type === 'tel') {
            field.classList.remove('error', 'success');
          } else {
            validateField(field);
          }
          toggleFormState(form);
        });
      }
    });

    function validateField(field) {
      const errorSpan = field.nextElementSibling;
      if (field.type === 'checkbox') {
        if (!field.checked) {
          field.classList.add('error');
          field.classList.remove('success');
          if (errorSpan) errorSpan.textContent = ''; // Очистить сообщение об ошибке для чекбокса
          return false;
        } else {
          field.classList.remove('error');
          field.classList.add('success');
          if (errorSpan) errorSpan.textContent = ''; // Очистить сообщение об ошибке для чекбокса
          return true;
        }
      } else if (field.value.trim() === '') {
        field.classList.add('error');
        field.classList.remove('success');
        if (errorSpan) {
          errorSpan.textContent = 'Это поле необходимо заполнить';
          errorSpan.style.display = 'block'; // Показываем сообщение об ошибке
        }
        return false;
      } else {
        field.classList.remove('error');

        if (field.type === 'email') {
          if (validateEmail(field.value)) {
            field.classList.add('success');
          } else {
            field.classList.add('error');
            if (errorSpan) {
              errorSpan.textContent = 'Введите корректный E-mail';
              errorSpan.style.display = 'block'; // Показываем сообщение об ошибке
            }
            return false;
          }
        } else if (field.type === 'tel') {
          if (validatePhone(field.value)) {
            field.classList.add('success');
          } else {
            field.classList.add('error');
            if (errorSpan) {
              errorSpan.textContent = 'Введите корректный номер телефона';
              errorSpan.style.display = 'block'; // Показываем сообщение об ошибке
            }
            return false;
          }
        } else if (field.id === 'siries') {
          if (validatePassportSeries(field.value)) {
            field.classList.add('success');
          } else {
            field.classList.add('error');
            if (errorSpan) {
              errorSpan.textContent = 'Введите корректную серию и номер паспорта';
              errorSpan.style.display = 'block'; // Показываем сообщение об ошибке
            }
            return false;
          }
        } else if (field.id === 'code') {
          if (validateCode(field.value)) {
            field.classList.add('success');
          } else {
            field.classList.add('error');
            if (errorSpan) {
              errorSpan.textContent = 'Введите корректный код подразделения';
              errorSpan.style.display = 'block'; // Показываем сообщение об ошибке
            }
            return false;
          }
        } else {
          field.classList.add('success');
          if (errorSpan) errorSpan.style.display = 'none'; // Скрываем сообщение об ошибке
        }
        return true;
      }
    }

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    function validatePhone(phone) {
      const digits = phone.replace(/\D/g, '');
      return digits.length === 11 && digits.startsWith('7');
    }

    function validatePassportSeries(series) {
      const re = /^\d{4} - \d{6}$/;
      return re.test(series);
    }

    function validateCode(code) {
      const re = /^\d{3} - \d{3}$/;
      return re.test(code);
    }

    function checkFormValidity(form) {
      let isValid = true;
      form.querySelectorAll('[required]').forEach(field => {
        if (!validateField(field)) {
          isValid = false;
        }
      });
      return isValid;
    }

    function toggleFormState(form) {
      const isValid = checkFormValidity(form);
      const submitButton = form.querySelector('[type="submit"]');

      if (isValid) {
        form.classList.remove('error');
        submitButton.removeAttribute('disabled');
      } else {
        form.classList.add('error');
        submitButton.setAttribute('disabled', 'disabled');
      }
    }

    // Функция для форматирования номера паспорта
    function formatPassportSeries(value) {
      // Удаляем все нечисловые символы
      let numbers = value.replace(/\D/g, '');
      // Форматируем в соответствии с шаблоном
      if (numbers.length > 4) {
        numbers = numbers.slice(0, 4) + ' - ' + numbers.slice(4, 10);
      }
      return numbers;
    }

    // Функция для форматирования кода подразделения
    function formatCode(value) {
      // Удаляем все нечисловые символы
      let numbers = value.replace(/\D/g, '');
      // Форматируем в соответствии с шаблоном
      if (numbers.length > 3) {
        numbers = numbers.slice(0, 3) + ' - ' + numbers.slice(3, 6);
      }
      return numbers;
    }

    // Обработчик форматирования ввода
    form.querySelectorAll('#siries, #code').forEach(field => {
      field.addEventListener('input', function () {
        if (field.id === 'siries') {
          field.value = formatPassportSeries(field.value);
        } else if (field.id === 'code') {
          field.value = formatCode(field.value);
        }
        validateField(field); // Перепроверяем поле после форматирования
        toggleFormState(form); // Обновляем состояние формы
      });
    });

    const options = {
      input: true,
      actions: {
        changeToInput(e, self) {
          if (!self.HTMLInputElement) return;
          if (self.selectedDates[0]) {
            self.HTMLInputElement.value = self.selectedDates[0];
            self.hide();
          } else {
            self.HTMLInputElement.value = '';
          }
        },
      },
      settings: {
        lang: 'Ru-ru',
        range: {
          max: 'today',
        },
        visibility: {
          positionToInput: 'left',
        },
      },
    };

    const calendarInput = new VanillaCalendar('#calendar-input', options);
    calendarInput.init();
  });


  const swiperBanks = new Swiper('.partners-slider__slider', {
    spaceBetween: 24,
    slidesPerView: 1,
    initialSlide: 0,
    loop: true,
    centeredSlides: false,
    navigation: {
      nextEl: '.partners-slider__btn-next',
      prevEl: '.partners-slider__btn-prev',
    },
    pagination: {
      el: '.partners-slider__pagination',
      type: 'bullets',
    },
    breakpoints: {
      768: {
        slidesPerView: 'auto',
        initialSlide: 2,
        centeredSlides: true,
      },
    }
  });

});

$(function () {
  // Слайдер для суммы кредита
  $("#credits-slider").slider({
    range: "min",
    value: $("#credits-slider").data("summ"),
    min: $("#credits-slider").data("min"),
    max: $("#credits-slider").data("max"),
    step: $("#credits-slider").data("step"),
    slide: function (event, ui) {
      let formattedValue = formatCurrency(ui.value) + " ₽";
      $("#credits-amount").val(formattedValue);
      $("#credits-screen").text(formattedValue);
    }
  });
  let initialCreditValue = formatCurrency($("#credits-slider").slider("value")) + " ₽";
  $("#credits-amount").val(initialCreditValue);
  $("#credits-screen").text(initialCreditValue);

  // Слайдер для срока кредита
  $("#date-slider").slider({
    range: "min",
    value: $("#date-slider").data("summ"),
    min: $("#date-slider").data("min"),
    max: $("#date-slider").data("max"),
    step: $("#date-slider").data("step"),
    slide: function (event, ui) {
      let dateText = ui.value + " " + getDayWord(ui.value);
      let returnDate = calculateReturnDate(ui.value);
      $("#date-amount").val(dateText);
      $("#date-screen").text(returnDate);
    }
  });
  let initialDateValue = $("#date-slider").slider("value") + " " + getDayWord($("#date-slider").slider("value"));
  let initialReturnDate = calculateReturnDate($("#date-slider").slider("value"));
  $("#date-amount").val(initialDateValue);
  $("#date-screen").text(initialReturnDate);

  // Функция форматирования суммы в рублях
  function formatCurrency(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  // Функция склонения слова "день"
  function getDayWord(days) {
    if (days >= 11 && days <= 19) {
      return "дней";
    }
    switch (days % 10) {
      case 1:
        return "день";
      case 2:
      case 3:
      case 4:
        return "дня";
      default:
        return "дней";
    }
  }

  function calculateReturnDate(days) {
    let returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + days);
    let day = ("0" + returnDate.getDate()).slice(-2); // День с ведущим нулем
    let month = ("0" + (returnDate.getMonth() + 1)).slice(-2); // Месяц с ведущим нулем (месяцы в JS начинаются с 0)
    let year = returnDate.getFullYear();
    return `${day}.${month}.${year}`;
  }
});
