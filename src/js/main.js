import { query, loadHandler } from '@stereorepo/sac';
import { Accordion } from '@stereorepo/accordion';
// import { Sprite } from '@stereorepo/sprite';

const checkLoadingState = ({ section, sectionState, loadText }) => {
    const [preloadSectionElement] = query({ selector: section });
    const [preloadStateElement] = query({
        selector: sectionState,
        ctx: preloadSectionElement
    });

    preloadStateElement.innerText = loadText;
};

const preloadCallback = () => {
    checkLoadingState({
        section: '#preload',
        sectionState: '.js-loading-state',
        loadText: '✅ Preload done'
    });

    lauchFuckingTests();
};

const loadCallback = () => {
    checkLoadingState({
        section: '#load',
        sectionState: '.js-loading-state',
        loadText: '✅ Load done'
    });
};

const animationsCallback = () => {
    checkLoadingState({
        section: '#animations',
        sectionState: '.js-loading-state',
        loadText: '✅ Animations call done'
    });
};

loadHandler.initializeLoadingShit({
    preloadCallback,
    loadCallback,
    animationsCallback,
    noTransElementsClass: '.test'
});
