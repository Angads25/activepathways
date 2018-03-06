
module.exports = {
	trigger (){
		return "0 11 * * *"
	},
	task(job, done) {
		
		console.log("Running job :");
		done()
	}
}
