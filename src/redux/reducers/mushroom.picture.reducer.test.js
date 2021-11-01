import mushroomPictureReducer from './mushroom.picture.reducer.js';
import selectedMushroomPicture from './mushroom.picture.reducer.js';

describe('User reducer tests', () => {
    test('The default value is an empty object.', (done) => {
        let action = {};
        let output = mushroomPictureReducer(undefined, action);
        expect(output).toBeDefined();
        expect(typeof output).toBe('object')
        done();
    });
    test('The default value is an empty object.', (done) => {
        let action = {};
        let output = selectedMushroomPicture(undefined, action);
        expect(output).toBeDefined();
        expect(typeof output).toBe('object')
        done();
    });
});
