class SmoothImage {
  constructor(image) {
    this.image = image;

    if (this.isLoaded()) {
      return;
    }

    this.onLoad = this.onLoad.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.hide();
    image.addEventListener('load', this.onLoad);
  }

  isLoaded() {
    return this.image.complete && this.image.naturalWidth !== 0;
  }

  hide() {
    this.image.classList.add('smooth-image--hidden');
  }

  fadeIn() {
    this.image.addEventListener('transitionend', this.onTransitionEnd);
    this.image.classList.add('smooth-image--animatable');
    this.image.classList.remove('smooth-image--hidden');
  }

  onLoad() {
    this.image.removeEventListener('load', this.onLoad);
    this.fadeIn();
  }

  onTransitionEnd() {
    this.image.removeEventListener('transitionend', this.onTransitionEnd);
    this.image.classList.remove('smooth-image--animatable');
  }
}

document.querySelectorAll('img').forEach((image) => {
  new SmoothImage(image); // eslint-disable-line no-new
});
