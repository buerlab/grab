/* global buster */
// buster.testCase("A module", {
//     "states the obvious": function () {
//         assert(true);
//     }

// });
define(function(require, exports, module) {

	buster.spec.expose(); // Make some functions global
	this.expect = buster.expect;
	this.assert = buster.assert;

	//var coin_type = require("../sea-modules/coin_type");

	describe("A module", function () {
	    it("states the obvious", function () {
	        expect(true).toEqual(true);
	    });
	});
});