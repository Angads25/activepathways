const keystone = require('keystone'),
	Challenge = keystone.list('Challenge').model,
	async = require('async'),
	graphql = require('graphql');

const ChallengeType = require('../types/ChallengeType');

module.exports = {
	upsertChallenge: {
		type: ChallengeType,
		description: 'Upsert Challenge',
		args: {
			id: {
				type: graphql.GraphQLString
			},
			name: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString)
			},
			description: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString)
			},
			shortDescription: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString)
			},
			highlightedContent: {
				type: graphql.GraphQLString
			}
		},
		resolve: (parent, args, request) => (new Promise((resolve, reject) => {
				let challenge;

				async.series([
					// fetch challenge
					callback => {
						if (!args.id) return callback();
						let challengeId = convertToObjectId(args['id']);
						if (!challengeId) return callback(new Error('Invalid Challenge ID passed!'));
						Challenge.findOne({_id: challengeId}).exec((err, _challenge) => {
							if (err) callback(err);
							else if (_challenge) callback(null, challenge = _challenge);
							else callback(new Error('No challenge by provided id.'));
						});
					},
					// Validate for new challenge creation
					callback => {
						if (challenge) return callback();
						if (!args.name) return callback(new Error('Name is required!'));
						if (!args.description) return callback(new Error('Description is required!'));
						if (!args.shortDescription) return callback(new Error('Short description is required!'));
						challenge = new Challenge({
							name: args.name,
							description: args.description,
							shortDescription: args.shortDescription
						});
						callback();
					},
					// update if exits
					callback => {
						if (!challenge) return callback();
						if (args.name) challenge.name = args.name;
						if (args.description) challenge.description = args.description;
						if (args.shortDescription) challenge.shortDescription = args.shortDescription;
						if (args.highlightedContent) challenge.highlightedContent = args.highlightedContent;
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
