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
        this.scrollTop = window.pageYOffset || window.scrollY;

        if (this.scrollEnd) {
            this.scrollEnd = false;
        }

        clearTimeout(this.timeoutScroll);

        this.timeoutScroll = setTimeout(() => {
            this.onScrollEnd();
        }, 66);

        this.scrollFunctions.forEach(scrollfunction => {
            scrollfunction();
        });
    }
    launchScroll(event) {
        this.event = event;

        requestAnimFrame(() => {
            this.scrollHandler();
        });
    }
    initScroll() {
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
            f();
        });
    }
    addScrollFunction(scrollFunction, onEnd = false) {
        this.scrollFunctions.push(scrollFunction);
        if (onEnd) this.endFunctions.push(scrollFunction);
    }
    addEndFunction(endFunction) {
        this.endFunctions.push(endFunction);
    }
}

export default new Scroll();
