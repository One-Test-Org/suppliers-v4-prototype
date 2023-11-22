const express = require('express');
const session = require('express-session');
const router = express.Router();


// allow access to the prototype kit assets
router.use('/public', express.static('public'));

// link data.js to the routes.js file
// const data = require('./data/data.js');

// add routes for the folders in the views folder

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
    if (startQuestion == 'Individual') {
      res.redirect('/suppliers-d/account-home');
    }
})

// Route index page
router.get('/', function (req, res) {
  res.render('index', {})
})



module.exports = router;