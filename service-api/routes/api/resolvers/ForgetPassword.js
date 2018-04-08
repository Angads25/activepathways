const keystone = require('keystone'),
	AppUser = keystone.list('AppUser').model,
	async = require('async'),
	graphql = require('graphql');

const EmailService = require('../../../services/EmailService');
const AuthService = require('../../../services/AuthService');

module.exports = {
	forgetPassword: {
		type: new graphql.GraphQLObjectType({
			name: 'ForgetPassword',
			description: 'forget password',
			fields: () => ({
				success: {
					type: graphql.GraphQLBoolean
				}
			})
		}),
		description: 'Forget password',
		args: {
			email: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString)
			}
		},
		resolve: (parent, args, request) => (
			new Promise((resolve, reject) => {
					let user,
						token;

					async.series([
						// find user
						callback => {
							AppUser.findOne({email: args.email}).exec((err, _user) => {
								if (err) return callback(err);
								if (_user) return callback(null, user = _user);
								callback(new Error('No user found with email!'));
							})
						},
						// build token
						callback => {
							token = AuthService.encrypt({id: user._id, password: user.password});
							callback();
						},
						// build params
						callback => {
							user = user.toObject();
							user.link = process.env.WEBSITE_URL + token;
							EmailService.sendMail(user.email, "[ActivePathways] Reset your password.", 'ForgetPassword', user, (err, resp) => {
								if (err) return callback(err);
								callback();
							});
						}
					], (err) => {
						if (err) reject(err);
						else resolve({success: true});
					});
				}
			)),
	}
};
