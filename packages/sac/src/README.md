# The whole thing 🐳

[Alban 🔥] There's a lot in here... so let's begin !

## The global operation

The _index.js_ file is our main entry. You'll see that it exports everything you from the other cool files we created.

If you use the default es6 import you'll get the _"utils functions"_ from @stereorepo/sac.

To get the superComponents like superWindow, superScroll... you'll have to deconstruct the import like this:

```js
// Using the default import you'll get only the cute useful functions like: query, camelize, supportsWebp, forEach, etc
import sac from '@stereorepo/sac';

// or you can deconstruct sac to get our superComponents
import { query, superWindow } from '@stereorepo/sac';

// ⚠️ query is a useful function
// ⚠️ superWindow is a superComponent
```

> 🚨 **Wait**  
> Under the hood all of our superComponents are made with es6 classes, thus you can extend your own classes with those to make specific awesome things ! 💪

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
    false
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
    selector: '.the-ancestor .my-nested-element'
});
const allTheClasses = query({
    selector: '.my-classes'
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

**throttle**

_throttle_ has been redisigned.

Example:

```js
throttle({
    callback: () => {
        // Do whatever you want to
    },
    delay: 100
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
    }
});
```

## Async

### Functions

Nothing except a possibly cool fetch function for now.

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

**reverseString**

Just read the title.

Example:

```js
const myString = 'emosewa';

const reversedString = reverseString(myString);
// myString = awesome now.
```
