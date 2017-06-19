import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Messages = new Mongo.Collection('messages');
 
if (Meteor.isServer) {
  // Only publish messages that belong to the current user
    Meteor.publish('messages', function messagesPublication() {
	return Messages.find({ owner: this.userId });	
  });
}

Meteor.methods({
    'messages.remove'(messageId) {
	check(messageId, String);
	Messages.remove(messageId);
  },

});
