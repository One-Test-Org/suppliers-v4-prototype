const express = require('express')
const router = express.Router()
const path = require('node:path')

// API
const axios = require('axios');

// Add your routes here - above the module.exports line


router.post('/exclusion-grounds', function (req, res) {

    let exclusionMan1 = req.session.data.exclusionMan1;
    let exclusionMan2 = req.session.data.exclusionMan2;
    let exclusionMan3 = req.session.data.exclusionMan3;
    let exclusionMan4 = req.session.data.exclusionMan4;
    let exclusionMan5 = req.session.data.exclusionMan5;
    let exclusionMan6 = req.session.data.exclusionMan6;
    let exclusionMan7 = req.session.data.exclusionMan7;
    let exclusionMan8 = req.session.data.exclusionMan8;
    let exclusionMan9 = req.session.data.exclusionMan9;
    let exclusionMan10 = req.session.data.exclusionMan10;
    let exclusionMan11 = req.session.data.exclusionMan11;
    let exclusionMan12 = req.session.data.exclusionMan12;
    let exclusionMan13 = req.session.data.exclusionMan13;
    let startQuestion = req.session.data.startQuestion;

    if (exclusionMan1 == '' && exclusionMan2 == '' && exclusionMan3 == '' && exclusionMan4 == '' && exclusionMan5 == '' && exclusionMan6 == '' && exclusionMan7 == '' && exclusionMan8 == '' && exclusionMan9 == '' && exclusionMan10 == '' && exclusionMan11 == '' && exclusionMan12 == '' && exclusionMan13 == '' && startQuestion == 'Company') {
        res.redirect('/suppliers-c/account-home');

    } else if (exclusionMan1 == '' && exclusionMan2 == '' && exclusionMan3 == '' && exclusionMan4 == '' && exclusionMan5 == '' && exclusionMan6 == '' && exclusionMan7 == '' && exclusionMan8 == '' && exclusionMan9 == '' && exclusionMan10 == '' && exclusionMan11 == '' && exclusionMan12 == '' && exclusionMan13 == '' && startQuestion == 'Individual') {
        res.redirect('/suppliers-d/account-home');
    } else {
        res.redirect('event-subject');
    }

})

router.post('/event-subject', function (req, res) {
    res.redirect('subject-name');
})

router.post('/subject-name', function (req, res) {
    res.redirect('email-address');
})

router.post('/email-address', function (req, res) {
    res.redirect('address-type');
})

router.post('/address-type', function (req, res) {

    let addressType = req.session.data.addressType;

    if (addressType == "Yes") {
        res.redirect('find-subject-uk-address');
    } else {
        res.redirect('subject-address');
    }
})

router.get('/subject-address', function (req, res) {
    res.render(path.resolve(__dirname, 'subject-address'), {
        countries: require('../../data/data').countries
    })
})


router.post('/select-subject-uk-address', function (req, res) {
    res.redirect('event-documents');
})

router.post('/subject-address', function (req, res) {
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

/*
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
        exclusion: data.eventSub,
        convictionDay: data.convictionDay,
        convictionMonth: data.convictionMonth,
        convictionYear: data.convictionYear
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
         "exclusion": sessionData.exclusion, 
     }
     exclusionArray.push(exclusion);
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
        else {
            res.redirect('../suppliers-d/account-home');
        }
    }
  });
  
  router.post('/add-another-exclusion', function (req, res) {
    delete req.session.data.editExclusion;
  
    if (req.session.data.exclusionCount == '10') {
        res.redirect('non-individual-core-data');
    }
    else {
        res.redirect('exclusion-grounds');
    }
  });
  
*/

// Add another pattern

router.get('/:index/remove-exclusion', function (req, res) {
    res.render(path.resolve(__dirname, 'remove-exclusion'));
});

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
});

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
});

router.post('/check-answers', function (req, res) {
    const data = req.session.data;
    const exclusionMans = data.exclusionManArray || [];

    const exclusionMan = {
        exclusionMan: data.eventSub,
        convictionDay: data.convictionDay,
        convictionMonth: data.convictionMonth,
        convictionYear: data.convictionYear
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
});

router.post('/add-another-exclusion-route', function (req, res) {
    var sessionData = req.session.data;
    var exclusionManArray = sessionData.exclusionManArray || [];
    var exclusionMan = {
        "id": exclusionManArray.length + 1,
        "exclusionMan": sessionData.exclusionMan,
    }
    exclusionManArray.push(exclusionMan);
    sessionData.exclusionManArray = exclusionManArray;
    sessionData.exclusionManCount = exclusionManArray.length;
    res.redirect('add-another-exclusion');
});

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
        res.redirect('../suppliers-d/account-home');
    }
});

router.post('/add-another-exclusion', function (req, res) {
    delete req.session.data.editExclusionMan;

    if (req.session.data.exclusionManCount == '10') {
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

            axios.get("https://api.os.uk/search/places/v1/postcode?postcode=" + postcodeLookup + "&key=" + "CS48P3ceaHollIQFsIMoP4oXLjvlbqp2")
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
                    res.redirect('/mandatory/subject-uk-address')
                });

        }

    } else {
        res.redirect('/find-subject-uk-address')
    }

})

module.exports = router


