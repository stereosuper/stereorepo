import { transform } from './utils/transform';
import { forEach, createCrossBrowserEvent } from '../../core';

class WatchedElement {
    constructor({
        destroyMethod,
        element,
        id,
        lerp: lerpAmount = null,
        position,
        speed = 0,
        stalk = true,
        target,
        triggerOffset = 0,
    }) {
        this.namespace = `super-scroll-watched-element-${id}`;

        // Constructor props
        this.destroyMethod = destroyMethod;
        this.element = element;
        this.id = id;
        this.lerpAmount = lerpAmount * 0.1;
        this.position = position;
        this.speed = speed;
        this.stalk = stalk;
        this.target = target;
        this.triggerOffset = triggerOffset;

        // Instance state variables
        this.initialized = false;
        this.alreadyInViewed = false;
        this.lerpNotDone = false;

        // Sizes
        this.boundings = null;
        this.targetBoundings = null;

        // Values relative to parallax
        this.transformValue = 0;
        this.parallaxValue = 0;
        this.targetRelativity = 0;
        this.transform = { x: 0, y: 0 };

        // In view variables
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
    get parsedTriggerOffset() {
        if (!/%$/.test(this.triggerOffset)) return this.triggerOffset;
        return parseInt(
            this.triggerOffset.replace('%', '') * (this.boundings.height / 100),
            10,
        );
    }
    // Setting the in view state and preparing in view events calls
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
        if (!this.target) return;
        this.targetBoundings = this.target.getBoundingClientRect();
    }
    computeParallax({ scrollTop, firstScrollTopOffset }) {
        // Compute speed centered relatively to element and window
        let windowPosition = window.innerHeight / 2;
        const relativeToElement =
            this.boundings.top +
            firstScrollTopOffset + // Compensating window already scrolled when first trigger
            this.boundings.height / 2;

        const relativeToWindowAndElement = relativeToElement - windowPosition;

        this.parallaxValue =
            (relativeToWindowAndElement - scrollTop) * this.speed * 0.1;
    }
    computeTargetRelativity() {
        if (!this.position) return;
        // Add position relatively to target
        const relativeToTarget = this.target
            ? this.boundings.top - this.targetBoundings.top
            : window.innerHeight / 2 - this.boundings.height / 2;
        switch (this.position) {
            case 'top':
                this.targetRelativity = -relativeToTarget;
                break;
            case 'bottom':
                this.targetRelativity = relativeToTarget;
                break;
            default:
                break;
        }
    }
    // Element modifications
    parallax() {
        if (!this.speed || (this.initialized && !this.inView)) return;

        if (
            !this.initialized &&
            Math.abs(this.transformValue) > window.innerHeight
        ) {
            this.transformValue =
                window.innerHeight * Math.sign(this.transformValue);
        }

        this.transform = transform(
            this.element,
            0,
            this.transformValue,
            this.lerpAmount,
        );
        this.lerpNotDone =
            this.lerpAmount &&
            Math.abs(this.transformValue - this.transform.y) > 1;
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
        const elementTop =
            this.boundings.top + firstScrollTopOffset + this.transform.y;

        // If offsetWindowTop is positive, the element is below the window's top
        this.offsetWindowTop =
            elementTop +
            this.boundings.height -
            this.parsedTriggerOffset -
            scrollTop;

        // If offsetWindowBottom is positive, the element is below the window's bottom
        this.offsetWindowBottom =
            elementTop +
            this.parsedTriggerOffset -
            (scrollTop + window.innerHeight);

        // Displacing the in-view box from the transform value added later on
        if (this.speed) {
            this.computeParallax({ scrollTop, firstScrollTopOffset });
            this.computeTargetRelativity();

            this.transformValue = this.parallaxValue + this.targetRelativity;

            this.offsetWindowTop +=
                this.transformValue + this.boundings.height / 2;
            this.offsetWindowBottom +=
                this.transformValue - this.boundings.height / 2;
        }

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
            default:
                break;
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
