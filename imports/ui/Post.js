import React, { Component } from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';
import FlashMessages from './FlashMessages';
import history from '../routing/history';
import moment from 'moment';

class Post extends Component {

    constructor(props) {
        super(props);

        this.state = {
            post: {},
            edit: false
        }
    }

    componentWillMount() {
        Meteor.call('posts.findById', this.props.match.params.id, (err, res) => {
            if (err) {
                _FlashMessages.message('error', err.reason, 2000);
            } else {
                this.setState({post: res});
            }
        });
    }

    onFormSubmit(e) {
        e.preventDefault();

        const title = this.refs.title.value.trim();
        const body = this.refs.body.value.trim();
        const id = this.props.match.params.id;

        console.log(title, body, id);

        if (title === '' || body === '') {
            this._FlashMessages.message('error', 'Fields may not be empty', 2000);
        } else if (title === this.state.post.title && body === this.state.post.body) {
            this._FlashMessages.message('error', 'Changes must be made in order to submit an edit', 2000);
        } else {
            Meteor.call('posts.updateOne', id, title, body, (err, res) => {
                if (err) {
                    this._FlashMessages.message('error', err.reason, 2000);
                } else {
                    this._FlashMessages.message('success', 'Post Updated', 1500, () => {
                        history.push('/yourposts');
                    });
                }
            });
        }
    }

    deletePost() {
        const id = this.props.match.params.id;

        if (confirm('Are you sure you  would like to delete this post')) {
            Meteor.call('posts.deleteOne', id, (err, res) => {
                if (err) {
                    this._FlashMessages.message('error', err.reason, 2000);
                } else {
                    this._FlashMessages.message('success', 'Post Deleted', 1500, () => {
                        history.push('/yourposts');
                    });
                }
            });
        }
    }

    renderPost() {
        if (this.state.edit === false) {
            return (
                <div className="post">
                    <h1 className="post__title">{this.state.post.title}</h1>
                    <button onClick={() => this.setState({edit: true})}>Edit</button>
                    <button onClick={this.deletePost.bind(this)}>Delete</button>
                    {/* use moment js below */}
                    <p className="post__created-at">{moment(this.state.post.createdAt).format('MMMM Do, YYYY')}</p>
                    <br/>
                    <p className="post__body" ref="postBody">{this.state.post.body}</p>
                </div>
            )
        } 
    }

  render() {
    return (
      <div>
        {!this.state.edit ? <FlashMessages ref={(FlashMessages) => {this._FlashMessages = FlashMessages}}/> : null}
        <Modal
            ariaHideApp={false}
            isOpen={this.state.edit}
            contentLabel="Edit Post"
            onAfterOpen={() => {
                this.refs.title.value = this.state.post.title;
                this.refs.body.value = this.state.post.body;
            }}
            onRequestClose={() => this.setState({edit: false})}
        >
            <form onSubmit={this.onFormSubmit.bind(this)}>
                <FlashMessages ref={(FlashMessages) => {this._FlashMessages = FlashMessages}}/>
                <input type="text" ref="title" placeholder="Title"/>
                <textarea ref="body" cols="30" rows="10" placeholder="Body"></textarea>
                <button>Submit</button>
            </form>
        </Modal>
        {this.renderPost()}
      </div>
    )
  }
}

export default Post;
