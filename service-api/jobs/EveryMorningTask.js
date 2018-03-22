module.exports = class EveryMorningJob {

	static get trigger() {
		return "3 minutes";
	}

	static task() {
		console.log('Triggering...');
	}
}
