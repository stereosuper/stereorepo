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

### The basics

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
        // Watch an element
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
