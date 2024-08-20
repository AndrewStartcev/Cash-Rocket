const { watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();

// Конфигурация
const path = require('./gulp/config/path.js')
const app = require('./gulp/config/app.js');

// Задачи
const clear = require('./gulp/task/clear.js');
const html = require('./gulp/task/html.js');
const scss = require('./gulp/task/scss.js');
const js = require('./gulp/task/js.js');
const img = require('./gulp/task/img.js');
const font = require('./gulp/task/font.js');
const svgSpriteTask = require('./gulp/task/svgSprite.js');

// Сервер
const server = () => {
  browserSync.init({
    server: {
      baseDir: path.root
    }
  });
}

// Наблюдение
const watcher = () => {
  watch(path.html.watch, html).on("all", browserSync.reload);
  watch(path.scss.watch, scss).on("all", browserSync.reload);
  watch(path.js.watch, js).on("all", browserSync.reload);
  watch(path.img.watch, img).on("all", browserSync.reload);
  watch(path.font.watch, font).on("all", browserSync.reload);
  watch(path.svg.watch, svgSpriteTask).on("all", browserSync.reload);
}

const build = series(
  clear,
  parallel(html, scss, js, img, font, svgSpriteTask),
  parallel(watcher, server)
);

const dev = series(
  build,
  parallel(watcher, server)
);


exports.html = html
exports.scss = scss
exports.js = js
exports.img = img
exports.font = font
exports.svgSpriteTask = svgSpriteTask;
exports.watch = watcher
exports.clear = clear

// Сборка
exports.default = app.isProd ? build : dev

//  --prod --webp
// gulp svgSprite
// mobile wi-fi test: http://192.168.0.14: -port
