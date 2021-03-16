import { assert } from 'chai';
import { Json } from './json';

interface Data {
    text: string;
    value: number;
}

describe('Test "./src/lib/json.ts"', () => {
    it('Make "./test.json"', () => {
        const json = new Json<Data>('./test.json');
        assert.isFalse(json.exist);

        json.write({
            text: 'ajajaja',
            value: 123456,
        }, true);

        assert.isTrue(json.exist);
    });

    it('read the content of the file', () => {
        const json = new Json<Data>('./test.json');
        assert.isTrue(json.exist);

        const data = json.read();
        assert.hasAllKeys(data, [ 'text', 'value' ]);
        assert.strictEqual(data?.text, 'ajajaja');
        assert.strictEqual(data?.value, 123456);
    });

    it('Delete the file', () => {
        const json = new Json<Data>('./test.json');
        assert.isTrue(json.exist);

        json.delete();
        assert.isFalse(json.exist);
    });
});