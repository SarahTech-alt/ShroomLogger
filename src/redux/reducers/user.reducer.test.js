import userReducer from './user.reducer.js';

describe('User reducer tests', () => {
    test('The default value is an empty object.', (done) => {
        let action = {};
        let output = userReducer(undefined, action);
        expect(output).toBeDefined();
        expect(typeof output).toBe('object')
        done();
    });
});