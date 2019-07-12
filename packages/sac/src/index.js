import loadHandler from './load';

import {
    bodyRouter,
    createNewEvent,
    forEach,
    isDisplayed,
    query,
    requestAnimFrame,
    supportsWebp,
    throttle,
} from './core';

import { reverseString } from './parsing';

import { roundNumbers } from './math';

loadHandler.initializeLoad();

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
    throttle,
};
