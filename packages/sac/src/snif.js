const uA = () => navigator.userAgent.toLowerCase();

export const isIOS = () => /iphone|ipad|ipod/i.test(uA());

export const isAndroid = () =>
    /android.*mobile/.test(uA()) || // is mobile android
    (!/android.*mobile/.test(uA()) && /android/i.test(uA()));

export const isChrome = () => !!window.chrome && !!window.chrome.webstore;

export const isMobile = () =>
    /android.*mobile/.test(uA()) || // is mobile android
    /blackberry/i.test(uA()) || // is blackberry
    isIOS() ||
    /iemobile/i.test(uA()); // is mobile ie

export const isChromeAndroid = () =>
    // is mobile android && is chrome
    /android.*mobile/.test(uA()) && isChrome();

export const isSafari = () => !!uA().match(/version\/[\d\.]+.*safari/) && !isAndroid();

export const isFF = () => 'MozAppearance' in document.documentElement.style;

export const isMS = () =>
    '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;

export const isIe11 = () => document.body.style.msTouchAction !== undefined;

export const mixBlendModeSupport = () =>
    'CSS' in window && 'supports' in window.CSS && window.CSS.supports('mix-blend-mode', 'multiply');
