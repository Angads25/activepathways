const EmailService = require("../services/EmailService"),
	UserChallengeState = require('keystone').list('UserChallengeState').model,
	async = require('async'),
	moment = require('moment'),
	ObjectId = require('mongoose').Types.ObjectId;

module.exports = class DailyCheckoutJob {

	static get trigger() {
		return "0 18 * * *"; // 6:00 PM every day
	}

	static task(_, done) {
		console.log("Triggering", this.name);
		let userChallenges, tasks = [];
		const greaterThanDate = moment().startOf('day')._d;
		const lessThanDate = moment().endOf('day')._d;

		tasks.push((callback) => {
			UserChallengeState.find(
				{
					challengeDate: {
						$gte: greaterThanDate,
						$lt: lessThanDate
					},
					status: {$in: ['PENDING', 'STARTED']}
				}
			).populate("user").exec((err, _challenges) => {
				if (err) return callback(err);
				else callback(null, userChallenges = _challenges || [])
			})
		});

		tasks.push((callback) => {
			async.mapLimit(userChallenges, 10, (_challenge, callback) => {
				console.log('[JOB CHECKOUT] - Sending mail to ', _challenge._id, _challenge.user && _challenge.user.email || null);
				if (!(_challenge && _challenge.user && _challenge.user.email)) {
					console.log('QUITing this mail...');
					return callback();
				}
				EmailService.sendMail(_challenge.user.email, "How did it go Today? Please check-in", "emailCheckIn", {
					username: _challenge.user.name.first,
					websiteUrl: process.env.WEBSITE_URL,
					challengeId: _challenge._id
				}, (err, emailResp) => {
					if (err) console.log("email error", err);
					callback(null, emailResp);
				})
			}, (err, done) => {
				callback(err, done);
			})
		});

		async.series(tasks, (err, res) => {
			if (err) console.log("err ", this.name, err);
			done();
		})
	}
}
