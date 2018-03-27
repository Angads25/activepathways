const graphql = require('graphql');
//import queryTypes

exports = module.exports = new graphql.GraphQLObjectType({
	name: 'User',
	description: 'Describes an user',
	fields: () => ({
		id: {
			type: graphql.GraphQLString
		},
		name: {
			type: new graphql.GraphQLObjectType({
				name: 'userName',
				description: 'Name node.',
				fields: {
					first: {
						type: graphql.GraphQLString,
						description: 'First name.'
					},
					last: {
						type: graphql.GraphQLString,
						description: 'Last name.'
					},
					full: {
						type: graphql.GraphQLString,
						description: 'Full name.',
						resolve: name => `${name.first || ''} ${name.last || ''}`.trim()
					}
				}
			}),
			description: 'Name of the user',
			resolve: user => user.name
		},
		email: {
			type: graphql.GraphQLString
		},
		password: {
			type: graphql.GraphQLString
		},
		role: {
			type: graphql.GraphQLString
		},
		isEnabled: {
			type: graphql.GraphQLBoolean
		},
		token: {
			type: graphql.GraphQLString
		},
		createdAt: {
			type: graphql.GraphQLString
		}
	})
});
