class Snif {
    constructor() {
        this.body = document.body;

        const uA = navigator.userAgent.toLowerCase();
        this.snifTests = {
            isIOS: /iphone|ipad|ipod/i.test(uA),
            isSafari:
                (!!navigator.userAgent.match(/safari/i) &&
                    !navigator.userAgent.match(/chrome/i) &&
                    typeof document.body.style.webkitFilter !== 'undefined' &&
                    !window.chrome) ||
                /a/.__proto__ == '//',
            isBlackberry: /blackberry/i.test(uA),
            isMobileIE: /iemobile/i.test(uA),
            isFF: 'MozAppearance' in document.documentElement.style,
            isMS:
                '-ms-scroll-limit' in document.documentElement.style &&
                '-ms-ime-align' in document.documentElement.style,
            mixBlendModeSupport:
                'CSS' in window &&
                'supports' in window.CSS &&
                window.CSS.supports('mix-blend-mode', 'multiply'),
            isMobileAndroid: /android.*mobile/.test(uA),
            safari: uA.match(/version\/[\d\.]+.*safari/),
            isChrome: !!window.chrome && !!window.chrome.webstore
        };

        this.snifTests.isAndroid =
            this.snifTests.isMobileAndroid ||
            (!this.snifTests.isMobileAndroid && /android/i.test(uA));

        this.snifTests.isSafari =
            !!this.snifTests.safari && !this.snifTests.isAndroid;
    }
    isIOS() {
        return this.snifTests.isIOS;
    }
    isAndroid() {
        return this.snifTests.isIOS;
    }
    isChrome() {
        return this.snifTests.isChrome;
    }
    isMobile() {
        return (
            this.snifTests.isMobileAndroid ||
            this.snifTests.isBlackberry ||
            this.snifTests.isIOS ||
            this.snifTests.isMobileIE
        );
    }
    isChromeAndroid() {
        return this.snifTests.isMobileAndroid && this.isChrome();
    }
    isSafari() {
        return this.snifTests.isSafari;
    }
    isFF() {
        return this.snifTests.isFF;
    }
    isMS() {
        return this.snifTests.isMS;
    }
    mixBlendModeSupport() {
        return this.snifTests.mixBlendModeSupport;
    }
    isIe11() {
        return this.body.style.msTouchAction !== undefined;
    }
}

export default new Snif();
