# ✨ SuperScroll

## SuperScroll will help you

👂 Listen to the window's scroll event.

📏 Get the window's scrolled distance.

🛑 Listen to a cool scroll end event.

👁️ Watch elements entering and leaving the view.

🔮 Add parallax to the watched elements.

🍯 Stick any elements to the viewport while scrolling.

## Initialization

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

## The Scroll object

### The _initializeScroll_ function

With this function you'll initialize the window's scroll event listener.

#### Vanilla

```js
window.$stereorepo.superScroll
    .initializeScroll()
    .then(scrollDistanceFromTop => {
        // scrollDistanceFromTop is the distance already scrolled on initialization
        console.log(scrollDistanceFromTop);
    });
```

#### Vue.js

```js
... your-vue-component.vue
mounted() {
    // 🚀 If using Nuxt: Preferably in layout/default.vue
    this.$stereorepo.superScroll.initializeScroll().then(scrollDistanceFromTop => {
        // scrollDistanceFromTop is the distance already scrolled on initialization

        // Tips: add scrollDistanceFromTop directly to your VueX store 👌
    });
},
...
```

### The _on_ function

### The _update_ function

### The _destroyScroll_ function
