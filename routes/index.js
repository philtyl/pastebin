const APP_NAME = 'pastebin';

const express = require('express');
const shortid = require('js-shortid');
const lang = require('language-classifier');
const mongoUtils = require('./util/mongoUtil');

const router = express.Router();

/* GET submit page. */
router.get('/', function(req, res, next) {
  res.render('index', { appName: APP_NAME });
});

/* GET raw view page. */
router.get('/r/*', function(req, res, next) {
    const id = req.url.split('/')[2];

    mongoUtils.getDb().collection('paste').find({ _id: id }).limit(1).next(function (err, doc) {
        if (err) throw err;
        res.header('content-type', 'text/json');
        res.send(doc.paste);
    });
});

/* GET view page. */
router.get('/*', function(req, res, next) {
    const id = req.url.split('/')[1];

    mongoUtils.getDb().collection('paste').find({ _id: id }).limit(1).next(function (err, doc) {
        if (err) throw err;
        const viewData = Object.assign({}, { appName: APP_NAME }, doc);
        res.render('content/view', viewData);
    });
});

/* POST paste. */
router.post('/', function(req, res) {
  const paste = {
    _id: shortid.gen(),
    pasteName: req.body.pasteName,
    date: new Date(),
    language: lang(req.body.paste),
    paste: req.body.paste
  };

  mongoUtils.getDb().collection('paste').insertOne(paste, function (err, res) {
    if (err) throw err;
  });
  return res.redirect('/' + paste._id);
});

module.exports = router;
