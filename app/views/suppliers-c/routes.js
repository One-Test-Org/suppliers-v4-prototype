const express = require('express')
const router = express.Router()
const path = require('node:path')

// API
const axios = require('axios');

// Add your routes here - above the module.exports line

// add a timestamp to the session call the variable dt and then use it in the views with a dd/mm/yyyy format

router.all('*', function (req, res, next) {
  const timestamp = Date.now(); // Get the current timestamp in milliseconds
  const date = new Date(timestamp); // Convert the timestamp to a Date object
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();

  // Format the date as DD/MM/YYYY
  req.session.data['dt'] = `${day}/${month}/${year}`;

  next();
});

router.get('account-home', function (req, res) {
  res.render(path.resolve(__dirname, 'account-home'));
})

router.post('/signin-success', function (req, res) {
  res.redirect('test');
})

router.get('/registered-address', function (req, res) {
  res.render(path.resolve(__dirname, 'registered-address'), {
    countries: require('../../data/data').countries
  })
})

router.post('/non-individual-core-data', function (req, res) {
  res.redirect('account-home');
})

router.post('/registered-address', function (req, res) {
  res.redirect('non-individual-core-data');
})

router.post('/address-type', function (req, res) {

  let addressTypeBasic = req.session.data.addressTypeBasic;

  if (addressTypeBasic == "Yes") {
    res.redirect('find-registered-uk-address');
  } else {
    res.redirect('registered-address');
  }
})

router.get('/postal-address', function (req, res) {
  res.render(path.resolve(__dirname, 'postal-address'), {
    countries: require('../../data/data').countries
  })
})

router.post('/postal-address', function (req, res) {
  res.redirect('non-individual-core-data');
})

router.post('/postal-address-type', function (req, res) {

  let addressTypePos = req.session.data.addressTypePos;

  if (addressTypePos == "Yes") {
    res.redirect('find-postal-uk-address');
  } else {
    res.redirect('postal-address');
  }
})

router.post('/registered-uk-address', function (req, res) {
  res.redirect('non-individual-core-data');
})

router.post('/is-the-address-same', function (req, res) {

  let addressSame = req.session.data.addressSame;

  if (addressSame == "No") {
    res.redirect('postal-address-type');
  } else {
    res.redirect('non-individual-core-data');
  }
})

router.post('/postal-uk-address', function (req, res) {
  res.redirect('non-individual-core-data');
})

router.post('/vat-question', function (req, res) {

  let vatReg = req.session.data.vatReg;

  if (vatReg == "Yes") {
    res.redirect('vat-number');
  } else {
    res.redirect('non-individual-core-data');
  }
})

router.post('/vat-number', function (req, res) {
  res.redirect('non-individual-core-data');
})

router.post('/web-question', function (req, res) {

  let webQuestion = req.session.data.webQuestion;

  if (webQuestion == "Yes") {
    res.redirect('website-address');
  } else {
    res.redirect('non-individual-core-data');
  }
})

router.post('/website-address', function (req, res) {
  res.redirect('non-individual-core-data');
})

router.post('/email-address', function (req, res) {
  res.redirect('non-individual-core-data');
})

router.post('/qualification-question', function (req, res) {

  let qualificationQuestion = req.session.data.qualificationQuestion;

  if (qualificationQuestion == "Yes") {
    res.redirect('qualification-type');
  } else {
    res.redirect('non-individual-core-data');
  }
})

router.post('/trade-question', function (req, res) {

  let tradeQuestion = req.session.data.tradeQuestion;

  if (tradeQuestion == "Yes") {
    res.redirect('trade-type');
  } else {
    res.redirect('non-individual-core-data');
  }
})

router.post('/qualification-type', function (req, res) {
  res.redirect('awarded-date');
})

router.post('/trade-type', function (req, res) {
  res.redirect('trade-reference');
})

router.post('/awarded-date', function (req, res) {
  res.redirect('qualified-name');
})

