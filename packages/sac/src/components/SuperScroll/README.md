# ✨ SuperScroll

## SuperScroll will help you

👂 Listen to the window's scroll event.

📏 Get the window's scrolled distance.

🛑 Listen to a cool scroll end event.

👁️ Watch elements entering and leaving the view.

🔮 Add parallax to the watched elements.

🍯 Stick any elements to the viewport while scrolling.

## Table of contents

👉 [The initialization](#the-initialization)

👉 [The scroll](#the-scroll)

👉 [The watched elements](#the-watched-elements)

## The initialization

### Vanilla

```js
// Import the init functions
import { useSacVanilla, useSuperScroll } from '@stereorepo/sac';

useSuperScroll();

// The SuperScroll component's instance is accessible with:
// 👉 window.$stereorepo.superScroll
```

### Vue.js

```js
// Import the init functions
// 🚀 If using Nuxt: do that in a plugin 👌)
... global-plugin.js
import Vue from 'vue';
import { useSacVue, useSuperScrollVue } from '@stereorepo/sac';

// Set Vue.use here
Vue.use(useSacVue);
Vue.use(useSuperScrollVue);
...

... YourComponent.vue
mounted() {
    // The SuperScroll component's instance is accessible with:
    // 👉 this.$stereorepo.superScroll
}
...
```

## The Scroll

### The _initializeScroll_ function

With this function you'll:

👉 Initialize the window's scroll event listener.

👉 Create events to listen to with the [_on function_](#the-on-method)

👉 Use the window's resize event listener to handle the [_watched elements_](#the-watched-elements).

#### 🎁 Return value

It returns the distance between the top of your html document and the top of the window before you even scrolled... a.k.a. first scrolled value.

> 🚨 **Nota bene**  
> The _initializeScroll_ function is asynchronous. So, to get its return value you'll need to use _await_ or _then()_.

#### 🥚 Vanilla

```js
window.$stereorepo.superScroll
    .initializeScroll()
    .then(scrollDistanceFromTop => {
        // scrollDistanceFromTop is the distance already scrolled on initialization

        console.log(scrollDistanceFromTop);
    });
```

#### 🍳 Vue.js

```js
... your-vue-component.vue

mounted() {
    // 🚀 If using Nuxt: Preferably in layout/default.vue
    this.$stereorepo.superScroll
    .initializeScroll()
    .then(scrollDistanceFromTop => {
        // scrollDistanceFromTop is the distance already scrolled on initialization

        console.log(scrollDistanceFromTop);

        // Tips: add scrollDistanceFromTop directly to your VueX store 👌
    });
},

...
```

### The _on_ method

The on method will allow you to listen to the specific events below 👇

#### The _scroll_ event

##### 🥚 Vanilla

```js
// Listen to scroll
window.$stereorepo.superScroll.on('scroll', scrollTop => {
    console.log('Is scrolling');
    console.log('Number of pixels scrolled', scrollTop);
});
```

##### 🍳 Vue.js

```js
... your-vue-component.vue

mounted(){
    // Listen to scroll
    this.$stereorepo.superScroll.on('scroll', scrollTop => {
        console.log('Is scrolling');
        console.log('Number of pixels scrolled', scrollTop);
    });
},

...
```

#### The _scroll-end_ event

##### 🥚 Vanilla

```js
// Listen to scroll end
window.$stereorepo.superScroll.on('scroll-end', () => {
    console.log("Isn't scrolling anymore");
});
```

##### 🍳 Vue.js

```js
... your-vue-component.vue

mounted(){
    // Listen to scroll end
    this.$stereorepo.superScroll.on('scroll-end', () => {
        console.log("Isn't scrolling anymore");
    });
},

...
```

### The _update_ method

With the update function you'll be able to force update the context.

By context I mean:

👉 Re-compute the [_scrollDistanceFromTop_](#the-initializeScroll-function)

👉 Re-compute the [_watched elements_](#the-watched-elements) positions.

👉 Re-compute the [_watched elements_](#the-watched-elements) effects (like _parallax_, _lerp_, _collant_, etc).

#### 🥚 Vanilla

```js
window.$stereorepo.superScroll.update();
```

#### 🍳 Vue.js

```js
... your-vue-component.vue

mounted(){
    this.$stereorepo.superScroll.update();
},

...
```

### The _destroyScroll_ method

The _destroyScroll_ method will remove all [_watched elements_](#the-watched-elements) and their listeners. Then it will remove the scroll object instance and all its listeners.

Everything will be ready for garbage collection 👌

#### 🥚 Vanilla

```js
window.$stereorepo.superScroll.destroyScroll();
```

#### 🍳 Vue.js

```js
... your-vue-component.vue

beforeDestroy(){
    this.$stereorepo.superScroll.destroyScroll();
},

...
```

## The watched elements

Here's the real magic !

Counting scroll pixels is quite nice... but between us that's for amateurs 💅

We'll now learn how to watch elements and make awesome things with them 🔥

### The basics 👌

Firstly, you need to learn the basics, i.e. _watch_ and _forget_ an element.

#### _Watch_ function and _forget_ method

Watching an element will unleash a ton of awesome dark magic spells... that you're not ready to learn for now.

##### 🎁 Return value

The _watch_ function returns an instance of _WatchedElement_.

> 🚨 **Nota bene**  
> By watching an element you will set default behaviors like:
>
> 👉 Auto toggling an _is-in-view_ class on the element when it enters the viewport.
>
> 👉 Dispatching two events: _enter-view_ and _leave-view_ accessible from the _WatchedElement_ instance.

We'll start with the simple stuff.
To do simple magic you only need one thing:

👉 An HTML element

##### 🥚 Vanilla

```js
import { query } from '@stereorepo/sac';

// 🚨 Do not forget to init the SuperScroll component! (See the sections above)

// element is my HTML element
const [element] = query({ selector: '#my-id' });

// Watch an element
const myWatcher = window.$stereorepo.superScroll.watch({ element });

// Forget the element
myWatcher.forget();
```

> See: [_query_](https://github.com/stereosuper/stereorepo/tree/master/packages/sac/src#query) to learn more about this useful function

##### 🍳 Vue.js

```js
... your-vue-component.vue

<template>
    <div class="section">
        <span ref="item" class="item">I'm a span</span>
    </div>
</template>

<script>
export default {
    data: () => ({
        myWatcher: null
    }),
    mounted() {
        // Watch an element
        this.myWatcher = this.$stereorepo.superScroll.watch({ element: this.$refs.item });
    },
    beforeDestroy() {
        // Forget the watcher to avoid memory leak
        if (this.myWatcher) this.myWatcher.forget();
    }
};
</script>

...
```

#### The _watchMultiple_ function and _forgetMultiple_ method

This function will simply help you watch multiple elements at the same time.

##### 🥚 Vanilla

```js
// We'll say that elements is my array of HTML elements

// Watch multiple elements
const myWatchers = window.$stereorepo.superScroll.watchMultiple({ elements });

// Forget multiple watchers
window.$stereorepo.superScroll.forgetMultiple(myWatchers);
```

##### 🍳 Vue.js

```js
... your-vue-component.vue

<template>
    <ul class="section">
        <li ref="items" v-for="index in 5">
            <span>{ `I'm span number ${index}` }</span>
        </li>
    </ul>
</template>

<script>
export default {
    data: () => ({
        myWatcher: []
    }),
    mounted() {
        // Watch multiple elements
        this.myWatchers = this.$stereorepo.superScroll.watchMultiple({ elements: this.$refs.items });
    },
    beforeDestroy() {
        // Forget the watchers to avoid memory leak
        if (this.myWatchers.length) this.$stereorepo.superScroll.forgetMultiple(this.myWatchers);
    }
};
</script>

...
```

#### The _on_ method

The on method will allow you to listen to the specific events below 👇

##### The _enter-view_ and _leave-view_ events

###### 🥚 Vanilla

```js
// We'll say that element is my HTML element

// Watch multiple elements
const myWatcher = window.$stereorepo.superScroll
    .watch({ element })
    .on('enter-view', () => {
        console.log('Is in view');
    })
    .on('leave-view', () => {
        console.log("Isn't in view");
    });
```

###### 🍳 Vue.js

```js
... your-vue-component.vue
// We'll say that this.$refs.item is my HTML element

mounted() {
    // Watch an element
    this.myWatcher = this.$stereorepo.superScroll
    .watch({ element: this.$refs.item })
    .on('enter-view', () => {
        console.log('Is in view');
    })
    .on('leave-view', () => {
        console.log("Isn't in view");
    });
},

...
```

## The dark magic 🔮

For this part the examples will only be in vanilla Javascript since the changes will only concern the _watch_ function (and _watchMultiple_ function, which will take the same _options_ object into account).

So like I said, you'll need to pass an additional _options_ object to your _watch_ function.

**Example:**

```js
const watched = window.$stereorepo.superScroll.watch({
    element,
    options: {
        // Here goes your options
    },
});
```

## The options in context 🧰

There is some options that you can apply to your watched element. Instead of listing all of them, we'll see them depending on what you want to achieve.

### Element detection 🔍

In this context the following parameters will be taken into account:

👉 stalk

👉 triggerOffset

#### ⚙️ The _stalk_ property

Type: `Boolean`

Default value: `true`

##### 📝 Description

Decide whether or not watching the element entrance multiple times. By default any in/out-view state change will be recorded.

By setting `stalk` to `false`, only the first in-view state will be recorded. No following change will  
take effect.

#### ⚙️ The _triggerOffset_ property

Type: `Integer` or `String`

Default value: `0`

##### 📝 Description

By default your watched element will be detected when one of those two conditions is met:

👉 The bottom of the window reaches the top of the element.

👉 The top of the window reaches the bottom of the element.

The `triggerOffset` parameter will only shift the top and bottom boundaries towards the center of your element.

##### Examples

A `triggerOffset` set to `50` will shift the top and bottom boundaries of your element to 50 pixels towards its center.

A `triggerOffset` set to `'10%'` will shift the top and bottom boundaries of your element to 10 percent of its current height towards its center.

![alt text](./doc/images/trigger-offset.png 'Trigger offset schema')

### Apply speed 🚀

In this context the following parameters will be taken into account:

👉 speed

👉 lerp

👉 position

👉 target

#### ⚙️ The _speed_ property

Type: `Number`

Default value: `0`

##### 📝 Description

The speed property will allow you to create parallax effects.

Any element of the page with a `speed` of `0` will scroll the normal amount of pixels.

Any element with a `speed` of `1` will scroll the normal amount of pixels **plus an extra 10%** of this amount.

Any element with a **positive speed** will **disappear faster than a classic element**.

Any element with a **negative speed** will **fight against the current** and disappear slower than any classic element.

#### ⚙️ The _lerp_ property

Type: `Float` ∈ [0,1]

Default value: `null`

##### 📝 Description

In mathematics, lerp (linear interpolation) is a method of curve fitting using linear polynomials to construct new data points within the range of a discrete set of known data points.

**In our case, the simplest translation would be this schema**.
![alt text](./doc/images/lerp.png 'Linear interpolation schema')

By setting a lerp value, at each frame, the normal translation value (coming from the speed property) will be lerped.

The (x0, y0) point would be the element current position. The (x1, y1) point would be the new element's position with a speed property applied to it. The effective position will be the (x,y) point.

By changing the lerp factor between `0` and `1` you're currently translating the red point on the red line.

By repeating this computation for each frame, you'll have a sense of delay applied to your initial `speed` factor.

#### ⚙️ The _target_ property

Type: `HTML element`

Default value: `null`

##### 📝 Description

The target property will allow you to shift your element relativity from the center of the window to the specified target. This property won't be taken into account without specifying the `position` property.

#### ⚙️ The _position_ property

Type: `String`

Default value: `null`

##### 📝 Description

This property will only take two possible values:

👉 `'top'`

👉 `'bottom'`

Without any `target` specified, the position will be set relatively to the window's top or bottom.

With a `target` specified, the position will be set relatively to the target's top or bottom.

### Make it stick 🍯

In this context the following parameters will be taken into account:

👉 collant

👉 collantOffset

👉 position

👉 target

#### The _collant_ property

Type: `Boolean`

Default value: `false`

##### 📝 Description

Activate sticky positioning relatively to the `target` container.

#### The _collantOffset_ property

Type: `Float` or `String`

Default value: `0`

##### 📝 Description

By default your collant element will be sticky when one of those two conditions is met:

👉 The top of the window reaches the top of the element.

👉 The bottom of the window reaches the bottom of the element.

The `collantOffset` parameter will only offset those two conditions by the given value.

For example, by giving a value of `100` to `collantOffset` and a `position` parameter of `'top'`, the element will be sticky 100 pixels before reaching the current element top.

The result will be a 100 pixels margin between the window's top and the element's top while being sticky.

The accepted value are `Float` which will be directly translated into pixel, or `String` ending by `vh` directly translated to percentage of the window's height.

**Example:**

```js
const watched = window.$stereorepo.superScroll.watch({
    element,
    options: {
        collant: true,
        collantOffset: 100,
        // or
        collantOffset: '10vh',
    },
});
```

#### ⚙️ The _target_ property

Type: `HTML element`

Default value: `null`

##### 📝 Description

The `target` property will be the box in which your _collant_ element will stick. Thus, the box shall have a greater height than its curent height. **Otherwise the element won't be sticky**.

Without any `target` specified, collant element won't be sticky.

#### ⚙️ The _position_ property

Type: `String`

Default value: `null`

##### 📝 Description

This property will only take two possible values:

👉 `'top'`

👉 `'bottom'`

With a `target` specified, the `collantOffset` will be set relatively to the target's top or bottom.
