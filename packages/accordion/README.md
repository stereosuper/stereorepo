# Accordion 🔽

[Alban 🔥]
_Accordion_ is the **supreme**, **most modern** and **sexy** accordion package ever made 💅

## Installation

```sh
npm i -S @stereorepo/accordion
```

## Usage

The easiest, most effective way to build an accordion is to use four html elements.

First: the container

Second: the clickable element

Third: the content wrapper

Fourth: the accordion content container

### How it works on paper

The _container_ will... **contain** (👏) all the elements you'll need to create magic.

The _clickable element_ (frequently your accordion title) will allow us to **reveal the accordion content when clicked**.

Its first and only bro : the _content wrapper_.

The _content wrapper_ will be the **expanding/contracting element**. We will change its `max-height` css property to reveal/hide the accordion content.

We need a _content container_ to **know the height of our actual content**.

### The html

```html
<!-- ... -->
<div class="js-accordion">
    <p class="js-accordion-title">My title</p>
    <div class="js-accordion-content-wrapper">
        <div class="js-accordion-content">
            <!-- Inside put your content -->
        </div>
    </div>
</div>
<!-- ... -->
```

### Example

```js
// You can import the vanilla Accordion
import { Accordion } from '@stereosuper/accordion';
// or the Vue.js version of it
import { AccordionVue } from '@stereosuper/accordion';

// then instanciate it
const accordions = new Accordion({
    containerSelector: '.js-accordion',
    clickedSelector: '.js-accordion-title',
    contentWrapperSelector: '.js-accordion-content-wrapper',
    contentSelector: '.js-accordion-content',
    offsetY: 100,
    scrollDelay: 200,
    noScroll: false,
    silent: true
});

// and finally watch the magic happen
accordions.initializeAccordions();
```

### The properties

_containerSelector_, _clickedSelector_, _contentWrapperSelector_, and _contentSelector_ are the four main elements composing our accordion (see 👆 there).

#### offsetY

This is the amount of pixels of the margin you want between the top of your window and the top of your accordion... because, yeah, **by default it automatically scrolls to the top of the clicked accordion** 😏

#### scrollDelay

Seriously... just read the fuc\*\*\*\* title

#### noScroll

You can deactivate the scroll with you want... much less **SWAG**, but still cool.

#### silent

You can deactivate the console's errors if you want (for example if you don't use [_bodyRouter_](https://github.com/stereosuper/stereorepo/tree/master/packages/sac/src))
