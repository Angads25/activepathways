var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * AppUser Model
 * ==========
 */
var AppUser = new keystone.List('AppUser', {track: true});

AppUser.add({
	name: {type: Types.Name, required: true, index: true, initial: true, label: 'Name'},
	email: {type: Types.Email, initial: true, required: true, unique: true, index: true},
	password: {type: Types.Password, initial: true, required: true},
	isEnabled: {type: Types.Boolean, initial: true, default: false},
	role: {type: Types.Select, options: ['APP_USER'], initial: true, required: true},
	emailVerified: {type: Types.Boolean, initial: true, default: false}
});

/**
 * Registration
 */
AppUser.defaultColumns = 'name, email, isEnabled, role, createdAt, updatedAt';

// AppUser.relationship({path: 'userchallengestate', ref: 'UserChallengeState', refPath: 'user'});

AppUser.register();
