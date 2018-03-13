const keystone = require('keystone'),
	AppUser = keystone.list('AppUser').model,
	async = require('async'),
	graphql = require('graphql');

const AuthType = require('../types/AuthType');

module.exports = {
	login: {
		type: AuthType,
		description: 'Login user',
		args: {
			email: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString)
			},
			password: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString)
			},
		},
		resolve: (parent, args, request) => (new Promise((resolve, reject) => {
				let authInfo;
				authorizeUser(args.email, args.password, (err, results) => {
					if (err) return reject(err);
					// request.loginUser({_id: results._id, email: results.email, role: results.role});
					authInfo = {
						id: results._id,
						token: request.token
					};
					// returning fulfill and quantity data in promise 
					resolve(authInfo);
				})
			}
		)),
	},
};

authorizeUser = (email, pass, cb) => {
	let user, passwordMatch;
	async.series([
		callback => {
			// Check whether the email is present or not
			AppUser.findOne({email: email, isEnabled: true}).exec((err, _user) => {
				if (err) return callback(err);
				if (_user) return callback(null, user = _user);
				callback(new Error('Please provide the valid email!'));
			})
		},
		callback => {
			// Check whether the password matches or not
			if (user) {
				user._.password.compare(pass, (err, result) => {
					if (err) return callback(err);
					if (result == false) {
						callback(new Error('Password Does not match !'));
					}
					else callback()
				})
			}
			else callback();
		},
	], (err) => {
		if (err) return cb(err);
		cb(null, user);
	})
};
