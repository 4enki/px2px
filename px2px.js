function px2px() {
    
    'use strict';
    let doc = document;

    let px2pxBlock = doc.getElementsByClassName('px2px')[0];

    function init() {
        createContolsPanel();
    }

    // если есть нужный элемент на странице
    if (px2pxBlock) {
    // , то создаём контрольную панель
        init();
    // и добавляем на body класс .is-px2px
        document.body.className = "is-px2px";
    }
}

window.onload = function () {
    px2px();
};