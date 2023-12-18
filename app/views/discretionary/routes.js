const express = require('express')
const router = express.Router()
const path = require('node:path')

// API
const axios = require('axios');
const e = require('express');

// Add your routes here - above the module.exports line

router.post('/exclusion-grounds', function (req, res) {

    let exclusionDis = req.session.data.exclusionDis;
    let startQuestion = req.session.data.startQuestion;

    if (exclusionDis == 'Labour market misconduct') {
        res.redirect('labour-market');

    } else if (exclusionDis == 'Insolvency, bankruptcy, etc') {
        res.redirect('bankruptcy');

    } else if (exclusionDis == 'Infringement of Competition Act 1998, Chapter II prohibition or equivalent  outside United Kingdom') {
        res.redirect('infringement');

    } else if (exclusionDis == 'None of the above' && startQuestion == 'Company') {
        res.redirect('/suppliers-c/account-home');

    } else if (exclusionDis == 'None of the above' && startQuestion == 'Individual') {
        res.redirect('/suppliers-d/account-home');

    } if (exclusionDis == 'None of the above' && startQuestion == 'Trust') {
        res.redirect('/suppliers-b/account-home');
    } else {
        res.redirect('event-subject');
    }

})

router.post('/event-subject', function (req, res) {

    let eventSubDis = req.session.data.eventSubDis;

    if (eventSubDis == 'Not listed') {
        let startQuestion = req.session.data.startQuestion;
        if (startQuestion == 'Company') {
            res.redirect('../suppliers-c/account-home');
        }
        else {
            res.redirect('../suppliers-d/account-home');
        }
    } else {
        res.redirect('email-address');
    }
})

router.post('/bankruptcy', function (req, res) {
    res.redirect('event-subject');
})

router.post('/labour-market', function (req, res) {
    res.redirect('event-subject');
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
    let addressTypeDis = req.session.data.addressTypeDis;

    if (addressTypeDis == 'Yes') {
        res.redirect('find-subject-uk-address');
    }
    else {
        res.redirect('subject-address');
    }
})

// Add another pattern

router.get('/:index/remove-exclusion', function (req, res) {
    res.render(path.resolve(__dirname, 'remove-exclusion'));
});

router.post('/:index/remove-exclusion', function (req, res) {
    let removeExclusion = req.session.data.removeExclusion;
    const exclusions = req.session.data.exclusionArray || [];

    if (removeExclusion == 'Yes' && exclusions.length) {
        const deleteIndex = req.params.index - 1;
        const maxIndex = exclusions.length || 0;

        if (deleteIndex <= maxIndex) {
            exclusions.splice(deleteIndex, 1);

            req.session.data.exclusionArray = exclusions;
            req.session.data.exclusionCount = exclusions.length;
        }
    }

    res.redirect('../add-another-exclusion');
});

router.get('/:index/check-answers', function (req, res) {
    const data = req.session.data;
    const index = parseInt(req.params.index);
    const exclusions = data.exclusionArray || [];

    if (!exclusions.length) {
        return res.redirect('../add-another-exclusion');
    }

    const exclusion = exclusions[req.params.index - 1] || {};

    req.session.data = {
        ...data,
        ...exclusion,
        editExclusion: index,
    };

    res.redirect('../check-answers');
});

router.post('/check-answers', function (req, res) {
    const data = req.session.data;
    const exclusions = data.exclusionArray || [];

    const exclusion = {
        exclusion: data.exclusionDis,
        exclusionSecond: data.eventSubDis
    };

    if (data.editExclusion) {
        exclusions[data.editExclusion - 1] = exclusion;
    }
    else {
        exclusions.push(exclusion)
        data.exclusionArray = exclusions;
        data.exclusionCount = exclusions.length;
    }

    delete data.editExclusion;

    res.redirect('add-another-exclusion');
});

router.post('/add-another-exclusion-route', function (req, res) {
    var sessionData = req.session.data;
    var exclusionArray = sessionData.exclusionArray || [];

    var exclusion = {
        "id": exclusionArray.length + 1,
        "Exclusion": sessionData.exclusion,
    };

    var exclusionSecond = {
        "id": exclusionArray.length + 2, // Use a different id for the second exclusion
        "ExclusionSecond": sessionData.exclusionSecond,
    };

    exclusionArray.push(exclusion);
    exclusionArray.push(exclusionSecond);
    sessionData.exclusionArray = exclusionArray;
    sessionData.exclusionCount = exclusionArray.length;

    res.redirect('add-another-exclusion');
});


router.post('/add-another-exclusion', function (req, res) {
    delete req.session.data.editExclusion;

    if (req.session.data.addAnotherExclusion == 'Yes') {
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
});

router.post('/add-another-exclusion', function (req, res) {
    delete req.session.data.editExclusion;

    if (req.session.data.ExclusionCount == '10') {
        res.redirect('non-individual-core-data');
    }
    else {
        res.redirect('exclusion-grounds');
    }
});

router.post('/select-subject-uk-address', function (req, res) {
    res.redirect('event-documents');
});

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
                        });
                        return formattedParts.join(', ');
                    });

                    req.session.data['addresses'] = titleCaseAddresses;

                    res.redirect('select-subject-uk-address')
                })
                .catch(error => {
                    console.log(error);
                    res.redirect('/discretionary/subject-uk-address')
                });

        }

    } else {
        res.redirect('/find-subject-uk-address')
    }

})

module.exports = router




