class Polyfill {
    constructor() {
        this.state = {
            intersectionObserverInitiated: false,
            whatwgFetchInitiated: false
        };
    }
    initializeIntersectionObserver() {
        if (!this.state.intersectionObserverInitiated) {
            if (!window.IntersectionObserver) {
                require('intersection-observer');
            }
            this.state.intersectionObserverInitiated = true;
        }
    }
    initializeWhatwgFetch() {
        if (!this.state.whatwgFetchInitiated) {
            require('whatwg-fetch');
            this.state.whatwgFetchInitiated = true;
        }
    }
}

export default new Polyfill();
