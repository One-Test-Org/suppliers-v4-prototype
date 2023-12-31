const express = require('express')
const router = express.Router()
const path = require('node:path')

// API
const axios = require('axios');

// Add your routes here - above the module.exports line


router.post('/exclusion-grounds', function (req, res) {

    let exclusionMan = req.session.data.exclusionMan;
    let startQuestion = req.session.data.startQuestion;

    if (exclusionMan == 'Theft, fraud, bribery etc') {
        res.redirect('theft-fraud-bribery');
    } else if (exclusionMan == 'Labour market, slavery and human trafficking offences') {
        res.redirect('labour-market');
    } else if (exclusionMan == 'Tax offences') {
        res.redirect('tax-offences');
    } else if (exclusionMan == 'Organised crime') {
        res.redirect('organised-crime');
    } else if (exclusionMan == 'Ancillary offences') {
        res.redirect('ancillary-offences');
    } else if (exclusionMan == 'Equivalents outside the United Kingdom') {
        res.redirect('outside-uk');
    } else if (exclusionMan == 'Penalties for transactions connected with VAT fraud and evasion or tax or duty') {
        res.redirect('vat-fraud');
    } else if (exclusionMan == 'Penalties payable for errors in tax documentation and failure to notify and certain VAT and excise wrongdoing') {
        res.redirect('vat-fraud');
    } else if (exclusionMan == 'None of the above' && startQuestion == 'Individual') {
        res.redirect('/suppliers-d/account-home');
    } else if (exclusionMan == 'None of the above' && startQuestion == 'Company') {
        res.redirect('/suppliers-c/account-home');
    } else if (exclusionMan == 'None of the above' && startQuestion == 'Trust') {
        res.redirect('/suppliers-b/account-home');
    } else {
        res.redirect('event-subject');
    }

})

router.post('/theft-fraud-bribery', function (req, res) {
    res.redirect('event-subject');
})

router.post('/tax-offences', function (req, res) {
    res.redirect('event-subject');
})

router.post('/labour-market', function (req, res) {
    res.redirect('event-subject');
})

router.post('/organised-crime', function (req, res) {
    res.redirect('event-subject');
})

router.post('/ancillary-offences', function (req, res) {
    res.redirect('event-subject');
})

router.post('/outside-uk', function (req, res) {
    res.redirect('event-subject');
})

router.post('/vat-fraud', function (req, res) {
    res.redirect('event-subject');
})

router.post('/event-subject', function (req, res) {

    let eventSubMan = req.session.data.eventSubMan;

    if (eventSubMan == 'Not listed') {
        let startQuestion = req.session.data.startQuestion;
        if (startQuestion == 'Company') {
            res.redirect('../suppliers-c/account-home');
        }
        else if (startQuestion == 'Trust') {
            res.redirect('../suppliers-b/account-home');
        }
        else {
            res.redirect('../suppliers-d/account-home');
        }
    } else {
        res.redirect('email-address');
    }
})

router.post('/email-address', function (req, res) {
    res.redirect('event-documents');
})

router.post('/event-documents', function (req, res) {
    res.redirect('event-mitigation');
})

router.post('/event-mitigation', function (req, res) {
    res.redirect('event-date');
})

router.post('/event-date', function (req, res) {
    res.redirect('check-answers');
})

router.post('/address-type', function (req, res) {
    let addressType = req.session.data.addressType;

    if (addressType == 'Yes') {
        res.redirect('find-subject-uk-address');
    }
    else {
        res.redirect('subject-address');
    }
})

// Add another pattern

router.get('/:index/remove-exclusion', function (req, res) {
    res.render(path.resolve(__dirname, 'remove-exclusion'));
})

router.post('/:index/remove-exclusion', function (req, res) {
    let removeExclusionMan = req.session.data.removeExclusionMan;
    const exclusionMans = req.session.data.exclusionManArray || [];

    if (removeExclusionMan == 'Yes' && exclusionMans.length) {
        const deleteIndex = req.params.index - 1;
        const maxIndex = exclusionMans.length || 0;

        if (deleteIndex <= maxIndex) {
            exclusionMans.splice(deleteIndex, 1);

            req.session.data.exclusionManArray = exclusionMans;
            req.session.data.exclusionManCount = exclusionMans.length;
        }
    }

    res.redirect('../add-another-exclusion');
})

