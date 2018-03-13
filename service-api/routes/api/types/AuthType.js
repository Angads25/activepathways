const graphql = require('graphql');
//import queryTypes

exports = module.exports = new graphql.GraphQLObjectType({
	name: 'Auth',
	description: 'Login user',
	fields: () => ({
		id: {
			type: graphql.GraphQLString
		},
		token: {
			type: graphql.GraphQLString
		}
	})
});
