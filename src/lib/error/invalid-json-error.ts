export class InvalidJsonError extends Error {
    constructor(filename?: string) {
        super();

        if (filename) {
            this.message = `The file "${filename}" isn't a valid *.json file`;
        }
    }
}