const graphql = require('graphql'),
	keystone = require('keystone'),
	Challenge = keystone.list('Challenge').model,
	ChallengeType = require('../types/ChallengeType');

module.exports = {
	challengeQuery: {
		type: ChallengeType,
		description: 'Fetches a challenge by ID!',
		args: {
			id: {
				type: graphql.GraphQLString,
				description: 'Id'
			}
		},
		resolve: (parent, args, request) => (new Promise((resolve, reject) => {
				let query = {};
				query._id = args['id'];
				if (!args['id']) reject(new Error('Id is required'));
				Challenge.findOne(query).exec((err, _challenge) => {
					if (err) return reject(err);
					if (_challenge) return resolve(_challenge);
					reject(new Error('Invalid id!'));
				})
			}
		))
	},
};


