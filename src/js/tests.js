import { createCrossBrowserEvent, query } from '@stereorepo/sac';
import { Accordion } from '@stereorepo/accordion';
import { Burger } from '@stereorepo/burger';

// Sac tests
const testCreateNewEvent = () => {
    const newEvent = createCrossBrowserEvent('test-new-event');

    document.addEventListener(
        'test-new-event',
        () => {
            const [eventText] = query({
                selector: '#cross-browser-compatible-events .event-text'
            });
            if (eventText) {
                eventText.innerText = '✅ Cross browser event dispatched';
            }
        },
        false
    );
    document.dispatchEvent(newEvent);
};

const testQuery = () => {
    const [querySection] = query({
        selector: '#query-elements'
    });

    const [elementSelector] = query({
        selector: 'span',
        ctx: querySection
    });

    const [idSelector] = query({
        selector: '#id-selector'
    });

    const [classSelector] = query({
        selector: '.class-selector',
        ctx: querySection
    });

    const [nestedSelector] = query({
        selector: '.nested-selector .child',
        ctx: querySection
    });

    elementSelector.innerText = '✅ element selector';
    idSelector.innerText = '✅ id selector';
    classSelector.innerText = '✅ class selector';
    nestedSelector.innerText = '✅ nested selector';
};

// Components tests
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
    // sac
    testCreateNewEvent();
    testQuery();

    // components
    testAccordion();
    testBurger();
};

export default {
    launchFuckingTests
};
