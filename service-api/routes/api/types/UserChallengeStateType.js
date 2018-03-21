const challengeType  = require('./ChallengeType');
const programmeType  = require('./ProgrammeType');
const userType  = require('./UserType');
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
			resolve: (challengeState) => userGetResolver.userQuery.resolve(null, {id: challengeState.user}),
		},
		programme: {
			type: programmeType,
			resolve: (challengeState) => programmeGetResolver.programmeQuery.resolve(null, {id: challengeState.programme}),
		},
		challenge: {
			type: challengeType,
			resolve: (challengeState) => challengeGetResolver.challengeQuery.resolve(null, {id: challengeState.challenge}),
		},
		notes :{
			type: graphql.GraphQLString
		},
		status :{
			type: graphql.GraphQLString
		}
	})
});
