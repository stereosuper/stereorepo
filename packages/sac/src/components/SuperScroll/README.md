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
// 👉 this.$stereorepo.superScroll
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

👉 Create events to listen to with the [_on function_](#the-on-function)

👉 Use the window's resize event listener to handle the [_watched elements_](#watched-elements).

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
    this.$stereorepo.superScroll.initializeScroll().then(scrollDistanceFromTop => {
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
this.$stereorepo.superScroll.on('scroll-end', () => {
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

👉 Re-compute the [_watched elements_](#watched-elements) positions.

👉 Re-compute the [_watched elements_](#watched-elements) effects (like _parallax_, _lerp_, _collant_, etc).

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

The _destroyScroll_ method will remove all [_watched elements_](#watched-elements) and their listeners. Then it will remove the scroll object instance and all its listeners.

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

### The _watch_ function

### The _forget_ method

### The _watchMultiple_ function

### The _forgetMultiple_ method
