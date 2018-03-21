const challengeType = require('./ChallengeType');
const challengeGetResolver = require('../resolvers/ChallengeGetResolver');

const graphql = require('graphql');
//import queryTypes

exports = module.exports = new graphql.GraphQLObjectType({
	name: 'Programme',
	description: 'Describes a programme',
	fields: () => ({
		id: {
			type: graphql.GraphQLString
		},
		name: {
			type: graphql.GraphQLString
		},
		durationDays: {
			type: graphql.GraphQLInt
		},
		challenges: {
			type: challengeType,
			resolve: (programme) => challengeGetResolver.challengeQuery.resolve(null, {id: programme.challenges}),
		},
		description: {
			type: graphql.GraphQLString
		}
	})
});
