# 🚀 Stéréorepo 🚀

[Alban 🔥] Stéréorepo uses _Lerna_ in order to manage multiple packages in only one repo.

These packages are _"**npm scoped packages**"_ like _@babel/core_.

## Foreword

Theses packages are written using the latest ECMAScript syntax. Thus, you'll need to transpile the packages (with babel for example).

Example using webpack : 

```js
... webpack.config.js
module.exports = {
  ...
  module: {
    {
        test: /\.js$/,
        loader: 'babel-loader',
        // Instead of excluding the node_modules
        // You'll need to include all the sources you wanna transpile
        // Here @stereorepo packages and all .js files in ./src/js
        include: [/node_modules\/@stereorepo/, path.resolve(__dirname, 'src', 'js')]
    }
  }
  ...
};

```

## The packages

👉 [@stereorepo/accordion](https://github.com/stereosuper/stereorepo/tree/master/packages/accordion)

👉 [@stereorepo/burger](https://github.com/stereosuper/stereorepo/tree/master/packages/burger)

👉 [@stereorepo/collant](https://github.com/stereosuper/stereorepo/tree/master/packages/collant)

👉 [@stereorepo/sac](https://github.com/stereosuper/stereorepo/tree/master/packages/sac)

👉 [@stereorepo/sprite](https://github.com/stereosuper/stereorepo/tree/master/packages/sprite)

## Maintain the packages

### Set up your npm account

First, you need to init your npm account infos. You only have to do it once.

```sh
npm set init.author.name "Your Name"
npm set init.author.email "Your Email"
npm set init.author.url "Your Website"
npm adduser
```

Then just login to npm via your terminal.

```sh
npm login
```

### How to use Lerna

#### Update version

You can update your package version by running `lerna version`.

```sh
lerna version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease]
```

This command will only update your package via git, not publish it to npm.

#### Publish a new version

To publish a new version of your package you just have to run `lerna publish`.

```sh
lerna publish
```

This command, unlike the preceding, will push your new version to git **and** publish it on your npm repo.

### Scoped packages common shit

You'll need to create a new organization on npm to be able to publish your scoped packages. The organization needs to have your repo's name.

**Example :**

For _"@stereorepo/sac"_ to work you'll need to create an organization named _"stereorepo"_

If it's your package's first time, you'll need to say to npm that it is public and change some things :

```sh
// package.json
...
"name": "@stereorepo/[*package-name*]",
"main": "src/index.js",
"publishConfig": {
    "access": "public"
},
"repository": {
    "type": "git",
    "url": "https://github.com/stereosuper/stereorepo/packages/[*package-name*]"
},
...
```

## Run some tests on our packages

In order to run some tests on our awesome new libraries we run a [test webpack project](https://github.com/stereosuper/stereorepo/tree/master/src).

### The test project

At the project's root there's a package.json which contains some scripts :

```sh
//package.json
...
"scripts": {
    "dev": "webpack-dev-server --mode development --open",
    "link": "sh npm-link.sh",
    "unlink": "sh npm-unlink.sh",
}
...
```

### npm run dev

This command is configured to run a development server at the address 0.0.0.0:3000 with **_hot reloading_**, **_sass_**, **_eslint_**, **_postcss_**, etc.

### npm run link

This command will simply npm link all @stereorepo's packages to the test (./src) directory in order to update package without having to publish new versions.

### npm run unlink

This command will npm unlink all @stereorepo's packages when you're done with testing them 👌
