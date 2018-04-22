class ImageBlur extends HTMLElement {
  static get observedAttributes() {
    return ['src', 'blur', 'style', 'class', 'width', 'height'];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.src = this.getAttribute('src');
    this.blur = this.getAttribute('blur') || 8;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.setCanvasSize();

    this.image = new Image();
    this.imageSize = false;
    this.image.onload = e => {
      const image = e.currentTarget;

      this.imageSize = {
        width: image.width,
        height: image.height
      };

      this.createBlurryImage(image, this.canvasWidth, this.canvasHeight);
    };

    this.shadow.appendChild(this.canvas);
    this.image.src = this.src;

    window.addEventListener('resize', this.handleResize.bind(this));
  }

  createBlurryImage(image, width, height) {
    this.sizes = this.getRealSizes();

    console.log(this.sizes);

    createImageBitmap(image, 0, 0, this.sizes.realWidth, this.sizes.realHeight).then(sprite => {
      this.ctx.filter = 'blur(' + this.blur + 'px)';
      this.ctx.clearRect(0, 0, this.sizes.realWidth, this.sizes.realHeight);
      this.ctx.drawImage(sprite, this.sizes.offsetX, this.sizes.offsetY, this.sizes.realWidth, this.sizes.realHeight);
    });
  }

  getRealSizes() {
    const largerDimension = this.getLargerDimension();
    let realWidth = 0;
    let realHeight = 0;
    let offsetWidth = 0;
    let offsetHeight = 0;

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

  setCanvasSize() {
    this.canvasWidth = this.offsetWidth;
    this.canvasHeight = this.offsetHeight;
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
  }

  handleResize() {
    this.setCanvasSize();
    this.createBlurryImage(this.image, this.canvasWidth, this.canvasHeight);
  }

  getLargerDimension() {
    return this.canvasWidth >= this.canvasHeight ? 'width' : 'height';
  }

  attributeChangedCallback() {
    this.setCanvasSize();
    this.src = this.getAttribute('src');
    this.blur = this.getAttribute('blur');
    this.image.src = this.src;
  }

  disconnectedCallback() {
    this.image.remove();
    this.canvas.remove();
    console.log(this.image, this.canvas);
  }
}

window.customElements.define('image-blur', ImageBlur);
