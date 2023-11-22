const express = require('express')
const router = express.Router()
const path = require('node:path')

// API
const axios = require('axios');

// Add your routes here - above the module.exports line

router.post('/director-individual-ni', function (req, res) {
  res.redirect('director-address-type-ni');
})

router.post('/director-address-type-ni', function (req, res) {

  let addressTypeDirNi = req.session.data.addressTypeDirNi;

  if (addressTypeDirNi == "No") {
    res.redirect('dir-address-ni');
  } else {
    res.redirect('find-address-dir-ni');
  }
})

router.get('/dir-address-ni', function (req, res) {
  res.render(path.resolve(__dirname, 'dir-address-ni'), {
    countries: require('../../data/data').countries
  })
})

router.post('/dir-address-ni', function (req, res) {
  res.redirect('dir-law-register-ni');
})

router.post('/dir-address-uk-ni', function (req, res) {
  res.redirect('dir-law-register-ni');
})

router.post('/dir-law-register-ni', function (req, res) {
  res.redirect('dir-company-number-question');
})

router.post('/dir-company-number-question', function (req, res) {

  let lawRegisterDirNi = req.session.data.lawRegisterDirNi;

  if (lawRegisterDirNi == "Yes") {
    res.redirect('dir-company-number');
  } else {
    res.redirect('check-answers-connected-person');
  }
})

router.post('/dir-company-number', function (req, res) {
  res.redirect('check-answers-connected-person');
})

router.post('/director-individual', function (req, res) {
  res.redirect('director-address-type');
})

router.post('/director-address-type', function (req, res) {

  let addressTypeDir = req.session.data.addressTypeDir;

  if (addressTypeDir == "No") {
    res.redirect('dir-address');
  } else {
    res.redirect('find-address-dir');
  }
})

router.get('/director-individual', function (req, res) {
  res.render(path.resolve(__dirname, 'director-individual'), {
    nationalities: require('../../data/data').nationalities
  })
})

router.get('/dir-address', function (req, res) {
  res.render(path.resolve(__dirname, 'dir-address'), {
    countries: require('../../data/data').countries
  })
})

router.post('/dir-address', function (req, res) {
  res.redirect('check-answers-connected-person');
})

router.post('/dir-address-uk', function (req, res) {
  res.redirect('check-answers-connected-person');
})

router.post('/connected-question', function (req, res) {

  let connectedPsc = req.session.data.connectedPsc;
  let startQuestion = req.session.data.startQuestion;

  if (connectedPsc == "Yes") {
    res.redirect('companies-question');
  } else if (startQuestion == "Company") {
    res.redirect('../suppliers-c/account-home');
  } else {
    res.redirect('../suppliers-d/account-home');
  }
})

router.post('/companies-question', function (req, res) {
  res.redirect('person-question');
})

router.post('/person-question', function (req, res) {

  let personQuestion = req.session.data.personQuestion;

  if (personQuestion == "organisation" || personQuestion == "person") {
    res.redirect('persons');
  } else {
    res.redirect('journey-page');
  }
})

router.post('/persons', function (req, res) {

  let connectedPersons = req.session.data.connectedPersons;

  if (connectedPersons == 'PSC Individual') {
    res.redirect('/connected/psc-individual');

  } else if (connectedPersons == 'Director individual') {
    res.redirect('/connected/director-individual');

  } else if (connectedPersons == 'Director not individual') {
    res.redirect('/connected/director-individual-ni');

  } else if (connectedPersons == 'Gov/Public Authority') {
    res.redirect('/connected/gov-organisation');

  } else if (connectedPersons == 'PSC not individual or Public Authority') {
    res.redirect('/connected/psc-individual-ni');

  } else if (connectedPersons == 'Parent / subsidiary') {
    res.redirect('/connected/parent-sub');

  } else if (connectedPersons == 'Predecessor') {
    res.redirect('/connected/predecessor');

  } else if (connectedPersons == 'Right to exercise control') {
    res.redirect('/connected/right');

  } else {
    res.redirect('/connected/standin/stand-in');
  }

})

router.post('/gov-organisation', function (req, res) {
  res.redirect('gov-address-type');
})

router.post('/gov-address-type', function (req, res) {

  let addressTypeGov = req.session.data.addressTypeGov;

  if (addressTypeGov == "No") {
    res.redirect('gov-service-address');
  } else {
    res.redirect('find-address-gov');
  }
})

router.get('/gov-service-address', function (req, res) {
  res.render(path.resolve(__dirname, 'gov-service-address'), {
    countries: require('../../data/data').countries
  })
})

