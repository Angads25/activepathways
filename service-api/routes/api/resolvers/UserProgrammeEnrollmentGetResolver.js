const graphql = require('graphql'),
	keystone = require('keystone'),
	UserProgrammeEnrollment = keystone.list('UserProgrammeEnrollment').model,
	UserProgrammeEnrollmentType = require('../types/UserProgrammeEnrollmentType');

module.exports = {
	userProgrammeEnrollmentQuery: {
		type: UserProgrammeEnrollmentType,
		description: 'Fetches a UserProgramme Enrollment Type by ID!',
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
				UserProgrammeEnrollment.findOne(query).exec((err, _programme) => {
					if (err) return reject(err);
					if (_programme) return resolve(_programme);
					reject(new Error('Invalid id!'));
				})
			}
		))
	},
};


