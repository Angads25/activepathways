const programmeType  = require('./ProgrammeType');
const userType  = require('./UserType');
const programmeGetResolver = require('../resolvers/ProgrammeGetResolver');
const userGetResolver = require('../resolvers/UserGetResolver');

const graphql = require('graphql');
//import queryTypes

exports = module.exports = new graphql.GraphQLObjectType({
	name: 'UserProgrammeEnrollment',
	description: 'Describes a ChallengeState',
	fields: () => ({
		id: {
			type: graphql.GraphQLString
		},
		user: {
			type: userType,
			resolve: (userProgrammeEnrollment, args, request) => userGetResolver.userQuery.resolve(null, {id: userProgrammeEnrollment.user}, request)
		},
		programme: {
			type: programmeType,
			resolve: (userProgrammeEnrollment, args, request) => programmeGetResolver.programmeQuery.resolve(null, {id: userProgrammeEnrollment.programme}, request),
		},
		status :{
			type: graphql.GraphQLString
		}
	})
});
