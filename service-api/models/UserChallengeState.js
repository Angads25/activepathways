var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * UserChallengeState Model
 * ==========
 */
var UserChallengeState = new keystone.List('UserChallengeState');

UserChallengeState.add({
	user: {type: Types.Relationship, ref: 'AppUser', required: true, initial: true},
	programme: {type: Types.Relationship, ref: 'Programme', initial: true, required: true},
	challenge: {type: Types.Relationship, ref: 'Challenge', initial: true, required: true},
	notes: {type: Types.Text, initial: true, required: true},
	status: {type: Types.Text, initial: true, required: true},
	track: {type: Types.Text, initial: true, required: true}
});

/**
 * Registration
 */
UserChallengeState.defaultColumns = 'user, programme, challenge, notes, status, track';
UserChallengeState.register();
