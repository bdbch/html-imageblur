'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageBlur = function (_HTMLElement) {
  _inherits(ImageBlur, _HTMLElement);

  _createClass(ImageBlur, null, [{
    key: 'observedAttributes',
    get: function get() {
      return ['src', 'blur', 'style', 'class', 'width', 'height'];
    }
  }]);

  function ImageBlur() {
    _classCallCheck(this, ImageBlur);

    var _this = _possibleConstructorReturn(this, (ImageBlur.__proto__ || Object.getPrototypeOf(ImageBlur)).call(this));

    _this.shadow = _this.attachShadow({ mode: 'open' });
    _this.src = _this.getAttribute('src');
    _this.blur = _this.getAttribute('blur') || 8;

    _this.canvas = document.createElement('canvas');
    _this.ctx = _this.canvas.getContext('2d');

    _this.setCanvasSize();

    _this.image = new Image();
    _this.imageSize = false;
    _this.image.onload = function (e) {
      var image = e.currentTarget;

      _this.imageSize = {
        width: image.width,
        height: image.height
      };

      _this.createBlurryImage(image, _this.canvasWidth, _this.canvasHeight);
    };

    _this.shadow.appendChild(_this.canvas);
    _this.image.src = _this.src;

    window.addEventListener('resize', _this.handleResize.bind(_this));
    return _this;
  }

  _createClass(ImageBlur, [{
    key: 'createBlurryImage',
    value: function createBlurryImage(image, width, height) {
      var _this2 = this;

      this.sizes = this.getRealSizes();

      console.log(this.sizes);

      createImageBitmap(image, 0, 0, this.sizes.realWidth, this.sizes.realHeight).then(function (sprite) {
        _this2.ctx.filter = 'blur(' + _this2.blur + 'px)';
        _this2.ctx.clearRect(0, 0, _this2.sizes.realWidth, _this2.sizes.realHeight);
        _this2.ctx.drawImage(sprite, _this2.sizes.offsetX, _this2.sizes.offsetY, _this2.sizes.realWidth, _this2.sizes.realHeight);
      });
    }
  }, {
    key: 'getRealSizes',
    value: function getRealSizes() {
      var largerDimension = this.getLargerDimension();
      var realWidth = 0;
      var realHeight = 0;
      var offsetWidth = 0;
      var offsetHeight = 0;

      if (largerDimension === 'width') {
        realWidth = this.canvasWidth * 2;
        realHeight = realWidth / this.imageSize.width * this.imageSize.height;
      } else {
        realHeight = this.canvasHeight * 2;
        realWidth = realHeight / this.imageSize.height * this.imageSize.width;
      }

      if (realWidth !== this.canvasWidth) {
        offsetWidth = -1 * (realWidth / 4);
      }

      if (realHeight !== this.canvasHeight) {
        offsetHeight = -1 * (realHeight / 4);
      }

      return {
        realWidth: realWidth,
        realHeight: realHeight,
        offsetX: offsetWidth,
        offsetY: offsetHeight
      };
    }
  }, {
    key: 'setCanvasSize',
    value: function setCanvasSize() {
      this.canvasWidth = this.offsetWidth;
      this.canvasHeight = this.offsetHeight;
      this.canvas.width = this.canvasWidth;
      this.canvas.height = this.canvasHeight;
    }
  }, {
    key: 'handleResize',
    value: function handleResize() {
      this.setCanvasSize();
      this.createBlurryImage(this.image, this.canvasWidth, this.canvasHeight);
    }
  }, {
    key: 'getLargerDimension',
    value: function getLargerDimension() {
      return this.canvasWidth >= this.canvasHeight ? 'width' : 'height';
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback() {
      this.setCanvasSize();
      this.src = this.getAttribute('src');
      this.blur = this.getAttribute('blur');
      this.image.src = this.src;
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this.image.remove();
      this.canvas.remove();
      console.log(this.image, this.canvas);
    }
  }]);

  return ImageBlur;
}(HTMLElement);

window.customElements.define('image-blur', ImageBlur);
