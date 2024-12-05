// Replace checkForName with a function that checks the URL
import { checkForName } from './nameChecker'

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'https://localhost:9000/api';

const form = document.getElementById('urlForm');
form?.addEventListener('submit', handleSubmit);


function ValidateUrl(inputText) {
    console.log("::: Validating :::", inputText);
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    try { 

          return !!pattern.test(inputText);
    }
    catch(e){ 
        return false; 
    }
}


async function handleSubmit(event) {

    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;
    // This is an example code that checks the submitted name. You may remove it from your code
    

    
    //document.getElementById('results').innerHTML = checkForName(formText);


    // Check if the URL is valid
    try {
      if (ValidateUrl(formText)) {
        
        //  block of code to be executed if the condition is true
        const response = await fetch("http://localhost:9000/sentiment", {
            method: "POST",
            body: JSON.stringify({
              Link: formText

            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(async response => ({
            status: response.status, 
            body: await response.json()
          }))
          .then(({ status, body }) => document.getElementById('results').innerHTML = body.score)
          .catch(error => console.log('error', error));
          
        // console.log(response)  
          // (async response => ({
          //   status: response.status, 
          //   body: await response.json()
          // })).then(({ status, body }) => console.log(body.score_tag));
          // then(response => response.json())
          // .then(response => document.getElementById('results').innerHTML = response);
          
        

        } else {
        //  block of code to be executed if the condition is false
        document.getElementById('results').innerHTML = "URL INVALID";
        }
      }  
        // If the URL is valid, send it to the server using the serverURL constant above
    catch(err) {
      document.getElementById('results').innerHTML  = err.message;
        }
      
}

// Function to send data to the server

// Export the handleSubmit function
export { handleSubmit };

