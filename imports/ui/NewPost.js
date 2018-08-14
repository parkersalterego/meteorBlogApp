import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import FlashMessages from './FlashMessages';
import history from '../routing/history';

import NavBar from './NavBar';

class NewPost extends Component {

    onFormSubmit(e)  {
        e.preventDefault();
        
        if (this.refs.title.value === '' || this.refs.body.value === '') {
            this._FlashMessages.message('error', 'Please fill out both the title and body', 2000);
        } else {
            console.log('submitting');
            const title = this.refs.title.value;
            const body = this.refs.body.value;
            Meteor.call('posts.insert', {title, body}, (err) => {
                if (err) {
                    this._FlashMessages.message('error', err.reason, 2000);
                } else {
                    this._FlashMessages.message('success', 'Post Submitted', 1500, () => {
                        history.push('/dashboard');
                    });
                }
            });
        }
    }

  render() {
    return (
      <div>
        <NavBar/>
        <h1>New Post</h1>
        <FlashMessages ref={(FlashMessages) => {this._FlashMessages = FlashMessages}}/>
        <form onSubmit={this.onFormSubmit.bind(this)}>
            <input type="text" ref="title" placeholder="Title"/>
            <textarea name="body" ref="body" cols="30" rows="10"></textarea>
            <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default NewPost;