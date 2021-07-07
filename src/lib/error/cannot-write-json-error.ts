export class CannotWriteJsonError extends Error {
    constructor(path?: string) {
        super();

        if (path) {
            this.message = `Cannot write the json file at "${path}"`;
        } else {
            this.message = `Cannot write the json file`;
        }
    }
}