router.post('/gov-service-address', function (req, res) {
  res.redirect('gov-law-register');
})

router.post('/gov-address-uk', function (req, res) {
  res.redirect('gov-law-register');
})

router.post('/gov-law-register', function (req, res) {
  res.redirect('nature-of-control-gov');
})

router.post('/nature-of-control-gov', function (req, res) {
  res.redirect('date-registered-gov');
})

router.post('/date-registered-gov', function (req, res) {
  res.redirect('check-answers-connected-person');
})

router.get('/:index/remove-connected-person', function (req, res) {
  res.render(path.resolve(__dirname, 'remove-connected-person'));
});

router.post('/:index/remove-connected-person', function (req, res) {
  let removeConnectedPerson = req.session.data.removeConnectedPerson;
  const connectedPersons = req.session.data.connectedPersonArray || [];

  if (removeConnectedPerson == 'Yes' && connectedPersons.length) {
    const deleteIndex = req.params.index - 1;
    const maxIndex = connectedPersons.length || 0;

    if (deleteIndex <= maxIndex) {
      connectedPersons.splice(deleteIndex, 1);

      req.session.data.connectedPersonArray = connectedPersons;
      req.session.data.connectedPersonCount = connectedPersons.length;
    }
  }

  res.redirect('../add-another-connected-person');
});

router.get('/:index/check-answers-connected-person', function (req, res) {
  const data = req.session.data;
  const index = parseInt(req.params.index);
  const connectedPersons = data.connectedPersonArray || [];

  if (!connectedPersons.length) {
    return res.redirect('../add-another-connected-person');
  }

  const connectedPerson = connectedPersons[req.params.index - 1] || {};

  req.session.data = {
    ...data,
    ...connectedPerson,
    editConnectedPerson: index,
  };

  res.redirect('../check-answers-connected-person');
});

router.post('/check-answers-connected-person', function (req, res) {
  const data = req.session.data;
  const connectedPersons = data.connectedPersonArray || [];

  const connectedPerson = {
    connectedPerson: data.connectedPerson,
    connectedPersonDay: data.connectedPersonDay,
    connectedPersonMonth: data.connectedPersonMonth,
    connectedPersonYear: data.connectedPersonYear,
    individualDay: data.individualDay,
    individualMonth: data.individualMonth,
    individualYear: data.individualYear
  };

  if (data.editConnectedPerson) {
    connectedPersons[data.editConnectedPerson - 1] = connectedPerson;
  }
  else {
    connectedPersons.push(connectedPerson)
    data.connectedPersonArray = connectedPersons;
    data.connectedPersonCount = connectedPersons.length;
  }

  delete data.editConnectedPerson;

  res.redirect('add-another-connected-person');
});

router.post('/add-another-connected-person-route', function (req, res) {
  var sessionData = req.session.data;
  var connectedPersonArray = sessionData.connectedPersonArray || [];
  var connectedPerson = {
    "id": connectedPersonArray.length + 1,
    "connectedPerson": sessionData.connectedPersonName,
  }
  connectedPersonArray.push(connectedPerson);
  sessionData.connectedPersonArray = connectedPersonArray;
  sessionData.connectedPersonCount = connectedPersonArray.length;
  res.redirect('add-another-connected-person');
});

router.post('/add-another-connected-person', function (req, res) {
  delete req.session.data.editConnectedPerson;

  if (req.session.data.addAnotherConnectedPerson == 'Yes') {
    res.redirect('../connected/connected-question');
  }
  else if (req.session.data.startQuestion == "Company") {
    res.redirect('../suppliers-c/account-home');
  }
  else {
    res.redirect('../suppliers-d/account-home');
  }
});

router.post('/add-another-connected-person', function (req, res) {
  delete req.session.data.editConnectedPerson;

  if (req.session.data.connectedPersonCount == '10') {
    res.redirect('../connected/persons');
  }
  else {
    res.redirect('psc-organisation');
  }
});


router.get('/psc-individual', function (req, res) {
  res.render(path.resolve(__dirname, 'psc-individual'), {
    nationalities: require('../../data/data').nationalities
  })
})

router.post('/psc-individual', function (req, res) {
  res.redirect('address-type');
})

router.post('/address-type', function (req, res) {

  let addressType = req.session.data.addressType;

  if (addressType == "No") {
    res.redirect('psc-address');
  } else {
    res.redirect('find-address-psc');
  }
})

router.get('/psc-address', function (req, res) {
  res.render(path.resolve(__dirname, 'psc-address'), {
    countries: require('../../data/data').countries
  })
})

