# Collant 🍯

[Alban 🔥]
See _Collant_ as Post-it™ for the web. With it you can stick any element you want, like a pro 👌

## Installation

```sh
npm i -S @stereorepo/collant
```

## Usage

### How it works on paper

The _container_ will... **contain** (👏) all the elements you'll need to create magic.

The _clickable element_ (frequently your accordion title) will allow us to **reveal the accordion content when clicked**.

Its first and only bro : the _content wrapper_.

The _content wrapper_ will be the **expanding/contracting element**. We will change its `max-height` css property to reveal/hide the accordion content.

We need a _content container_ to **know the height of our actual content**.

### The html

```html
<!-- ... -->
<div class="js-context">
    <div class="js-box">
        <div class="js-collant"></div>
    </div>
</div>
<!-- ... -->
```

### Example

```js
// You can import the vanilla Collant
import { Collant } from '@stereosuper/collant';
// or the Vue.js version of it
import { CollantVue } from '@stereosuper/collant';

const [contextElement] = query({
    selector: '.js-context'
});

// then instanciate it
const collant = new Collant({
    ctx: contextElement,
    selector: '.js-nav-btn',
    box: '.js-ref-first-part',
    offsetTop: '100px'
    // you can also use vh units
    // offsetTop: '20vh'
}),

// and finally watch the magic happen
collant.stickIt();

// when you wanna get rid of it, simply unstick it
collant.ripIt();
```

### constructor

#### ctx

This is a contextual element to give you the ability to efficiently stick the element you need.

#### selector

This will be the collant element.

#### box

This element will be the box in which your collant will stick.

#### offsetTop

This is the offset value from the top of your window.

You can pass px or vh values like that `'10px'`, `'20vh'`;

#### offsetBottom

The same as _offsetTop_, but for the bottom of the window.

You can pass px or vh values like that `'10px'`, `'20vh'`;

**Note that** _offsetBottom_ will **override** _offsetTop_.
