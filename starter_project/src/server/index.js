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

// Variables for url and api key

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

apiKey = process.env.API_KEY;
console.log(`Your API key is ${process.env.API_KEY}`);
// POST Route

app.post('/sentiment', async (req, res) => {
  console.log('request received with Link: ' + req.body.Link) ;
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
        .then(({ status, body }) => res.send({"score":body.score_tag}))
        .catch(error => console.log('error', error));
      
      
  }
  catch(err) {
    res.serverError('meaningcloud can not be reached');;
  }
});










// app.post("/api", async function (req, res) {
//     // Extract the URL from the request body
//     const projectData = req.body.url;
//     console.log(`Your Data: ${projectData}`);

//     // Create the API URL with the API Key and the provided URL
//     const apiURL = `${url}key=${apiKey}&url=${projectData}&lang=en`;

//     // Fetch the sentiment analysis data from the API
//     const response = await fetch(apiURL);
//     try {
//         const sData = await response.json();
//         // Send the sentiment analysis data as the response
//         res.send(sData);
//     } catch (error) {
//         console.log("error", error);
//         // Handle any errors that occur during the API request
//         res.status(500).send({ error: "An error occurred while processing the request." });
//     }

// });
// Designates what port the app will listen to for incoming requests
app.listen(9000, function () {
    console.log('Example app listening on port 9000!');
});


