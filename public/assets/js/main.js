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

eval("document.querySelectorAll('form').forEach(form => {\n  if (form.classList.contains('is_ahunterSuggest')) {\n    const options = {\n      fields: [\n        { id: 'js-last_name', tag: 'last_name' },\n        { id: 'js-first_name', tag: 'first_name' },\n        { id: 'js-patronym', tag: 'patronym' }\n      ],\n      ahunter_url: 'https://ahunter.ru/',\n      limit: 5,\n      suggest_on_focus: false\n    };\n\n    // Запуск дискретных подсказок\n    AhunterSuggest.Person.Discrete(options);\n  }\n\n  // Обработчик отправки формы\n  form.addEventListener('submit', function (event) {\n    event.preventDefault(); // Предотвращаем отправку формы по умолчанию\n\n    // Выполняем валидацию формы перед отправкой\n    const isValid = checkFormValidity(form);\n\n    if (isValid) {\n      form.submit(); // Отправляем форму, если все поля валидны\n    } else {\n      toggleFormState(form); // Обновляем состояние формы (добавляем класс .error и отключаем кнопку)\n    }\n  });\n\n  // Обработчик события \"blur\" для каждого поля\n  form.querySelectorAll('[required]').forEach(field => {\n    field.addEventListener('blur', function () {\n      validateField(field);\n      toggleFormState(form);\n    });\n\n    // Обработчик события \"change\" для чекбоксов\n    if (field.type === 'checkbox') {\n      field.addEventListener('change', function () {\n        validateField(field);\n        toggleFormState(form);\n      });\n    } else {\n      // Обработчик события \"input\" для всех остальных полей\n      field.addEventListener('input', function () {\n        if (field.type === 'email' || field.type === 'tel') {\n          field.classList.remove('error', 'success');\n        } else {\n          validateField(field);\n        }\n        toggleFormState(form);\n      });\n    }\n  });\n\n  function validateField(field) {\n    if (field.type === 'checkbox') {\n      if (!field.checked) {\n        field.classList.add('error');\n        field.classList.remove('success');\n        return false;\n      } else {\n        field.classList.remove('error');\n        field.classList.add('success');\n        return true;\n      }\n    } else if (field.value.trim() === '') {\n      field.classList.add('error');\n      field.classList.remove('success');\n      return false;\n    } else {\n      field.classList.remove('error');\n\n      if (field.type === 'email') {\n        if (validateEmail(field.value)) {\n          field.classList.add('success');\n        } else {\n          field.classList.add('error');\n          return false;\n        }\n      } else if (field.type === 'tel') {\n        if (validatePhone(field.value)) {\n          field.classList.add('success');\n        } else {\n          field.classList.add('error');\n          return false;\n        }\n      } else {\n        field.classList.add('success');\n      }\n      return true;\n    }\n  }\n\n  function validateEmail(email) {\n    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    return re.test(email);\n  }\n\n  function validatePhone(phone) {\n    // Удаляем все нечисловые символы\n    const digits = phone.replace(/\\D/g, '');\n    // Проверяем, что номер состоит из 11 цифр и начинается с 7\n    return digits.length === 11 && digits.startsWith('7');\n  }\n\n  function checkFormValidity(form) {\n    let isValid = true;\n    form.querySelectorAll('[required]').forEach(field => {\n      if (!validateField(field)) {\n        isValid = false;\n      }\n    });\n    return isValid;\n  }\n\n  function toggleFormState(form) {\n    const isValid = checkFormValidity(form);\n    const submitButton = form.querySelector('[type=\"submit\"]');\n\n    if (isValid) {\n      form.classList.remove('error');\n      submitButton.removeAttribute('disabled');\n    } else {\n      form.classList.add('error');\n      submitButton.setAttribute('disabled', 'disabled');\n    }\n  }\n});\n\n\n//# sourceURL=webpack://gulp-starter/./src/assets/js/main.js?");

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