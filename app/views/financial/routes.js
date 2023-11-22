const express = require('express')
const router = express.Router()
const path = require('node:path')


// Add your routes here - above the module.exports line

router.post('/financial-question-one', function (req, res) {

    let financialStandIn = req.session.data.financialStandIn;

    if (financialStandIn == 'No') {
        res.redirect('/financial/financial-question-three');
    } else {
        res.redirect('/financial/financial-question-two');
    }

})

router.post('/financial-question-two', function (req, res) {

    let financialStandInTwo = req.session.data.financialStandInTwo;

    if (financialStandInTwo == 'Two') {
        res.redirect('/financial/two-or-more');
    } else {
        res.redirect('/financial/one-doc');
    }

})

router.post('/financial-question-three', function (req, res) {

    let financialStandInThree = req.session.data.financialStandInThree;

    if (financialStandInThree == 'Yes') {
        res.redirect('/financial/financial-question-two');
    } else {
        res.redirect('three-doc');
    }

})

router.post('/two-or-more', function (req, res) {
    res.redirect('check-answers');
})

router.post('/one-doc', function (req, res) {
    res.redirect('check-answers');
})

router.post('/three-doc', function (req, res) {
    res.redirect('check-answers');
})

router.post('/check-answers', function (req, res) {
    let startQuestion = req.session.data.startQuestion;

    if (startQuestion == 'Company') {
        res.redirect('/suppliers-c/account-home');
    } else {
        res.redirect('/suppliers-d/account-home');
    }
});

module.exports = router


/* 

router.post('/financial-question', function (req, res) {

    let financialStandIn = req.session.data.financialStandIn;

    if (financialStandIn == 'A copy of the most recent two financial years accounts') {
        res.redirect('/financial/two-or-more');

    } else if (financialStandIn == 'A copy of the most recent financial year accounts') {
        res.redirect('/financial/one-doc');

    } else if (financialStandIn == 'A copy of the most recent accounts or other information') {
        res.redirect('/financial/two-or-more');

    } else  {
        res.redirect('check-answers');
    }
    
})

*/
