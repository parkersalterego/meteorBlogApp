import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    'users.findUserByUsername'(username) {
        return Accounts.findUserByUsername(username);
    }
});