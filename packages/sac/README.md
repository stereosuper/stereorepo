# Sac 🎒

[Alban 🔥] Ever since **jQuery died\* in hour hearts** we had an idea.

Create a small package that bring together all of our best dark magic art ! 🔮

**_Sac à choses_** is born !

\*Since, well, the beginning of time 😂

## Installation

```sh
npm i -S @stereorepo/sac
```

## Usage

Sac is composed of two major type of things :

-   Useful functions
-   Super components used in every projects

Thus you can import the package in two different ways :

```js
// Using the default import you'll get only the cute useful functions like: query, camelize, supportsWebp, forEach, etc
import sac from '@stereosuper/sac';

// or you can deconstruct sac to get our superComponents and useful functions
import { query, useSacVanilla, useSuperWindow } from '@stereorepo/sac';

// ⚠️ query is a useful function
// ⚠️ SuperWindow is a SuperComponent

// Init SuperComponents
useSacVanilla();
useSuperWindow();

// Access superComponents with
// window.$stereorepo.superWindow;
```

## Know more about the functions

If you wanna know more about the different **functions** inside this marvelous package you can click 👉 [here](https://github.com/stereosuper/stereorepo/tree/master/packages/sac/src) 👈

## Know more about the SuperComponents

To know more about the **components** [click here](https://github.com/stereosuper/stereorepo/tree/master/packages/sac/src/components).
