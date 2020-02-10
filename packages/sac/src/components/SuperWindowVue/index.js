import SuperError from '../SuperError';

import { requestTimeout } from '../../core';

let rtime = null;
let timeoutWindow = false;
let store = null;

const checkStoreValue = ({ store, methodeName }) => {
    if (!store) {
        throw new SuperError(
            `No store found, try passing vuex store as an argument in ${methodeName} call`
        );
    }
};

const setWindowSize = store => {
    rtime = new Date();

    if (timeoutWindow === false) {
        timeoutWindow = true;
        requestTimeout(resizeEnd, store.state.superWindow.noTransitionDelta);
    }

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    noTransition();
    store.commit('superWindow/setWindow', {
        width: windowWidth,
        height: windowHeight
    });
};

const launchWindow = store => {
    requestAnimationFrame(() => {
        setWindowSize(store);
    });
};

const resizeEnd = () => {
    if (new Date() - rtime < store.state.superWindow.noTransitionDelta) {
        store.commit('superWindow/setResizing', true);
        requestTimeout(resizeEnd, store.state.superWindow.noTransitionDelta);
    } else {
        store.commit('superWindow/setResizing', false);
        timeoutWindow = false;
        [...store.state.superWindow.noTransitionElements].map(el => {
            el.classList.remove('no-transition');
            return el;
        });
    }
};

const noTransition = () => {
    [...store.state.superWindow.noTransitionElements].map(el => {
        el.classList.add('no-transition');
        return el;
    });
};

export const initializeWindow = _store => {
    checkStoreValue({ store: _store, methodeName: 'initializeWindow' });
    if (!_store.state.superWindow) {
        store = _store;
        store.registerModule(
            'superWindow',
            {
                namespaced: true,
                state: {
                    width: Infinity,
                    height: 0,
                    noTransitionElements: [],
                    resizing: false,
                    noTransitionDelta: 200
                },
                mutations: {
                    setWindow(state, { width, height }) {
                        state.width = width;
                        state.height = height;
                    },
                    setNoTransitionElements(state, noTransitionElements) {
                        state.noTransitionElements.push(noTransitionElements);
                    },
                    setResizing(state, resizing) {
                        state.resizing = resizing;
                    },
                    setNoTransitionDelta(state, noTransitionDelta) {
                        state.noTransitionDelta = noTransitionDelta;
                    }
                }
            },
            { preserveState: false }
        );
    }

    setWindowSize(store);

    window.addEventListener('resize', launchWindow.bind(null, store), false);
};

export const destroyWindow = store => {
    window.removeEventListener('resize', launchWindow);
    checkStoreValue({ store, methodeName: 'destroyWindow' });
    if (store.state.superWindow) {
        store.unregisterModule('superWindow');
    }
};

export const toggleNoScroll = ({ noScroll, nextTick }) => {
    if (noScroll) {
        document.documentElement.style.top = `${-window.scrollY}px`;
        document.documentElement.classList.add('no-scroll');
    } else {
        const scrollY = Math.abs(
            parseInt(document.documentElement.style.top.replace('px', ''), 10)
        );
        document.documentElement.style.top = '';
        document.documentElement.classList.remove('no-scroll');

        nextTick(() => {
            window.scrollTo(0, scrollY);
        }, 0);
    }
};

const install = Vue => {
    Vue.prototype.$stereorepo.superWindow = {
        toggleNoScroll,
        initializeWindow,
        destroyWindow
    };
};

export default {
    install
};
