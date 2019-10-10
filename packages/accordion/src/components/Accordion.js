import { forEach, query } from '@stereorepo/sac';
import AccordionError from './Error';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { TweenMax, Power1 } from 'gsap';

// NOTE: We need to use ScrollToPlugin in order to ensure that the plugin won't be tree-shaked

// eslint-disable-next-line no-unused-vars
const ensureScrollTo = ScrollToPlugin;

class Accordion {
    constructor({
        containerSelector = '.js-accordion',
        clickedSelector = '.js-clicked-element',
        contentSelector = '.js-content-element',
        contentWrapperSelector = '.js-content-element',
        offsetY = 0,
        ease = Power1.easeInOut,
        scrollDelay = 300,
        noScroll = false,
        silent = false
    }) {
        this.accordions = [];
        this.clickedElementsList = [];

        this.containerSelector = containerSelector;
        this.clickedSelector = clickedSelector;
        this.contentSelector = contentSelector;
        this.contentWrapperSelector = contentWrapperSelector;

        this.offsetY = offsetY;
        this.ease = ease;
        this.scrollDelay = scrollDelay;
        this.noScroll = noScroll;

        this.silent = silent;
    }
    clickHandler(clickedElement) {
        const clickedElementParent = clickedElement.parentElement;
        const [contentWrapper] = query({
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

        if (!contentWrapper && !this.silent) {
            throw new AccordionError(
                'No accordion content wrapper found, try changing the contentWrapperSelector value in the Accordion declaration'
            );
        }

        if (!content && !this.silent) {
            throw new AccordionError(
                'No accordion content found, try changing the contentSelector value in the Accordion declaration'
            );
        }

        const maxHeight = content.getBoundingClientRect().height;

        const sameLevelAccordions = query({
            selector: this.containerSelector,
            ctx: clickedElementParent.parentElement
        });

        if (contentWrapper.style.maxHeight === 'none') {
            TweenMax.set(contentWrapper, { clearProps: 'maxHeight' });
            TweenMax.set(contentWrapper, { maxHeight: maxHeight });
        }

        forEach(sameLevelAccordions, resetParent => {
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
            ease: this.ease,
            onComplete: () => {
                TweenMax.set(contentWrapper, { maxHeight: 'none' });
            }
        });
        clickedElementParent.classList.add('activated');

        if (!this.noScroll) {
            setTimeout(() => {
                const scrollY = window.scrollY || window.pageYOffset;
                const offset =
                    clickedElement.getBoundingClientRect().top + scrollY;
                TweenMax.to(window, 0.5, {
                    scrollTo: {
                        y: offset,
                        offsetY: this.offsetY
                    },
                    ease: this.ease
                });
            }, this.scrollDelay);
        }
    }
    initializeAccordions() {
        this.accordions = query({
            selector: this.containerSelector
        });

        if (!this.accordions.length && !this.silent) {
            throw new AccordionError(
                'No accordion found, try changing the containerSelector value in the Accordion declaration'
            );
        }

        forEach(this.accordions, accordion => {
            const [clickedElement] = query({
                selector: this.clickedSelector,
                ctx: accordion
            });

            if (clickedElement) {
                const clickHandlerBuffer = () => {
                    this.clickHandler(clickedElement);
                };
                clickedElement.addEventListener(
                    'click',
                    clickHandlerBuffer,
                    false
                );
                this.clickedElementsList = [
                    ...this.clickedElementsList,
                    { clickedElement, clickHandlerBuffer }
                ];
            } else if (!this.silent) {
                throw new AccordionError(
                    'No element to click on found, try changing the clickedSelector value in the Accordion declaration'
                );
            }
        });
    }
    destroyAccordions() {
        forEach(
            this.clickedElementsList,
            ({ clickedElement, clickHandlerBuffer }) => {
                const clickedElementParent = clickedElement.parentElement;
                const [contentWrapper] = query({
                    selector: this.contentWrapperSelector,
                    ctx: clickedElementParent
                });

                clickedElementParent.classList.remove('activated');

                clickedElement.removeEventListener('click', clickHandlerBuffer);
                TweenMax.set(contentWrapper, { clearProps: 'all' });
            }
        );

        this.accordions = [];
    }
}

export default Accordion;
