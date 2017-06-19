/* eslint-env mocha */
 
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Messages } from './messages.js';

if (Meteor.isServer) {
  describe('Messages', () => {
      describe('methods', () => {
	   const userId = Random.id();
      let taskId1;
	  let taskId2;
	  
      beforeEach(() => {
        Tasks.remove({});
        taskId1 = Messages.insert({
          text: 'testtask1',
          createdAt: new Date(),
          owner: userId,
          username: 'tmeasday',
        });

	  taskId2 = Message.insert({
          text: 'testtask2',
          createdAt: new Date(),
          owner: userId,
          username: 'tmeasday',
        });

      });
	  
	  it('can delete owned tasks', () => {
	       // Find the internal implementation of the task method so we can
        // test it in isolation
        const deleteTask = Meteor.server.method_handlers['tasks.remove'];
 
        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };
 
        // Run the method with `this` set to the fake invocation
        deleteTask.apply(invocation, [taskId1]);
	deleteTask.apply(invocation, [taskId2]);
 
        // Verify that the method does what we expected
        assert.equal(Messages.find().count(), 0);
      });
      });
  });
}
