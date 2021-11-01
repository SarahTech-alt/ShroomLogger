import profilePictureReducer from './profile.reducer.js';
import profileInfoReducer from './profile.reducer.js';

describe('User reducer tests', () => {
    test('The default value is an empty object.', (done) => {
        let action = {};
        let output = profileInfoReducer(undefined, action);
        expect(output).toBeDefined();
        expect(typeof output).toBe('object')
        done();
    });
    test('The default value is an empty object.', (done) => {
        let action = {};
        let output = profilePictureReducer(undefined, action);
        expect(output).toBeDefined();
        expect(typeof output).toBe('object')
        done();
    });
});

