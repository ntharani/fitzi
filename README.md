This is a simple meteor app, created with the recommended meteor app scaffold, using 

`Meteor create <app_name> FULL`

Assumptions based on criteria:

1. The app can post a message to the system without an explicit server side call
This is due to Meteor Mini-Mongo and being able to directly write to the database. The subtext here is that this behaviour should be explicitly allowed, which is not recommended. By default the insecure package is added and needs to be removed prior to production. To make this more secure we could put an explicit allow/deny rule. But that's messy and meteor.methods should be used.

2 & 3 The app can only delete with a server side call. Either way, Meteor supports optimistic UI, so it'll attempt it, but in the case where the delete requestor is not the message author, it will console.log("Not Authorized"). I wanted to use Alert, but that's tricky without using Sinon: https://medium.com/front-end-hacking/how-to-javascript-or-yet-another-javascript-guide-part-6-testing-with-mocha-and-sinon-d879178f85f0

The app will allow a non-registered viewer to see a list of all messages, but the cannot author or delete them.

Tests:

1. It can post a message without an explicit server side call
2. It can delete a message it owns
3. It cannot delete a message it does not own.
4. It will display a date of Jan 1, 1980 before any other posts (Not completed)
5. It will display a date of Jan 1, 2039 after other posts. (Not completed)

To test this app:

1. Please clone https://github.com/ntharani/fitzi
2. NPM install to install the dependencies
3. Type `npm start` which is an alias to `meteor run.` Please visit http://localhost:3000
4. To run tests: `meteor test --driver-package practicalmeteor:mocha --port 3100`. Visit http://localhost:3100 to view tests.

