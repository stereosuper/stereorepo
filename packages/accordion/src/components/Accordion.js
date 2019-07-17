import { forEach, query } from '@stereorepo/sac';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { TweenMax, Power1 } from 'gsap';

// NOTE: We need to use ScrollToPlugin in order to ensure that the plugin won't be tree-shaked
const ensureScrollTo = ScrollToPlugin;

class Accordion {
    constructor({
        containerSelector = '.js-accordion',
        clickedSelector = '.js-clicked-element',
        contentSelector = '.js-content-element',
        contentWrapperSelector = '.js-content-element',
        offsetY = 0,
        ease = Power1.easeInOut,
        scrollDelay = 300
    }) {
        this.accordions = [];

        this.containerSelector = containerSelector;
        this.clickedSelector = clickedSelector;
        this.contentSelector = contentSelector;
        this.contentWrapperSelector = contentWrapperSelector;

        this.offsetY = offsetY;
        this.ease = ease;
        this.scrollDelay = scrollDelay;
    }
    clickHandler(clickedElement) {
        if (!clickedElement) return;
        const clickedElementParent = clickedElement.parentElement;
        const contentWrapper = query({
            selector: this.contentWrapperSelector,
            ctx: clickedElementParent
        });
        const alreadyActivated = clickedElementParent.classList.contains(
            'activated'
        );
        const [content] = query({
            selector: this.contentSelector,
            ctx: this.clickedSelector.parentElement
        });

        if (!contentWrapper || !content) return;
        const maxHeight = content.getBoundingClientRect().height;

        forEach(this.accordions, resetParent => {
            resetParent.classList.remove('activated');
            TweenMax.to(
                query({
                    selector: this.contentWrapperSelector,
                    ctx: resetParent
                }),
                0.3,
                {
                    maxHeight: 0,
                    opacity: 0,
                    ease: this.ease
                }
            );
        });

        if (alreadyActivated) return;

        TweenMax.to(contentWrapper, 0.3, {
            maxHeight,
            opacity: 1,
            ease: this.ease
        });
        clickedElementParent.classList.add('activated');

        setTimeout(() => {
            const offset =
                clickedElement.getBoundingClientRect().top + window.scrollY;
            TweenMax.to(window, 0.5, {
                scrollTo: {
                    y: offset,
                    offsetY: this.offsetY
                },
                ease: this.ease
            });
        }, this.scrollDelay);
    }
    initializeAccordions() {
        this.accordions = query({
            selector: this.containerSelector
        });

        if (!this.accordions.length) return;

        forEach(this.accordions, accordion => {
            const [clickedElement] = query({
                selector: this.clickedSelector,
                ctx: accordion
            });

            clickedElement.addEventListener(
                'click',
                () => {
                    this.clickHandler(clickedElement);
                },
                false
            );
        });
    }
}

export default Accordion;
