import snif from './Snif';

class Fallback {
    constructor() {
        this.state = {
            fallbacksInitiated: false,
            windowApiTestsInitiated: false,
            polyfillsInitiated: false,
        };

        this.html = document.documentElement;
    }
    initFallbacks() {
        if (!this.state.fallbacksInitiated) {
            if (snif.isMobile()) {
                this.html.classList.add('is-touch');
            } else {
                this.html.classList.add('no-touch');
            }

            if (snif.isIOS()) this.html.classList.add('is-ios');

            if (snif.isSafari()) this.html.classList.add('is-safari');

            if (snif.isFF()) this.html.classList.add('is-ff');

            if (snif.isChromeAndroid()) this.html.classList.add('is-ca');

            if (snif.isMS()) this.html.classList.add('is-ms');

            if (snif.isIe11()) this.html.classList.add('is-ie');

            // IE11 polyfills
            if (!Element.prototype.matches) {
                Element.prototype.matches =
                    Element.prototype.msMatchesSelector ||
                    Element.prototype.webkitMatchesSelector;
            }

            if (!Element.prototype.closest) {
                Element.prototype.closest = function closestPolyfill(s) {
                    let el = this;

                    do {
                        if (el.matches(s)) return el;
                        el = el.parentElement || el.parentNode;
                    } while (el !== null && el.nodeType === 1);

                    return null;
                };
            }

            this.state.fallbacksInitiated = true;
        }
    }
    initPolyfills() {
        if (!this.state.polyfillsInitiated) {
            if (!window.IntersectionObserver) {
                require('intersection-observer');
            }
            this.state.polyfillsInitiated = true;
        }
    }
    initWindowApiTests() {
        if (!this.state.windowApiTestsInitiated) {
            window.AudioContext =
                window.AudioContext || window.webkitAudioContext;

            this.$store.commit('window/testAudioContext', {
                hasAudioContext: !!window.AudioContext,
            });
            this.state.windowApiTestsInitiated = true;
        }
    }
}

export default new Fallback();
