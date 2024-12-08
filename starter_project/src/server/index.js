var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'))
console.log(__dirname);



app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});
// Variables for url and api key
apiKey = process.env.API_KEY;
console.log(`Your API key is ${process.env.API_KEY}`);

// POST Route

// entry point sentiment receives requests from the client, extracts the url 
// and makes a request to meaningcloud api 
app.post('/sentiment', async (req, res) => {
  console.log('request received with Link: ' + req.body.Link) ;

  // building the body of the request using api key, url and language 
  const formdata = new FormData();
  formdata.append("key", apiKey);
  formdata.append("url", req.body.Link);
  formdata.append("lang", "en"); 
  
  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  try {

      const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
        .then(async response => ({
          status: response.status, 
          body: await response.json()
        }))
        .then(({ status, body }) => res.send({"score":body.score_tag}))  // if the response comes back with a score_tag, the latter is send back to the client
        .catch(error => console.log('error', error)); // else log the error
      
      
  }
  catch(err) {
    res.serverError('meaningcloud can not be reached'); // in case the req to meaningcloud was not successful or any other problem, return this message to the client.
  }
});


// Designates what port the app will listen to for incoming requests
app.listen(9000, function () {
    console.log('Example app listening on port 9000!');
});


