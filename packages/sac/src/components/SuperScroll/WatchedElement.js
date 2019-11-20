import { transform } from './utils/transform';

class WatchedElement {
    constructor({ destroyMethod, element, id, speed = 0 }) {
        // Constructor props
        this.destroyMethod = destroyMethod;
        this.element = element;
        this.id = id;
        this.speed = speed;

        // Computed data
        this.boundings = null;

        // Output data
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
    compute() {
        this.boundings = this.element.getBoundingClientRect();
    }
    inViewStateChanged() {
        if (this.inView) {
            this.element.classList.add('is-in-view');
        } else {
            this.element.classList.remove('is-in-view');
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
    forget() {
        this.destroyMethod(this.id);
    }
}

export default WatchedElement;
