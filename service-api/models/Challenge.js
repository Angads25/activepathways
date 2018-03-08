var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Challenge Model
 * ==========
 */
var Challenge = new keystone.List('Challenge');

Challenge.add({
	name: {type: Types.Text, required: true, index: true, initial: true, label: 'Name'},
	taskDescription: {type: Types.Textarea, initial: true, required: true},
	track: {type: Types.Text, initial: true, required: true}
});

/**
 * Registration
 */
Challenge.defaultColumns = 'name, taskDescription, track';

Challenge.relationship({path: 'programmes', ref: 'Programme', refPath: 'challenges'});

Challenge.register();
