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

const setWindowSize = store => {
    if (!store.state.stereoWindow) {
        store.registerModule(
            'stereoWindow',
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

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    store.commit('stereoWindow/setWindow', {
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
    setWindowSize(store);

    window.addEventListener('resize', launchWindow.bind(null, store), false);
};

export const destroyWindow = () => {
    window.removeEventListener('resize', launchWindow);
};

const install = Vue => {
    Vue.prototype.$stereorepo.window = {
        toggleNoScroll,
        initializeWindow,
        destroyWindow
    };
};

export default {
    install
};
