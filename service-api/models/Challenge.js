var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Challenge Model
 * ==========
 */
var Challenge = new keystone.List('Challenge', {track: true});

Challenge.add({
	name: {type: Types.Text, required: true, index: true, initial: true, label: 'Name'},
	description: {type: Types.Textarea, initial: true, required: true},
	shortDescription: {type: Types.Textarea, initial: true, required: true},
	highlightedContent: {type: Types.Textarea, initial: true, required: false},
	illustration: {type: Types.CloudinaryImage, initial: true, required: false},
	youtube: {type: Types.Text,initial:true, required: false}
});

/**
 * Registration
 */
Challenge.defaultColumns = 'name, illustration, taskDescription, createdAt, updatedAt, createdBy, updatedBy';

// Challenge.relationship({path: 'programmes', ref: 'Programme', refPath: 'challenges'});

// Challenge.relationship({path: 'userchallengeslabs', ref: 'UserChallengeSlab', refPath: 'challenge'});

Challenge.register();
