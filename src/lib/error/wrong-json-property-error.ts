import { TypeValue } from '../interface';

export class WrongJsonPropertyError extends Error {
    constructor(type: TypeValue | string, ...keys: string[]) {
        super();
        const str = keys.reduce((prev, curr, i) => {
            return (i === 0) ? curr : `${prev}.${curr}`;
        });

        this.message = `The *.json file has a wrong value type at "${str}". `
            +   `The value type required is "${type}"`;
    }
}
