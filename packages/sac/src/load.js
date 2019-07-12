import windowComponent from './components/Window';
import scrollComponent from './components/Scroll';
import fallbackComponent from './components/Fallback';
import { query } from './core';

class LoadHandler {
    constructor() {
        this.state = {
            preloaded: false,
            loaded: false,
            animationsLoaded: false,
        };
    }
    preload(callback) {
        const { readyState } = document;

        if (readyState !== 'interactive' && readyState !== 'complete') return;
        this.state.preloaded = true;

        if (callback) {
            callback();
        }
    }
    load(callback) {
        const { readyState } = document;

        if (readyState !== 'complete') return;
        this.state.loaded = true;

        if (callback) {
            callback();

            if (this.callbacks.animationsLoadCallback) {
                this.state.animationsLoaded = true;
                this.callbacks.animationsLoadCallback();
            }
        }
    }
    initializeLoad({
        preloadCallback,
        loadCallback,
        animationsLoadCallback,
        noTransElementsClass = '.element-without-transition-on-resize',
    }) {
        this.callbacks.preloadCallback = preloadCallback;
        this.callbacks.loadCallback = loadCallback;
        this.callbacks.animationsLoadCallback = animationsLoadCallback;

        const noTransElem = query({
            selector: noTransElementsClass,
        });

        scrollComponent.init();
        windowComponent.setNoTransitionElts(noTransElem);
        windowComponent.init();
        fallbackComponent.init();

        this.preload(this.callbacks.preloadCallback);
        this.load(this.callbacks.loadCallback);

        document.addEventListener(
            'readystatechange',
            () => {
                if (!this.state.preloaded)
                    this.preload(this.callbacks.preloadCallback);
                if (!this.state.loaded) this.load(this.callbacks.loadCallback);
            },
            false
        );
    }
}

export default new LoadHandler();
