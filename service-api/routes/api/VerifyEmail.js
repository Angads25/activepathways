const keystone = require('keystone');
const AuthService = require('../../services/AuthService');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const User = keystone.list('AppUser').model;

exports.get = function (req, res) {
	let token = req.param('token');
	console.log(token);
	let userId;
	let email;
	try {
		let data = AuthService.decrypt(token);
		userId = data.id;
		email = data.email;
	} catch (c) {
		console.log(c);
		return res.redirect('/#?error=' + encodeURIComponent('Invalid Verification Link'));
	}

	userId = convertToObjectId(userId);

	if (!userId) {
		return res.redirect('/#?error=' + encodeURIComponent('Invalid Verification Link'));
	}

	if (!email) {
		return res.redirect('/#?error=' + encodeURIComponent('Invalid Verification Link'));
	}

	User.findOne({_id: userId, email: email}, function (err, user) {
		if (err) return res.redirect('/#?error=' + encodeURIComponent('Unable to Verify. Try Again Later.'));
		else if (user) {
			user.emailVerified = true;
			user.save(function (err) {
				if (err) return res.redirect('/#?error=' + encodeURIComponent('Unable to Verify. Try Again Later.'));
				else return res.redirect('/#?redirect=/dashboard&success=' + encodeURIComponent('Email Verified Successfully.'));
			});
		} else return res.redirect('/#?error=' + encodeURIComponent('Invalid Verification Link'));
	});
};

function convertToObjectId(id) {
	try {
		return ObjectId(id);
	} catch (c) {
		return null;
	}
}
