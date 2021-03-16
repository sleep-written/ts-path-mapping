# ts-path-mapping

A npm package to automate __path mapping__ in typescript modules, using only the `tsconfig.json` file. This package implements [module-alias](https://www.npmjs.com/package/module-alias) and [comment-json](https://www.npmjs.com/package/comment-json) for the `tsconfig.json` parsing.


## Disclaimer

This package is designed only for developing projects for the end user (such as websites, applications, etc). Using this package for resolve paths inside npom packages may cause serious problems. See [this section](https://github.com/ilearnio/module-alias/blob/dev/README.md#using-within-another-npm-package) for more details.

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

Finally, in your `index.ts` (or whatever is your boot file) at the first line:

```ts
import 'ts-path-mapping';   // THIS IS REQUIRED

// Import your resources...
import { jajaja } from '@key-01/jajaja';
import { gegege } from '@key-02/gegege';
import { jojojo } from '@key-03/jojojo';

// ...all use it as your needs
jajaja();
gegege();
jojojo();
```