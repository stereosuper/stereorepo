import SuperScroll from './Scroll';

// For vanilla purpose
export const useSuperScroll = () => {
    if (!window.$stereorepo.superScroll) {
        window.$stereorepo.superScroll = new SuperScroll();
    }
};

// For Vue.use()
const install = Vue => {
    Vue.prototype.$stereorepo.superScroll = new SuperScroll();
};

export default { install, useSuperScroll };
