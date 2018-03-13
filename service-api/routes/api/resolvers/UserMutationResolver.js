const keystone = require('keystone'),
	User = keystone.list('AppUser').model,
	async = require('async'),
	mongoose = require('mongoose'),
	graphql = require('graphql'),
	ObjectId = mongoose.Types.ObjectId;

const UserType = require('../types/UserType');

module.exports = {
	upsertUser: {
		type: UserType,
		description: 'Upsert user',
		args: {
			id: {
				type: graphql.GraphQLString
			},
			name: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString)
			},
			email: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString)
			},
			password: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString)
			},
			role: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString)
			},
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
	let user;
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
			// Validate for new user creation
			callback => {
				if (user) return callback();
				// Validate create minimum fields
				if (!args.name) return callback(new Error('Name is required!'));
				if ((!args.email)) return callback(new Error('Email is required!'));
				if (!args.role) return callback(new Error('Role is required!'));
				if (!args.password) return callback(new Error('Password is required!'));
				else {
					user = new User();
					callback();
				}
			}
		],
		(err, results) => {
			if (err) return cb(err);
			if (user) {
				user.isEnabled = true;
				if (args.name) user.name = args.name;
				if (args.email) user.email = args.email;
				if (args.role) user.role = args.role;
				if (args.password) user.password = args.password;

				//	console.log("USER",user);
				user.save(function (err) {
					if (err) cb(err);
					else {
						request.loginUser({
							_id: user._id,
							email: user.email,
							role: user.role
						});
						user.token = request.token;
						user.save(function (err) {
							if (err) cb(err);
							else cb(null, user);
						})

					}
				})
			}
			else {
				cb(new Error('Some Error Occurred'));
			}
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