router.post('/psc-address', function (req, res) {
  res.redirect('nature-of-control-psc');
})

router.post('/psc-address-uk', function (req, res) {
  res.redirect('nature-of-control-psc');
})

router.post('/nature-of-control-psc', function (req, res) {
  res.redirect('date-registered-psc');
})

router.post('/date-registered-psc', function (req, res) {
  res.redirect('psc-register');
})

router.post('/psc-register', function (req, res) {
  res.redirect('check-answers-connected-person');
})

// PSC Organisation

router.post('/psc-individual-ni', function (req, res) {
  res.redirect('psc-address-type-ni');
})

router.post('/psc-address-type-ni', function (req, res) {

  let addressTypePscNi = req.session.data.addressTypePscNi;

  if (addressTypePscNi == "No") {
    res.redirect('psc-address-ni');
  } else {
    res.redirect('find-address-psc-ni');
  }
})

router.get('/psc-address-ni', function (req, res) {
  res.render(path.resolve(__dirname, 'psc-address-ni'), {
    countries: require('../../data/data').countries
  })
})

router.post('/psc-address-ni', function (req, res) {
  res.redirect('psc-law-register');
})

router.post('/psc-address-uk-ni', function (req, res) {
  res.redirect('psc-law-register');
})

router.post('/psc-law-register', function (req, res) {
  res.redirect('nature-of-control-psc-ni');
})

router.post('/nature-of-control-psc-ni', function (req, res) {
  res.redirect('psc-date-registered-ni');
})

router.post('/psc-date-registered-ni', function (req, res) {
  res.redirect('psc-register-ni');
})

router.post('/psc-register-ni', function (req, res) {
  res.redirect('check-answers-connected-person');
})

router.post('/parent-sub', function (req, res) {
  res.redirect('parent-address-type');
})

router.post('/parent-address-type', function (req, res) {

  let addressTypeParent = req.session.data.addressTypeParent;

  if (addressTypeParent == "No") {
    res.redirect('parent-address');
  }
  else {
    res.redirect('find-address-parent');
  }
})

router.post('/parent-address', function (req, res) {
  res.redirect('parent-company-number-question');
})

router.post('/parent-address-uk', function (req, res) {
  res.redirect('parent-company-number-question');
})

router.post('/parent-company-number-question', function (req, res) {

  let parentNumberQuestion = req.session.data.parentNumberQuestion;

  if (parentNumberQuestion == "Yes") {
    res.redirect('parent-company-number');
  }
  else {
    res.redirect('check-answers-connected-person');
  }
})

router.post('/parent-company-number', function (req, res) {
  res.redirect('check-answers-connected-person');
})

router.get('/parent-address', function (req, res) {
  res.render(path.resolve(__dirname, 'parent-address'), {
    countries: require('../../data/data').countries
  })
})

router.post('/predecessor', function (req, res) {
  res.redirect('pred-address-type');
})

router.post('/pred-address-type', function (req, res) {

  let addressTypePred = req.session.data.addressTypePred;

  if (addressTypePred == "No") {
    res.redirect('pred-address');
  }
  else {
    res.redirect('find-address-pred');
  }
})

router.post('/pred-address', function (req, res) {
  res.redirect('pred-company-number-question');
})

router.post('/pred-address-uk', function (req, res) {
  res.redirect('pred-company-number-question');
})

router.post('/pred-company-number-question', function (req, res) {

  let predNumberQuestion = req.session.data.predNumberQuestion;

  if (predNumberQuestion == "Yes") {
    res.redirect('pred-company-number');
  }
  else {
    res.redirect('pred-date-registered');
  }
})

router.post('/pred-company-number', function (req, res) {
  res.redirect('pred-date-registered');
})

router.post('/pred-date-registered', function (req, res) {
  res.redirect('check-answers-connected-person');
})

router.get('/pred-address', function (req, res) {
  res.render(path.resolve(__dirname, 'pred-address'), {
    countries: require('../../data/data').countries
  })
})

router.post('/right', function (req, res) {
  res.redirect('right-address-type');
})

router.post('/right-address-type', function (req, res) {

  let addressTypeRight = req.session.data.addressTypeRight;

  if (addressTypeRight == "No") {
    res.redirect('right-address');
  }
  else {
    res.redirect('find-address-right');
  }
})

router.post('/right-address', function (req, res) {

  let personQuestion = req.session.data.personQuestion;

  if (personQuestion == "organisation") {
    res.redirect('right-company-number-question');
  }
  else {
    res.redirect('right-nature-of-control');
  }
})

