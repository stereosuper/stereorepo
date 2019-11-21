import WatchedElement from './WatchedElement';
import {
    clearRequestTimeout,
    createCrossBrowserEvent,
    forEach,
    requestTimeout,
    requestAnimFrame,
} from '../../core';

class SuperScroll {
    constructor() {
        this.namespace = 'super-scroll';
        this.firstScrollTopOffset = null;
        this.scrollTop = null;
        this.isScrolling = false;

        // Used for scroll end detection
        this.scrollRequestTimeoutId = null;
        this.resizeRequestTimeoutId = null;

        // Curryied functions names sorted by events
        this.events = {
            scroll: 'handleScrollEvent',
            'scroll-end': 'handleScrollEndEvent',
        };

        // Watched elements
        this.watchedElements = [];

        // Binds
        this.scrollHandler = this.scrollHandler.bind(this);
        this.resizeHandler = this.resizeHandler.bind(this);
        this.listenToEvents = this.listenToEvents.bind(this);
        this.removeWatchedElement = this.removeWatchedElement.bind(this);
    }
    // Handling scroll
    async checkDomState() {
        return new Promise(resolve => {
            if (document.readyState === 'complete') resolve();
            document.addEventListener(
                'readystatechange',
                () => {
                    if (document.readyState === 'complete') {
                        resolve();
                    }
                },
                false,
            );
        });
    }
    async initializeScroll() {
        // Checking if the DOM is loaded (in order to computed objects sizes)
        await this.checkDomState();
        this.initializeContext();
        window.addEventListener('scroll', this.scrollHandler, false);
        window.addEventListener('resize', this.resizeHandler, false);
        return this.firstScrollTopOffset;
    }
    initializeContext() {
        this.firstScrollTopOffset = window.scrollY || window.pageYOffset;
        this.scrollTop = this.firstScrollTopOffset;
        this.computeWatchedElements();
        this.handleWatchedElements();
    }
    scrollHandler() {
        if (!this.isScrolling) {
            this.isScrolling = true;
            this.scrollForWatchedElements();
        }

        requestAnimFrame(() => {
            this.scrollTop = window.scrollY || window.pageYOffset;
            this.dispatchScroll();
        });

        // Scroll end detection
        if (this.scrollRequestTimeoutId) {
            clearRequestTimeout(this.scrollRequestTimeoutId);
            this.scrollRequestTimeoutId = null;
        }
        if (!this.scrollRequestTimeoutId) {
            this.scrollRequestTimeoutId = requestTimeout(() => {
                this.isScrolling = false;
                this.dispatchScrollEnd();
                this.scrollRequestTimeoutId = null;
            }, 100);
        }
    }
    scrollForWatchedElements() {
        const lerpNotDone = this.watchedElements.some(
            element => element && element.inView && element.lerpNotDone,
        );

        if (lerpNotDone || this.isScrolling) {
            requestAnimFrame(() => this.scrollForWatchedElements());
        }

        this.handleWatchedElements();
    }
    // Resize
    resizeHandler() {
        // Resize end detection
        if (this.resizeRequestTimeoutId) {
            clearRequestTimeout(this.resizeRequestTimeoutId);
            this.resizeRequestTimeoutId = null;
        }
        if (!this.resizeRequestTimeoutId) {
            this.resizeRequestTimeoutId = requestTimeout(() => {
                this.resizeEnd();
                this.resizeRequestTimeoutId = null;
            }, 100);
        }
    }
    resizeEnd() {
        this.initializeContext();
    }
    // Handle watched elements
    computeWatchedElements() {
        forEach(this.watchedElements, element => {
            if (!element) return;
            element.compute();
        });
    }
    handleWatchedElements() {
        forEach(this.watchedElements, element => {
            if (!element) return;
            element.amIInView({
                scrollTop: this.scrollTop,
                firstScrollTopOffset: this.firstScrollTopOffset,
            });
            element.parallax({
                scrollTop: this.scrollTop,
                firstScrollTopOffset: this.firstScrollTopOffset,
            });
        });
    }
    // Events part
    dispatchScroll() {
        const scrollEvent = createCrossBrowserEvent(`${this.namespace}-scroll`);
        window.dispatchEvent(scrollEvent);
    }
    dispatchScrollEnd() {
        const scrollEvent = createCrossBrowserEvent(
            `${this.namespace}-scroll-end`,
        );
        window.dispatchEvent(scrollEvent);
    }
    listenToEvents(event, func) {
        // Scroll event curried function
        this[this.events.scroll] = () => {
            func(this.scrollTop);
        };

        // Scroll end event curried function
        this[this.events['scroll-end']] = () => {
            func();
        };

        switch (event) {
            case 'scroll':
                return this[this.events.scroll];
            case 'scroll-end':
                return this[this.events['scroll-end']];
            default:
                break;
        }
    }
    on(event, func) {
        // Events name check (ensuring that every functions will have a reference in order to use removeEventListener).
        if (!Object.keys(this.events).includes(event))
            throw new Error(
                `The event "${event}" passed to superScroll.on() is not handled by superScroll.`,
            );

        // Calling listenToEvents as a currying function
        window.addEventListener(
            `${this.namespace}-${event}`,
            this.listenToEvents(event, func),
            false,
        );
    }
    // Watching elements
    watch({ element, options }) {
        // Ensuring that the function will have an element to watch.
        if (!element)
            throw new Error('No element passed to superScroll.watch().');

        const watchedElementsLength = this.watchedElements.length;
        const watched = new WatchedElement({
            ...options,
            element,
            id: watchedElementsLength,
            destroyMethod: this.removeWatchedElement,
        });
        this.watchedElements[watchedElementsLength] = watched;

        return watched;
    }
    watchMultiple({ elements, options }) {
        return elements.map(element => this.watch({ element, options }));
    }
    forgetMultiple(elements) {
        forEach(elements, element => {
            element.forget();
        });
    }
    removeWatchedElement(id) {
        this.watchedElements[id] = null;
    }
    // Destroy
    destroyScroll() {
        forEach(this.watchedElements, element => {
            if (!element) return;
            element.forget();
        });

        // Curryied functions destruction
        forEach(Object.keys(this.events), event => {
            window.removeEventListener(
                `${this.namespace}-${event}`,
                this[this.events[event]],
                false,
            );
        });

        // Removing scroll event listener
        window.removeEventListener('scroll', this.scrollHandler);
    }
}

export default SuperScroll;
