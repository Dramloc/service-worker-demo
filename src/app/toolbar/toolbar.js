class Toolbar {
  constructor(toolbar) {
    this.toolbar = toolbar;

    this.onScroll = this.onScroll.bind(this);

    this.addEventListeners();
    this.onScroll();
  }

  applyPassive() {
    if (this.supportsPassive !== undefined) {
      return this.supportsPassive ? {
        passive: true,
      } : false;
    }
    // feature detect
    let isSupported = false;
    try {
      document.addEventListener('test', null, {
        get passive() {
          isSupported = true;
        },
      });
    } catch (e) {} // eslint-disable-line no-empty
    this.supportsPassive = isSupported;
    return this.applyPassive();
  }

  addEventListeners() {
    window.addEventListener('scroll', this.onScroll);
  }

  onScroll() {
    if (document.body.scrollTop > 0) {
      this.toolbar.classList.add('toolbar--elevated');
      return;
    }
    this.toolbar.classList.remove('toolbar--elevated');
  }
}

new Toolbar(document.getElementById('toolbar')); // eslint-disable-line no-new
