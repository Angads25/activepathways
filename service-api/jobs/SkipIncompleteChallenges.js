const UserChallengeState = require('keystone').list('UserChallengeState').model,
	async = require('async'),
	moment = require('moment'),
	ObjectId = require('mongoose').Types.ObjectId;

module.exports = class SkipIncompleteChallenges {

	static get trigger() {
		return "1 0 * * *";
	}

	static task(err, done) {
		console.log('Triggering', this.name);
		const yesterdayEOD = moment().subtract(1, 'days').endOf('day')._d;
		console.log('YESTERDAY: EOD', yesterdayEOD);
		UserChallengeState.update(
			{
				challengeDate: {$lte: yesterdayEOD},
				status: {$in: ['PENDING', 'STARTED']}
			},
			{
				$set: {status: 'SKIPPED'}
			},
			{
				multi: true
			}
		).exec((err) => {
			if (err) log.error(`ERROR in Job ${this.name}`, err);
			done();
		});
	}
};
