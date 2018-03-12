var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Challenge Model
 * ==========
 */
var Challenge = new keystone.List('Challenge', {track: true});

Challenge.add({
	name: {type: Types.Text, required: true, index: true, initial: true, label: 'Name'},
	taskDescription: {type: Types.Textarea, initial: true, required: true}
});

/**
 * Registration
 */
Challenge.defaultColumns = 'name, taskDescription, createdAt, updatedAt, createdBy, updatedBy';

// Challenge.relationship({path: 'programmes', ref: 'Programme', refPath: 'challenges'});

// Challenge.relationship({path: 'userchallengeslabs', ref: 'UserChallengeSlab', refPath: 'challenge'});

Challenge.register();
