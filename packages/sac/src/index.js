import core from './core';
import parsing from './parsing';
import math from './math';
import loadHandlerComponent from './load';

// Components imports
import fallback from './components/Fallback';
import scroll from './components/Scroll';
import snif from './components/Snif';
import win from './components/Window';

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

export const loadHandler = loadHandlerComponent;

// Components exports
export const fallbackComponent = fallback;
export const scrollComponent = scroll;
export const snifComponent = snif;
export const windowComponent = win;

export default {
    bodyRouter,
    createNewEvent,
    forEach,
    isDisplayed,
    loadHandler,
    query,
    requestAnimFrame,
    reverseString,
    roundNumbers,
    supportsWebp,
    throttle
};
