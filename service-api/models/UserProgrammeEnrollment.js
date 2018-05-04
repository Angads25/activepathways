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
	status: {
		type: Types.Select,
		options: ['JOINED', 'EXITED'],
		initial: true,
		required: true
	},
	exitDate: {type: Types.Date}
});

/**
 * Registration
 */
UserProgrammeEnrollment.defaultColumns = 'user, programme, status, exitDate, track';
UserProgrammeEnrollment.register();
