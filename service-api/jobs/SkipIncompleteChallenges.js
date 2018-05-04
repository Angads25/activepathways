const UserChallengeState = require('keystone').list('UserChallengeState').model,
	UserProgrammeEnrollment = require("keystone").list("UserProgrammeEnrollment").model,
	Programme = require("keystone").list("Programme").model,
	async = require('async'),
	moment = require('moment'),
	ObjectId = require('mongoose').Types.ObjectId;

module.exports = class SkipIncompleteChallenges {

	static get trigger() {
		return "1 0 * * *";
	}

	static task(err, done) {
		let tasks = [], _programmes, _userChallenges;
		console.log('Triggering', this.name);
		const yesterdayEOD = moment().subtract(1, 'days').endOf('day')._d;
		console.log('YESTERDAY: EOD', yesterdayEOD);

		tasks.push((cb) => {
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
				if (err) cb(err);
				cb()
			});
		});

		tasks.push((cb) => {
			Programme.find().exec((err, programmes) => {
				if (err) cb(err);
				cb(null, _programmes = programmes)
			});
		});

		tasks.push((cb) => {
				if (!_programmes) return;
				async.map(_programmes, (programme, cb) => {
					const startDate = moment().subtract(programme.durationDays + 1, 'days').startOf('day')._d;
					const endDate = moment().subtract(1, 'days').endOf('day')._d;

					UserChallengeState.aggregate([
						{
							$match: {
								programme: ObjectId(programme._id),
								challengeDate: {$gt: startDate, $lte: endDate},
								status: {$in: ["COMPLETED", "SKIPPED"]}
							}
						}, {
							$group: {
								_id: "$user",
								totalCount: {
									$sum: 1
								}
							}
						}
					]).exec((err, _userChallenges) => {
						if (err) cb(err);
						_userChallenges.forEach((user) => {
							if (user.totalCount === programme.durationDays) {
								UserProgrammeEnrollment.update({
									programme: ObjectId(programme._id),
									user: ObjectId(user._id),
									status: "JOINED"
								}, {
									$set: {status: "EXITED", exitDate: moment().subtract(1, "days")._d}
								}).exec((err, result) => {
									if (err) cb(err);
									cb();
								})
							}
						});
					});
				}, (err) => {
					if (err) cb(err);
					cb()
				});
			}
		);

		async.series(tasks, (err, result) => {
			if (err) console.error(`ERROR in Job ${this.name}`, err);
			done();
		})
	}
};
