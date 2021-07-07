export class WrongAliasKeyError extends Error {
    constructor() {
        super('The alias key must be ended with "\\*" pattern');
    }
}
