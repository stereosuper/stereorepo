import SuperError from './Error';

const checkStoreValue = ({ store, methodeName }) => {
    if (!store) {
        throw new SuperError(
            `No store found, try passing vuex store as an argument in ${methodeName} call`
        );
    }
};

const setWindowSize = store => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
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

export const initializeWindow = store => {
    checkStoreValue({ store, methodeName: 'initializeWindow' });
    if (!store.state.superWindow) {
        store.registerModule(
            'superWindow',
            {
                namespaced: true,
                state: {
                    width: Infinity,
                    height: 0
                },
                mutations: {
                    setWindow(state, { width, height }) {
                        state.width = width;
                        state.height = height;
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
