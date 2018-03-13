const keystone = require('keystone'),
	graphqlExpress = require('express-graphql'),
	graphql = require('graphql');

// Query Fields
const UserQueryField = require('./resolvers/UserGetResolver');
const LoginQueryField = require('./resolvers/LoginResolver');
const UserMutationField = require('./resolvers/UserMutationResolver');
	
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
			login: LoginQueryField.login,
			logout: LoginQueryField.logout,
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
