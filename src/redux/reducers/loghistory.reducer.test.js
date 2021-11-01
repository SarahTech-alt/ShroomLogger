import logHistory from './loghistory.reducer.js';
import logDetail from './loghistory.reducer.js';
import logToAdd from './loghistory.reducer.js';
import locationInfo from './loghistory.reducer.js';

describe('User reducer tests', () => {
    test('The default value is an empty object.', (done) => {
        let action = {};
        let output = logHistory(undefined, action);
        expect(output).toBeDefined();
        expect(typeof output).toBe('object')
        done();
    });
    test('The default value is an empty object.', (done) => {
        let action = {};
        let output = logDetail(undefined, action);
        expect(output).toBeDefined();
        expect(typeof output).toBe('object')
        done();
    });
    test('The default value is an empty object.', (done) => {
        let action = {};
        let output = logToAdd(undefined, action);
        expect(output).toBeDefined();
        expect(typeof output).toBe('object')
        done();
    });
    test('The default value is an empty object.', (done) => {
        let action = {};
        let output = locationInfo(undefined, action);
        expect(output).toBeDefined();
        expect(typeof output).toBe('object')
        done();
    });
});