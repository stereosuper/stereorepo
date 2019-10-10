import { useSuperScroll, query, useSuperWindow } from '@stereorepo/sac';

class Collant {
    constructor({
        ctx = null,
        selector = '.js-collant-selector',
        box = '.js-collant-box',
        offsetTop = null,
        offsetBottom = null
    }) {
        this.contextElement = ctx;
        this.collantSelector = selector;
        this.boxSelector = box;
        this.rawOffset = offsetBottom ? offsetBottom : offsetTop;
        this.offsetPosition = offsetBottom ? 'bottom' : 'top';

        this.state = {
            resizing: false
        };

        useSuperScroll();
        useSuperWindow();

        this.collantElement = null;
        this.boxElement = null;

        this.boxBoundings = null;
        this.collantBoundings = null;
        this.windowPositions = null;
        this.offset = 0;

        this.scrollHandler = this.scrollHandler.bind(this);
        this.resizeHandler = this.resizeHandler.bind(this);
        this.stickIt = this.stickIt.bind(this);
    }
    computeOffsetPx() {
        this.offset = parseInt(this.rawOffset.replace('px', ''), 10);
    }
    computeOffsetVh() {
        this.offset =
            (parseInt(this.rawOffset.replace('vh', ''), 10) *
                window.$stereorepo.superWindow.windowHeight) /
            100;
    }
    computeOffset() {
        switch (true) {
            case /px$/.test(this.rawOffset):
                this.computeOffsetPx();
                break;
            case /vh$/.test(this.rawOffset):
                this.computeOffsetVh();
                break;

            default:
                break;
        }
    }
    getOffsetParents(element) {
        const { offsetParent } = element;
        let offset = element.offsetTop;
        if (offsetParent) {
            offset += this.getOffsetParents(offsetParent);
        }
        return offset;
    }
    getWindowPosition() {
        this.windowPositions = {
            y: window.scrollY || window.pageYOffset
        };
    }
    setBoundings() {
        this.boxBoundings = {
            y: this.boxElement.offsetTop - this.windowPositions.y,
            height: this.boxElement.offsetHeight
        };
        this.collantBoundings = {
            height: this.collantElement.offsetHeight
        };
    }
    resetCollantProperties() {
        this.collantElement.style.removeProperty('top');
        this.collantElement.style.removeProperty('bottom');
        this.collantElement.style.removeProperty('position');
    }
    handleOffset() {
        let scrollOffset = 0;
        if (this.offsetPosition === 'top') {
            scrollOffset =
                window.$stereorepo.superScroll.scrollTop + this.offset;
        } else if (this.offsetPosition === 'bottom') {
            scrollOffset =
                window.$stereorepo.superScroll.scrollTop +
                window.$stereorepo.superWindow.windowHeight -
                this.collantBoundings.height -
                this.offset;
        }

        const bottomDelimiter =
            this.boxBoundings.y +
            this.boxBoundings.height +
            this.windowPositions.y -
            this.collantBoundings.height;

        this.resetCollantProperties();
        if (scrollOffset > bottomDelimiter) {
            this.collantElement.style.top = 'auto';
            this.collantElement.style.bottom = '0px';
            this.collantElement.style.position = 'absolute';
            this.collantElement.classList.remove('collant');
        } else if (scrollOffset > this.collantDelimiter) {
            if (this.offsetPosition === 'top') {
                this.collantElement.style.top = `${this.offset}px`;
                this.collantElement.style.bottom = 'auto';
            } else if (this.offsetPosition === 'bottom') {
                this.collantElement.style.top = 'auto';
                this.collantElement.style.bottom = `${this.offset}px`;
            }
            this.collantElement.style.position = 'fixed';
            this.collantElement.classList.add('collant');
        } else {
            this.collantElement.classList.remove('collant');
        }
    }
    scrollHandler() {
        if (this.state.resizing) return;
        this.handleOffset();
    }
    resizeHandler() {
        this.resetCollantProperties();
        this.getWindowPosition();
        this.setBoundings();

        this.collantDelimiter = this.getOffsetParents(this.collantElement);

        this.handleOffset();

        this.state.resizing = false;
    }
    stickIt() {
        [this.boxElement] = query({
            selector: this.boxSelector,
            ctx: this.contextElement
        });
        if (!this.boxElement) return;

        [this.collantElement] = query({
            selector: this.collantSelector,
            ctx: this.boxElement
        });
        if (!this.collantElement) return;

        this.computeOffset();
        this.getWindowPosition();
        this.setBoundings();

        this.collantDelimiter = this.getOffsetParents(this.collantElement);

        this.scrollHandler();
        this.scrollFunctionId = window.$stereorepo.superScroll.addScrollFunction(
            () => {
                this.scrollHandler();
            }
        );

        this.resizeFunctionId = window.$stereorepo.superWindow.addResizeFunction(
            () => {
                this.state.resizing = true;
            }
        );

        this.resizeEndFunctionId = window.$stereorepo.superWindow.addResizeEndFunction(
            this.resizeHandler
        );
    }
    ripIt() {
        this.collantElement.classList.remove('collant');

        window.$stereorepo.superScroll.removeScrollFunction(
            this.scrollFunctionId
        );
        window.$stereorepo.superWindow.removeResizeFunction(
            this.resizeFunctionId
        );
        window.$stereorepo.superWindow.removeResizeEndFunction(
            this.resizeEndFunctionId
        );
        this.resetCollantProperties();

        this.state = {
            resizing: false
        };

        this.collantElement = null;
        this.boxElement = null;

        this.boxBoundings = null;
        this.collantBoundings = null;
        this.windowPositions = null;
        this.offset = 0;
    }
}

export default Collant;
