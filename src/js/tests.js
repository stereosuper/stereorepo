import { Accordion } from '@stereorepo/accordion';
import { Burger } from '@stereorepo/burger';

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

const testBurger = () => {
    const burger = new Burger({
        burgerSelector: '.js-burger',
        mainNavigationSelector: '.js-main-navigation'
    });

    burger.bigMacOrWhopper();
};

export const launchFuckingTests = () => {
    testAccordion();
    testBurger();
};

export default {
    launchFuckingTests
};
