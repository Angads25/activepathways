const EmailService = require("../services/EmailService"),
	UserChallengeState = require('keystone').list('UserChallengeState').model,
	async = require('async'),
	moment = require('moment'),
	ObjectId = require('mongoose').Types.ObjectId;

module.exports = class DailyCheckinJob {

	static get trigger() {
		return "0 8 * * *"; // 8:00 AM every day
	}

	static task(_, done) {
		console.log("Triggering", this.name);
		let userChallenges, 
			tasks = [];
		const greaterThanDate = moment().startOf('day')._d;
		const lessThanDate = moment().endOf('day')._d;

		tasks.push((callback) => {
			UserChallengeState.find(
				{
					challengeDate: {
						$gte: greaterThanDate,
						$lt: lessThanDate
					},
					status: "PENDING"
				}
			).populate("user").exec((err, _challenges) => {
				if (err) return callback(err);
				else callback(null, userChallenges = _challenges || [])
			})
		});

		tasks.push((callback) => {
			async.mapLimit(userChallenges, 10, (_challenge, callback) => {
				EmailService.sendMail(_challenge.user.email, "You have a new challenge!", "emailNewChallenge", {
					username: _challenge.user.name.first,
					websiteUrl: process.env.WEBSITE_URL,
					challengeId: _challenge._id
				}, (err, emailResp) => {
					console.log("Sending Mail", _challenge.user);
					if (err) console.log("email error", err);
					callback(null, emailResp);
				});
			}, (err, done) => {
				callback(err, done);
			});
		});

		async.series(tasks, (err, res) => {
			console.log("Job Completed");
			if (err) console.log("err ", this.name, err);
			done();
		})
	}
};
    
