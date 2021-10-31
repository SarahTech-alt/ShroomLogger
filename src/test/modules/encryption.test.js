const { encryptPassword, comparePassword } = require('../../../server/modules/encryption.js');

const password = 'supersecret';
const notPassword = 'notpassword';

describe('encrypt and compare passwords', () => {
    // without a valid cookie, should respond with a 403
    test('it encrypts and decrypts passwords', async (done) => {
        const encrypted = await encryptPassword(password);
        const comparePass = await comparePassword(password, encrypted);
        expect(comparePass).toBe(true);
        const compareFail = await comparePassword(notPassword, encrypted);
        expect(compareFail).toBe(false);
       
    });
});