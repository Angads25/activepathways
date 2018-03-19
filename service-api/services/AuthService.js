var crypto = require('crypto');

module.exports = {

	/**
	 * This method decrypts the cryptext
	 *
	 * @param {String} cryptText crypt text
	 *
	 * @return {String|Object|Error} The data or Error object
	 *
	 * */
	decrypt: function (cryptText) {
		var data = null;
		try {
			var decipher = crypto.createDecipher(process.env.GENERATOR_ALGO, process.env.GENERATOR_SECRET);
			data = JSON.parse(decipher.update(cryptText, 'hex') + decipher.final());
		} catch (c) {
			c.message = "Unable to decode the cryptext. Tampered input! Or Invalid Secret! " + c.message;
			return new Error(c);
		}
		if (data && data.payload) {
			return data.payload;
		} else {
			return new Error("Unable to parse. Bad data or secret.");
		}
	},

	/**
	 * Generate the cryptext from data
	 *
	 * @param {Object} data the data token has to carry
	 *
	 * @return {String|Error} The access token or Error object
	 * */
	encrypt: function (data) {
		var json = JSON.stringify({payload: data});
		try {
			var cipher = crypto.createCipher(process.env.GENERATOR_ALGO, process.env.GENERATOR_SECRET);
			return cipher.update(json, 'binary', 'hex') + cipher.final('hex');
		} catch (c) {
			return new Error(c);
		}
	}

};
