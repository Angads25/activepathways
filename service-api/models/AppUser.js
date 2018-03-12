var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * AppUser Model
 * ==========
 */
var AppUser = new keystone.List('AppUser');

AppUser.add({
	name: {type: Types.Name, required: true, index: true, initial: true, label: 'Name'},
	email: {type: Types.Email, initial: true, required: true, unique: true, index: true},
	password: {type: Types.Password, initial: true, required: true},
	isEnabled: {type: Types.Boolean, initial: true, default: false},
	role: {type: Types.Text, initial: true, required: true}
});

/**
 * Registration
 */
AppUser.defaultColumns = 'name, email, isEnabled, role';

AppUser.relationship({path: 'userchallengeslabs', ref: 'UserChallengeSlab', refPath: 'user'});

AppUser.register();
