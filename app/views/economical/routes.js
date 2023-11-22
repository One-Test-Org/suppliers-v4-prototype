const express = require('express')
const router = express.Router()
const path = require('node:path')


// Add your routes here - above the module.exports line

router.post('/financial-question', function (req, res) {

    let financialStandIn = req.session.data.financialStandIn;

    if (financialStandIn == 'A copy of the most recent two financial years accounts') {
        res.redirect('/economical/two-or-more-type');

    } else if (financialStandIn == 'A copy of the most recent financial year accounts') {
        res.redirect('/economical/one-doc-type');

    } else if (financialStandIn == 'A copy of the most recent accounts or other information') {
        res.redirect('/economical/two-or-more-type');

    } else {
        res.redirect('check-answers');
    }

})

router.post('/two-or-more-type', function (req, res) {
    res.redirect('two-or-more-date');
})

router.post('/one-doc-type', function (req, res) {
    res.redirect('one-doc-date');
})

router.post('/two-or-more-date', function (req, res) {
    res.redirect('two-or-more');
})

router.post('/one-doc-date', function (req, res) {
    res.redirect('one-doc');
})

router.post('/two-or-more', function (req, res) {
    res.redirect('check-answers');
})

router.post('/one-doc', function (req, res) {
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
