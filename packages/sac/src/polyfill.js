// NOTE: Do not export this dynamic import
const importSmoothScrollPolyfill = () => import('smoothscroll-polyfill');

export const audioContextPolyfill = () => {
    window.AudioContext =
        window.webkitAudioContext ||
        window.AudioContext ||
        window.mozAudioContext;
};

// IE11 polyfills
export const ie11Polyfills = () => {
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

    if (!Object.entries) {
        Object.entries = function entries(obj) {
            const ownProps = Object.keys(obj);
            let i = ownProps.length;
            const resArray = new Array(i);

            while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];
            return resArray;
        };
    }
};

export const ioPolyfill = () => {
    window.IntersectionObserver || require('intersection-observer');
};

export const smoothScrollPolyfill = () => {
    importSmoothScrollPolyfill().then(({ polyfill }) => {
        polyfill();
    });
};
