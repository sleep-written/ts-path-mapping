import { assert } from 'chai';

import { TsConfigJson } from './tsConfigJson';
import { Json } from './json';
import * as Errors from './error';

type ErrorConstructor = new(...args: any[]) => Error;
function testError(file: Json, errClass: ErrorConstructor): void {
    try {
        file.read();
        return;
    } catch (err) {
        assert.isTrue(err instanceof errClass);
    }
}

describe('Test "./src/lib/tsConfig"', () => {
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
        testError(file, Errors.WrongJsonProperty);

        file.write({ compilerOptions: null });
        testError(file, Errors.WrongJsonProperty);

        file.write({
            compilerOptions: {
                baseUrl: './dist',
            }
        });
        testError(file, Errors.WrongJsonProperty);

        file.write({
            compilerOptions: {
                outDir: './dist',
                rootDir: './src',
                baseUrl: './src',
            }
        });
        testError(file, Errors.WrongJsonProperty);

        file.write({
            compilerOptions: {
                outDir: './dist',
                rootDir: './src',
                baseUrl: './src',
                paths: null
            }
        });
        testError(file, Errors.WrongJsonProperty);

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
        testError(file, Errors.WrongAliasKey);

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
        testError(file, Errors.WrongAliasValue);
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
