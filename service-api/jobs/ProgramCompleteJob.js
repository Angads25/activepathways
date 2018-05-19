const UserChallengeState = require('keystone').list('UserChallengeState').model,
	UserProgrammeEnrollment = require("keystone").list("UserProgrammeEnrollment").model,
	Programme = require("keystone").list("Programme").model,
	async = require('async'),
	moment = require('moment'),
	EmailService = require("../services/EmailService"),
	ObjectId = require('mongoose').Types.ObjectId;

module.exports = class ProgramCompleteJob {

	static get trigger() {
		return "0 9 * * *";  //At 9 AM everyday
	}

	static task(err, done) {
		let tasks = [], userProgrammesStates;
		console.log('Triggering', this.name);
		const yesterdayEOD = moment().subtract(1, 'days').endOf('day')._d;
		const yesterdaySOD = moment().subtract(1, 'days').startOf('day')._d;

		tasks.push((cb) => {
			UserProgrammeEnrollment.find(
				{
					exitDate: {$lte: yesterdayEOD, $gt: yesterdaySOD},
					status: "EXITED"
				}
			).populate([{path: "programme", select: '_id name'}, {
				path: "user",
				select: '_id email name'
			}]).exec((err, _userProgrammesStates) => {
				if (err) return cb(err);
				cb(null, userProgrammesStates = _userProgrammesStates)
			});
		});

		tasks.push((cb) => {
			if (!userProgrammesStates) return cb();
			console.log("======", userProgrammesStates);
			async.map(userProgrammesStates, (userProgram, cb) => {
				console.log('[JOB Program Completed] - Sending mail to ', userProgram._id, userProgram.user && userProgram.user.email || null);
				if(!(userProgram && userProgram.user && userProgram.user.email)) {
					console.log('QUITing this mail...');
					return cb();
				}
				EmailService.sendMail(userProgram.user.email, "Program Completed", "programmeEmail", {user: userProgram.user}, (err, result) => {
					if (err) return cb(err);
					cb()
				})
			}, (err) => {
				if (err) return cb(err);
				cb()
			})
		});

		async.series(tasks, (err, result) => {
			if (err) console.error(`ERROR in Job ${this.name}`, err);
			done();
		})
	}
};
