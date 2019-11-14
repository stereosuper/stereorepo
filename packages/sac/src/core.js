// NOTE: Functions not calling any other functions.
export const createCrossBrowserEvent = name => {
    let crossBrowserEvent;
    if (typeof Event === 'function') {
        crossBrowserEvent = new Event(name);
    } else {
        crossBrowserEvent = document.createEvent('Event');
        crossBrowserEvent.initEvent(name, true, true);
    }
    return crossBrowserEvent;
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

export const nodeIndex = node => [...node.parentNode.children].indexOf(node);

export const query = ({ selector, ctx }) => {
    const classes = selector.substr(1).replace(/\./g, ' ');

    const context = ctx || document;
    // Redirect simple selectors to the more performant function
    if (/^(#?[\w-]+|\.[\w-.]+)$/.test(selector)) {
        switch (selector.charAt(0)) {
            case '#':
                // Handle ID-based selectors
                return [document.getElementById(selector.substr(1))];
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

export const throttle = ({ callback, delay }) => {
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

export const loop = ({ function: func, fpsInterval = 60, params = {} }) => {
    if (!func) throw new Error('No function passed to loop.');
    let then = 0;

    const animate = () => {
        // request another frame
        const requestAnimFrameId = requestAnimFrame(animate);

        // calc elapsed time since last loop
        const now = Date.now();
        const elapsed = now - then;

        // if enough time has elapsed, draw the next frame
        if (elapsed > fpsInterval) {
            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            then = now - (elapsed % fpsInterval);

            func({ ...params, requestAnimFrameId });
        }
    };
    animate();
};

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
    createCrossBrowserEvent,
    forEach,
    isDisplayed,
    loop,
    nodeIndex,
    query,
    requestAnimFrame,
    throttle,
};
