import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Posts  = new Mongo.Collection('posts');

if (Meteor.isServer) {
    Meteor.publish('posts', function() {
        return Posts.find({});
    });
};

Meteor.methods({
    'posts.insert'(post) {
        if (!this.userId) {
            throw new Meteor.Error('Not-Authorized');
        } else if (typeof(post.title) !== 'string' || typeof(post.body) !== 'string') {
            throw new Meteor.Error('Invalid Format, please use plain text');
        } else {
            post.userId = this.userId;
            post.createdAT = new Date().getTime();
            Posts.insert(post);
        }
    },
});