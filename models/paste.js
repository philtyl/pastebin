const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Paste = new Schema({
    _id             :   {type: String, index: true},
    title           :   String,
    date            :   Date,
    private         :   Boolean,
    payload         :   String
});

module.exports = mongoose.model('Pastes', Paste);