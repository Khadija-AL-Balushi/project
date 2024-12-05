import { checkForName } from '../src/client/js/nameChecker'


describe('check if function return the right answer if we submit a name from the list' , () => {
    test('It should return that the name is valid', async () => {
        expect(checkForName("Picard")).toBe("Welcome, Captain!");
    });
});


describe('check if function return the right answer if we submit a name not from the list' , () => {
    test('It should return that name is not valid', async () => {
        expect(checkForName("Picard111")).toBe("Enter a valid captain name");
    });
});
