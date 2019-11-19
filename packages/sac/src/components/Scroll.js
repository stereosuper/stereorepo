import {
    clearRequestTimeout,
    createCrossBrowserEvent,
    forEach,
    requestTimeout,
} from '../core';

class WatchedElement {
    constructor({ element, id, destroyMethod }) {
        this.element = element;
        this.id = id;
        this.destroyMethod = destroyMethod;
        this.boundings = this.element.getBoundingClientRect();

        // Real data
        this.offsetWindowTop = null;
        this.offsetWindowBottom = null;
        this.inView = false;
    }
    // getters and setters
    set isInView(state) {
        if (this.inView === state) return;
        this.inView = state;
        this.inViewStateChanged();
    }
    // methods
    inViewStateChanged() {
        if (this.inView) {
            this.element.classList.add('is-in-view');
        } else {
            this.element.classList.remove('is-in-view');
        }
    }
    amIInView({ scrollTop, firstScrollTopOffset }) {
        const elementTop = this.boundings.y + firstScrollTopOffset;

        // If offsetWindowTop is positive, the element is below the window's top
        this.offsetWindowTop = elementTop + this.boundings.height - scrollTop;

        // If offsetWindowBottom is positive, the element is below the window's bottom
        this.offsetWindowBottom = elementTop - (scrollTop + window.innerHeight);

        if (
            Math.sign(this.offsetWindowTop) > 0 &&
            Math.sign(this.offsetWindowBottom) < 0
        ) {
            this.isInView = true;
        } else {
            this.isInView = false;
        }
    }
    forget() {
        this.destroyMethod(this.id);
    }
}

class SuperScroll {
    constructor() {
        this.namespace = 'super-scroll';
        this.firstScrollTopOffset = null;
        this.scrollTop = null;

        // Used for scroll end detection
        this.requestTimeoutId = null;

        // Curryied functions names sorted by events
        this.events = {
            scroll: 'handleScrollEvent',
            'scroll-end': 'handleScrollEndEvent',
        };

        // Watched elements
        this.watchedElements = [];

        // Binds
        this.scrollHandler = this.scrollHandler.bind(this);
        this.listenToEvents = this.listenToEvents.bind(this);
        this.removeWatchedElement = this.removeWatchedElement.bind(this);
    }
    // Handling scroll
    initializeScroll() {
        this.initializeContext();
        window.addEventListener('scroll', this.scrollHandler, false);
    }
    initializeContext() {
        this.firstScrollTopOffset = window.scrollY || window.pageYOffset;
        this.scrollTop = this.firstScrollTopOffset;
        this.handleWatchedElements();
    }
    scrollHandler() {
        this.scrollTop = window.scrollY || window.pageYOffset;
        this.dispatchScroll();

        this.handleWatchedElements();

        // Scroll end detection
        if (this.requestTimeoutId) {
            clearRequestTimeout(this.requestTimeoutId);
            this.requestTimeoutId = null;
        }
        if (!this.requestTimeoutId) {
            this.requestTimeoutId = requestTimeout(() => {
                this.dispatchScrollEnd();
                this.requestTimeoutId = null;
            }, 100);
        }
    }
    // Handle watched elements
    handleWatchedElements() {
        forEach(this.watchedElements, element => {
            if (!element) return;
            element.amIInView({
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
    watch(element) {
        const watchedElementsLength = this.watchedElements.length;
        const watched = new WatchedElement({
            element,
            id: watchedElementsLength,
            destroyMethod: this.removeWatchedElement,
        });
        this.watchedElements[watchedElementsLength] = watched;
        return watched;
    }
    watchMultiple(elements) {
        return elements.map(element => this.watch(element));
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

// For vanilla purpose
export const useSuperScroll = () => {
    if (!window.$stereorepo.superScroll) {
        window.$stereorepo.superScroll = new SuperScroll();
    }
};

// For Vue.use()
const install = Vue => {
    Vue.prototype.$stereorepo.superScroll = new SuperScroll();
};

export default { install, useSuperScroll };
