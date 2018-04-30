const EmailService = require("../services/EmailService"),
	UserChallengeState = require('keystone').list('UserChallengeState').model,
	AppUser = require('keystone').list('AppUser').model,
	Programme = require('keystone').list('Programme').model,
	async = require('async'),
	moment = require('moment');

module.exports = class AfterChallengeCompleted {

	static get trigger() {
		return "0 9 * * *"; // 9:00 AM every day
	}

	static task(err, done) {
		console.log("Triggering", this.name);
		let userChallenges, tasks = [], completedChallenges = [];
		const greaterThanDate = moment().subtract(1, 'days').startOf('day')._d;
		const lessThanDate = moment().subtract(1, 'days').endOf('day')._d;

		tasks.push((callback) => {
			UserChallengeState.aggregate([{
				$match: {
					challengeDate: {$gte: greaterThanDate, $lt: lessThanDate},
					status: {$in: ['COMPLETED', 'SKIPPED']}
				}
			}, {
				$group: {
					_id: "$programme",
					user: {$first: '$user'},
					count: {$sum: 1}
				},
			}]).exec((err, _challenges) => {
				if (err) return callback(err);
				else callback(null, userChallenges = _challenges || [])
			})
		});

		tasks.push((callback) => {
			async.map(userChallenges, function (obj, callback) {
				Programme.findOne({_id: obj._id}).exec(function (error, done) {
					if (done && done.challenges && done.challenges.length === obj.count) {
						completedChallenges.push(obj);
					}
					callback()
				})
			}, callback)
		});

		tasks.push((callback) => {
			async.mapLimit(completedChallenges, 10, (obj, callback) => {
				AppUser.findOne({_id: obj.user}).exec((err, _user) => {
					if (err) return callback(err);
					else {
						EmailService.sendMail(_user.email, "Please fill the short survey ", "programmeEmail", {
							username: _user.name.first
						}, (err, emailResp) => {
							if (err) console.log("email error", err);
							callback(err, emailResp);
						})
					}
				});
			}, (err, done) => {
				callback(err, done);
			})
		});

		async.series(tasks, (err, res) => {
			if (err) console.log("err ", this.name, err);
			done(err, res);
		})
	}
}
