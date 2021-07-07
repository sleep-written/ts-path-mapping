import { assert } from 'chai';

import { TsConfigJson } from './ts-config-json';
import * as Errors from './error';
import { Json } from './json';

type ErrorConstructor = new(...args: any[]) => Error;
function testError(file: Json, errClass: ErrorConstructor): void {
    try {
        file.read();
        return;
    } catch (err) {
        assert.isTrue(err instanceof errClass);
    }
}

describe('Test "./src/lib/ts-config-json"', () => {
    after(() => {
        const file = new TsConfigJson('./tsconfig.test.json');
        if (file.exist) {
            file.delete();
        }
    });

    it('Create new invalid "./tsconfig.test.json"', () => {
        const file = new TsConfigJson('./tsconfig.test.json');
        assert.isFalse(file.exist);

        file.write({ });
        testError(file, Errors.WrongJsonPropertyError);

        file.write({ compilerOptions: null });
        testError(file, Errors.WrongJsonPropertyError);

        file.write({
            compilerOptions: {
                baseUrl: './dist',
            }
        });
        testError(file, Errors.WrongJsonPropertyError);

        file.write({
            compilerOptions: {
                outDir: './dist',
                rootDir: './src',
                baseUrl: './src',
            }
        });
        testError(file, Errors.WrongJsonPropertyError);

        file.write({
            compilerOptions: {
                outDir: './dist',
                rootDir: './src',
                baseUrl: './src',
                paths: null
            }
        });
        testError(file, Errors.WrongJsonPropertyError);

        file.write({
            compilerOptions: {
                outDir: './dist',
                rootDir: './src',
                baseUrl: './src',
                paths: {
                    '@joder': [],
                }
            }
        });
        testError(file, Errors.WrongAliasKeyError);

        file.write({
            compilerOptions: {
                outDir: './dist',
                rootDir: './src',
                baseUrl: './src',
                paths: {
                    '@joder/*': [ 'ñeeee' ],
                }
            }
        });
        testError(file, Errors.WrongAliasValueError);
    });

    it('Write a valid "./tsconfig.test.json"', () => {
        const file = new TsConfigJson('./tsconfig.test.json');
        file.write({
            compilerOptions: {
                outDir: './dist',
                rootDir: './src',
                baseUrl: './src',
                paths: {
                    '@joder/*': [ 'chaval/*' ],
                }
            }
        });
        file.read();
    });
});
