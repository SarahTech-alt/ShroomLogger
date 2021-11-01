import loginMessage from './errors.reducer.js';
import registrationMessage from './errors.reducer.js';



describe('User reducer tests', () => {
    test('The default value is an empty object.', (done) => {
        let action = {};
        let output = loginMessage(undefined, action);
        expect(output).toBeDefined();
        expect(typeof output).toBe('object')
        done();
    });
    test('The default value is an empty object.', (done) => {
        let action = {};
        let output = registrationMessage(undefined, action);
        expect(output).toBeDefined();
        expect(typeof output).toBe('object')
        done();
    });
});
