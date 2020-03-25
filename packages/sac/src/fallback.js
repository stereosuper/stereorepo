import { isChromeAndroid, isFF, isIe11, isIOS, isMobile, isMS, isSafari } from './snif';

export const spotMobile = () => {
    const html = document.documentElement;
    if (isMobile()) {
        html.classList.add('is-touch');
    } else {
        html.classList.add('no-touch');
    }
};

export const spotIOS = () => {
    const html = document.documentElement;
    if (isIOS()) html.classList.add('is-ios');
};

export const spotSafari = () => {
    const html = document.documentElement;
    if (isSafari()) html.classList.add('is-safari');
};

export const spotFF = () => {
    const html = document.documentElement;
    if (isFF()) html.classList.add('is-ff');
};

export const spotChromeAndroid = () => {
    const html = document.documentElement;
    if (isChromeAndroid()) html.classList.add('is-ca');
};

export const spotMS = () => {
    const html = document.documentElement;

    if (isMS()) html.classList.add('is-ms');
};

export const spotIE = () => {
    const html = document.documentElement;
    if (isIe11()) html.classList.add('is-ie');
};

export async function supportsWebp() {
    if (!self.createImageBitmap) return false;

    const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    const blob = await fetch(webpData).then(r => r.blob());
    return createImageBitmap(blob).then(() => true, () => false);
}