router.get('/:index/check-answers', function (req, res) {
    const data = req.session.data;
    const index = parseInt(req.params.index);
    const exclusionMans = data.exclusionManArray || [];

    if (!exclusionMans.length) {
        return res.redirect('../add-another-exclusion');
    }

    const exclusionMan = exclusionMans[req.params.index - 1] || {};

    req.session.data = {
        ...data,
        ...exclusionMan,
        editExclusionMan: index,
    };

    res.redirect('../check-answers');
})

router.post('/check-answers', function (req, res) {
    const data = req.session.data;
    const exclusionMans = data.exclusionManArray || [];

    const exclusionMan = {
        exclusionMan: data.exclusionMan,
        exclusionSecond: data.eventSubMan
    };

    if (data.editExclusionMan) {
        exclusionMans[data.editExclusionMan - 1] = exclusionMan;
    }
    else {
        exclusionMans.push(exclusionMan)
        data.exclusionManArray = exclusionMans;
        data.exclusionManCount = exclusionMans.length;
    }

    delete data.editExclusionMan;

    res.redirect('add-another-exclusion');
})

router.post('/add-another-exclusion-route', function (req, res) {
    var sessionData = req.session.data;
    var exclusionManArray = sessionData.exclusionManArray || [];

    var exclusionMan = {
        "id": exclusionManArray.length + 1,
        "ExclusionMan": sessionData.exclusionMan,
    };

    var exclusionSecond = {
        "id": exclusionManArray.length + 2,
        "ExclusionSecond": sessionData.exclusionSecond,
    };

    exclusionManArray.push(exclusionMan);
    sessionData.exclusionManArray = exclusionManArray;
    sessionData.exclusionManCount = exclusionManArray.length;

    res.redirect('add-another-exclusion');
})

router.post('/add-another-exclusion', function (req, res) {
    delete req.session.data.editExclusionMan;

    if (req.session.data.addAnotherExclusionMan == 'Yes') {
        res.redirect('exclusion-grounds');
    }
    else {

        let startQuestion = req.session.data.startQuestion;
        if (startQuestion == 'Company') {
            res.redirect('../suppliers-c/account-home');
        }
        else if (startQuestion == 'Trust') {
            res.redirect('../suppliers-b/account-home');
        }
        else {
            res.redirect('../suppliers-d/account-home');
        }
        res.redirect('../suppliers-d/account-home');
    }
})

router.post('/add-another-exclusion', function (req, res) {
    delete req.session.data.editExclusionMan;

    if (req.session.data.exclusionManCount == '10') {
        res.redirect('non-individual-core-data');
    }
    else {
        res.redirect('exclusion-grounds');
    }
})

router.post('/select-subject-uk-address', function (req, res) {
    res.redirect('event-documents');
})

router.post('/find-subject-uk-address', function (req, res) {

    var postcodeLookup = req.session.data['postcode']

    const regex = RegExp('^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$');

    if (postcodeLookup) {

        if (regex.test(postcodeLookup) === true) {

            axios.get("https://api.os.uk/search/places/v1/postcode?postcode=" + postcodeLookup + "&key=" + process.env.AXIOS_API_KEY)
                .then(response => {
                    var addresses = response.data.results.map(result => result.DPA.ADDRESS);

                    const titleCaseAddresses = addresses.map(address => {
                        const parts = address.split(', ');
                        const formattedParts = parts.map((part, index) => {
                            if (index === parts.length - 1) {
                                // Preserve postcode (DL14 0DX) in uppercase
                                return part.toUpperCase();
                            }
                            return part
                                .split(' ')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                .join(' ');
                        })
                        return formattedParts.join(', ');
                    })

                    req.session.data['addresses'] = titleCaseAddresses;

                    res.redirect('select-subject-uk-address')
                })
                .catch(error => {
                    console.log(error);
                    res.redirect('/mandatory/subject-uk-address')
                })

        }

    } else {
        res.redirect('/find-subject-uk-address')
    }

})

module.exports = router


