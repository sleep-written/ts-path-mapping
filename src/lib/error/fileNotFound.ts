export class FileNotFound extends Error {
    constructor(filename?: string) {
        super();

        if (filename) {
            this.message = `The file "${filename}" doesn't exists.`;
        } else {
            this.message = `The file doesn't exists.`;
        }
    }
}
