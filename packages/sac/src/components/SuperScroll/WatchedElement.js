class WatchedElement {
    constructor({ element, id, destroyMethod }) {
        this.element = element;
        this.id = id;
        this.destroyMethod = destroyMethod;
        this.boundings = null;

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
        const elementTop = this.boundings.y + firstScrollTopOffset;

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
