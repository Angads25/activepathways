const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
const User = new keystone.List('User', {
	track: true,
	map: { name: 'name' },
});

User.add('Profile', {
	name: { type: Types.Name, required: true, index: true, initial: true, label: 'Name' },
	email: { type: Types.Email, required: true, indexed: true, initial: true },
	language: { type: Types.Select, options: 'ENGLISH,HINDI', required: false, initial: true, default: 'ENGLISH' },
	fcmToken: { type: Types.Text, required: true, initial: true }
});


/**
 * Registration
 */
User.defaultColumns = 'name, email,createdAt, updatedAt';
User.register();

