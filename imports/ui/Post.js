import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import FlashMessages from './FlashMessages';

class Post extends Component {

    constructor(props) {
        super(props);

        this.state = {
            post: {}
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

    renderPost() {
        return (
            <div className="post">
                <h1 className="post__title">{this.state.post.title}</h1>
                {/* use moment js below */}
                <p className="post__created-at">{this.state.post.createdAt}</p>
                <br/>
                <p className="post__body">{this.state.post.body}</p>
            </div>
        )
    }

  render() {
    return (
      <div>
        <FlashMessages ref={(FlashMessages) => {this._FlashMessages = FlashMessages}}/>
        {this.renderPost()}
      </div>
    )
  }
}

export default Post;
