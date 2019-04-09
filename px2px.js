(function() {
  var doc        = document;
  var toBody     = doc.body;
  var px2pxBlock = doc.querySelector('.px2px');

  var ClassPanel               = 'px2px-panel';
  var ClassPanelHeader         = 'px2px-panel__header';
  var ClassPanelBody           = 'px2px-panel__body';
  var ClassPanelDraganddrop    = 'px2px-panel__draganddrop';
  var ClassPanelDraganddropDot = 'px2px-panel__draganddrop-dot';
  var ClassPanelSwitch         = 'px2px-panel__switch';

  // если есть нужный элемент на странице
  if ( px2pxBlock ) {

    var BgiPx2px = window.getComputedStyle(px2pxBlock).getPropertyValue('background-image');

    if ( BgiPx2px != 'none' ) {

      var PathtoBgPx2px = BgiPx2px.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0]; // ААААААА

      var thisImage = new Image();
          thisImage.src = PathtoBgPx2px;

      var bgImgWidth  = thisImage.width;
      var bgImgheight = thisImage.height;

      // стили, чтобы было стильно
      (function() {
        var docHead  = doc.getElementsByTagName('head')[0];
        var style = doc.createElement('style');
            style.type = 'text/css';
            style.textContent =
            '.px2px {' +
              'position:              absolute;' +
              'top:                   0;' +
              'left:                  50%;' +
              'z-index:               9999;' +
              'display:               block;' +
              'pointer-events:        none;' +
              'transition:            all .25s ease;' +
              'opacity:               .4;' +
              'filter:                invert(100%);' +
              'background-attachment: scroll;' +
              'width: '               + bgImgWidth + 'px;' +
              'height: '              + bgImgheight + 'px;' +
              'margin:                0 0 0 -' + bgImgWidth / 2 + 'px;' +
            '}';
            docHead.appendChild(style);
      })();

    } else {
      console.log('Для блока к классном .px2px не указано фоновое изображение. Указать можно через style-атрибут: <div class="px2px" style="background-image: url(\'px2px.png\');"></div>')
    }

    // стили, чтобы было стильно
    (function() {
      var style = doc.createElement('style');
          style.type = 'text/css';
          style.textContent =
          '.' + ClassPanel + ' {' +
            'width: 200px;' +
            'overflow: hidden;' +
            'max-height: 240px;' +
            'background-color: #f2f7f8;' +
            'border: 1px solid #d2d8d9;' +
            'border-radius: 4px;' +
            'box-shadow: 0 0 10px rgba(0, 0, 0, .05);' +
            'z-index: 10001;' +
            'box-sizing: border-box;' +
            'outline: none;' +
            'position: fixed;' +
            'top: 100px;' +
            'right: 50px;' +
          '}' +
          '.' + ClassPanelHeader + ' {' +
            'background-color: #fff;' +
            'box-sizing: border-box;' +
            'border: none;' +
            'width: 100%;' +
            'padding: 12px 18px 12px 18px;' +
            'outline: none;' +
          '}' +
          '.' + ClassPanelHeader + ':focus .' + ClassPanelDraganddropDot + ' {' +
            'background-color: #21aa00;' +
            'outline: none;' +
          '}' +
          '.' + ClassPanelBody + ' {' +
            'padding: 14px 18px 14px 18px;' +
            'color: rgb(46, 50, 51);' +
            'font-family: Arial;' +
            'font-size: 13px;' +
            'font-weight: 400;' +
            'line-height: 1;' +
          '}' +
          '.' + ClassPanelDraganddrop + ' {' +
            'margin: 0 auto;' +
            'width: 10px;' +
            'height: 16px;' +
            'display: flex;' +
            'flex-direction: column;' +
            'flex-wrap: wrap;' +
            'justify-content: space-between;' +
          '}' +
          '.' + ClassPanelDraganddropDot + ' {' +
            'margin-bottom: 2px;' +
            'width: 4px;' +
            'height: 4px;' +
            'border-radius: 50%;' +
            'background-color: #cccccc;' +
          '}' +
          '.' + ClassPanelDraganddropDot + ':nth-child(3n) {' +
            'margin-bottom: 0;' +
          '}';
          toBody.appendChild(style);
    })();

    // , то создаём блок панели
    (function() {
      var Panel = doc.createElement('div');
          Panel.classList.add(ClassPanel);
          toBody.appendChild(Panel);

      var PanelHeader = doc.createElement('button');
          PanelHeader.classList.add(ClassPanelHeader);
          PanelHeader.setAttribute('type', 'button');
          Panel.appendChild(PanelHeader);

      var PanelBody = doc.createElement('div');
          PanelBody.classList.add(ClassPanelBody);
          Panel.appendChild(PanelBody);

      var PanelDraganddrop = doc.createElement('div');
          PanelDraganddrop.classList.add(ClassPanelDraganddrop);
          PanelHeader.appendChild(PanelDraganddrop);
      for ( var i=1; i<=6; i++ ) {
          PanelDraganddropDot = doc.createElement('div');
          PanelDraganddropDot.classList.add(ClassPanelDraganddropDot);
          PanelDraganddrop.appendChild(PanelDraganddropDot);
      }

      var PanelSwitch = doc.createElement('div');
          PanelSwitch.classList.add(ClassPanelSwitch);
          PanelBody.appendChild(PanelSwitch);
    })();

    (function() {

      var px2pxBlockPanelHeader = doc.querySelector('.' + ClassPanelHeader);
      var px2pxBlockPanel       = doc.querySelector('.' + ClassPanel);

      px2pxBlockPanelHeader.onmousedown = function () {

        var offsetTop  = this.clientHeight;
        var offsetLeft = px2pxBlockPanel.clientWidth / 2;
        var styles     = getComputedStyle(px2pxBlockPanel);

        // console.log(offsetTop);
        // console.log(offsetLeft);

        px2pxBlockPanel.style.top    = styles.top;
        px2pxBlockPanel.style.left   = styles.left;
        px2pxBlockPanel.style.right  = 'auto';
        px2pxBlockPanel.style.bottom = 'auto';

        doc.onmousemove = function ( ev ) {
          var x = (ev.clientX - offsetLeft ) + 'px';
          var y = (ev.clientY - offsetTop / 2) + 'px';

          // console.log(x);
          // console.log(y);

          px2pxBlockPanel.style.left = x;
          px2pxBlockPanel.style.top  = y;
        };
      };

      px2pxBlockPanelHeader.onmouseup = function () {
        var styles = getComputedStyle(px2pxBlockPanel);
        var left   = +styles.left.replace(/px/,'');
        var right  = +styles.right.replace(/px/,'');
        var top    = +styles.top.replace(/px/,'');
        var bottom = +styles.bottom.replace(/px/,'');

        if ( left > right ) {
          localStorage.setItem('left', 'auto');
          localStorage.setItem('right', styles.right);

          px2pxBlockPanel.style.right = styles.right;
          px2pxBlockPanel.style.left  = 'auto';
        }
        else {
          localStorage.setItem('left', styles.left);
          localStorage.setItem('right', 'auto'); //'auto' needs to override default position;
        }
        if ( top > bottom ) {
          localStorage.setItem('top', 'auto');
          localStorage.setItem('bottom', styles.bottom);

          px2pxBlockPanel.style.bottom = styles.bottom;
          px2pxBlockPanel.style.top = 'auto';
        }
        else {
          localStorage.setItem('top', styles.top);
          localStorage.setItem('bottom', 'auto');
        }

        doc.onmousemove = null;
      };

      // console.log(localStorage.top);

      //if ( localStorage.getItem('top') != null ) {
      //  px2pxBlockPanel.style.left = localStorage.top;
      //}
    })();

    (function() {
    })();

    // и добавляем на body класс .is-px2px
    document.body.className = "is-px2px";
  } else {
    console.info('Чтобы включить px2px штуку — создайте див с классом .px2px: <div class="px2px"></div> и добавьте для него фоновое изображение через style-атрибут');
  }
})();
