const UserChallengeState = require('keystone').list('UserChallengeState').model,
	async = require('async'),
	moment = require('moment'),
	ObjectId = require('mongoose').Types.ObjectId;

module.exports = class SkipIncompleteChallenges {
	static get trigger() {
		return "0 0 * * *";
	}
	static task(err, done) {
		console.log('Triggering Challenges skip.');
		let users = [];
		async.series([
			callback => {
				UserChallengeState.find({$and: [{challengeDate: {$lte: moment().subtract(1, 'days').endOf('day')}}, {$or: [{status: 'PENDING'}, {status: 'STARTED'}]}]}).exec((err, _users) => (callback(err, users = (_users || []).map(user => user._id))))
			},
			callback => {
				UserChallengeState.update({'_id': {$in: users}}, {
					$set: {
						status: 'SKIPPED'
					}
				}).exec((err, _status) => callback(err, _status));
			}
		], (err) => {
			if (err) log.error(`ERROR in Job ${this.name}`, err);
			done();
		});
	}
}
