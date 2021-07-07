/**
 * Checks if the current execution has been launched by ts-node.
 * @returns A boolean that indicates if ts-node is running
 */
export function checkTsNode(): boolean {
    const symbols = Object.getOwnPropertySymbols(process);
    return symbols.some(x => x.description === 'ts-node.register.instance');
}
