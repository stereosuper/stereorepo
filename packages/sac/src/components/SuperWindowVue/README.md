# ✨ SuperWindowVue

## Functions

**initializeWindow**

With this function you'll initialize the `window.addEventListener('resize')` event. All the window's values will be updated in your VueX store at `yourStore.state.superWindow`.
The superComponent is using a dynamic VueX module under the hood.

See : https://vuex.vuejs.org/guide/modules.html#dynamic-module-registration

```js
... your-vue-component.vue

mounted() {
    // Always call initializeWindow to ensure that the dynamic VueX module exists
    // Don't worry, if it already exists it won't be redeclared
    // this.$store is your VueX store instance
    this.$stereorepo.superWindow.initializeWindow(this.$store);
},

...
```

**destroyWindow**

Simply destroy the _SuperWindow_'s events and store module.

```js
... your-vue-component.vue

destroyed() {
    // this.$store is your VueX store instance
    this.$stereorepo.superWindow.destroyWindow(this.$store);
},

...
```

**toggleNoScroll**

_Often used for your burger menus (html tag updated with position fixed to avoid scroll bugs)_.

The _toggleNoScroll_ function will remembering your scroll distance when the navigation is activated.

```js
... your-vue-component.vue

watch: {
    navigationState(navState) {
        this.$stereorepo.superWindow.this.$stereorepo.superWindow.toggleNoScroll({
            noScroll: navState,
            nextTick: this.$nextTick
        });
    }
},

...
```
