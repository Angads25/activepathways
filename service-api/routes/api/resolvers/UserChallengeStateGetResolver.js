const graphql = require('graphql'),
	keystone = require('keystone'),
	UserChallengeState = keystone.list('UserChallengeState').model,
	UserChallengeStateType = require('../types/UserChallengeStateType');

module.exports = {
	userChallengeStateQuery: {
		type: UserChallengeStateType,
		description: 'Fetches a UserChallengeState by ID!',
		args: {
			id: {
				type: graphql.GraphQLString,
				description: 'Id'
			}
		},
		resolve: (parent, args, request) => (new Promise((resolve, reject) => {
				let query = {};
				if (!request._user && !request._user._id) return reject(new Error('Permission denied!'));
				query._id = args['id'];
				if (!args['id']) reject(new Error('Id is required'));
				UserChallengeState.findOne(query).exec((err, _programme) => {
					if (err) return reject(err);
					if (_programme) return resolve(null, _programme, request);
					reject(new Error('Invalid id!'));
				})
			}
		))
	},
};


