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
			resolve: (userProgrammeEnrollment) => userGetResolver.userQuery.resolve(null, {id: userProgrammeEnrollment.user})
		},
		programme: {
			type: programmeType,
			resolve: (userProgrammeEnrollment) => programmeGetResolver.programmeQuery.resolve(null, {id: userProgrammeEnrollment.programme}),
		},
		status :{
			type: graphql.GraphQLString
		}
	})
});
