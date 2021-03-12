import { join } from 'path';
import { parse } from 'comment-json';
import { readFileSync } from 'fs';

export class Json<T = any> {
    private _path : string;
    public get path() : string {
        return this._path;
    }    

    constructor(path: string) {
        this._path = join(path)
    }

    read(): T {
        const byte = readFileSync(this._path);
        const text = byte.toString('utf-8');
        const json = parse(text, null, true);
        return json;
    }
}
