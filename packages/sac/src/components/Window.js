import { requestAnimFrame, forEach } from '.';

if (!Object.entries) {
    // IE 11
    Object.entries = function entries(obj) {
        const ownProps = Object.keys(obj);
        let i = ownProps.length;
        const resArray = new Array(i);

        while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];
        return resArray;
    };
}

function Window() {
    this.currentBreakpoint = '';
    this.breakpoints = {
        horizontal: {
            xs: 0,
            s: 400,
            m: 580,
            l: 780,
            xl: 960,
            xxl: 1100,
        },
        vertical: {
            xs: 550,
            xxl: 960,
        },
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

Window.prototype.setNoTransitionElts = function setNoTransitionElts(elements) {
    this.noTransitionElts = elements;
};

Window.prototype.resizeend = function resizeend() {
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
};

Window.prototype.noTransition = function noTransition() {
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
};

Window.prototype.ioResize = function ioResize() {
    if (!io.resized) io.resized = true;
};

Window.prototype.setBreakpoints = function setBreakpoints() {
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
};

Window.prototype.resizeHandler = function resizeHandler() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    forEach(this.resizeFunctions, f => {
        f();
    });

    this.setBreakpoints();

    this.noTransition();
};

Window.prototype.addResizeFunction = function addResizeFunction(f) {
    this.resizeFunctions.push(f);
};

Window.prototype.addResizeEndFunction = function addResizeFunction(f) {
    this.resizeEndFunctions.push(f);
};

Window.prototype.toggleNoScroll = function toggleNoScroll({
    transitionElement,
    noScroll,
}) {
    const removeScroll = () => {
        document.documentElement.style.top = `${-window.scrollY}px`;
        document.documentElement.classList.add('no-scroll');

        transitionElement.removeEventListener(
            'transitionend',
            removeScroll,
            false
        );
    };

    if (noScroll) {
        transitionElement.addEventListener(
            'transitionend',
            removeScroll,
            false
        );
    } else {
        const scrollY = Math.abs(
            parseInt(document.documentElement.style.top.replace('px', ''), 10)
        );
        document.documentElement.style.top = '';
        document.documentElement.classList.remove('no-scroll');

        setTimeout(() => {
            window.scrollTo(0, scrollY);
        }, 0);
    }
};

Window.prototype.launchWindow = function launchWindow() {
    requestAnimFrame(() => {
        this.resizeHandler();
    });
};

Window.prototype.init = function initWindow() {
    this.resizeHandler();
    window.addEventListener(
        'resize',
        () => {
            this.launchWindow();
        },
        false
    );
};

Window.prototype.destroyWindow = function destroyWindow() {
    window.removeEventListener(
        'resize',
        () => {
            this.launchWindow();
        },
        false
    );
};

export default new Window();
