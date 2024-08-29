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

eval("document.addEventListener('DOMContentLoaded', function () {\n\n\n  const burger = document.querySelector('.header__burger');\n  const menu = document.querySelector('.menu');\n\n  if (menu) {\n    function toggleMenu() {\n      burger.classList.toggle('burger-close');\n      menu.classList.toggle('menu-open');\n    }\n\n    function closeMenu() {\n      burger.classList.remove('burger-close');\n      menu.classList.remove('menu-open');\n    }\n\n    burger.addEventListener('click', function (event) {\n      event.stopPropagation();\n      toggleMenu();\n    });\n\n    document.addEventListener('click', function (event) {\n      if (!menu.contains(event.target) && !burger.contains(event.target)) {\n        closeMenu();\n      }\n    });\n  }\n\n\n  document.querySelectorAll('form').forEach(form => {\n    if (form.classList.contains('is_ahunterSuggest')) {\n      const options =\n      {\n        fields:\n          [\n            { id: 'js-last_name', tag: 'last_name' },\n            { id: 'js-first_name', tag: 'first_name' },\n            { id: 'js-patronym', tag: 'patronym' }\n          ],\n        ahunter_url: 'https://ahunter.ru/',\n        limit: 5,\n        suggest_on_focus: false\n      };\n\n      //запускаем дискретные подсказки\n      AhunterSuggest.Person.Discrete(options);\n    }\n    // Обработчик отправки формы\n    form.addEventListener('submit', function (event) {\n      let isValid = true;\n\n      form.querySelectorAll('[required]').forEach(field => {\n        if (!validateField(field)) {\n          isValid = false;\n        }\n      });\n\n      if (!isValid) {\n        event.preventDefault();\n      }\n    });\n\n    // Обработчик события \"blur\" для каждого поля\n    form.querySelectorAll('[required]').forEach(field => {\n      field.addEventListener('blur', function () {\n        validateField(field);\n      });\n\n      // Обработчик события \"input\" для каждого поля\n      field.addEventListener('input', function () {\n        if (field.type === 'email') {\n          field.classList.remove('error', 'success');\n        } else {\n          validateField(field);\n        }\n      });\n    });\n\n    function validateField(field) {\n      if (field.value.trim() === '') {\n        field.classList.add('error');\n        field.classList.remove('success');\n        return false;\n      } else {\n        field.classList.remove('error');\n\n        if (field.type === 'email') {\n          if (validateEmail(field.value)) {\n            field.classList.add('success');\n          } else {\n            field.classList.add('error');\n            return false;\n          }\n        } else {\n          field.classList.add('success');\n        }\n        return true;\n      }\n    }\n\n    function validateEmail(email) {\n      const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n      return re.test(email);\n    }\n  });\n\n});\n\n\n//# sourceURL=webpack://gulp-starter/./src/assets/js/main.js?");

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