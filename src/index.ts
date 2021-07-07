import { execute } from './lib';

// Exports system symbols
export const REGISTERED = Symbol.for('ts-path-mapping.registered');
export const REQUIRED = Symbol.for('ts-path-mapping.required');

// Read registered property
const registered = Object
    .getOwnPropertySymbols(process)
    .some(x => x.description === REGISTERED.description);

// Init process
if (!registered) {
    execute();
}