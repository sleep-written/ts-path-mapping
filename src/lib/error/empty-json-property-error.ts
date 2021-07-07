export class EmptyJsonPropertyError extends Error {
    constructor(...keys: string[]) {
        super();
        const str = keys.reduce((prev, curr, i) => {
            return (i === 0) ? curr : `${prev}.${curr}`;
        });

        this.message = `The object property "${str}" inside the *.json file cannot be empty.`;
    }
}
