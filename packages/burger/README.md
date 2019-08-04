# Burger 🍔

[Alban 🔥]
_Burger_ is the easy way to make your ordinary burger navigation optimized for mobile 📱

## Installation

```sh
npm i -S @stereorepo/burger
```

## Usage

Burger will toggle the _activated_ class on both the burger and your main navigation. _aria-expanded_ is also handled on your main navigation.

This component will take care of browsers compatiblity concerning the scroll when the navigation is active with the _%no-scroll_ scss placeholder.

### How it works on paper

For purpose of making a great mobile navigation you only need to elements:

-   The burger element
-   The main navigation of the website

### The html example

```html
<!-- ... -->
<header class="main-header">
    <button class="burger js-burger" type="button">
        <!-- The elements you need to make your burger -->
    </button>
</header>
<nav class="main-navigation js-main-navigation">
    <!-- All your navigation elements -->
</nav>
<!-- ... -->
```

### Example

```js
// You can import the vanilla Burger
import { Burger } from '@stereosuper/accordion';
// or the Vue.js version of it
import { BurgerVue } from '@stereosuper/accordion';

// then instanciate it
const burger = new Burger({
    burgerSelector: '.js-burger',
    mainNavigationSelector: '.js-main-navigation'
});

// and finally watch the magic happen
burger.bigMacOrWhopper();
```

### The constructor

In the burger constructor you only need to pass your `burgerSelector` and your `mainNavigationSelector`. Then just let it roll.

### bigMacOrWhopper

_bigMacOrWhopper_ is the initialization function of the burger component.

### The scss placeholder

To easily control browser compatibility with burger navigation you can use the `%no-scroll` scss placeholder.

```scss
@import '~@stereorepo/burger/src/burger';

// It will search for the .no-scroll class added to the html element
html {
    @extend %no-scroll;
}
```
