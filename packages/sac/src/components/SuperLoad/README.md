# ✨ SuperLoad

[Alban 🔥] Here's our super vanilla load handler 💪

With it you'll be able to prioritize the different functions calls that you are doing in your project.

You can divide your code execution in three different steps.

## preload

First, there is the preloading step. In it you'll load all the important stuff. Important stuff means all the things you need to do while the page is loading, to ensure an optimum user experience.

## load

In there do all the pretty and smooth things that will require a user interaction but that are not that important to ensure a great user experience.

## animations

Last but not least, animations stuff. All the sweetness of the world you created goes here. Pretty animations that don't help in delivering the main message... HERE.

🚨 Note that the animations handler is optional, because you won't always need three levels of stuff loading.

But don't forget that the animations handler is called in the load handler... **So without the load handler, no animations handler.**

## initializeLoadingShit

This function will initialize the _superWindow_ component. Then it will call _preloadCallback_, _loadCallback_, and _animationsCallback_.

Example:

```js
import { useSuperLoad } from '@stereorepo/sac';

// Initialize the SuperComponent
useSuperLoad();

// The SuperWindow component was instanciated by useSuperLoad
// So now you can access it with this.$stereorepo.superWindow
// Only one instance for the same things all across your code 👌

const preloadCallback = () => {};

const loadCallback = () => {};

const animationsCallback = () => {};

window.$stereorepo.superLoad.initializeLoadingShit({
    preloadCallback,
    loadCallback,
    animationsCallback,
    noTransElementsClass:
        '.here-you-can-give-your-custom-element-without-transition-on-resize-class',
});
```
