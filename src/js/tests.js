import { Accordion } from '@stereorepo/accordion';

const testAccordion = () => {
    const accordion = new Accordion({
        containerSelector: '.wp-block-stereoberg-question-answer',
        clickedSelector: 'h3',
        contentSelector: '.answer-content',
        contentWrapperSelector: '.js-answer',
        offsetY: 25,
        ease: null,
        scrollDelay: 600
    });

    accordion.initializeAccordions();
};

const launchFuckingTests = () => {
    testAccordion();
};

export default {
    launchFuckingTests
};
