const graphql = require('graphql');
//import queryTypes

exports = module.exports = new graphql.GraphQLObjectType({
	name: 'Challenge',
	description: 'Describes a challenge',
	fields: () => ({
		id: {
			type: graphql.GraphQLString
		},
		name: {
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
			type: new graphql.GraphQLObjectType({
				name: 'IllustrationObjectType',
				fields: () => ({
					public_id: {
						type: graphql.GraphQLString
					},
					version: {
						type: graphql.GraphQLInt
					},
					signature: {
						type: graphql.GraphQLString
					},
					width: {
						type: graphql.GraphQLInt
					},
					height: {
						type: graphql.GraphQLInt
					},
					format: {
						type: graphql.GraphQLString
					},
					resource_type: {
						type: graphql.GraphQLString,
					},
					url: {
						type: graphql.GraphQLString
					},
					secure_url: {
						type: graphql.GraphQLString
					}
				})
			})
		}
	})
});
