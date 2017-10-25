const express = require('express');
const shortid = require('js-shortid');

const Pastes = require('../models/paste');

const APP_NAME = 'paste.moe';
const router = express.Router();

/* GET submit page. */
router.get('/', function(req, res, next) {
  res.render('index', { appName: APP_NAME });
});

/* GET raw view page. */
router.get('/r/:id', function(req, res, next) {
    const id = req.url.split('/')[2];

    Pastes.findOne({ _id: req.param('id') }).lean().exec(function (err, paste) {
        if (err) throw err;
        res.header('content-type', 'text/json');
        res.send(paste.payload);
    });
});

/* GET view page. */
router.get('/:id', function(req, res, next) {
    Pastes.findOne({ _id: req.param('id') }).lean().exec(function (err, paste) {
        if (err) throw err;
        const model = Object.assign({}, { appName: APP_NAME }, paste);
        res.render('content/view', model);
    });
});

/* POST paste. */
router.post('/', function(req, res) {
    const paste = new Pastes({
        _id: shortid.gen(),
        title: req.body.title,
        date: new Date(),
        private: req.body.private,
        payload: req.body.payload
    });

    paste.save(function (err, paste) {
        if (err) throw err;
    });

    return res.redirect('/' + paste._id);
});

module.exports = router;
