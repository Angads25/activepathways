const graphql = require('graphql'),
	keystone = require('keystone'),
	UserChallengeState = keystone.list('UserChallengeState').model,
	UserChallengeStateType = require('../types/UserChallengeStateType');

module.exports = {
	userChallengeStateList: {
		type: UserChallengeStateType,
		description: 'UserChallengeState List of user',
		resolve: (parent, args, request) => (new Promise((resolve, reject) => {
				let query = {};
				if (!request._user && !request._user._id) return reject(new Error('Permission denied!'));
				query.user = request._user._id;
				UserChallengeState.findOne(query).exec((err, _programme) => {
					if (err) return reject(err);
					if (_programme) return resolve(_programme);
					resolve({})
				})
			}
		))
	},
};


