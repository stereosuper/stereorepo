# The SuperComponents ⚡

[Alban 🔥] In here we will review the different components we keep inside our precious bag... and how to use them 😏

```js
// Using the default import you'll get only the cute useful functions
// That's not what we want here so
// ❌ import sac from '@stereorepo/sac';

// We will then deconstruct sac to get our SuperComponents.
// Remember that our useful functions are available with deconstructing... just in case you need some of them too
import { query, useSacVanilla, useSuperWindow } from '@stereorepo/sac';

// 👉 query is a useful function
// 👉 superWindow is a superComponent

// Init SuperComponents
useSacVanilla();
useSuperWindow();

// All our SuperComponents are scoped into the window
// It ensures that you'll have only one instance of each declared 👌
// window.$stereorepo.superWindow;
```

> 🚨 **Nota bene**  
> Under the hood all of our SuperComponents are made with es6 classes, thus you can extend your own classes with those to make specific awesome things ! 💪

## Working with Vue.js 😏

You can use some of our SuperComponents with Vue.js. In order to do that you'll need to use specific initializing function like `useSuperWindowVue` instead of `useSuperWindow`.

Example:

```js
// Import the init functions
// 🚀 If using Nuxt: do that in a plugin 👌
... global-plugin.js
import Vue from 'vue';
import { useSacVue, useSuperWindowVue } from '@stereorepo/sac';

// Set Vue.use here
Vue.use(useSacVue);
Vue.use(useSuperWindowVue);
...

... YourComponent.vue
mounted() {
    // this.$store is your VueX store instance
    this.$stereorepo.superWindow.initializeWindow(this.$store);
}
...
```

## Documentation links

**Now that you've got the basics... let's get schwifty ! 🤘**

| Package                                                                                                            | Vanilla compatibility | Vue.js compatibility |
| ------------------------------------------------------------------------------------------------------------------ | :-------------------: | :------------------: |
| [SuperError](https://github.com/stereosuper/stereorepo/tree/master/packages/sac/src/components/SuperError)         |          ✅           |          ✅          |
| [SuperLoad](https://github.com/stereosuper/stereorepo/tree/master/packages/sac/src/components/SuperLoad)           |          ✅           |          ❌          |
| [SuperScroll](https://github.com/stereosuper/stereorepo/tree/master/packages/sac/src/components/SuperScroll)       |          ✅           |          ✅          |
| [SuperWindow](https://github.com/stereosuper/stereorepo/tree/master/packages/sac/src/components/SuperWindow)       |          ✅           |          ❌          |
| [SuperWindowVue](https://github.com/stereosuper/stereorepo/tree/master/packages/sac/src/components/SuperWindowVue) |          ❌           |          ✅          |
