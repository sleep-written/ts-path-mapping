import { join } from 'path';
import { parse } from 'comment-json';

import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'fs';
import { CannotDeleteJsonError, CannotWriteJsonError, FileNotFoundError } from './error';

export class Json<T = any> {
    private _path : string;
    public get path() : string {
        return this._path;
    }

    public get filename(): string {
        const found = this._path.match(/[^\\\/]+$/);
        if (found) {
            return found[0];
        } else {
            throw new Error();
        }
    }
    
    public get exist() : boolean {
        return existsSync(this._path);
    }

    constructor(path: string) {
        this._path = join(path)
    }

    /**
     * Reads the *.json file content, and parses it into a Object.
     * @returns the data inside of the *.json file.
     */
    read(): T {
        try {
            const byte = readFileSync(this._path);
            const text = byte.toString('utf-8');
            const json = parse(text, null, true);

            return json;
        } catch (err) {
            switch (err.code as string) {
                case 'ENOENT':
                    throw new FileNotFoundError(this.filename);
                default:
                    throw err;
            }
        }
    }

    /**
     * Create or replace the *.json file with the data given.
     * @param data the data to write into the file.
     * @param stylize _`optional`_ if this parameter is `true`, the output json
     * will be formatted will 2 spaces of indentation.
     */
    write(data: T, stylize?: boolean): void {
        try {
            const text = JSON.stringify(data, null, (stylize) ? '  ' : null);
            const byte = Buffer.from(text, 'utf-8');
            writeFileSync(this._path, byte);
        } catch (err) {
            throw new CannotWriteJsonError(this._path);
        }
    }

    /**
     * Deletes the current *.json file.
     */
    delete(): void {
        try {
            unlinkSync(this._path);
        } catch (err) {
            throw new CannotDeleteJsonError(this._path);
        }
    }
}
