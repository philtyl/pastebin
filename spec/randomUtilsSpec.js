var randomUtils = require("../util/randomUtil");

const VALID_IDENTIFIER_PATTERN = '[A-Z][a-z]{0,6}[A-Z][a-z]{0,6}[A-Z][a-z]{0,6}';

describe("RandomUtils", function() {
    it("should generate valid identifiers", function () {
        for (var i = 0; i < 1000; i++) {
            var identifier = randomUtils.generateIdentifier();
            expect(identifier).toMatch(VALID_IDENTIFIER_PATTERN);
        }
    });
});