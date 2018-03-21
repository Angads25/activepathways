const keystone = require('keystone'),
	Programme = keystone.list('Programme').model,
	async = require('async'),
	graphql = require('graphql');

const ProgrammeType = require('../types/ProgrammeType');

module.exports = {
	upsertProgramme: {
		type: ProgrammeType,
		description: 'Programme',
		args: {
			id: {
				type: graphql.GraphQLString
			},
			name: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLString)
			},
			durationDays: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLInt)
			},
			challenges: {
				type: new graphql.GraphQLList(graphql.GraphQLString)
			},
			description: {
				type: graphql.GraphQLString
			}
		},
		resolve: (parent, args, request) => (new Promise((resolve, reject) => {
				let programme;

				async.series([
					// fetch challenge
					callback => {
						if (!args.id) return callback();
						let programmeId = convertToObjectId(args['id']);
						if (!programmeId) return callback(new Error('Invalid Programme ID passed!'));
						Programme.findOne({_id: programmeId}).exec((err, _programme) => {
							if (err) callback(err);
							else if (_programme) callback(null, programme = _programme);
							else callback(new Error('No challenge by provided id.'));
						});
					},
					// Validate for new challenge creation
					callback => {
						if (programme) return callback();
						if (!args.name) return callback(new Error('Name is required!'));
						if (!args.description) return callback(new Error('Description is required!'));
						if (!args.durationDays) return callback(new Error('Duration Days is required!'));
						programme = new Programme();
						callback();
					},
					// update if exits
					callback => {
						if (!programme) return callback();
						if (args.name) programme.name = args.name;
						if (args.description) programme.description = args.description;
						if (args.durationDays) programme.durationDays = args.durationDays;
						if (args.challenges) programme.challenges = args.challenges;
						programme.save(function (err) {
							if (err) callback(err);
							else callback();
						});
					}
				], (err) => {
					if (err) reject(err);
					else resolve(programme);
				});
			}
		))

	},
};

function convertToObjectId(id) {
	try {
		return ObjectId(id);
	} catch (c) {
		return null;
	}
}
