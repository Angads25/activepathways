const keystone = require('keystone'),
	User = keystone.list('AppUser').model,
	async = require('async'),
	mongoose = require('mongoose'),
	graphql = require('graphql'),
	ObjectId = mongoose.Types.ObjectId;

const UserType = require('../types/UserType');
const EmailService = require('../../../services/EmailService');

module.exports = {
	upsertUser: {
		type: UserType,
		description: 'Upsert user',
		args: {
			id: {
				type: graphql.GraphQLString
			},
			name: {
				type: new graphql.GraphQLInputObjectType({
					name: 'user_name_mutation',
					description: 'Name node.',
					fields: {
						first: {type: graphql.GraphQLString, description: 'First name.'},
						last: {type: graphql.GraphQLString, description: 'Last name.'},
						full: {type: graphql.GraphQLString, description: 'Full name.'}
					}
				}),
				description: 'Name of the user'
			},
			email: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString)
			},
			password: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString)
			}
		},
		resolve: (parent, args, request) => (new Promise((resolve, reject) => {
				upsertUser(args, request, (err, results) => {
					if (err) return reject(err);
					// return fulfill and  user data in promise
					resolve(results);
				})
			}
		))

	},
};

upsertUser = (args, request, cb) => {
	let user, authInfo;
	async.series([
			// fetch user
			callback => {
				if (!args.id) return callback();
				let userId = convertToObjectId(args['id']);
				if (!userId) return callback(new Error('Invalid User ID passed!'));
				if (!request._user || request._user._id.toString() !== userId.toString()) return callback(new Error('Permission denied!'));
				User.findOne({_id: userId}).exec((err, _user) => {
					if (err) callback(err);
					else if (_user) callback(null, user = _user);
					else callback(new Error('No user by provided id.'));
				});
			},
			// already exits or not
			callback => {
				if (user) return callback();
				User.findOne({email: args.email}).exec((err, _user) => {
					if (err) callback(err);
					else if (_user) callback(new Error('Email id already register.'));
					else callback();
				});
			},
			// Validate for new user creation
			callback => {
				if (user) return callback();
				// Validate create minimum fields
				if (!args.name) return callback(new Error('Name is required!'));
				if (!args.email) return callback(new Error('Email is required!'));
				if (!args.password) return callback(new Error('Password is required!'));
				user = new User({role: 'APP_USER', isEnabled: true});
				callback();
			},
			// Validate for new user creation
			callback => {
				if (!user) return callback();
				user.isEnabled = true;
				if (args.name) user.name = args.name;
				if (args.email) user.email = args.email;
				if (args.password) user.password = args.password;

				user.save(function (err) {
					if (err) callback(err);
					else callback();
				})
			},
			// Send welcome email to user
			callback => {
				if (!user) return callback();
				EmailService.sendMail(user.email, 'Welcome', user, function (err, _result) {
					if (err) console.log(err);
					console.log(err, _result)
					callback()
				})
			}
		],
		(err, results) => {
			if (err) return cb(err);
			authInfo = {
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role
			};
			request.loginUser(authInfo);
			user.token = request.token;
			cb(null, user)
		}
	)
};

function convertToObjectId(id) {
	try {
		return ObjectId(id);
	} catch (c) {
		return null;
	}
}
