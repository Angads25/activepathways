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
				type: graphql.GraphQLString,
				description: 'Id for the user.'
			}
		},
		resolve: (parent, args, request) => (new Promise((resolve, reject) => {
				let query = {};
				// if (!request._user && !request._user._id) return reject(new Error('Permission denied!'));
				query.isEnabled = true;
				if (args['id'] === 'me') query._id = request._user._id;
				else query._id = args['id'];
				if (!args['id']) reject(new Error('Id or token required'));
				AppUser.findOne(query, {password: 0, __v: 0}).exec((err, _user) => {
					if (err) return reject(err);
					if (_user) return resolve(_user);
					reject(new Error('Invalid id!'));
				})
			}
		))
	},
};


