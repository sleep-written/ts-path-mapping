import { EmptyJsonProperty, WrongAliasKey, WrongAliasValue, WrongJsonProperty } from './error';
import { TsConfig } from './interface';
import { Json } from './json';

export class TsConfigJson extends Json<TsConfig> {
    read(): TsConfig {
        const data = super.read();
        if (!data.compilerOptions) {
            throw new WrongJsonProperty('object', 'compilerOptions');
        }
        
        if (!data.compilerOptions.baseUrl) {
            throw new WrongJsonProperty('string', 'compilerOptions', 'baseUrl');
        }
        
        if (!data.compilerOptions.outDir) {
            throw new WrongJsonProperty('string', 'compilerOptions', 'outDir');
        }
        
        if (!data.compilerOptions.rootDir) {
            throw new WrongJsonProperty('string', 'compilerOptions', 'rootDir');
        }
        
        if (!data.compilerOptions.paths) {
            throw new WrongJsonProperty('{ [key: string]: string[] }', 'compilerOptions', 'paths');
        }

        const paths = data.compilerOptions.paths;
        const keys = Object.keys(data.compilerOptions.paths);
        if (keys.length === 0) {
            throw new EmptyJsonProperty('compilerOptions', 'paths');
        }

        const reg = /(\\|\/)\*$/gi;
        for (const key of keys) {
            if (!key.match(reg)) {
                throw new WrongAliasKey();
            }

            const value = paths[key];
            if (!(value instanceof Array)) {
                throw new WrongJsonProperty('string[]', 'compilerOptions', 'paths', `[${key}]`);
            } else if (value.length === 0) {
                throw new EmptyJsonProperty('compilerOptions', 'paths', `[${key}]`);
            }

            for (const path of value) {
                if (!path.match(reg)) {
                    throw new WrongAliasValue();
                }
            }
        }

        return data;
    }
}
