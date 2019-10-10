import { requestAnimFrame, forEach } from '../core';

class Window {
    constructor() {
        this.currentBreakpoint = '';
        this.breakpoints = {
            horizontal: null,
            vertical: null
        };
        this.windowWidth = null;
        this.windowHeight = null;
        this.rtime = null;
        this.timeoutWindow = false;
        this.delta = 500;
        this.resizeFunctions = [];
        this.resizeEndFunctions = [];
        this.noTransitionElts = [];

        this.launchWindow = this.launchWindow.bind(this);
    }
    setWindowSize() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
    }
    setBreakpointsToDOM() {
        if (!this.breakpoints.horizontal) return;

        let currentBreakpoint = '';
        forEach(Object.entries(this.breakpoints.horizontal), breakpoint => {
            const [name, value] = breakpoint;
            if (this.windowWidth > value) {
                currentBreakpoint = name;
            }
        });

        if (this.currentBreakpoint !== currentBreakpoint) {
            forEach(Object.entries(this.breakpoints.horizontal), ([name]) => {
                document.documentElement.classList.remove(`breakpoint-${name}`);
            });
            this.currentBreakpoint = currentBreakpoint;
            document.documentElement.classList.add(
                `breakpoint-${this.currentBreakpoint}`
            );
        }
    }
    setBreakpoints({ horizontal, vertical }) {
        this.breakpoints.horizontal = { ...horizontal };
        this.breakpoints.vertical = { ...vertical };
        this.setBreakpointsToDOM();
    }
    setNoTransitionElts(elements) {
        this.noTransitionElts = elements;
    }
    resizeEndBuffer() {
        if (new Date() - this.rtime < this.delta) {
            setTimeout(() => {
                this.resizeEndBuffer();
            }, this.delta);
        } else {
            this.timeoutWindow = false;
            forEach(this.resizeEndFunctions, f => {
                if (f) {
                    f();
                }
            });
            this.noTransitionClassHandler({ hasClass: false });
        }
    }
    resizeEnd() {
        this.rtime = new Date();

        if (this.timeoutWindow === false) {
            this.timeoutWindow = true;

            setTimeout(() => {
                this.resizeEndBuffer();
            }, this.delta);
        }
    }
    noTransitionClassHandler({ hasClass }) {
        if (hasClass) {
            [...this.noTransitionElts].map(el => {
                el.classList.add('no-transition');
                return el;
            });
        } else {
            [...this.noTransitionElts].map(el => {
                el.classList.remove('no-transition');
                return el;
            });
        }
    }
    resizeHandler() {
        this.noTransitionClassHandler({ hasClass: true });
        this.setWindowSize();
        this.setBreakpointsToDOM();

        forEach(this.resizeFunctions, f => {
            if (f) {
                f();
            }
        });

        this.resizeEnd();
    }
    addResizeFunction(resizeFunction) {
        this.resizeFunctions.push(resizeFunction);
        return this.resizeFunctions.length - 1;
    }
    addResizeEndFunction(resizeEndFunction) {
        this.resizeEndFunctions.push(resizeEndFunction);
        return this.resizeEndFunctions.length - 1;
    }
    removeResizeFunction(id) {
        this.resizeFunctions[id] = null;
    }
    removeResizeEndFunction(id) {
        this.resizeEndFunctions[id] = null;
    }
    launchWindow() {
        requestAnimFrame(() => {
            this.resizeHandler();
        });
    }
    initializeWindow() {
        this.setWindowSize();
        this.setBreakpointsToDOM();

        window.addEventListener('resize', this.launchWindow, false);
    }
    destroyWindow() {
        window.removeEventListener('resize', this.launchWindow, false);
    }
}

export const useSuperWindow = () => {
    if (!window.$stereorepo.superWindow) {
        window.$stereorepo.superWindow = new Window();
    }
};

export default useSuperWindow;
