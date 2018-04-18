const keystone = require('keystone'),
	AppUser = keystone.list('AppUser').model,
	async = require('async'),
	mongoose = require('mongoose'),
	graphql = require('graphql'),
	ObjectId = mongoose.Types.ObjectId,
	bcrypt = require('bcrypt-nodejs');


const EmailService = require('../../../services/EmailService');
const AuthService = require('../../../services/AuthService');

module.exports = {
	resetPassword: {
		type: new graphql.GraphQLObjectType({
			name: 'ResetPassword',
			description: 'reset password',
			fields: () => ({
				success: {
					type: graphql.GraphQLBoolean
				}
			})
		}),
		description: 'Reset Password',
		args: {
			resetPassToken: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString)
			},
			newPassword: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString)
			}
		},
		resolve: (parent, args, request) => (
			new Promise((resolve, reject) => {
				let user,
					token,
					payload;

				async.series([
					// decrypt token
					callback => {
						let _payload = AuthService.decrypt(args.resetPassToken)
						callback(null, payload = _payload);
					},
					// find user
					callback => {
						AppUser.findOne({
							_id: convertToObjectId(payload.id)
						}, (err, _user) => {
							if (err) callback(err);
							if (_user) callback(null, user = _user);
							else callback(new Error('Invalid token.'));
						});
					},

					// save
					callback => {
						user.password = args.newPassword
						user.save(callback);
					},
				], (err) => {
					if (err) reject(err);
					else resolve({success: true});
				});
			}
			)),
	}


};

function convertToObjectId(id) {
	let objectId = null;
	if (id instanceof ObjectId) {
		objectId = id;
	} else if (id) {
		try {
			objectId = ObjectId(id);
		} catch (c) {
			objectId = null;
		}
	}
	return objectId;
}