router.post('/right-address-uk', function (req, res) {

  let personQuestion = req.session.data.personQuestion;

  if (personQuestion == "organisation") {
    res.redirect('right-company-number-question');
  }
  else {
    res.redirect('right-nature-of-control');
  }
})

router.post('/right-company-number-question', function (req, res) {

  let rightNumberQuestion = req.session.data.rightNumberQuestion;

  if (rightNumberQuestion == "Yes") {
    res.redirect('right-company-number');
  }
  else {
    res.redirect('right-company-number-question-equiv');
  }
})

router.post('/right-company-number-question-equiv', function (req, res) {

  let rightNumberQuestionEquiv = req.session.data.rightNumberQuestionEquiv;

  if (rightNumberQuestionEquiv == "Yes") {
    res.redirect('right-company-number-equiv');
  } else {
    res.redirect('right-nature-of-control');
  }
})

router.post('/right-company-number-equiv', function (req, res) {
  res.redirect('right-nature-of-control');
})

router.post('/right-company-number', function (req, res) {
  res.redirect('right-nature-of-control');
})

router.post('/right-nature-of-control', function (req, res) {
  res.redirect('right-date-registered');
})

router.post('/right-date-registered', function (req, res) {
  res.redirect('check-answers-connected-person');
})

router.get('/right-address', function (req, res) {
  res.render(path.resolve(__dirname, 'right-address'), {
    countries: require('../../data/data').countries
  })
})

router.post('/select-address-dir', function (req, res) {
  res.redirect('check-answers-connected-person');
});

router.post('/find-address-dir', function (req, res) {

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

          res.redirect('select-address-dir')
        })
        .catch(error => {
          console.log(error);
          res.redirect('/connected/dir-address-uk')
        });

    }

  } else {
    res.redirect('/find-address-dir')
  }

})

router.post('/select-address-dir-ni', function (req, res) {
  res.redirect('dir-law-register-ni');
});

router.post('/find-address-dir-ni', function (req, res) {

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

          res.redirect('select-address-dir-ni')
        })
        .catch(error => {
          console.log(error);
          res.redirect('/connected/dir-address-uk-ni')
        });

    }

  } else {
    res.redirect('/find-address-dir-ni')
  }

})

router.post('/select-address-parent', function (req, res) {
  res.redirect('parent-company-number-question');
});

router.post('/find-address-parent', function (req, res) {

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

          res.redirect('select-address-parent')
        })
        .catch(error => {
          console.log(error);
          res.redirect('/connected/parent-address-uk')
        });

    }

  } else {
    res.redirect('/find-address-parent')
  }

})

router.post('/select-address-psc', function (req, res) {
  res.redirect('nature-of-control-psc');
});

router.post('/find-address-psc', function (req, res) {

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

          res.redirect('select-address-psc')
        })
        .catch(error => {
          console.log(error);
          res.redirect('/connected/psc-address-uk')
        });

    }

  } else {
    res.redirect('/find-address-psc')
  }

})

router.post('/select-address-pred', function (req, res) {
  res.redirect('pred-company-number-question');
});

router.post('/find-address-pred', function (req, res) {

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

          res.redirect('select-address-pred')
        })
        .catch(error => {
          console.log(error);
          res.redirect('/connected/pred-address-uk')
        });

    }

  } else {
    res.redirect('/find-address-pred')
  }

})

router.post('/select-address-gov', function (req, res) {
  res.redirect('gov-law-register');
});

router.post('/find-address-gov', function (req, res) {

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

          res.redirect('select-address-gov')
        })
        .catch(error => {
          console.log(error);
          res.redirect('/connected/gov-address-uk')
        });

    }

  } else {
    res.redirect('/find-address-gov')
  }

})

router.post('/select-address-psc-ni', function (req, res) {
  res.redirect('psc-law-register');
});

router.post('/find-address-psc-ni', function (req, res) {

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

          res.redirect('select-address-psc-ni')
        })
        .catch(error => {
          console.log(error);
          res.redirect('/connected/psc-address-uk-ni')
        });

    }

  } else {
    res.redirect('/find-address-psc-ni')
  }

})

router.post('/select-address-right', function (req, res) {
  res.redirect('right-company-number-question');
});

router.post('/find-address-right', function (req, res) {

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

          res.redirect('select-address-right')
        })
        .catch(error => {
          console.log(error);
          res.redirect('/connected/right-address-uk')
        });

    }

  } else {
    res.redirect('/find-address-right')
  }

})

module.exports = router


