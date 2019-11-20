import { transform } from './utils/transform';
import { forEach, createCrossBrowserEvent } from '../../core';

class WatchedElement {
    constructor({ destroyMethod, element, id, speed = 0, stalk = true }) {
        this.namespace = `super-scroll-watched-element-${id}`;
        // Constructor props
        this.destroyMethod = destroyMethod;
        this.element = element;
        this.id = id;
        this.speed = speed;
        this.stalk = stalk;

        // Computed data
        this.boundings = null;
        this.alreadyInViewed = false;

        // Output data
        this.offsetWindowTop = null;
        this.offsetWindowBottom = null;
        this.inView = false;

        // Curryied functions names sorted by events
        this.events = {
            'enter-view': 'handleEnterViewEvent',
            'leave-view': 'handleLeaveViewEvent',
        };
    }
    // NOTE: Getters and setters section
    set isInView(state) {
        if (this.inView === state) return;
        this.inView = state;
        if (this.stalk || !this.alreadyInViewed) {
            this.inViewStateChanged();
        }
    }
    // NOTE: Methods section
    // Relative to element size
    compute() {
        this.boundings = this.element.getBoundingClientRect();
    }
    // Element modifications
    parallax({ scrollTop, firstScrollTopOffset }) {
        if (!this.speed || !this.inView) return;
        const relativeToElementCenter =
            this.boundings.top +
            firstScrollTopOffset + // Compensating window already scrolled when first trigger
            this.boundings.height / 2;
        const relativeToWindowAndElementCenter =
            relativeToElementCenter - window.innerHeight / 2;
        let y = relativeToWindowAndElementCenter - scrollTop;
        y *= this.speed * 0.1;
        transform(this.element, 0, y);
    }
    // Relative to component in view state
    inViewStateChanged() {
        if (this.inView) {
            if (!this.alreadyInViewed) this.alreadyInViewed = true;
            this.element.classList.add('is-in-view');
            this.dispatchViewInOut('enter');
        } else {
            this.element.classList.remove('is-in-view');
            this.dispatchViewInOut('leave');
        }
    }
    amIInView({ scrollTop, firstScrollTopOffset }) {
        const elementTop = this.boundings.top + firstScrollTopOffset;

        // If offsetWindowTop is positive, the element is below the window's top
        this.offsetWindowTop = elementTop + this.boundings.height - scrollTop;

        // If offsetWindowBottom is positive, the element is below the window's bottom
        this.offsetWindowBottom = elementTop - (scrollTop + window.innerHeight);
        // console.log(this.offsetWindowTop, this.offsetWindowBottom);

        if (
            Math.sign(this.offsetWindowTop) > 0 &&
            Math.sign(this.offsetWindowBottom) < 0
        ) {
            this.isInView = true;
        } else {
            this.isInView = false;
        }
    }
    // Events
    dispatchViewInOut(type) {
        const eventName = `${this.namespace}-${type}-view`;
        const inOutEvent = createCrossBrowserEvent(eventName);
        window.dispatchEvent(inOutEvent);
    }
    // Listeners
    listenToEvents(event, func) {
        // Enter view event curried function
        this[this.events['enter-view']] = () => {
            func();
        };

        // Leave view event curried function
        this[this.events['leave-view']] = () => {
            func();
        };

        switch (event) {
            case 'enter-view':
                return this[this.events['enter-view']];
            case 'leave-view':
                return this[this.events['leave-view']];
        }
    }
    on(event, func) {
        // Events name check (ensuring that every functions will have a reference in order to use removeEventListener).
        if (!Object.keys(this.events).includes(event))
            throw new Error(
                `The event "${event}" passed to <WatchedElement>.on() is not handled by the element.`,
            );

        // Calling listenToEvents as a currying function
        window.addEventListener(
            `${this.namespace}-${event}`,
            this.listenToEvents(event, func),
            false,
        );
        return this;
    }
    // Destroy
    forget() {
        // Curryied functions destruction
        forEach(Object.keys(this.events), event => {
            console.log(
                'TCL: forget -> this[this.events[event]]',
                this[this.events[event]],
            );
            window.removeEventListener(
                `${this.namespace}-${event}`,
                this[this.events[event]],
                false,
            );
        });

        this.destroyMethod(this.id);
    }
}

export default WatchedElement;