router.post('/trade-reference', function (req, res) {
  res.redirect('awarded-trade-date');
})

router.post('/qualified-name', function (req, res) {
  res.redirect('check-answers');
})

router.post('/awarded-trade-date', function (req, res) {
  res.redirect('check-trade-answers');
})

router.post('/sme-question', function (req, res) {
  res.redirect('non-individual-core-data');
})

router.post('/ca-question', function (req, res) {
  res.redirect('legal-form');
})

router.post('/legal-form', function (req, res) {
  res.redirect('law-registered');
})

router.post('/law-registered', function (req, res) {
  res.redirect('formation-date');
})

router.post('/formation-date', function (req, res) {
  res.redirect('non-individual-core-data');
})

router.post('/non-individual-core-data', function (req, res) {
  res.redirect('account-home');
})

router.get('/:index/remove-qualification', function (req, res) {
  res.render(path.resolve(__dirname, 'remove-qualification'));
});

router.post('/:index/remove-qualification', function (req, res) {
  let removeQualification = req.session.data.removeQualification;
  const qualifications = req.session.data.qualificationArray || [];

  if (removeQualification == 'Yes' && qualifications.length) {
    const deleteIndex = req.params.index - 1;
    const maxIndex = qualifications.length || 0;

    if (deleteIndex <= maxIndex) {
      qualifications.splice(deleteIndex, 1);

      req.session.data.qualificationArray = qualifications;
      req.session.data.qualificationCount = qualifications.length;
    }
  }

  res.redirect('../add-another-qualification');
});

router.get('/:index/check-answers', function (req, res) {
  const data = req.session.data;
  const index = parseInt(req.params.index);
  const qualifications = data.qualificationArray || [];

  if (!qualifications.length) {
    return res.redirect('../add-another-qualification');
  }

  const qualification = qualifications[req.params.index - 1] || {};

  req.session.data = {
    ...data,
    ...qualification,
    editQualification: index,
  };

  res.redirect('../check-answers');
});

router.post('/check-answers', function (req, res) {
  const data = req.session.data;
  const qualifications = data.qualificationArray || [];

  const qualification = {
    qualificationType: data.qualificationType,
    awardIssuedDay: data.awardIssuedDay,
    awardIssuedMonth: data.awardIssuedMonth,
    awardIssuedYear: data.awardIssuedYear,
    qualifiedName: data.qualifiedName
  };

  if (data.editQualification) {
    qualifications[data.editQualification - 1] = qualification;
  }
  else {
    qualifications.push(qualification)
    data.qualificationArray = qualifications;
    data.qualificationCount = qualifications.length;
  }

  delete data.editQualification;

  res.redirect('add-another-qualification');
});

router.post('/add-another-qualification-route', function (req, res) {
  var sessionData = req.session.data;
  var qualificationArray = sessionData.qualificationArray || [];
  var qualification = {
    "id": qualificationArray.length + 1,
    "qualification": sessionData.qualificationType,
  }
  qualificationArray.push(qualification);
  sessionData.qualificationArray = qualificationArray;
  sessionData.qualificationCount = qualificationArray.length;
  res.redirect('add-another-qualification');
});

router.post('/add-another-qualification', function (req, res) {
  delete req.session.data.editQualification;

  if (req.session.data.addAnotherQualification == 'Yes') {
    res.redirect('qualification-type');
  }
  else {
    res.redirect('non-individual-core-data');
  }
});

router.post('/add-another-qualification', function (req, res) {
  delete req.session.data.editQualification;

  if (req.session.data.qualificationCount == '10') {
    res.redirect('non-individual-core-data');
  }
  else {
    res.redirect('qualification-type');
  }
});

router.get('/:index/remove-trade', function (req, res) {
  res.render(path.resolve(__dirname, 'remove-trade'));
});

