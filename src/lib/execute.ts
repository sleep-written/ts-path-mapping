import { resolve, join } from 'path';
import { addAlias } from 'module-alias';

import { REGISTERED } from '..';
import { TsConfigJson, checkTsNode } from '.';

export function execute() {
    (process as any)[REGISTERED] = true;
    const tsNode = checkTsNode();
    
    const file = new TsConfigJson(resolve('.', 'tsconfig.json'));
    const json = file.read();
    const rootDir = resolve(json.compilerOptions.rootDir);
    const distDir = resolve(json.compilerOptions.outDir);
    const baseUrl = resolve(json.compilerOptions.baseUrl);
    
    const paths = json.compilerOptions.paths;
    for (let name of Object.keys(paths)) {
        let path = paths[name][0];
        name = name.replace(/(\\|\/)+\*$/gi, '');
        path = path.replace(/(\\|\/)+\*$/gi, '');
        path = join(baseUrl, path);
    
        if (!tsNode) {
            path = path.replace(rootDir, distDir);
        }
    
        addAlias(name, path);
    }
}
