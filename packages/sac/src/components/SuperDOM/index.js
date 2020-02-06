import fastdomImport from 'fastdom';
import fastdomPromised from 'fastdom/extensions/fastdom-promised';
export const fastdomStrict = () => import('fastdom/src/fastdom-strict');

export const superdom = fastdomImport.extend(fastdomPromised);

// For vanilla purpose
export const useSuperDOM = () => {
    if (!window.$stereorepo.superDOM) {
        window.$stereorepo.superDOM = superdom;
        window.$stereorepo.superDOM.strictMode = fastdomStrict;
    }
};

// For Vue.use()
const install = Vue => {
    Vue.prototype.$stereorepo.superDOM = superdom;
    Vue.prototype.$stereorepo.superDOM.strictMode = fastdomStrict;
};

export default { install };
