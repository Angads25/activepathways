var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * UserChallengeState Model
 * ==========
 */
var UserChallengeState = new keystone.List('UserChallengeState', {track: true});

UserChallengeState.add({
	user: {type: Types.Relationship, ref: 'AppUser', required: true, initial: true},
	programme: {type: Types.Relationship, ref: 'Programme', initial: true, required: true},
	challenge: {type: Types.Relationship, ref: 'Challenge', initial: true, required: true},
	notes: {type: Types.Text, initial: true, required: false},
	rating: {type: Number, initial:true},
	status: {
		type: Types.Select,
		options: ['PENDING', 'STARTED', 'COMPLETED', 'SKIPPED'],
		initial: true,
		required: true
	},
	challengeDate: {type: Types.Date, initial: true, required: true}
});

/**
 * Registration
 */
UserChallengeState.defaultColumns = 'user, programme, challenge, notes, status, track';
UserChallengeState.register();
