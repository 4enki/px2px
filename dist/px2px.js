function px2px() {
    
    'use strict';
    let doc = document;

    let px2pxBlock = doc.getElementsByClassName('px2px')[0];

    function init() {
        createContolsPanel();
    }
}

window.onload = function () {
    px2px();
};