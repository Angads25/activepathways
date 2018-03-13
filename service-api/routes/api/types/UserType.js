const graphql = require('graphql');
//import queryTypes

exports = module.exports = new graphql.GraphQLObjectType({
	name: 'User',
	description: 'Describes an user',
	fields: () => ({
		name: {
			type: graphql.GraphQLString
		},
		email: {
			type: graphql.GraphQLString
		}
	})
});