router.post('/:index/remove-trade', function (req, res) {
  let removeTrade = req.session.data.removeTrade;
  const trades = req.session.data.tradeArray || [];

  if (removeTrade == 'Yes' && trades.length) {
    const deleteIndex = req.params.index - 1;
    const maxIndex = trades.length || 0;

    if (deleteIndex <= maxIndex) {
      trades.splice(deleteIndex, 1);

      req.session.data.tradeArray = trades;
      req.session.data.tradeCount = trades.length;
    }
  }

  res.redirect('../add-another-trade');
});

router.get('/:index/check-trade-answers', function (req, res) {
  const data = req.session.data;
  const index = parseInt(req.params.index);
  const trades = data.tradeArray || [];

  if (!trades.length) {
    return res.redirect('../add-another-trade');
  }

  const trade = trades[req.params.index - 1] || {};

  req.session.data = {
    ...data,
    ...trade,
    editTrade: index,
  };

  res.redirect('../check-trade-answers');
});

router.post('/check-trade-answers', function (req, res) {
  const data = req.session.data;
  const trades = data.tradeArray || [];

  const trade = {
    tradeType: data.tradeType,
    tradeRef: data.tradeRef,
    awardIssuedTradeDay: data.awardIssueTradedDay,
    awardIssuedTradeMonth: data.awardIssuedTradeMonth,
    awardIssuedTradeYear: data.awardIssuedTradeYear
  };

  if (data.editTrade) {
    trades[data.editTrade - 1] = trade;
  }
  else {
    trades.push(trade)
    data.tradeArray = trades;
    data.tradeCount = trades.length;
  }

  delete data.editTrade;

  res.redirect('add-another-trade');
});

router.post('/add-another-trade-route', function (req, res) {
  var sessionData = req.session.data;
  var tradeArray = sessionData.tradeArray || [];
  var trade = {
    "id": trade.length + 1,
    "qualification": sessionData.tradeType,
  }
  tradeArray.push(trade);
  sessionData.tradeArray = tradeArray;
  sessionData.tradeCount = tradeArray.length;
  res.redirect('add-another-trade');
});

router.post('/add-another-trade', function (req, res) {
  delete req.session.data.editTrade;

  if (req.session.data.addAnotherTrade == 'Yes') {
    res.redirect('trade-type');
  }
  else {
    res.redirect('non-individual-core-data');
  }
});

router.post('/add-another-trade', function (req, res) {
  delete req.session.data.editTrade;

  if (req.session.data.tradeCount == '10') {
    res.redirect('non-individual-core-data');
  }
  else {
    res.redirect('trade-type');
  }
});

router.post('/select-registered-uk-address', function (req, res) {
  res.redirect('non-individual-core-data');
});

router.post('/find-registered-uk-address', function (req, res) {

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

          res.redirect('select-registered-uk-address')
        })
        .catch(error => {
          console.log(error);
          res.redirect('/suppliers-c/registered-uk-address')
        });

    }

  } else {
    res.redirect('/find-registered-uk-address')
  }

})

router.post('/select-postal-uk-address', function (req, res) {
  res.redirect('non-individual-core-data');
});

router.post('/find-postal-uk-address', function (req, res) {

  var postcodeLookup = req.session.data['postcode']

  const regex = RegExp('^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$');

  if (postcodeLookup) {

    if (regex.test(postcodeLookup) === true) {

      axios.get("https://api.os.uk/search/places/v1/postcode?postcode=" + postcodeLookup + "&key=" + process.env.AXIOS_API_KEY)
        .then(response => {
          var secondAddresses = response.data.results.map(result => result.DPA.ADDRESS);

          const titleCaseSecondAddresses = secondAddresses.map(address => {
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

          req.session.data['secondAddresses'] = titleCaseSecondAddresses;

          res.redirect('select-postal-uk-address')
        })
        .catch(error => {
          console.log(error);
          res.redirect('/suppliers-c/postal-uk-address')
        });

    }

  } else {
    res.redirect('/find-postal-uk-address')
  }

})

module.exports = router
