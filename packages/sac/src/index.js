import async from './async';
import core from './core';
import parsing from './parsing';
import math from './math';

// Components classes imports
import ErrorComponent from './components/Error';

// Components instances imports
import fallbackComponent from './components/Fallback';
import loadHandlerComponent from './components/LoadHandler';
import polyfillComponent from './components/Polyfill';
import scrollComponent from './components/Scroll';
import snifComponent from './components/Snif';
import windowComponent from './components/Window';

export const { bodyRouter } = core;
export const { createCrossBrowserEvent } = core;
export const { forEach } = core;
export const { isDisplayed } = core;
export const { nodeIndex } = core;
export const { query } = core;
export const { requestAnimFrame } = core;
export const { supportsWebp } = core;
export const { throttle } = core;

export const { camalize } = parsing;
export const { reverseString } = parsing;

export const { roundNumbers } = math;

// Components classes exports
export const SuperError = ErrorComponent;

// Components instances exports
export const superFallback = fallbackComponent;
export const superLoad = loadHandlerComponent;
export const superPolyfill = polyfillComponent;
export const superScroll = scrollComponent;
export const superSnif = snifComponent;
export const superWindow = windowComponent;

export default {
    bodyRouter,
    camalize,
    createCrossBrowserEvent,
    forEach,
    isDisplayed,
    nodeIndex,
    query,
    requestAnimFrame,
    reverseString,
    roundNumbers,
    supportsWebp,
    throttle
};
