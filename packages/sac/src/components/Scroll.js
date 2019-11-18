import {
    clearRequestTimeout,
    createCrossBrowserEvent,
    forEach,
    requestTimeout,
} from '../core';

class SuperScroll {
    constructor() {
        this.namespace = 'super-scroll';
        this.scrollTop = null;

        // Used for scroll end detection
        this.requestTimeoutId = null;

        // Curryied functions names sorted by events
        this.events = {
            scroll: 'handleScrollEvent',
            'scroll-end': 'handleScrollEndEvent',
        };

        // Binds
        this.scrollHandler = this.scrollHandler.bind(this);
        this.listenToEvents = this.listenToEvents.bind(this);
    }
    initializeScroll() {
        window.addEventListener('scroll', this.scrollHandler, false);
    }
    scrollHandler() {
        this.scrollTop = window.scrollY || window.pageYOffset;
        this.dispatchScroll();

        // Scroll end detection
        if (this.requestTimeoutId) {
            clearRequestTimeout(this.requestTimeoutId);
            this.requestTimeoutId = null;
        }
        if (!this.requestTimeoutId) {
            this.requestTimeoutId = requestTimeout(() => {
                this.dispatchScrollEnd();
                this.requestTimeoutId = null;
            }, 500);
        }
    }
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
    destroyScroll() {
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

export const useSuperScroll = () => {
    if (!window.$stereorepo.superScroll) {
        window.$stereorepo.superScroll = new SuperScroll();
    }
};

const install = Vue => {
    Vue.prototype.$stereorepo.superScroll = new SuperScroll();
};

export default { install, useSuperScroll };
