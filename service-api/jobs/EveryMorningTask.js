module.exports = class EveryMorningJob {

	static get trigger() {
		return "3 minutes"; // 8:00 AM every morning
	}

	static task() {
		console.log('Triggering...');
	}
}
