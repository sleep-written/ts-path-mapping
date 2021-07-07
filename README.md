# ts-path-mapping
A npm package to automate __path mapping__ in typescript modules, using only the `tsconfig.json` file. This package implements [module-alias](https://www.npmjs.com/package/module-alias) and [comment-json](https://www.npmjs.com/package/comment-json) for the `tsconfig.json` parsing, and now __has ts-node support!__ *(thanks for [this file](https://github.com/yorickdevries/detect-ts-node/blob/master/index.js))*.

## Disclaimer
This package is designed only for developing projects for the end user (such as websites, applications, etc). Using this package for resolve paths inside npm packages may cause serious problems. See [this section](https://github.com/ilearnio/module-alias/blob/dev/README.md#using-within-another-npm-package) for more details.

## Changelog
- `--require ts-path-mapping/register` added.
- Dependencies updated.

## Roadmap
- [ ] Add a verbose mode to check in details the paths added.

## How it works?
When you import (for side-effects) this library, this tries to read the `tsconfig.json` file for extracts the paths declared them. Later iterates all paths and register that one by one using [module-alias](https://github.com/ilearnio/module-alias).

## Usage
First install the package:
```npm
npm i --save ts-path-mapping
```

Later, configure your tsconfig like this format (remember use `"/*"` at the end of every alias key and value):
```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "baseUrl": "./src",
    "paths": {
        "@key-01/*": [ "folder-01/*" ],
        "@key-02/*": [ "folder-02/*" ],
        "@key-03/*": [ "folder-03/*" ],
    }
  }
}
```

Finally, when you start your project, simply execute it adding this library as a required dependency for `node.js`:
```
node --require ts-path-mapping/register ./dist/index.js
```

..or if do you want to use `ts-node`:
```
npx ts-node --require ts-path-mapping/register ./src/index.ts
```

## How to detect
When this package is launched, the `process` object is altered adding some property with global symbols as key. The descriptions of that symbol keys are:
- `ts-path-mapping.registered`: is `true` when this library was called using `--require` argument.
- `ts-path-mapping.required`: is `true` when this library has been called.

If do you want to check the value of any key, you can write, for example:
```ts
const value = Object
    .getOwnPropertySymbols(process)
    .some(x => x.description === 'ts-path-mapping.registered');
```

## What's the purpose to adding `ts-path-mapping/register` functionality?
In previous versions, before the `ts-path-mapping/register` implementation, you was must to import this library (in side-only effects mode) in the __root file__ of your project. For execute your project wasn't a problem:
```ts
// THIS IS REQUIRED only in the root file
import 'ts-path-mapping';

// Import your resources...
import { jajaja } from '@key-01/jajaja';
import { gegege } from '@key-02/gegege';
import { jojojo } from '@key-03/jojojo';

// ...all use it as your needs
jajaja();
gegege();
jojojo();
```

...but if you want to make unit testing, that's is a problem because the unit testings doesn't starts necessarily from the root file. For example:

`class-a.test.ts`:
```ts
// A dependency imported using the path aliasing
import { memeParser } from '@tool/meme-parser';

describe('Testing "ClassA"', () => {
  // bla bla bla bla bla
});
```

`class-b.test.ts`:
```ts
// The same dependency imported before
import { memeParser } from '@tool/meme-parser';

describe('Testing "ClassB"', () => {
  // bla bla bla bla bla
});
```

When you execute [Mocha](https://mochajs.org/) (or another unit testing library), the execution will throw a *__module not found__* error, because this library wasn't imported in the first testing file loaded by the testing library. The temporally awful solution is import this library in every testing file *(because we don't know what test will be executed first)*:

`class-a.test.ts`:
```ts
import 'ts-path-mapping';   // THIS WIILL BE IN ALL TESTING
import { memeParser } from '@tool/meme-parser';

describe('Testing "ClassA"', () => {
  // bla bla bla bla bla
});
```

`class-b.test.ts`:
```ts
import 'ts-path-mapping';   // THIS WIILL BE IN ALL TESTING
import { memeParser } from '@tool/meme-parser';

describe('Testing "ClassB"', () => {
  // bla bla bla bla bla
});
```

The solution of that is execute this library before of your project. For that reason is this library now has a `ts-path-mapping/register` functionality. If you still need the previous method _(import for side-effects only)_, that option stills working.