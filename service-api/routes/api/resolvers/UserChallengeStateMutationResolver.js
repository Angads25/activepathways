const keystone = require('keystone'),
	UserChallengeState = keystone.list('UserChallengeState').model,
	async = require('async'),
	graphql = require('graphql');

const UserChallengeStateType = require('../types/UserChallengeStateType');

module.exports = {
	upsertChallengeState: {
		type: UserChallengeStateType,
		description: 'Upsert Challenge state',
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
			challenge: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString)
			},
			notes: {
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
						if (!args.id) return callback();
						let challengeId = convertToObjectId(args['id']);
						if (!challengeId) return callback(new Error('Invalid ID passed!'));
						UserChallengeState.findOne({_id: challengeId}).exec((err, _challenge) => {
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
						if (!args.challenge) return callback(new Error('Challenge is required!'));
						if (!args.notes) return callback(new Error('Notes is required!'));
						if (!args.status) return callback(new Error('Status is required!'));
						challenge = new UserChallengeState();
						callback();
					},
					// update if exits
					callback => {
						if (!challenge) return callback();
						if (args.user) challenge.user = args.user;
						if (args.programme) challenge.programme = args.programme;
						if (args.challenge) challenge.challenge = args.challenge;
						if (args.notes) challenge.status = args.notes;
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
