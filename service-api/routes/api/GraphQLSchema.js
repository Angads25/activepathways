const keystone = require('keystone'),
	graphqlExpress = require('express-graphql'),
	graphql = require('graphql');

// Query Fields
const UserQueryField = require('./resolvers/UserGetResolver');
const ChallengeQueryField = require('./resolvers/ChallengeGetResolver');
const ProgrammeQueryField = require('./resolvers/ProgrammeGetResolver');
const UserChallengeStateQueryField = require('./resolvers/UserChallengeStateGetResolver');
const UserProgrammeEnrollmentQueryField = require('./resolvers/UserProgrammeEnrollmentGetResolver');
const LoginQueryField = require('./resolvers/LoginResolver');
const UserMutationField = require('./resolvers/UserMutationResolver');
const ChallengeMutationField = require('./resolvers/ChallengeMutationResolver');
const ProgrammeMutationField = require('./resolvers/ProgrammeMutationResolver');
const ChallengeStateMutationField = require('./resolvers/UserChallengeStateMutationResolver');
const UserProgrammeEnrollmentField = require('./resolvers/UserProgrammeEnrollmentMutationResolver');
const ForgetPasswordField = require('./resolvers/ForgetPassword');

//Mutation Fields


// Define schema
const ProjectNameGraphQLSchema = new graphql.GraphQLSchema({
	/**
	 * Queries (Read only)
	 * */
	query: new graphql.GraphQLObjectType({
		name: 'Query',
		description: 'The root of all queries',
		fields: () => ({
			user: UserQueryField.userQuery,
			challenge: ChallengeQueryField.challengeQuery,
			programme: ProgrammeQueryField.programmeQuery,
			userChallengeState: UserChallengeStateQueryField.userChallengeStateQuery,
			userProgrammeEnrollment: UserProgrammeEnrollmentQueryField.userProgrammeEnrollmentQuery,
			login: LoginQueryField.login,
			logout: LoginQueryField.logout,
			forgetPassword: ForgetPasswordField.forgetPassword
		}),
	}),
	/**
	 * Data modification queries
	 * */
	mutation: new graphql.GraphQLObjectType({
		name: 'Mutation',
		description: 'Root of all data modification queries.',
		fields: () => ({
			upsertUser: UserMutationField.upsertUser,
			upsertChallenge: ChallengeMutationField.upsertChallenge,
			upsertUserChallengeState: ChallengeStateMutationField.upsertChallengeState,
			upsertUserProgrammeEnrollment: UserProgrammeEnrollmentField.UserProgrammeEnrollment,
			upsertProgramme: ProgrammeMutationField.upsertProgramme,
		})
	}),
});

/**
 * Define GraphQL endpoints
 * */
exports.get = graphqlExpress({
	schema: ProjectNameGraphQLSchema,
	graphiql: /*process.env.NODE_ENV !== 'production'*/ true
});

exports.post = graphqlExpress({
	schema: ProjectNameGraphQLSchema,
	graphiql: false
});
