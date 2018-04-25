'use strict';

var nodemailer = require('nodemailer'),
	fs = require('fs'),
	path = require('path'),
	process = require('process'),
	async = require('async'),
	Handlebars = require('handlebars'),
	transporter = nodemailer.createTransport({
		service: 'Mailgun',
		auth: {
			user: process.env.MAILGUN_USER,
			pass: process.env.MAILGUN_PASSWORD
		},
		fromEmail: process.env.MAILGUN_USER,
		subject: 'Welcome'
	});

const REPORT_TEMPLATES_BASE_PATH = path.join(__dirname, '../templates', 'emailTemplates');

module.exports = {

	//Sends the mail
	sendMail: function (to, subject, template, data, callback) {

		var tasks = [],
			result,
			additionalParameters = {};

		tasks.push(function (callback) {
			_compileTemplate(template, data, function (err, html) {
				if (err) return callback();
				additionalParameters.html = html;
				console.log(html);
				callback();
			});
		});

		tasks.push(function (callback) {
			additionalParameters.to = to;
			additionalParameters.from = `The Active Pathways Team < ${process.env.MAILGUN_USER} >`;
			additionalParameters.subject = subject;
			_sendMail(additionalParameters, function (err, resp) {
				if (err) return callback(err);
				console.log(resp);
				callback(null, result = 'Success');
			});
		});

		async.series(tasks, function (err) {
			callback(err, result);
		});
	},

	sendHTML: function (to, html, subject, callback) {
		let additionalParameters = {};
		additionalParameters.html = html;
		additionalParameters.to = to;
		additionalParameters.from = transporter.fromEmail;
		additionalParameters.subject = subject;
		_sendMail(additionalParameters, function (err, resp) {
			if (err) return callback(err);
			console.log(resp);
			callback(null, 'Success');
		});
	}
};

function _sendMail(config, callback) {
	transporter.sendMail(config, callback);
}

function _compileTemplate(name, model, callback) {

	var tasks = [],
		template,
		html;

	//Fetch template file
	tasks.push(function (callback) {
		fs.readFile(path.join(REPORT_TEMPLATES_BASE_PATH, name + '.html'), function (err, contents) {
			if (err) callback(err);
			else callback(null, template = (contents || '').toString());
		});
	});

	//Compile
	tasks.push(function (callback) {
		try {
			html = Handlebars.compile(template)(model);
			callback();
		} catch (err) {
			callback(err);
		}
	});

	//run tasks
	async.series(tasks, function (err) {
		if (err) callback(err);
		else callback(null, html);
	});
}
