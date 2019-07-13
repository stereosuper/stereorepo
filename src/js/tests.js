import { Accordion } from '@stereorepo/accordion';

const testAccordion = () => {
    const accordion = new Accordion({
        containerSelector: '.js-accordion',
        clickedSelector: '.js-click-element',
        contentWrapperSelector: '.js-content-wrapper',
        contentSelector: '.js-content',
        offsetY: 25,
        ease: null,
        scrollDelay: 600
    });

    accordion.initializeAccordions();
};

export const launchFuckingTests = () => {
    testAccordion();
};

export default {
    launchFuckingTests
};
