# :leaves: px2px

Проверяем, насколько разметка и стили страницы соответствует макету.

## Как это работает?

В проектах использую PostCSS-плагин [PostCSS Assets](https://github.com/borodean/postcss-assets) для того, чтобы в ручную не указывать размеры изображения макета при его замене/использовании нескольких тест-макетов для разных страниц в проекте.

Конфигурация плагина такая *(актуальное смотрите в [SPT](https://github.com/4enki/spt/blob/master/gulpfile.js/tasks/styles.js))*:

```js
const assets = require('postcss-assets');

assets({
    basePath: 'dist/',
    loadPaths: ['assets/images/']
})
```

### Стили:

Слой, который всегда по центру, смеённый на -50% от ширины макета. Инверсия и плавность с ним; скроллится.

```css
.px2px {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 9999;
    display: block;
    width: width('_debug/px2px.png');
    height: height('_debug/px2px.png');
    margin: 0 0 0 width('_debug/px2px.png', -2);
    pointer-events: none;
    transition: all .3s;
    opacity: .4;
    background-image: resolve('_debug/px2px.png');
    background-attachment: scroll;
    filter: invert(100%);
}
```

## Как использовать в своём проекте?

1. Подключить JS-файл на тестируемую страницу

    ```html
    <script src="http://4enki.github.io/px2px/dist/px2px.js"></script>
    ```
2. Cоздать слой для тестирования

    ```html
    <div class="px2px"></div>
    ```
3. 