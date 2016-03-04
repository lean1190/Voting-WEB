# Voting web

## Making things work

npm install && bower install

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Unit Testing

Running `grunt test` will run the unit tests with karma.

Add the entry localhost.firebaseio.test to the /etc/hosts file in the 127.0.0.1 line

## Integration Testing

Just for the first time, run at the root folder:

./node_modules/protractor/bin/webdriver-manager update

Now start up a server with:

./node_modules/protractor/bin/webdriver-manager start

Running the tests

cd test
protractor protractor.conf.js