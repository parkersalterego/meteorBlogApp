import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Posts  = new Mongo.Collection('posts');

if (Meteor.isServer) {
    Meteor.publish('posts.findByUser', function() {
        return Posts.find({userId: this.userId});
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
            post.createdAt = new Date().getTime();
            Posts.insert(post);
        }
    },
    'posts.findById'(id) {
        if (!this.userId) {
            throw new Meteor.Error('Not-Authorized');
        } else {
            return Posts.findOne({_id: id});
        }
    },
    async 'posts.updateOne'(id, title, body) {
        if (!this.userId) {
            throw new Meteor.Error('Not-Authorized');
        } else if (typeof(title) !== 'string' || typeof(body) !== 'string') {
            throw new Meteor.Error(400, 'Invalid data type');
        } else {
            await Posts.update({_id: id}, {$set: {title: title, body: body}});
            return Posts.findOne({_id: id});
        }
    },
    async 'posts.deleteOne'(id) {
        if (!this.userId) {
            throw new Meteor.Error('Not-Authorized');
        } else {
            const deletePost = await Posts.remove(id);
            return deletePost;
        }
    }
});