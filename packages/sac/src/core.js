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
export const isDisplayed = element => getComputedStyle(element).display !== 'none';

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

// NOTE: Functions calling functions defined above.
export const throttle = ({ callback, delay }) => {
    let last = null;
    let timer = null;

    return function throttleFunction(...args) {
        const now = +new Date();

        const reset = () => {
            last = now;
            callback.apply(this, args);
        };

        if (last && now < last + delay) {
            // le délai n'est pas écoulé on reset le timer
            if (timer) clearRequestTimeout(timer);

            timer = requestTimeout(reset, delay);
        } else {
            reset();
        }
    };
};

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
 * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 * @author joyrexus
 */
export const requestTimeout = (fn, delay) => {
    if (
        !window.requestAnimationFrame &&
        !window.webkitRequestAnimationFrame &&
        !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
        !window.oRequestAnimationFrame &&
        !window.msRequestAnimationFrame
    )
        return window.setTimeout(fn, delay);

    const start = new Date().getTime();
    const handle = new Object();

    const loop = () => {
        const current = new Date().getTime();
        const delta = current - start;

        delta >= delay ? fn.call() : (handle.value = requestAnimFrame(loop));
    };

    handle.value = requestAnimFrame(loop);
    return handle;
};

/**
 * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 * @author joyrexus
 */
export const clearRequestTimeout = function(handle) {
    window.cancelAnimationFrame
        ? window.cancelAnimationFrame(handle.value)
        : window.webkitCancelAnimationFrame
        ? window.webkitCancelAnimationFrame(handle.value)
        : window.webkitCancelRequestAnimationFrame
        ? window.webkitCancelRequestAnimationFrame(handle.value) /* Support for legacy API */
        : window.mozCancelRequestAnimationFrame
        ? window.mozCancelRequestAnimationFrame(handle.value)
        : window.oCancelRequestAnimationFrame
        ? window.oCancelRequestAnimationFrame(handle.value)
        : window.msCancelRequestAnimationFrame
        ? window.msCancelRequestAnimationFrame(handle.value)
        : clearTimeout(handle);
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
