const state = {
    isVue: false
};

// Core
import core from './core';
export const { bodyRouter } = core;
export const { createCrossBrowserEvent } = core;
export const { forEach } = core;
export const { isDisplayed } = core;
export const { nodeIndex } = core;
export const { query } = core;
export const { requestAnimFrame } = core;
export const { throttle } = core;

// Fallback
import fallback from './fallback';
export const { supportsWebp } = fallback;
export const { spotMobile } = fallback;
export const { spotIOS } = fallback;
export const { spotSafari } = fallback;
export const { spotFF } = fallback;
export const { spotChromeAndroid } = fallback;
export const { spotMS } = fallback;
export const { spotIE } = fallback;

// Math
import math from './math';
export const { roundNumbers } = math;

// Parsing
import parsing from './parsing';
export const { camalize } = parsing;
export const { pascalize } = parsing;
export const { reverseString } = parsing;

// Polyfill
import polyfill from './polyfill';
export const { audioContextPolyfill } = polyfill;
export const { ioPolyfill } = polyfill;
export const { smoothScrollPolyfill } = polyfill;
export const { ie11Polyfills } = polyfill;

// Snif
import snif from './snif';
export const { isIOS } = snif;
export const { isAndroid } = snif;
export const { isChrome } = snif;
export const { isMobile } = snif;
export const { isChromeAndroid } = snif;
export const { isSafari } = snif;
export const { isFF } = snif;
export const { isMS } = snif;
export const { mixBlendModeSupport } = snif;
export const { isIe11 } = snif;

// Components
// Classes imports
import ErrorComponent from './components/Error';
import loadHandlerComponent from './components/LoadHandler';
import scrollComponent from './components/Scroll';
import windowComponent from './components/Window';

// Classes exports
export const SuperError = ErrorComponent;
export const superLoad = loadHandlerComponent;
export const superScroll = scrollComponent;
export const superWindow = windowComponent;

// Scoping
if (!state.isVue && typeof window !== 'undefined') {
    // Initializing scope in window
    window.$stereorepo = {};
}

// NOTE: If used with Vue.use method
export const install = (Vue, options) => {
    state.isVue = true;

    // Initializing scope in Vue
    Vue.prototype.$stereorepo = {
        ...Vue.prototype.$stereorepo,
        namespace: 'stereosuper'
    };

    // if (typeof window !== 'undefined') {

    // }
};

export default {
    ...core,
    ...fallback,
    ...math,
    ...parsing,
    ...polyfill,
    ...snif
};
