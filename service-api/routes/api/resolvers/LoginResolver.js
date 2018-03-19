const keystone = require('keystone'),
	AppUser = keystone.list('AppUser').model,
	async = require('async'),
	graphql = require('graphql');

const UserType = require('../types/UserType');

module.exports = {
	login: {
		type: UserType,
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
				authorizeUser(args.email, args.password, (err, results) => {
					if (err) return reject(err);
					request.loginUser({_id: results._id, email: results.email, role: results.role});
					// returning fulfill and quantity data in promise 
					results.token = request.token;
					resolve(results);
				})
			}
		)),
	},
	logout: {
		type: new graphql.GraphQLObjectType({
			name: 'Logout',
			description: 'logout user',
			fields: () => ({
				success: {
					type: graphql.GraphQLBoolean
				}
			})
		}),
		description: 'Logout user',
		resolve: (parent, args, request) => (new Promise((resolve, reject) => {
				request.logout();
				resolve({success: true})
			}
		)),
	},
};

authorizeUser = (email, pass, cb) => {
	let user;
	async.series([
		callback => {
			// Check whether the email is present or not
			AppUser.findOne({email: email}).exec((err, _user) => {
				if (err) return callback(err);
				if (_user) return callback(null, user = _user);
				callback(new Error('No user found with email!'));
			})
		},
		callback => {
			// Check whether the password matches or not
			if (user) {
				user._.password.compare(pass, (err, result) => {
					if (err) return callback(err);
					else if (!result) callback(new Error('Password Does not match !'));
					else if (user.isEnabled) callback();
					else callback(new Error('Your account has been disabled!'));
				})
			}
			else callback();
		},
	], (err) => {
		if (err) return cb(err);
		cb(null, user);
	})
};
