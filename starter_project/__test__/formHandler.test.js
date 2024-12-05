import { handleSubmit } from '../src/client/js/formHandler'

describe('check if function executes called with a non-url input  and changes value of result innerhtml' , () => {
    test('It should return "Welcome, Captain!"', async () => {
        document.body.innerHTML = `
         <section>
                <form id="urlForm">
                    <input id="name" type="text" name="url" placeholder="Enter URL" required>
                    <button id="submitButton" type="submit">Submit</button>
                </form>
                
            </section>

            <section>
                <strong>Form Results:</strong>
                <div id="results"></div>
            </section>
        `;

        require('../src/client/js/formHandler');
        const form = document.getElementById('urlForm');
        form.addEventListener('submit', handleSubmit);
        const newInput = document.getElementById('name');
        const submitBtn = document.getElementById('submitButton');
        const result = document.getElementById('results');


        newInput.value = 'Picard';
        submitBtn.click();
        expect(result.innerHTML).toBe("URL INVALID");
    });
});

