import { transform } from './utils/transform';
import { forEach, createCrossBrowserEvent } from '../../core';

class WatchedElement {
    constructor({
        collant: isCollant = false,
        collantOffset = 0,
        destroyMethod,
        element,
        id,
        lerp: lerpAmount = null,
        position = null,
        speed = 0,
        stalk = true,
        target = null,
        triggerOffset = 0,
    }) {
        this.namespace = `super-scroll-watched-element-${id}`;

        // Constructor props
        this.isCollant = isCollant;
        this.collantOffset = collantOffset;
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
        this.isDestroyed = false;

        // Sizes
        this.boundings = null;
        this.targetBoundings = null;

        // Values relative to parallax
        this.transformValue = 0;
        this.parallaxValue = 0;
        this.targetRelativity = 0;
        this.transform = { x: 0, y: 0 };

        // Values relative to collant
        this.collantTopDelimiter = 0;
        this.collantBottomDelimiter = 0;
        this.computedCollantOffset = 0;

        // In view variables
        this.offsetWindowTop = null;
        this.offsetWindowBottom = null;
        this.inView = false;

        // Collant io events variables
        this.beforeCollantState = false;
        this.enteredCollantState = false;
        this.leftCollantState = false;

        // Curryied functions names sorted by events
        this.events = {
            'enter-view': 'handleEnterViewEvent',
            'leave-view': 'handleLeaveViewEvent',
            'before-enter-collant': 'handleBeforeEnterCollantEvent',
            'enter-collant': 'handleEnterCollantEvent',
            'leave-collant': 'handleLeaveCollantEvent',
        };
    }
    // NOTE: Getters and setters section
    get parsedTriggerOffset() {
        switch (true) {
            case /vh$/.test(this.triggerOffset):
                return (
                    parseFloat(this.triggerOffset.replace('vh', '')) *
                    (window.innerHeight / 100)
                );
            case /%$/.test(this.triggerOffset):
                return (
                    parseInt(this.triggerOffset.replace('%', ''), 10) *
                    (this.boundings.height / 100)
                );
            default:
                return this.triggerOffset;
        }
    }
    get parsedCollantOffset() {
        // Parsing vh or directly returning pixels
        if (!/vh$/.test(this.collantOffset)) return this.collantOffset;
        return (
            (parseInt(this.collantOffset.replace('vh', ''), 10) *
                window.innerHeight) /
            100
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
    // Relative to component in view state
    compute({ firstScrollTopOffset }) {
        this.firstScrollTopOffset = firstScrollTopOffset;
        this.boundings = this.element.getBoundingClientRect();

        if (!this.target) return;

        this.targetBoundings = this.target.getBoundingClientRect();

        if (!this.isCollant) return;

        // Computing the top delimiter
        this.collantTopDelimiter =
            this.targetBoundings.top + this.firstScrollTopOffset;

        // Computing the bottom delimiter
        this.collantBottomDelimiter =
            this.targetBoundings.top +
            this.firstScrollTopOffset +
            this.targetBoundings.height -
            this.boundings.height;

        // Computing the offset for any position
        if (this.position === 'top') {
            this.computedCollantOffset = this.parsedCollantOffset;
        } else if (this.position === 'bottom') {
            this.computedCollantOffset =
                window.innerHeight -
                this.boundings.height -
                this.parsedCollantOffset;
        }
    }
    inViewStateChanged() {
        if (this.inView) {
            this.element.classList.add('is-in-view');
            this.dispatchViewInOut('enter');
            if (!this.alreadyInViewed) this.alreadyInViewed = true;
        } else {
            this.element.classList.remove('is-in-view');
            this.dispatchViewInOut('leave');
        }
    }
    amIInView({ scrollTop }) {
        const elementTop =
            this.boundings.top + this.firstScrollTopOffset + this.transform.y;

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
            this.computeParallax({ scrollTop });
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
    // Relative to element transforms
    computeParallax({ scrollTop }) {
        // Compute speed centered relatively to element and window
        let windowPosition = window.innerHeight / 2;
        const relativeToElement =
            this.boundings.top +
            this.firstScrollTopOffset + // Compensating window already scrolled when first trigger
            this.boundings.height / 2;

        const relativeToWindowAndElement = relativeToElement - windowPosition;

        this.parallaxValue =
            (relativeToWindowAndElement - scrollTop) * this.speed * 0.1;
    }
    computeTargetRelativity() {
        if (!this.position) return;

        // Add position relatively to target
        const relativeToTarget = this.target
            ? this.targetBoundings.height / 2 - this.boundings.height / 2
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
    parallax() {
        if (!this.speed || (this.initialized && !this.inView)) return;

        // Limiting the first effective transform value to a window half's height (since the elements' positions are computed based on the window's center)
        if (
            !this.initialized &&
            Math.abs(this.transformValue) > window.innerHeight
        ) {
            this.transformValue =
                (window.innerHeight / 2) * Math.sign(this.transformValue);
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
    // Relative to collant
    cleanCollant() {
        this.element.style.removeProperty('position');
        this.element.style.removeProperty('top');
        this.element.style.removeProperty('bottom');
        this.element.style.removeProperty('max-width');

        this.element.classList.remove('collant');
    }
    collant({ scrollTop }) {
        if (!this.isCollant || !this.position || !this.target) return;
        if (this.boundings.height >= this.targetBoundings.height) {
            this.cleanCollant();
            return;
        }

        // Getting the offset updated with the scroll position
        const scrollOffset = scrollTop + this.computedCollantOffset;

        if (scrollOffset >= this.collantBottomDelimiter) {
            // Cleaning properties
            this.element.style.removeProperty('max-width');

            // Adding properties
            this.element.style.top = 'auto';
            this.element.style.bottom = '0px';
            this.element.style.position = 'absolute';
            this.element.classList.remove('collant');
            this.dispatchCollantInOut('leave');
        } else if (scrollOffset >= this.collantTopDelimiter) {
            // Handle width when the position is fixed
            this.element.style.maxWidth = `${this.targetBoundings.width}px`;

            if (this.position === 'top') {
                this.element.style.top = `${this.parsedCollantOffset}px`;
                this.element.style.bottom = 'auto';
            } else if (this.position === 'bottom') {
                this.element.style.top = 'auto';
                this.element.style.bottom = `${this.parsedCollantOffset}px`;
            }
            this.element.style.position = 'fixed';
            this.element.classList.add('collant');
            this.dispatchCollantInOut('enter');
        } else {
            // Cleaning properties
            this.cleanCollant();
            this.dispatchCollantInOut('before-enter');
        }
    }
    // Events
    dispatchViewInOut(type) {
        if (!this.stalk && this.alreadyInViewed) return;

        const eventName = `${this.namespace}-${type}-view`;
        const inOutEvent = createCrossBrowserEvent(eventName);
        window.dispatchEvent(inOutEvent);
    }
    dispatchCollantInOut(type) {
        if (
            (this.beforeCollantState && type === 'before-enter') ||
            (this.enteredCollantState && type === 'enter') ||
            (this.leftCollantState && type === 'leave')
        )
            return;

        switch (type) {
            case 'before-enter':
                this.beforeCollantState = true;
                this.enteredCollantState = false;
                this.leftCollantState = false;
                break;
            case 'enter':
                this.beforeCollantState = false;
                this.enteredCollantState = true;
                this.leftCollantState = false;
                break;
            case 'leave':
                this.beforeCollantState = false;
                this.enteredCollantState = false;
                this.leftCollantState = true;
                break;
            default:
                return;
        }

        const eventName = `${this.namespace}-${type}-collant`;
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

        // Before enter collant event curried function
        this[this.events['before-enter-collant']] = () => {
            func();
        };

        // Enter collant event curried function
        this[this.events['enter-collant']] = () => {
            func();
        };

        // Leave collant event curried function
        this[this.events['leave-collant']] = () => {
            func();
        };

        switch (event) {
            case 'enter-view':
                return this[this.events['enter-view']];
            case 'leave-view':
                return this[this.events['leave-view']];
            case 'before-enter-collant':
                return this[this.events['before-enter-collant']];
            case 'enter-collant':
                return this[this.events['enter-collant']];
            case 'leave-collant':
                return this[this.events['leave-collant']];
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
    clean() {
        this.element.style.removeProperty('position');
        this.element.style.removeProperty('top');
        this.element.style.removeProperty('bottom');
        this.element.style.removeProperty('max-height');
        this.element.style.removeProperty('transform');
    }
    // Destroy
    forget() {
        this.isDestroyed = true;
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
