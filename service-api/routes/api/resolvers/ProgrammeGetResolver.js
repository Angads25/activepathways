const graphql = require('graphql'),
	keystone = require('keystone'),
	Programme = keystone.list('Programme').model,
	ProgrammeType = require('../types/ProgrammeType');

module.exports = {
	programmeQuery: {
		type: ProgrammeType,
		description: 'Fetches a challenge by ID!',
		args: {
			id: {
				type: graphql.GraphQLString,
				description: 'Id'
			}
		},
		resolve: (parent, args, request) => (new Promise((resolve, reject) => {
				let query = {};
				if (!request._user || !request._user._id) return reject(new Error('Permission denied!'));
				query._id = args['id'];
				if (!args['id']) reject(new Error('Id is required'));
				Programme.findOne(query).exec((err, _programme) => {
					if (err) return reject(err);
					if (_programme) return resolve(_programme);
					reject(new Error('Invalid id!'));
				})
			}
		))
	},
};
