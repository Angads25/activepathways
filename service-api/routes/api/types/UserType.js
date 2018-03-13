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
			type: graphql.GraphQLString
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
		}
	})
});
