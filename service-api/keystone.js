require('dotenv').config();
var keystone = require('keystone');
var handlebars = require('express-handlebars');
const async = require('async');
const process = require('process');
const fs = require('fs');
const path = require('path');
const Agenda = require('agenda');
keystone.init({
	'name': 'Active Pathways',
	'brand': ' The Active Pathways Admin',
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': '.hbs',
	'admin path': 'admin',
	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'emails': 'templates/emails',

	'cloudinary config': {
		cloud_name: 'drj4dg734',
		api_key: '499668317317476',
		api_secret: 'w4LeUlrSyY_UqVsh7uyQ7ITq118'
	},

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'AdminUser',
	'signin logo': {src: '/images/logo_tr.png', width: '100%'}
});

keystone.import('models');

keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

keystone.set('routes', require('./routes'));

keystone.set('cors allow origin', true);

keystone.set('nav', {
	'Users': ['AdminUser', 'AppUser'],
	'Content': ['Challenge', 'Programme'],
	'Tracks': ['UserChallengeState', 'UserProgrammeEnrollment']
});


if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
	console.log('----------------------------------------'
		+ '\nWARNING: MISSING MAILGUN CREDENTIALS'
		+ '\n----------------------------------------'
		+ '\nYou have opted into email sending but have not provided'
		+ '\nmailgun credentials. Attempts to send will fail.'
		+ '\n\nCreate a mailgun account and add the credentials to the .env file to'
		+ '\nset up your mailgun integration');
}

let list = fs.readdirSync(path.join('./', 'jobs'));

const agenda = new Agenda({
	db: {address: 'localhost:27017/activepathways'},
	defaultConcurrency: 1,
	defaultLockLifetime: 10000
});

agenda.on('ready', () => {
	async.mapSeries(list, (item, callback) => {
		if (item.search(/.js$/) !== -1) {
			let name = item.toString().replace(/\.js$/, '');
			const job = require('./' + path.join('./', 'jobs', item.toString()));
			agenda.define(name, job.task.bind(job));
			agenda.every(job.trigger, name);
		}
		callback();
	}, err => {
		if (err) console.log(err);
		else agenda.start();
	});
});

agenda.on('error', err => console.log(err));

keystone.start();
