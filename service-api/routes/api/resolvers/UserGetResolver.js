const graphql = require('graphql');
const UserType = require('../types/UserType');

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
		resolve: (parent, args, request) => ( new Promise((resolve, reject) => {
			resolve({
				name:'aman'
			})
		}
	))
	},
}


