import core from './core';
import parsing from './parsing';
import math from './math';

// Components imports
import fallbackComponent from './components/Fallback';
import loadHandlerComponent from './components/LoadHandler';
import scrollComponent from './components/Scroll';
import snifComponent from './components/Snif';
import winComponent from './components/Window';

export const { bodyRouter } = core;
export const { createNewEvent } = core;
export const { forEach } = core;
export const { isDisplayed } = core;
export const { query } = core;
export const { requestAnimFrame } = core;
export const { supportsWebp } = core;
export const { throttle } = core;

export const { reverseString } = parsing;

export const { roundNumbers } = math;


// Components exports
export const superFallback = fallbackComponent;
export const superLoad = loadHandlerComponent;
export const superScroll = scrollComponent;
export const superSnif = snifComponent;
export const superWindow = winComponent;

export default {
    bodyRouter,
    createNewEvent,
    forEach,
    isDisplayed,
    query,
    requestAnimFrame,
    reverseString,
    roundNumbers,
    supportsWebp,
    throttle
};
