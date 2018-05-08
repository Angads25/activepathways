const keystone = require('keystone'),
	User = keystone.list('AppUser').model,
	UserProgrammeEnrollment = keystone.list('UserProgrammeEnrollment').model,
	UserChallengeState = keystone.list('UserChallengeState'),
	Programme = keystone.list('Programme').model,
	async = require('async'),
	mongoose = require('mongoose'),
	graphql = require('graphql'),
	ObjectId = mongoose.Types.ObjectId;

const UserType = require('../types/UserType');
const EmailService = require('../../../services/EmailService');
const AuthService = require('../../../services/AuthService');

const moment = require('moment');

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
				// if (!request._user && !request._user._id) return reject(new Error('Permission denied!'));
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
	let user, authInfo, newUser = false, userProgrammeEnrollment, programme, userChallengeState;
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
				newUser = true;
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
				if (!user || args.id) return callback();
				let _user = user.toObject && user.toObject() || user;
				_user.verificationLink = process.env.WEBSITE_URL + 'verify/' + AuthService.encrypt({id: _user._id, email: _user.email});
				EmailService.sendMail(user.email, "Welcome to ActivePathways.", 'Welcome', _user, function (err, _result) {
					if (err) console.log(err);
					callback()
				})
			},
			// 
			callback => {
				if (!user || args.id) return callback();
				Programme.findOne({name: /.*Starter.*/i}, (err, _programme) => {
					if (err) callback(err);
					else if (_programme) callback(null, programme = _programme);
					else callback(new Error("Unable to find any starter program!"));
				});
			},
			// 
			callback => {
				if (!user || args.id || !programme) return callback();
				userProgrammeEnrollment = new UserProgrammeEnrollment();
				userProgrammeEnrollment.user = user._id;
				userProgrammeEnrollment.programme = programme._id;
				userProgrammeEnrollment.status = "JOINED";

				userProgrammeEnrollment.save(function (err) {
					if (err) callback(err);
					else callback();
				})
			},
			callback => {
				if (!user || args.id || !programme) return callback();
				const userChallenges = []
				programme.challenges.map((challenge, i) => {
					userChallengeState = {}
					userChallengeState.user = user._id;
					userChallengeState.programme = programme._id;
					userChallengeState.challenge = challenge;
					userChallengeState.notes = "";
					userChallengeState.status = "PENDING";
					userChallengeState.challengeDate = moment(user.createdAt).add(i + 1, 'days').format();
					userChallengeState.createdAt = user.createdAt;
					userChallenges.push(userChallengeState)
				})
				UserChallengeState.model.insertMany(userChallenges, function (err) {
					if (err) callback(err);
					else callback();
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
