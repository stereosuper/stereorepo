# The global components ⚡

[Alban 🔥] In here we will review the different components we keep inside our precious bag.

If you wanna learn more about how to import these components it's all in [there](https://github.com/stereosuper/stereorepo/tree/master/packages/sac/src) 😉.

## ✨ superError

SuperError is not auto-instanciated. This class will help you to build cool custom errors.

For instance this components helps us to build the errors for all the @stereorepo 👌

To use it you'll have to import it the extend your class with it 🔥

Example:

```js
import { SuperError } from '@stereorepo/sac';

class MyNewErrorClass extends SuperError {
    constructor(message) {
        super(message);
        this.name = '@stereorepo/my-new-package';
    }
}
```

## ✨ superFallback

superFallback contains a global method which concerns all the browsers fallbacks (hope IE will die one day 👌). This method is _initializeFallbacks_. All the other methods are more specific ones.

### initializeFallbacks

This will add classes on the body according to the browser you're using. It will also fix some method for you like _Object.entries_.

### initializeWebAudioApi

If you need to use the web audio API, this method will help you to make it compatible with your browser.

## ✨ superLoad

Here's our loadHandler. With it you'll be able to prioritize the different functions calls that you are doing in your project.

You can divide your code execution in three different steps.

### preload

First, there is the preloading step. In it you'll load all the important stuff. Important stuff means all the things you need to do while the page is loading, to ensure an optimum user experience.

### load

In there do all the pretty and smooth things that will require a user interaction but that are not that important to ensure a great user experience.

### animations

Last but not least, animations stuff. All the sweetness of the world you created goes here. Pretty animations that don't help in delivering the main message... HERE.

⚠️ Note that the animations handler is called in the load handler, because you won't always preload things. But you'll necessarily load things.

**So without the load handler, no animations handler.**

### initializeLoadingShit

This function will initialize superScroll, superWindow (also init the _"no transition elements"_), and the superFallback components. Then it will call preloadCallback, and loadCallback.

Example:

```js
import { superLoad } from '@stereorepo/sac';

// All of these components are already instanciated in order to increase performances 📈
// Only one instance for the same things all across your code.
const preloadCallback = () => {};

const loadCallback = () => {};

const preloadCallback = () => {};

superLoad.initializeLoadingShit({
    preloadCallback,
    loadCallback,
    animationsCallback,
    noTransElementsClass:
        '.here-you-can-give-your-custom-element-without-transition-on-resize-class'
});
```

## ✨ superPolyfill

This component is used to require all the polyfills that we use frequently.

### initializeIntersectionObserver

This will add the intersection observer polyfill 👌

### initializeWhatwgFetch

This will add the fetch polyfill 👌

## ✨ superScroll

## ✨ superSnif

This component constructor will initialize _this.snifTests_ with all the tests to detect your browser. Then all the other methods will allow you to test things about your browser.

### The methods list

-   isIOS
-   isAndroid
-   isChrome
-   isMobile
-   isChromeAndroid
-   isSafari
-   isFF
-   isMS
-   mixBlendModeSupport
-   isIe11

## ✨ superWindow
