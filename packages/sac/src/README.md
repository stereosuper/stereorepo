# The whole thing 🐳

[Alban 🔥] There's a lot in here... so let's begin !

## The global operation

The _index.js_ file is our main entry. You'll see that it exports everything you from the other cool files we created.

If you use the default es6 import you'll get the _"utils functions"_ from @stereorepo/sac.

To get the superComponents like superWindow, superScroll... you'll have to deconstruct the import like this:

```js
// Using the default import you'll get only the cute useful functions like: query, camelize, supportsWebp, forEach, etc
import sac from '@stereosuper/sac';

// or you can deconstruct sac to get our superComponents
import { query, superWindow } from '@stereosuper/sac';

// ⚠️ query is a useful function
// ⚠️ superWindow is a superComponent
```

> 🚨 **Wait**  
> Under the hood all of our superComponents are made with es6 classes, thus you can extend your own classes with those to make specific awesome things ! 💪

## Core

### Functions

**createCrossBrowserEvent()**

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

**forEach()**

A cool while loop running under the hood to increase the native forEach's performances.

Example:

```js
const emojisArray = ['🔥', '💪', '😏'];

forEach(emojisArray, (item, index) => {
    console.log(`${index}: ${item}`);
    // Will log "1: 🔥"...
});
```

## Async

## Math

## Parsing
