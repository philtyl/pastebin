var randomWord = require('random-word');
var mongoUtils = require('./mongoUtils');

const RANDOM_WORDS_SIZE = 3;
const MAX_WORD_SIZE = 6;

module.exports = {
    generateIdentifier: function() {
        return camelize(generateRandomWords(RANDOM_WORDS_SIZE));
    }
};

function generateRandomWords(size) {
    var line = '';
    for (i = 0; i < size; i++) {
        line += generateRandomWord(MAX_WORD_SIZE) + ' ';
    }
    return line;
}

function generateRandomWord(maxSize) {
    do {
        var word = randomWord();
    } while (word.valueOf().length > maxSize);
    return word;
}

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return letter.toUpperCase();
    }).replace(/\s+/g, '');
}