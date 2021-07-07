export class WrongAliasValueError extends Error {
    constructor() {
        super('The alias value member must be ended with "\\*" pattern');
    }
}
