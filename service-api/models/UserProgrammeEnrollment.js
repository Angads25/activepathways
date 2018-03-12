var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * UserProgrammeEnrollment Model
 * ==========
 */
var UserProgrammeEnrollment = new keystone.List('UserProgrammeEnrollment', {track: true});

UserProgrammeEnrollment.add({
	user: {type: Types.Relationship, ref: 'AppUser', required: true, initial: true},
	programme: {type: Types.Relationship, ref: 'Programme', initial: true, required: true},
	challenge: {type: Types.Relationship, ref: 'Challenge', initial: true, required: true},
	notes: {type: Types.Text, initial: true, required: true},
	status: {
		type: Types.Select,
		options: ['PENDING', 'STARTED', 'COMPLETED', 'SKIPPED'],
		initial: true,
		required: true
	},
	track: {type: Types.Text, initial: true, required: true}
});

/**
 * Registration
 */
UserProgrammeEnrollment.defaultColumns = 'user, programme, challenge, notes, status, track';
UserProgrammeEnrollment.register();
