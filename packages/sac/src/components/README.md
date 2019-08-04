# The global components ⚡

[Alban 🔥] In here we will review the different components we keep inside our precious bag.

If you wanna learn more about how to import these components it's all in [there](https://github.com/stereosuper/stereorepo/tree/master/packages/sac/src) 😉.

## superLoad

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
