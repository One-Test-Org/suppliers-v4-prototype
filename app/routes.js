const express = require('express');
const session = require('express-session');
const router = express.Router();
const axios = require('axios');
const bodyParser = require('body-parser');
const fs = require('fs');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.post('/select-company', async (req, res) => {
  const apiKey = '4df276be-67a3-4c06-a326-8ca994dc8018';  // Replace with your actual REST API key
  const companyNumber = req.body.companyNumber;

  try {
    const companyResponse = await axios.get(`https://api.company-information.service.gov.uk/company/${companyNumber}`, {
      headers: {
        Authorization: apiKey,
      },
    });

    let officersResponse;
    try {
      officersResponse = await axios.get(`https://api.company-information.service.gov.uk/company/${companyNumber}/officers`, {
        headers: {
          Authorization: apiKey,
        },
      });
    } catch (error) {
      console.error('Error fetching officers data:', error.message);
      officersResponse = { data: null };
    }

    const responseData = {
      company: companyResponse.data,
      officers: officersResponse.data,
    };

    // Write the response data to a JSON file
    fs.writeFile('response.json', JSON.stringify(responseData, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('Successfully wrote response data to response.json');
      }
    });

    // Modify the structure of the data being passed to the template
    const templateData = {
      company: {
        ...responseData.company,
        officers: responseData.officers,
      },
    };

    res.render('select-company', { data: templateData });
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Error Response Data:', error.response.data);
      console.error('Error Response Status:', error.response.status);
      console.error('Error Response Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error Request:', error.request);
    } else {
      console.error('Error', error.message);
    }
    res.status(500).send('Error fetching or processing data from Companies House API');
  }
});

router.post('/select-company', function (req, res) {
  res.redirect('start-page');
});

// allow access to the prototype kit assets
router.use('/public', express.static('public'));

// link data.js to the routes.js file
// const data = require('./data/data.js');

// add routes for the folders in the views folder

router.use('/suppliers-b', require('./views/suppliers-b/routes'))
router.use('/suppliers-c', require('./views/suppliers-c/routes'))
router.use('/suppliers-d', require('./views/suppliers-d/routes'))
router.use('/mandatory', require('./views/mandatory/routes'))
router.use('/discretionary', require('./views/discretionary/routes'))
router.use('/connected', require('./views/connected/routes'))
router.use('/financial', require('./views/financial/routes'))
router.use('/economical', require('./views/economical/routes'))
router.use('/download', require('./views/download/routes'))

// add your routes here

router.post('/sign-in', function (req, res) {
  res.redirect('signin-success');
});

router.post('/signin-success', function (req, res) {
  res.redirect('suppliers-c/account-home');
});

router.post('/start-page', function (req, res) {
  res.redirect('start-question');
});

router.post('/start-question', function (req, res) {

  let startQuestion = req.session.data.startQuestion;

  if (startQuestion == 'Company') {
    res.redirect('/suppliers-c/account-home');
  } else
    if (startQuestion == 'Trust') {
      res.redirect('/suppliers-b/account-home');
    } else
      if (startQuestion == 'Individual') {
        res.redirect('/suppliers-d/account-home');
      }
})

// Route index page
router.get('/', function (req, res) {
  res.render('index', {})
})


/* Companies House API

import { createApiClient } from "@companieshouse/api-sdk-node";

(async () => {
  const api = createApiClient("5qSi6ltSkx3Z5tCubLLOpTHB8huQsG9PzhB9s44a1ws");
  const profile = await api.companyProfile.getCompanyProfile("00006400");

  console.log(profile);
})()
*/
module.exports = router;