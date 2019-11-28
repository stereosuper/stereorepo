# The whole thing 🐳

[Alban 🔥] There's a lot in here... so let's begin !

## The global operation

The _index.js_ file is our main entry. You'll see that it exports everything you need from the other cool files we created.

If you use the default es6 import you'll get the _"utils functions"_ from @stereorepo/sac.

To get the SuperComponents like superWindow, superScroll... you'll have to deconstruct the import...

**👉 See the SuperComponents [documentation](https://github.com/stereosuper/stereorepo/tree/master/packages/sac/src/components)**

## Async

### Functions

**wait**

In an async function, _wait_ allows us to wait in simple way with _await_.

Example:

```js
// delay is in ms
const delay = 300;

const asyncFunction = async () => {
    ...
    // Do some stuff
    ...
    await wait(delay);
};

asyncFunction();
```

**runPromisesSequence**

This function allows us to add a timeout between promises (not possible with Promise.all).

Example:

```js
// Say we want to download medias from urls
// For each url we want to apply the same process...
// With a delay... Because we wanna avoid a server overload

// Media download function
const handleMediaDownload = async (url, mediaName) => {
    const [mediaName] = url.split('/').reverse();
    const filePath = `static-path/${mediaName}`;
    await writeMedia({ filePath, url });
};

// Apply the delay
await runPromisesSequence(
    {
        array: urls, // For the examples' purpose, we'll say that urls is already defined as an array
        handler: handleMediaDownload,
        delay: 500, // In ms
    },
    () => {
        // The callback called when all promises are done
    },
);
```

## Core

### Functions

**createCrossBrowserEvent**

This function will help you to make cross browser events (I hope internet explorer will die one day...).

Example:

```js
const newEvent = createCrossBrowserEvent('test-new-event');

document.addEventListener(
    'test-new-event',
    () => {
        console.log('✅ Cross browser event dispatched');
    },
    false,
);

document.dispatchEvent(newEvent);
```

**forEach**

A cool while loop running under the hood to increase the native forEach's performances.

Example:

```js
const emojisArray = ['🔥', '💪', '😏'];

forEach(emojisArray, (item, index) => {
    console.log(`${index}: ${item}`);
    // Will log "1: 🔥"...
});
```

**isDisplayed**

_isDisplayed_ will allow you to test if your html element is in _display: none_ mode.

Example:

```js
const testingDisplay = isDisplayed(myElement);

if (testingDisplay) {
    // My element is displayed 💪
}
```

**nodeIndex**

With this function you'll be able to know the index of your html element position amongst his siblings.

Example:

```js
const index = nodeIndex(myElement);
```

**query**

_query_ will allow you to get any html element you want with performances you can only dream of !
_getElementById_, _getElementsByClassName_, _getElementsByTagName_, _querySelectorAll_... you don't need to choose anymore, it'll do it for you 😏

Example:

```js
const [byId] = query({ selector: '#my-id' });
const [byClass] = query({ selector: '.my-class' });
const [myNestedElement] = query({
    selector: '.the-ancestor .my-nested-element',
});
const allTheClasses = query({
    selector: '.my-classes',
});
const withContext = query({ selector: '.my-class', ctx: myContextualElement });
```

**requestAnimFrame**

A requestAnimationFrame method for every browsers... yes that exists.

Example:

```js
const animationFrameId = requestAnimFrame(() => {});

// The better, you can cancel it 😱
cancelAnimationFrame(animationFrameId);
```

**throttle**

_throttle_ has been redisigned.

Example:

```js
throttle({
    callback: () => {
        // Do whatever you want to
    },
    delay: 100,
});
```

**bodyRouter**

_bodyRouter_ will allow you to execute whatever javascript piece of code... on the specific page you want, not the others. One more thing, it uses _query_ under the hood 😏

Example:

```js
bodyRouter({
    identifier: '.page-template-contact',
    callback: () => {
        // Dynamically load your imports for example 💪
    },
});
```

## Fallback

### Functions

**spotMobile**

Spot when a mobile is used by adding a class to the html element.

Example:

```js
spotMobile(); // As simple as that
```

**spotIOS**

Spot when ios is used by adding a class to the html element.

Example:

```js
spotIOS(); // As simple as that
```

**spotSafari**

Spot when safari is used by adding a class to the html element.

Example:

```js
spotSafari(); // As simple as that
```

**spotFF**

Spot when firefox is used by adding a class to the html element.

Example:

```js
spotFF(); // As simple as that
```

**spotChromeAndroid**

Spot when an android mobile uses chrome by adding a class to the html element.

Example:

```js
spotChromeAndroid(); // As simple as that
```

**spotMS**

Spot when a microsoft device is used by adding a class to the html element.

Example:

```js
spotMS(); // As simple as that
```

**spotIE**

Spot when internet explorer is used by adding a class to the html element.

Example:

```js
spotIE(); // As simple as that
```

**supportsWebp**

To handle webp support correctly... test it in a simple way.

Example:

```js
// In your async function:
const isWebpSupported = await supportsWebp();

if (isWebpSupported) {
    // YEAH WEBP IS COMING IN BABY ! 🔥
} else {
    // OKAY LET'S USE IMAGES THE OLD FASHION WAY
}
```

## Math

### Functions

**roundNumbers**

Rounding numbers could be a bit boring sometimes. Now rounding numbers became pretty easy.

Example:

```js
const myNumber = roundNumbers({ number: 10.123456789, decimalOffset: 2 });

// myNumber = 10.12 now
```

## Parsing

### Functions

**camalize**

Just read the title.

Example:

```js
const mySlug = 'test-slug';

const camalizedSlug = camalize(mySlug);
// camalizedSlug = testSlug now.
```

**pascalize**

Just read the title.

Example:

```js
const mySlug = 'test-slug';

const pascalizedSlug = pascalize(mySlug);
// pascalizedSlug = TestSlug now.
```

**reverseString**

Just read the title.

Example:

```js
const myString = 'emosewa';

const reversedString = reverseString(myString);
// myString = awesome now.
```

## Polyfill

### Functions

**audioContextPolyfill**

A sweet polyfill for the web audio api

```js
audioContextPolyfill();

const audioContext = new window.AudioContext();
```

**ie11Polyfills**

Internet explorer again...

```js
// Polyfills for matches, closest, entries elements functions
ie11Polyfills();
```

**ioPolyfill**

IntersectionObserver is pretty cool... but... like always... Internet explorer

```js
ioPolyfill();

const options = {
    root: document.querySelector('#scrollArea'),
    rootMargin: '0px',
    threshold: 1.0,
};

const observer = new IntersectionObserver(callback, options);
```

**smoothScrollPolyfill**

Smooth scrolling to anchors is cool... but don't forget IE

```js
smoothScrollPolyfill();

const [scrollToElement] = query({ selector: '.scroll-to-selector' });

window.scroll({
    top: 100, // In px
    left: 0,
    behavior: 'smooth',
});
```

## Snif

### Functions

**isIOS**

Check for an ios device

```js
if (isIOS()) {
    // Do some stuff
}
```

**isAndroid**

Check for an android device

```js
if (isAndroid()) {
    // Do some stuff
}
```

**isChrome**

Check if the device uses chrome

```js
if (isChrome()) {
    // Do some stuff
}
```

**isMobile**

Check if the device is a mobile

```js
if (isMobile()) {
    // Do some stuff
}
```

**isChromeAndroid**

Check if the device running chrome on android

```js
if (isChromeAndroid()) {
    // Do some stuff
}
```

**isSafari**

Check if the device is running safari

```js
if (isSafari()) {
    // Do some stuff
}
```

**isFF**

Check if the device is running firefox

```js
if (isFF()) {
    // Do some stuff
}
```

**isMS**

Check if the device is a Microsoft product (🤮)

```js
if (isMS()) {
    // Do some stuff
}
```

**mixBlendModeSupport**

Check for mix blend mode support

```js
if (mixBlendModeSupport()) {
    // Do some stuff
}
```

**isIe11**

Check if the device's running internet explorer

```js
if (isIe11()) {
    // Do some stuff
}
```

**P.S.** 21st century's celebrating its 20 years old... Seriously... Internet explorer's not dead by now ??? WTF ???
