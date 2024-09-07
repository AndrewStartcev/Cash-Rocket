/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/main.js":
/*!*******************************!*\
  !*** ./src/assets/js/main.js ***!
  \*******************************/
/***/ (function() {

eval("document.addEventListener('DOMContentLoaded', function () {\n  const burger = document.querySelector('.header__burger');\n  const menu = document.querySelector('.menu');\n\n  if (menu) {\n    function toggleMenu() {\n      burger.classList.toggle('burger-close');\n      menu.classList.toggle('menu-open');\n    }\n\n    function closeMenu() {\n      burger.classList.remove('burger-close');\n      menu.classList.remove('menu-open');\n    }\n\n    burger.addEventListener('click', function (event) {\n      event.stopPropagation();\n      toggleMenu();\n    });\n\n    document.addEventListener('click', function (event) {\n      if (!menu.contains(event.target) && !burger.contains(event.target)) {\n        closeMenu();\n      }\n    });\n  }\n\n  const tabButtons = document.querySelectorAll('.about-services__buttons button');\n  const tabs = document.querySelectorAll('.about-services__tab');\n\n  if (tabs && tabs.length > 0) {\n    tabButtons.forEach(button => {\n      button.addEventListener('click', function () {\n        tabButtons.forEach(btn => btn.classList.remove('active'));\n        this.classList.add('active');\n\n        const tabId = this.getAttribute('data-tab');\n\n        tabs.forEach(tab => tab.classList.remove('active'));\n        document.getElementById(tabId).classList.add('active');\n      });\n    });\n  }\n\n  class PhoneMask {\n    constructor(input) {\n      this.input = input;\n      this.attachEvents();\n    }\n\n    static extractDigits(value) {\n      return value.replace(/\\D/g, '');\n    }\n\n    handlePaste(event) {\n      const input = event.target;\n      const digits = PhoneMask.extractDigits(input.value);\n      const pastedData = event.clipboardData || window.clipboardData;\n      if (pastedData) {\n        const pastedText = pastedData.getData('Text');\n        if (/\\D/g.test(pastedText)) {\n          input.value = digits;\n          event.preventDefault();\n        }\n      }\n    }\n\n    handleInput(event) {\n      const input = event.target;\n      let digits = PhoneMask.extractDigits(input.value);\n      let cursorPosition = input.selectionStart;\n      let formattedValue = '';\n\n      if (!digits) {\n        input.value = '';\n        return;\n      }\n\n      if (input.value.length !== cursorPosition) {\n        if (event.data && /\\D/g.test(event.data)) {\n          input.value = digits;\n        }\n        return;\n      }\n\n      if (['7', '8', '9'].includes(digits[0])) {\n        if (digits[0] === '9') digits = '7' + digits;\n        const countryCode = (digits[0] === '8') ? '8' : '+7';\n        formattedValue = countryCode + ' ';\n        if (digits.length > 1) {\n          formattedValue += '(' + digits.substring(1, 4);\n        }\n        if (digits.length >= 5) {\n          formattedValue += ') ' + digits.substring(4, 7);\n        }\n        if (digits.length >= 8) {\n          formattedValue += '-' + digits.substring(7, 9);\n        }\n        if (digits.length >= 10) {\n          formattedValue += '-' + digits.substring(9, 11);\n        }\n      } else {\n        formattedValue = '+' + digits.substring(0, 16);\n      }\n\n      input.value = formattedValue;\n    }\n\n    handleKeyDown(event) {\n      const digits = PhoneMask.extractDigits(event.target.value);\n      if (event.key === 'Backspace' && digits.length === 1) {\n        event.target.value = '';\n      }\n    }\n\n    validatePhone() {\n      const digits = PhoneMask.extractDigits(this.input.value);\n      const isValid = digits.length === 11 && digits.startsWith('7');\n      if (!isValid) {\n        this.input.classList.add('error');\n      } else {\n        this.input.classList.remove('error');\n      }\n    }\n\n    attachEvents() {\n      this.input.addEventListener('keydown', this.handleKeyDown.bind(this));\n      this.input.addEventListener('input', this.handleInput.bind(this));\n      this.input.addEventListener('paste', this.handlePaste.bind(this));\n      this.input.addEventListener('blur', this.validatePhone.bind(this));\n    }\n  }\n\n  document.querySelectorAll('input[type=\"tel\"]').forEach(input => new PhoneMask(input));\n\n  document.querySelectorAll('form').forEach(form => {\n    if (form.classList.contains('is_ahunterSuggest')) {\n      const options = {\n        fields: [\n          { id: 'js-last_name', tag: 'last_name' },\n          { id: 'js-first_name', tag: 'first_name' },\n          { id: 'js-patronym', tag: 'patronym' }\n        ],\n        ahunter_url: 'https://ahunter.ru/',\n        limit: 5,\n        suggest_on_focus: false\n      };\n      const optionsAddress = {\n        fields: [\n          {\n            id: 'js-AddressField', levels: ['Region', 'District', 'City', 'Place']\n          }\n        ],\n        ahunter_url: 'https://ahunter.ru/',\n        limit: 5,\n        suggest_on_focus: false\n      };\n\n      // Запускаем модуль\n      AhunterSuggest.Address.Discrete(optionsAddress);\n      AhunterSuggest.Person.Discrete(options);\n    }\n\n    // Обработчик отправки формы\n    form.addEventListener('submit', function (event) {\n      event.preventDefault(); // Предотвращаем отправку формы по умолчанию\n\n      // Выполняем валидацию формы перед отправкой\n      const isValid = checkFormValidity(form);\n\n      if (isValid) {\n        form.submit(); // Отправляем форму, если все поля валидны\n      } else {\n        toggleFormState(form); // Обновляем состояние формы (добавляем класс .error и отключаем кнопку)\n      }\n    });\n\n    // Обработчик события \"blur\" для каждого поля\n    form.querySelectorAll('[required]').forEach(field => {\n      field.addEventListener('blur', function () {\n        validateField(field);\n        toggleFormState(form);\n      });\n\n      // Обработчик события \"change\" для чекбоксов и календаря\n      if (field.type === 'checkbox' || field.id === 'calendar-input') {\n        field.addEventListener('change', function () {\n          validateField(field);\n          toggleFormState(form);\n        });\n      } else {\n        // Обработчик события \"input\" для всех остальных полей\n        field.addEventListener('input', function () {\n          if (field.type === 'email' || field.type === 'tel') {\n            field.classList.remove('error', 'success');\n          } else {\n            validateField(field);\n          }\n          toggleFormState(form);\n        });\n      }\n    });\n\n    function validateField(field) {\n      const errorSpan = field.nextElementSibling;\n      if (field.type === 'checkbox') {\n        if (!field.checked) {\n          field.classList.add('error');\n          field.classList.remove('success');\n          if (errorSpan) errorSpan.textContent = ''; // Очистить сообщение об ошибке для чекбокса\n          return false;\n        } else {\n          field.classList.remove('error');\n          field.classList.add('success');\n          if (errorSpan) errorSpan.textContent = ''; // Очистить сообщение об ошибке для чекбокса\n          return true;\n        }\n      } else if (field.value.trim() === '') {\n        field.classList.add('error');\n        field.classList.remove('success');\n        if (errorSpan) {\n          errorSpan.textContent = 'Это поле необходимо заполнить';\n          errorSpan.style.display = 'block'; // Показываем сообщение об ошибке\n        }\n        return false;\n      } else {\n        field.classList.remove('error');\n\n        if (field.type === 'email') {\n          if (validateEmail(field.value)) {\n            field.classList.add('success');\n          } else {\n            field.classList.add('error');\n            if (errorSpan) {\n              errorSpan.textContent = 'Введите корректный E-mail';\n              errorSpan.style.display = 'block'; // Показываем сообщение об ошибке\n            }\n            return false;\n          }\n        } else if (field.type === 'tel') {\n          if (validatePhone(field.value)) {\n            field.classList.add('success');\n          } else {\n            field.classList.add('error');\n            if (errorSpan) {\n              errorSpan.textContent = 'Введите корректный номер телефона';\n              errorSpan.style.display = 'block'; // Показываем сообщение об ошибке\n            }\n            return false;\n          }\n        } else if (field.id === 'siries') {\n          if (validatePassportSeries(field.value)) {\n            field.classList.add('success');\n          } else {\n            field.classList.add('error');\n            if (errorSpan) {\n              errorSpan.textContent = 'Введите корректную серию и номер паспорта';\n              errorSpan.style.display = 'block'; // Показываем сообщение об ошибке\n            }\n            return false;\n          }\n        } else if (field.id === 'code') {\n          if (validateCode(field.value)) {\n            field.classList.add('success');\n          } else {\n            field.classList.add('error');\n            if (errorSpan) {\n              errorSpan.textContent = 'Введите корректный код подразделения';\n              errorSpan.style.display = 'block'; // Показываем сообщение об ошибке\n            }\n            return false;\n          }\n        } else {\n          field.classList.add('success');\n          if (errorSpan) errorSpan.style.display = 'none'; // Скрываем сообщение об ошибке\n        }\n        return true;\n      }\n    }\n\n    function validateEmail(email) {\n      const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n      return re.test(email);\n    }\n\n    function validatePhone(phone) {\n      const digits = phone.replace(/\\D/g, '');\n      return digits.length === 11 && digits.startsWith('7');\n    }\n\n    function validatePassportSeries(series) {\n      const re = /^\\d{4} - \\d{6}$/;\n      return re.test(series);\n    }\n\n    function validateCode(code) {\n      const re = /^\\d{3} - \\d{3}$/;\n      return re.test(code);\n    }\n\n    function checkFormValidity(form) {\n      let isValid = true;\n      form.querySelectorAll('[required]').forEach(field => {\n        if (!validateField(field)) {\n          isValid = false;\n        }\n      });\n      return isValid;\n    }\n\n    function toggleFormState(form) {\n      const isValid = checkFormValidity(form);\n      const submitButton = form.querySelector('[type=\"submit\"]');\n\n      if (isValid) {\n        form.classList.remove('error');\n        submitButton.removeAttribute('disabled');\n      } else {\n        form.classList.add('error');\n        submitButton.setAttribute('disabled', 'disabled');\n      }\n    }\n\n    // Функция для форматирования номера паспорта\n    function formatPassportSeries(value) {\n      // Удаляем все нечисловые символы\n      let numbers = value.replace(/\\D/g, '');\n      // Форматируем в соответствии с шаблоном\n      if (numbers.length > 4) {\n        numbers = numbers.slice(0, 4) + ' - ' + numbers.slice(4, 10);\n      }\n      return numbers;\n    }\n\n    // Функция для форматирования кода подразделения\n    function formatCode(value) {\n      // Удаляем все нечисловые символы\n      let numbers = value.replace(/\\D/g, '');\n      // Форматируем в соответствии с шаблоном\n      if (numbers.length > 3) {\n        numbers = numbers.slice(0, 3) + ' - ' + numbers.slice(3, 6);\n      }\n      return numbers;\n    }\n\n    // Обработчик форматирования ввода\n    form.querySelectorAll('#siries, #code').forEach(field => {\n      field.addEventListener('input', function () {\n        if (field.id === 'siries') {\n          field.value = formatPassportSeries(field.value);\n        } else if (field.id === 'code') {\n          field.value = formatCode(field.value);\n        }\n        validateField(field); // Перепроверяем поле после форматирования\n        toggleFormState(form); // Обновляем состояние формы\n      });\n    });\n\n    const options = {\n      input: true,\n      actions: {\n        changeToInput(e, self) {\n          if (!self.HTMLInputElement) return;\n          if (self.selectedDates[0]) {\n            self.HTMLInputElement.value = self.selectedDates[0];\n            self.hide();\n          } else {\n            self.HTMLInputElement.value = '';\n          }\n        },\n      },\n      settings: {\n        lang: 'Ru-ru',\n        range: {\n          max: 'today',\n        },\n        visibility: {\n          positionToInput: 'left',\n        },\n      },\n    };\n\n    const calendarInput = new VanillaCalendar('#calendar-input', options);\n    calendarInput.init();\n  });\n\n\n  const swiperBanks = new Swiper('.partners-slider__slider', {\n    spaceBetween: 24,\n    slidesPerView: 1,\n    initialSlide: 0,\n    loop: true,\n    centeredSlides: false,\n    navigation: {\n      nextEl: '.partners-slider__btn-next',\n      prevEl: '.partners-slider__btn-prev',\n    },\n    pagination: {\n      el: '.partners-slider__pagination',\n      type: 'bullets',\n    },\n    breakpoints: {\n      768: {\n        slidesPerView: 'auto',\n        initialSlide: 2,\n        centeredSlides: true,\n      },\n    }\n  });\n\n});\n\n$(function () {\n  // Слайдер для суммы кредита\n  $(\"#credits-slider\").slider({\n    range: \"min\",\n    value: $(\"#credits-slider\").data(\"summ\"),\n    min: $(\"#credits-slider\").data(\"min\"),\n    max: $(\"#credits-slider\").data(\"max\"),\n    step: $(\"#credits-slider\").data(\"step\"),\n    slide: function (event, ui) {\n      let formattedValue = formatCurrency(ui.value) + \" ₽\";\n      $(\"#credits-amount\").val(formattedValue);\n      $(\"#credits-screen\").text(formattedValue);\n    }\n  });\n  let initialCreditValue = formatCurrency($(\"#credits-slider\").slider(\"value\")) + \" ₽\";\n  $(\"#credits-amount\").val(initialCreditValue);\n  $(\"#credits-screen\").text(initialCreditValue);\n\n  // Слайдер для срока кредита\n  $(\"#date-slider\").slider({\n    range: \"min\",\n    value: $(\"#date-slider\").data(\"summ\"),\n    min: $(\"#date-slider\").data(\"min\"),\n    max: $(\"#date-slider\").data(\"max\"),\n    step: $(\"#date-slider\").data(\"step\"),\n    slide: function (event, ui) {\n      let dateText = ui.value + \" \" + getDayWord(ui.value);\n      let returnDate = calculateReturnDate(ui.value);\n      $(\"#date-amount\").val(dateText);\n      $(\"#date-screen\").text(returnDate);\n    }\n  });\n  let initialDateValue = $(\"#date-slider\").slider(\"value\") + \" \" + getDayWord($(\"#date-slider\").slider(\"value\"));\n  let initialReturnDate = calculateReturnDate($(\"#date-slider\").slider(\"value\"));\n  $(\"#date-amount\").val(initialDateValue);\n  $(\"#date-screen\").text(initialReturnDate);\n\n  // Функция форматирования суммы в рублях\n  function formatCurrency(value) {\n    return value.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, \" \");\n  }\n\n  // Функция склонения слова \"день\"\n  function getDayWord(days) {\n    if (days >= 11 && days <= 19) {\n      return \"дней\";\n    }\n    switch (days % 10) {\n      case 1:\n        return \"день\";\n      case 2:\n      case 3:\n      case 4:\n        return \"дня\";\n      default:\n        return \"дней\";\n    }\n  }\n\n  function calculateReturnDate(days) {\n    let returnDate = new Date();\n    returnDate.setDate(returnDate.getDate() + days);\n    let day = (\"0\" + returnDate.getDate()).slice(-2); // День с ведущим нулем\n    let month = (\"0\" + (returnDate.getMonth() + 1)).slice(-2); // Месяц с ведущим нулем (месяцы в JS начинаются с 0)\n    let year = returnDate.getFullYear();\n    return `${day}.${month}.${year}`;\n  }\n});\n\n\n//# sourceURL=webpack://gulp-starter/./src/assets/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/assets/js/main.js"]();
/******/ 	
/******/ })()
;