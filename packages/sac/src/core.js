// NOTE: Functions not calling any other functions.
export const createNewEvent = () => {
    let newEvent;
    if (typeof window.CustomEvent === 'function') {
        newEvent = eventName => {
            let e = new Event(eventName);
            if (typeof Event !== 'function') {
                e = document.createEvent('Event');
                e.initEvent(eventName, true, true);
            }
            return e;
        };
    } else {
        // ie 11
        newEvent = (
            event,
            { bubbles = false, cancelable = false, detail = false }
        ) => {
            const evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, bubbles, cancelable, detail);
            return evt;
        };

        newEvent.prototype = window.Event.prototype;
        window.CustomEvent = newEvent;
    }

    return newEvent;
};

export const forEach = (arr, callback) => {
    let i = 0;
    const { length } = arr;
    while (i < length) {
        callback(arr[i], i);
        i += 1;
    }
};

/**
 * @description get display state of one element
 */
export const isDisplayed = element =>
    getComputedStyle(element).display !== 'none';

export const query = ({ selector, ctx }) => {
    const classes = selector.substr(1).replace(/\./g, ' ');

    const context = ctx || document;
    // Redirect simple selectors to the more performant function
    if (/^(#?[\w-]+|\.[\w-.]+)$/.test(selector)) {
        switch (selector.charAt(0)) {
            case '#':
                // Handle ID-based selectors
                return [context.getElementById(selector.substr(1))];
            case '.':
                // Handle class-based selectors
                // Query by multiple classes by converting the selector
                // string into single spaced class names
                return [...context.getElementsByClassName(classes)];
            default:
                // Handle tag-based selectors
                return [...context.getElementsByTagName(selector)];
        }
    }
    // Default to `querySelectorAll`
    return [...context.querySelectorAll(selector)];
};

export const requestAnimFrame = callback => {
    const anim =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame;
    return anim(callback);
};

export async function supportsWebp() {
    if (!self.createImageBitmap) return false;

    const webpData =
        'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    const blob = await fetch(webpData).then(response => response.blob());
    return createImageBitmap(blob).then(() => true, () => false);
}

export const throttle = (callback, delay) => {
    let last;
    let timer;

    return function throttleFunction(...args) {
        const now = +new Date();

        const reset = () => {
            last = now;
            callback.apply(this, args);
        };

        if (last && now < last + delay) {
            // le délai n'est pas écoulé on reset le timer
            clearTimeout(timer);

            timer = setTimeout(reset, delay);
        } else {
            reset();
        }
    };
};

// NOTE: Functions calling functions defined above.
/**
 * @description calls a function if the selector exists
 * @param {*} { identifier, callback }
 * @returns
 */
export const bodyRouter = ({ identifier, callback }) => {
    if (!identifier) return;
    const [hasIdentifier] = query({ selector: identifier });

    if (!hasIdentifier || !callback) return;
    callback();
};

export default {
    bodyRouter,
    createNewEvent,
    forEach,
    isDisplayed,
    query,
    requestAnimFrame,
    supportsWebp,
    throttle,
};
