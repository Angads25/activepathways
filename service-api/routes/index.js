/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
const Agendash = require('agendash');
const fs = require('fs');
const path = require('path');

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function (app) {

	app.all('/*', keystone.middleware.cors);
	app.options('/*', function (req, res) {
		res.sendStatus(200);
	});
	// Views
	// app.get('/', routes.views.index);
	app.get('/terms', function (req, res) {
		let file = path.join(__dirname, '../public', 'terms.html');
		if (fs.existsSync(file)) {
			fs.createReadStream(file).pipe(res);
		}
	});
	app.get('/graph', middleware.tokenAuthCommon, middleware.tokenAuth, routes.api.GraphQLSchema.get);
	app.post('/graph', middleware.tokenAuthCommon, middleware.tokenAuth, routes.api.GraphQLSchema.post);
	app.get('/verify/:token', routes.api.VerifyEmail.get);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

	// agenda dash 
	app.use('/jobs/admin', middleware.requireUserWithTargetUrl('/jobs/admin'), Agendash(_agenda));

	// mail test util
	app.use('/util/templates', middleware.requireUserWithTargetUrl('/util/templates'), routes.views.mailTemplateUtil);
};
