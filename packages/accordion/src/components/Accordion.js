import { forEach, query } from '@stereorepo/sac';
import 'gsap/ScrollToPlugin';
import { TweenMax } from 'gsap';

class Accordion {
    constructor({
        containerSelector = '.accordion',
        clickedSelector = '.clicked-element',
        contentSelector = '.content-element',
        contentWrapperSelector = '.content-element',
        offsetY = 0,
        ease = null,
        scrollDelay = 300,
    }) {
        this.accordions = [];
        this.clickedElement = null;

        this.containerSelector = containerSelector;
        this.clickedSelector = clickedSelector;
        this.contentSelector = contentSelector;
        this.contentWrapperSelector = contentWrapperSelector;

        this.offsetY = offsetY;
        this.ease = ease;
        this.scrollDelay = scrollDelay;
    }
    clickHandler() {
        if (!this.clickedElement) return;
        const clickedElementParent = this.clickedElement.parentElement;
        const contentWrapper = query({
            selector: this.contentWrapperSelector,
            ctx: this.clickedSelector.parentElement,
        });
        const alreadyActivated = clickedElementParent.classList.contains(
            'activated'
        );
        const [content] = query({
            selector: this.contentSelector,
            ctx: this.clickedSelector.parentElement,
        });
        const maxHeight = content.getBoundingClientRect().height;

        forEach(this.accordions, resetParent => {
            resetParent.classList.remove('activated');
            TweenMax.to(
                query({
                    selector: this.contentWrapperSelector,
                    ctx: resetParent,
                }),
                0.3,
                {
                    maxHeight: 0,
                    opacity: 0,
                    ease: this.ease,
                }
            );
        });

        if (alreadyActivated) return;

        TweenMax.to(contentWrapper, 0.3, {
            maxHeight,
            opacity: 1,
            ease: this.ease,
        });
        clickedElementParent.classList.add('activated');

        setTimeout(() => {
            const offset =
                this.clickedElement.getBoundingClientRect().top +
                window.scrollY;
            TweenMax.to(window, 0.5, {
                scrollTo: {
                    y: offset,
                    offsetY: this.offsetY,
                },
                ease: this.ease,
            });
        }, this.scrollDelay);
    }
    initializeAccordions() {
        this.accordions = query({
            selector: this.containerSelector,
        });

        if (!this.accordions.length) return;

        forEach(this.accordions, accordion => {
            const [clickedElement] = query({
                selector: this.clickedSelector,
                ctx: accordion,
            });
            this.clickedElement = clickedElement;

            clickedElement.addEventListener('click', this.clickHandler, false);
        });
    }
}

export default Accordion;
