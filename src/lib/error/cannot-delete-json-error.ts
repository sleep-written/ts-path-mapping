export class CannotDeleteJsonError extends Error {
    constructor(path?: string) {
        super();

        if (path) {
            this.message = `Cannot delete the json file at "${path}"`;
        } else {
            this.message = `Cannot delete the json file`;
        }
    }
}
