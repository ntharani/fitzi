/* eslint-env mocha */
 
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Messages } from './messages.js';

if (Meteor.isServer) {
    describe('methods', function() {
      const userId = Random.id();
      const userId2 = 'xyz';
      let taskId1;
      let taskId2;
	  
      beforeEach( function() {
      
        Messages.remove({});

        taskId1 = Messages.insert({
          text: 'testtask1',
          createdAt: new Date(),
          owner: userId,
          username: 'tmeasday',
        });

        taskId2 = Messages.insert({
          text: 'testtask2',
          createdAt: new Date(),
          owner: userId,
          username: 'tmeasday',
        });

        taskId3 = Messages.insert({
          text: 'testtask3',
          createdAt: new Date(),
          owner: userId2,
          username: 'tmeasday',
        });

      });
	  
  	  it('can delete owned tasks', function() {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        const deleteMessage = Meteor.server.method_handlers['messages.remove'];
 
        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };
 
        // Run the method with `this` set to the fake invocation
        deleteMessage.apply(invocation, [taskId1]);
        deleteMessage.apply(invocation, [taskId2]);
 
        // Verify that the method does what we expected
        assert.equal(Messages.find({owner: userId}).count(), 0);
      });

      it('DB Size should be 3', function() {
        assert.equal(Messages.find().count(), 3)
      });

      it('can not delete tasks it does not own', function() {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        const deleteMessage = Meteor.server.method_handlers['messages.remove'];
 
        // Set up a fake method invocation that looks like what the method expects
        const invocation2 = { userId };
        const invocation3 = { userId2 };
        
        // Run the method with `this` set to the fake invocation
        deleteMessage.apply(invocation2, [taskId1]);
        deleteMessage.apply(invocation2, [taskId2]);
        deleteMessage.apply(invocation2, [taskId3]);


        // Verify that the method does what we expected
        assert.equal(Messages.find().count(), 1);
      });

    });
}

if (Meteor.isClient) {
  describe('HomePage', function() {

    beforeEach( function() {      
      Messages.remove({});
        ctaskId1 = Messages.insert({
          text: 'clientTask1',
          createdAt: new Date(),
          owner: userId,
          username: 'tmeasday',
        });
        ctaskId2 = Messages.insert({
          text: 'clientTask2',
          createdAt: new Date(),
          owner: userId,
          username: 'tmeasday',
        });
    });


    it('A DB Insert should be possible client side.');

  })
}