import {
    createCrossBrowserEvent,
    query,
    forEach,
    superWindow
} from '@stereorepo/sac';
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

const testForEach = () => {
    const [forEachSection] = query({ selector: '#foreach-section' });
    if (!forEachSection) return;
    const [foreachText] = query({
        selector: '.foreach-text',
        ctx: forEachSection
    });

    if (foreachText) {
        foreachText.innerText = '✅ forEach emojis list display';
    }

    const emojisArray = ['🦄', '💪', '🔥'];

    let element = null;
    forEach(emojisArray, emoji => {
        element = document.createElement('p');
        element.innerText = emoji;
        forEachSection.appendChild(element);
    });
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

// Sac inner components tests
const testSuperWindow = () => {
    superWindow.setBreakpoints({
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
    });
};

// Components tests
const testAccordion = () => {
    const accordion = new Accordion({
        containerSelector: '.js-accgfhjklordion',
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
    testForEach();
    testQuery();

    // sac inner components
    testSuperWindow();

    // components
    testAccordion();
    testBurger();
};

export default {
    launchFuckingTests
};
