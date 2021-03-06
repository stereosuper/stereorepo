import { query, useSacVanilla, useSuperLoad } from '@stereorepo/sac';
// import { Sprite } from '@stereorepo/sprite';

import { launchFuckingTests } from './tests';

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

    launchFuckingTests();
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

useSacVanilla();
useSuperLoad();

window.$stereorepo.superLoad.initializeLoadingShit({
    preloadCallback,
    loadCallback,
    animationsCallback,
    noTransElementsClass: '.test'
});
