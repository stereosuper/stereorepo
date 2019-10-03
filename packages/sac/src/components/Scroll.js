import { requestAnimFrame } from '../core';

class Scroll {
    constructor() {
        this.scrollTop = null;
        this.event = null;
        this.timeoutScroll = null;
        this.scrollEnd = true;
        this.scrollFunctions = [];
        this.endFunctions = [];
    }
    scrollHandler() {
        this.scrollTop = window.scrollY || window.pageYOffset;

        if (this.scrollEnd) {
            this.scrollEnd = false;
        }

        clearTimeout(this.timeoutScroll);

        this.timeoutScroll = setTimeout(() => {
            this.onScrollEnd();
        }, 66);

        this.scrollFunctions.forEach(scrollFunction => {
            if (scrollFunction) {
                scrollFunction();
            }
        });
    }
    launchScroll(event) {
        this.event = event;

        requestAnimFrame(() => {
            this.scrollHandler();
        });
    }
    initializeScroll() {
        this.scrollHandler();
        window.addEventListener(
            'scroll',
            () => {
                this.launchScroll();
            },
            false
        );
    }
    destroyScroll() {
        window.removeEventListener(
            'scroll',
            () => {
                this.launchScroll();
            },
            false
        );
    }
    onScrollEnd() {
        this.scrollEnd = true;
        this.endFunctions.forEach(f => {
            if (f) {
                f();
            }
        });
    }
    addScrollFunction(scrollFunction, onEnd = false) {
        this.scrollFunctions.push(scrollFunction);
        if (onEnd) {
            this.endFunctions.push(scrollFunction);
        }
        return this.scrollFunctions.length - 1;
    }
    addEndFunction(endFunction) {
        this.endFunctions.push(endFunction);
        return this.endFunctions.length - 1;
    }
    removeScrollFunction(id) {
        this.scrollFunctions[id] = null;
    }
    removeEndFunction(id) {
        this.endFunctions[id] = null;
    }
}

export default new Scroll();
