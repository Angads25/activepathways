const keystone = require('keystone'),
	UserProgrammeEnrollment = keystone.list('UserProgrammeEnrollment').model,
	async = require('async'),
	graphql = require('graphql'),
	ObjectId = require('mongoose').Types.ObjectId;

const UserProgrammeEnrollmentType = require('../types/UserProgrammeEnrollmentType');

module.exports = {
	UserProgrammeEnrollment: {
		type: UserProgrammeEnrollmentType,
		description: 'Upsert User Programme Enrollment',
		args: {
			id: {
				type: graphql.GraphQLString
			},
			user: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString)
			},
			programme: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString)
			},
			status: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString)
			}
		},
		resolve: (parent, args, request) => (new Promise((resolve, reject) => {
				let challenge;

				async.series([
					// fetch challenge
					callback => {
						if (!request._user && !request._user._id) return reject(new Error('Permission denied!'));
						if (!args.id) return callback();
						let challengeId = convertToObjectId(args['id']);
						if (!challengeId) return callback(new Error('Invalid ID passed!'));
						UserProgrammeEnrollment.findOne({_id: challengeId}).exec((err, _challenge) => {
							if (err) callback(err);
							else if (_challenge) callback(null, challenge = _challenge);
							else callback(new Error('No challenge state by provided id.'));
						});
					},
					// Validate for new challenge creation
					callback => {
						if (challenge) return callback();
						if (!args.user) return callback(new Error('User is required!'));
						if (!args.programme) return callback(new Error('Programme is required!'));
						if (!args.status) return callback(new Error('Status is required!'));
						challenge = new UserProgrammeEnrollment();
						callback();
					},
					// update if exits
					callback => {
						if (!challenge) return callback();
						if (args.user) challenge.user = args.user;
						if (args.programme) challenge.programme = args.programme;
						if (args.status) challenge.status = args.status;
						challenge.save(function (err) {
							if (err) callback(err);
							else callback();
						});
					}
				], (err) => {
					if (err) reject(err);
					else resolve(challenge);
				});
			}
		))

	},
};

function convertToObjectId(id) {
	try {
		return ObjectId(id);
	} catch (c) {
		return null;
	}
}
