// 🔄 Async
import * as async from './async';

export const { wait } = async;
export const { runPromisesSequence } = async;

// ⚙️ Core
import * as core from './core';
export const { bodyRouter } = core;
export const { clearRequestTimeout } = core;
export const { createCrossBrowserEvent } = core;
export const { forEach } = core;
export const { isDisplayed } = core;
export const { loop } = core;
export const { nodeIndex } = core;
export const { query } = core;
export const { requestAnimFrame } = core;
export const { requestTimeout } = core;
export const { throttle } = core;

// 🛠 Fallback
import * as fallback from './fallback';
export const { supportsWebp } = fallback;
export const { spotMobile } = fallback;
export const { spotIOS } = fallback;
export const { spotSafari } = fallback;
export const { spotFF } = fallback;
export const { spotChromeAndroid } = fallback;
export const { spotMS } = fallback;
export const { spotIE } = fallback;

// 🧮 Math
import * as math from './math';
export const { lerp } = math;
export const { roundNumbers } = math;

// ✏️ Parsing
import * as parsing from './parsing';
export const { camalize } = parsing;
export const { pascalize } = parsing;
export const { reverseString } = parsing;

// 📺 Polyfill
import * as polyfill from './polyfill';
export const { audioContextPolyfill } = polyfill;
export const { ioPolyfill } = polyfill;
export const { smoothScrollPolyfill } = polyfill;
export const { ie11Polyfills } = polyfill;

// 📱💻🖥 Snif
import * as snif from './snif';
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

// 🧱Components
// Components behaving the same way in any environment
export { default as SuperError } from './components/SuperError';
export { default as useSuperLoad } from './components/SuperLoad';

// For vanilla use
export { useSuperScroll } from './components/SuperScroll';
export { useSuperWindow } from './components/SuperWindow';

// For Vue.js use
export { default as useSuperScrollVue } from './components/SuperScroll';
export { default as useSuperWindowVue } from './components/SuperWindowVue';

// 🔭 Scoping
// NOTE: If used with Vue.use method
export const useSacVanilla = () => {
    if (typeof window !== 'undefined') {
        // Initializing scope in window
        window.$stereorepo = {};
    }
};

// NOTE: If used with Vue.use method
export const useSacVue = Vue => {
    // Initializing scope in Vue
    Vue.prototype.$stereorepo = {
        ...Vue.prototype.$stereorepo,
        namespace: 'stereorepo',
    };
};

export default {
    ...core,
    ...fallback,
    ...math,
    ...parsing,
    ...polyfill,
    ...snif,
};
