const challengeType = require('./ChallengeType');
const programmeType = require('./ProgrammeType');
const userType = require('./UserType');
const challengeGetResolver = require('../resolvers/ChallengeGetResolver');
const programmeGetResolver = require('../resolvers/ProgrammeGetResolver');
const userGetResolver = require('../resolvers/UserGetResolver');

const graphql = require('graphql');
//import queryTypes

exports = module.exports = new graphql.GraphQLObjectType({
	name: 'UserChallengeState',
	description: 'Describes a ChallengeState',
	fields: () => ({
		id: {
			type: graphql.GraphQLString
		},
		user: {
			type: userType,
			resolve: (challengeState, args, request) => userGetResolver.userQuery.resolve(null, {id: challengeState.id}, request)
		},
		programme: {
			type: programmeType,
			resolve: (challengeState, args, request) => programmeGetResolver.programmeQuery.resolve(null, {id: challengeState.programme}, request),
		},
		challenge: {
			type: challengeType,
			resolve: (challengeState, args, request) => challengeGetResolver.challengeQuery.resolve(null, {id: challengeState.challenge}, request),
		},
		notes: {
			type: graphql.GraphQLString
		},
		status: {
			type: graphql.GraphQLString
		},
		createdAt: {
			type: graphql.GraphQLString
		},
		challengeDate: {
			type: graphql.GraphQLString
		}
	})
});
