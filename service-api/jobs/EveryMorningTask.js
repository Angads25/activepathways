module.exports = class EveryMorningJob {

	static get trigger() {
		return "*/5 * * * * *";
	}

	static task() {
		console.log('Triggering...');
	}
}
