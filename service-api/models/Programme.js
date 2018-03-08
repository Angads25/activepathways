var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Programme Model
 * ==========
 */
var Programme = new keystone.List('Programme');

Programme.add({
	name: {type: Types.Text, required: true, index: true, initial: true, label: 'Name'},
	durationDays: {type: Types.Number, initial: true, required: true},
	challenges: {type: Types.Relationship, ref: 'Challenge', initial: true, default: false, many: true},
	description: {type: Types.Text, initial: true, required: true},
	track: {type: Types.Text, initial: true, required: true}
});

/**
 * Registration
 */
Programme.defaultColumns = 'name, durationDays, challenges, description, track';

Programme.relationship({ path: 'userchallengeslabs', ref: 'UserChallengeSlab', refPath: 'programme' });

Programme.register();
