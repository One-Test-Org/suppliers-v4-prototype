const express = require('express')
const router = express.Router()
const path = require('node:path')


// Add your routes here - above the module.exports line

router.post('/financial-question', function (req, res) {

    let fileState = req.session.data.fileState;

    if (fileState == 'A copy of the most recent two financial years accounts') {
        res.redirect('/economical/two-or-more-type');

    } else if (fileState == 'A copy of the most recent financial year accounts') {
        res.redirect('/economical/one-doc-type');

    } else if (fileState == 'A copy of the most recent accounts or other information') {
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

/*
router.post('/check-answers', function (req, res) {
    let startQuestion = req.session.data.startQuestion;

    if (startQuestion == 'Company') {
        res.redirect('/suppliers-c/account-home');
    } else {
        res.redirect('/suppliers-d/account-home');
    }
});
*/

// add another file

router.post('/check-answers', function (req, res) {
    res.redirect('add-another-file');
});

router.get('/:index/remove-file', function (req, res) {
    res.render(path.resolve(__dirname, 'remove-file'));
});

router.post('/:index/remove-file', function (req, res) {
    let removeFile = req.session.data.removeFile;
    const files = req.session.data.fileArray || [];

    if (removeFile == 'Yes' && files.length) {
        const deleteIndex = req.params.index - 1;
        const maxIndex = files.length || 0;

        if (deleteIndex <= maxIndex) {
            files.splice(deleteIndex, 1);

            req.session.data.fileArray = files;
            req.session.data.fileCount = files.length;
        }
    }

    res.redirect('../add-another-file');
});

router.get('/:index/check-answers', function (req, res) {
    const data = req.session.data;
    const index = parseInt(req.params.index);
    const files = data.fileArray || [];

    if (!files.length) {
        return res.redirect('../add-another-file');
    }

    const file = files[req.params.index - 1] || {};

    req.session.data = {
        ...data,
        ...file,
        editFile: index,
    };

    res.redirect('../check-answers');
});

router.post('/check-answers', function (req, res) {
    const data = req.session.data;
    const files = data.fileArray || [];

    const file = {
        fileState: data.fileState,
        financialType: data.financialType,
        fileUpload: data.fileUpload
    };

    if (data.editFile) {
        files[data.editFile - 1] = file;
    } else {
        files.push(file)
        data.fileArray = files;
        data.fileCount = files.length;
    }

    delete data.editFile;

    res.redirect('add-another-file');
});

router.post('/add-another-file-route', function (req, res) {
    var sessionData = req.session.data;
    var fileArray = sessionData.fileArray || [];
    var file = {
        "id": fileArray.length + 1,
        "file": sessionData.file,
    }
    fileArray.push(file);
    sessionData.fileArray = fileArray;
    sessionData.fileCount = fileArray.length;
    res.redirect('add-another-file');
});

router.post('/add-another-file', function (req, res) {
    delete req.session.data.editFile;

    if (req.session.data.addAnotherFile == 'Yes') {
        res.redirect('financial-question');
    } else {
        let startQuestion = req.session.data.startQuestion;
        if (startQuestion == 'Company') {
            res.redirect('../suppliers-c/account-home');
        } else {
            res.redirect('../suppliers-d/account-home');
        }
    }
});

router.post('/add-another-file', function (req, res) {
    delete req.session.data.editFile;

    if (req.session.data.fileCount == '10') {
        res.redirect('check-answers');
    } else {
        res.redirect('financial-question');
    }
});

module.exports = router
