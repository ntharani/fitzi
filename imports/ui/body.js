import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Messages } from '../api/messages.js';

import './message.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
      Meteor.subscribe('messages');
});

Template.body.helpers({
  messages() {
	const instance = Template.instance();
	return Messages.find({}, {text:1, createdAt:1});
    },
});

Template.body.events({
    'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    console.log("triggered");
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
   // Post a message to the system - without an explicit server side call
    Messages.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });

	
    // Clear form
    target.text.value = '';
  },
});
