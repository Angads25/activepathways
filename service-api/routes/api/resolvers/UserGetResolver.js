const graphql = require('graphql'),
	keystone = require('keystone'),
	AppUser = keystone.list('AppUser').model,
	UserType = require('../types/UserType');

module.exports = {
	userQuery: {
		type: UserType,
		description: 'Fetches a perticular user by ID!',
		args: {
			id: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString),
				description: 'Id for the user.'
			}
		},
		resolve: (parent, args, request) => (new Promise((resolve, reject) => {
				AppUser.findOne({_id: args['id'], isEnabled: true}, {password: 0, __v: 0}).exec((err, _user) => {
					if (err) return reject(err);
					if (_user) return resolve(_user);
					reject(new Error('Invalid id!'));
				})
			}
		))
	},
};


