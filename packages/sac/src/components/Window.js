import { requestAnimFrame, forEach } from '../core';

class Window {
    constructor() {
        this.currentBreakpoint = '';
        this.breakpoints = {
            horizontal: null,
            vertical: null
        };
        this.w = null;
        this.h = null;
        this.rtime = null;
        this.timeoutWindow = false;
        this.delta = 500;
        this.resizeFunctions = [];
        this.resizeEndFunctions = [];
        this.noTransitionElts = [];
    }
    setNoTransitionElts(elements) {
        this.noTransitionElts = elements;
    }
    resizeend() {
        if (new Date() - this.rtime < this.delta) {
            setTimeout(() => {
                this.resizeend();
            }, this.delta);
        } else {
            this.timeoutWindow = false;
            [...this.noTransitionElts].map(el => {
                el.classList.remove('no-transition');
                return el;
            });
            forEach(this.resizeEndFunctions, f => {
                if (f) {
                    f();
                }
            });
        }
    }
    noTransition() {
        [...this.noTransitionElts].map(el => {
            el.classList.add('no-transition');
            return el;
        });

        this.rtime = new Date();

        if (this.timeoutWindow === false) {
            this.timeoutWindow = true;

            setTimeout(() => {
                this.resizeend();
            }, this.delta);
        }
    }
    setBreakpointsToDOM() {
        if (!this.breakpoints.horizontal) return;

        let currentBreakpoint = '';
        forEach(Object.entries(this.breakpoints.horizontal), breakpoint => {
            const [name, value] = breakpoint;
            if (this.w > value) {
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
    resizeHandler() {
        this.w = window.innerWidth;
        this.h = window.innerHeight;

        forEach(this.resizeFunctions, f => {
            if (f) {
                f();
            }
        });

        this.setBreakpointsToDOM();

        this.noTransition();
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
        this.resizeHandler();
        window.addEventListener(
            'resize',
            () => {
                this.launchWindow();
            },
            false
        );
    }
    destroyWindow() {
        window.removeEventListener(
            'resize',
            () => {
                this.launchWindow();
            },
            false
        );
    }
}

export default new Window();
