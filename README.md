# :page_facing_up: px2px

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

### Разметка:

```html
<div class="px2px"></div>
```

Слой этот обычно добавляю где-то близко к тегу `<body>`, но это не принципиально.

## Как использовать в своём проекте?

1. Подключить JS-файл на тестируемую страницу

    ```html
    <script src="https://4enki.github.io/px2px/px2px.js"></script>
    ```
2. Cоздать слой для тестирования

    ```html
    <div class="px2px"></div>
    ```
3. 

## Смотрите также

- [Pixel Glass](https://github.com/yoksel/pixel-glass-js) от прекрасной @yoksel
- [Makeup](https://github.com/2gis/makeup) от ребят из 2Gis (статья на Хабре: [habrahabr.ru/company/2gis/blog/277457/](https://habrahabr.ru/company/2gis/blog/277457/))