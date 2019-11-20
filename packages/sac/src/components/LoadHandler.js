import { useSuperWindow } from './Window';
import { useSuperScroll } from './SuperScroll';
import { query } from '../core';

class LoadHandler {
    constructor() {
        this.state = {
            preloaded: false,
            loaded: false,
            animationsLaunched: false,
        };

        useSuperScroll();
        useSuperWindow();

        this.callbacks = {
            preloadCallback: false,
            loadCallback: false,
            animationsCallback: false,
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

            if (this.callbacks.animationsCallback) {
                this.state.animationsLaunched = true;
                this.callbacks.animationsCallback();
            }
        }
    }
    initializeLoadingShit({
        preloadCallback = null,
        loadCallback = null,
        animationsCallback = null,
        noTransElementsClass = '.element-without-transition-on-resize',
    }) {
        this.callbacks.preloadCallback = preloadCallback;
        this.callbacks.loadCallback = loadCallback;
        this.callbacks.animationsCallback = animationsCallback;

        const noTransElem = query({
            selector: noTransElementsClass,
        });

        window.$stereorepo.superScroll.initializeScroll();
        window.$stereorepo.superWindow.setNoTransitionElts(noTransElem);
        window.$stereorepo.superWindow.initializeWindow();

        this.preload(this.callbacks.preloadCallback);
        this.load(this.callbacks.loadCallback);

        document.addEventListener(
            'readystatechange',
            () => {
                if (!this.state.preloaded)
                    this.preload(this.callbacks.preloadCallback);
                if (!this.state.loaded) this.load(this.callbacks.loadCallback);
            },
            false,
        );
    }
}

export const useSuperLoad = () => {
    if (!window.$stereorepo.superLoad) {
        window.$stereorepo.superLoad = new LoadHandler();
    }
};

export default useSuperLoad;
