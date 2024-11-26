import { checkForName } from '../src/client/js/nameChecker'


// describe('Test, the function "checkForName()" should exist' , () => {
//     test('It should return true', async () => {
//         expect(checkForName(1254)).toBeDefined();
//     });
// });

describe('Test, the function "checkForName()" should be a function' , () => {
    test('It should be a function', async () => {
        expect(typeof checkForName).toBe("function");
    });
});

// describe('Test, the function "checkForName()" with correct input' , () => {
//     test(' it should result in :Welcome, Captain!', async () => {
//         expect(checkForName('Archer')).toBe("Welcome, Captain!");
//     });
// });

// describe('Test, the function "checkForName()" with wrong input' , () => {
//     test('it should result in: Enter a valid captain name', async () => {
//         expect(checkForName('Archer')).toBe("Enter a valid captain name");
//     });
// });
