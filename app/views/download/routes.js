const express = require('express')
const router = express.Router()
const path = require('path')

// API
const axios = require('axios');

// Add your routes here - above the module.exports line


router.post('/download', function (req, res) {
    res.redirect('declaration');
})

router.post('/declaration', function (req, res) {
    res.redirect('declaration-person');
})

router.post('/declaration-person', function (req, res) {
    res.redirect('is-the-address-same');
})

router.post('/is-the-address-same', function (req, res) {

    let addressSame = req.session.data.addressSame;

    if (addressSame == "No") {
        res.redirect('address-question');
    } else {
        res.redirect('check-answers');
    }
})

router.post('/address-question', function (req, res) {

    let addressTypeDec = req.session.data.addressTypeDec;

    if (addressTypeDec == "Yes") {
        res.redirect('find-person-uk-address');
    } else {
        res.redirect('person-address');
    }
})

router.get('/person-address', function (req, res) {
    res.render(path.resolve(__dirname, 'person-address'), {
        countries: require('../../data/data').countries
    })
})

router.post('/person-address', function (req, res) {
    res.redirect('check-answers');
})

router.post('/person-uk-address', function (req, res) {
    res.redirect('check-answers');
})

router.post('/check-answers', function (req, res) {
    res.redirect('confirmation');
})

router.post('/confirmation', function (req, res) {
    res.redirect('file-download');
})

router.get('/file-download', function (req, res) {


    // Get the selected file
    const file = req.body.supplier
    // Set the file path
    const filePath = path.join(__dirname, '/supplier.pdf')
    // Send the file
    res.download(filePath)

})

router.post('/select-person-uk-address', function (req, res) {
    res.redirect('check-answers');
});

router.post('/find-person-uk-address', function (req, res) {

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

                    res.redirect('select-person-uk-address')
                })
                .catch(error => {
                    console.log(error);
                    res.redirect('/download/person-uk-address')
                });

        }

    } else {
        res.redirect('/find-subject-uk-address')
    }

})

module.exports = router
