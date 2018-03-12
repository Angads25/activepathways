const keystone = require('keystone'),
	graphqlExpress = require('express-graphql'),
	graphql = require('graphql');

// Query Fields
const UserQueryField = require('./resolvers/UserGetResolver');
	
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
			user: UserQueryField.userQuery
		}),
	}),
	// /**
	//  * Data modification queries
	//  * */
	// mutation: new graphql.GraphQLObjectType({
	// 	name: 'Mutation',
	// 	description: 'Root of all data modification queries.',
	// 	fields: () => ({

	// 	})
	// }),
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
