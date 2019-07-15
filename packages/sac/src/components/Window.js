import { requestAnimFrame, forEach } from '../core';
// import io from './Io';

class Window {
    constructor() {
        this.currentBreakpoint = '';
        this.breakpoints = {
            horizontal: {
                xs: 0,
                s: 400,
                m: 580,
                l: 780,
                xl: 960,
                xxl: 1100
            },
            vertical: {
                xs: 550,
                xxl: 960
            }
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
                f();
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
    // ioResize() {
    //     if (!this.io.resized) this.io.resized = true;
    // }
    setBreakpoints() {
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
    resizeHandler() {
        this.w = window.innerWidth;
        this.h = window.innerHeight;

        forEach(this.resizeFunctions, f => {
            f();
        });

        this.setBreakpoints();

        this.noTransition();
    }
    addResizeFunction(resizeFunction) {
        this.resizeFunctions.push(resizeFunction);
    }
    addResizeEndFunction(resizeEndFunction){
        this.resizeEndFunctions.push(resizeEndFunction);

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
