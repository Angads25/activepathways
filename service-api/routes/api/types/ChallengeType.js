const graphql = require('graphql');
//import queryTypes

exports = module.exports = new graphql.GraphQLObjectType({
	name: 'Challenge',
	description: 'Describes a challenge',
	fields: () => ({
		id: {
			type: graphql.GraphQLString
		},
		description: {
			type: graphql.GraphQLString
		},
		shortDescription: {
			type: graphql.GraphQLString
		},
		highlightedContent: {
			type: graphql.GraphQLString
		},
		illustration: {
			type: graphql.GraphQLString
		}
	})
});
