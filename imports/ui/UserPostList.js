import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { Posts } from '../api/Posts';
import history from '../routing/history';

class UserPostsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        this.postsTracker = Tracker.autorun(() => {
            Meteor.subscribe('posts.findByUser');
            const posts = Posts.find({}).fetch();
            this.setState({posts});
        });
    }

    componentWillUnmount() {
        this.postsTracker.stop();
    }

    viewPost(id) {
        Session.set('postId', id);
        history.push(`/post/${id}`);
    }

    renderPostList() {
        if (this.state.posts.length === 0) {
            return <p>No Posts Found</p>;
        } else {
            console.log(this.state.posts);
            return this.state.posts.map((post, index) => {
                return (
                    <div className="post" key={index}>
                        <h2 className="post__title">{post.title}</h2>
                        <p className="post__created">{post.createdAt}</p>
                        <button onClick={this.viewPost.bind(this, post._id)}>View Post</button>
                    </div>
                )
            });
        }
    }

    render() {
        return (
        <div>
            <h1>Your Posts</h1>
            {this.renderPostList()}
        </div>
        )
    }
}

export default UserPostsList;