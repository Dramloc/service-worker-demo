class SideNav {
  constructor(sideNav, sideNavInner, sideNavToggle) {
    this.sideNav = sideNav;
    this.sideNavInner = sideNavInner;
    this.sideNavToggle = sideNavToggle;

    this.showSideNav = this.showSideNav.bind(this);
    this.hideSideNav = this.hideSideNav.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.update = this.update.bind(this);

    this.startX = 0;
    this.currentX = 0;
    this.touchingSideNav = false;

    this.supportsPassive = undefined;
    this.addEventListeners();
  }

  applyPassive() {
    if (this.supportsPassive !== undefined) {
      return this.supportsPassive ? { passive: true } : false;
    }
    // feature detect
    let isSupported = false;
    try {
      document.addEventListener('test', null, {
        get passive() {
          isSupported = true;
        },
      });
    } catch (e) { } // eslint-disable-line no-empty
    this.supportsPassive = isSupported;
    return this.applyPassive();
  }

  addEventListeners() {
    this.sideNavToggle.addEventListener('click', this.showSideNav);
    this.sideNav.addEventListener('click', this.hideSideNav);
    this.sideNavInner.addEventListener('click', SideNav.blockClicks);
    this.sideNav.addEventListener('touchstart', this.onTouchStart, this.applyPassive());
    this.sideNav.addEventListener('touchmove', this.onTouchMove, this.applyPassive());
    this.sideNav.addEventListener('touchend', this.onTouchEnd);
  }

  onTouchStart(event) {
    if (!this.sideNav.classList.contains('side-nav--visible')) {
      return;
    }
    this.startX = event.touches[0].pageX;
    this.currentX = this.startX;
    this.touchingSideNav = true;
    window.requestAnimationFrame(this.update);
  }

  onTouchMove(event) {
    if (!this.touchingSideNav) {
      return;
    }

    this.currentX = event.touches[0].pageX;
  }

  onTouchEnd() {
    if (!this.touchingSideNav) {
      return;
    }
    this.touchingSideNav = false;
    const translateX = Math.min(0, this.currentX - this.startX);
    this.sideNavInner.style.transform = '';
    if (translateX < 0) {
      this.hideSideNav();
    }
  }

  update() {
    if (!this.touchingSideNav) {
      return;
    }
    window.requestAnimationFrame(this.update);
    const translateX = Math.min(0, this.currentX - this.startX);
    this.sideNavInner.style.transform = `translateX(${translateX}px)`;
  }

  static blockClicks(event) {
    event.stopPropagation();
  }

  onTransitionEnd() {
    this.sideNav.classList.remove('side-nav--animatable');
    this.sideNav.removeEventListener('transitionend', this.onTransitionEnd);
  }

  showSideNav() {
    this.sideNav.classList.add('side-nav--animatable');
    this.sideNav.classList.add('side-nav--visible');
    this.sideNav.addEventListener('transitionend', this.onTransitionEnd);
  }

  hideSideNav() {
    this.sideNav.classList.add('side-nav--animatable');
    this.sideNav.classList.remove('side-nav--visible');
    this.sideNav.addEventListener('transitionend', this.onTransitionEnd);
  }
}

const sideNav = document.getElementById('side-nav');
const sideNavInner = document.getElementById('side-nav-inner');
const sideNavToggle = document.getElementById('side-nav-toggle');
new SideNav(sideNav, sideNavInner, sideNavToggle); // eslint-disable-line no-new
