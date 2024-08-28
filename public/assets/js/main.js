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

eval("document.addEventListener('DOMContentLoaded', function () {\n  const burger = document.querySelector('.header__burger');\n  const menu = document.querySelector('.menu');\n\n  function toggleMenu() {\n    burger.classList.toggle('burger-close');\n    menu.classList.toggle('menu-open');\n  }\n\n  function closeMenu() {\n    burger.classList.remove('burger-close');\n    menu.classList.remove('menu-open');\n  }\n\n  burger.addEventListener('click', function (event) {\n    event.stopPropagation();\n    toggleMenu();\n  });\n\n  document.addEventListener('click', function (event) {\n    if (!menu.contains(event.target) && !burger.contains(event.target)) {\n      closeMenu();\n    }\n  });\n\n});\n\n\n//# sourceURL=webpack://gulp-starter/./src/assets/js/main.js?");

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