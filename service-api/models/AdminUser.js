var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * AdminUser Model
 * ==========
 */
var AdminUser = new keystone.List('AdminUser', {track: true});

AdminUser.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Admin', index: true },
});

// Provide access to Keystone
AdminUser.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
AdminUser.defaultColumns = 'name, email, isAdmin';
AdminUser.register();
