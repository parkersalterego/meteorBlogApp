import React, { Component } from 'react'
import  { Link } from 'react-router-dom';
import history from '../routing/history';
import FlashMessages from './FlashMessages';
import { Accounts } from 'meteor/accounts-base';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: false,
            email: false,
            passwordMatch: false,
            timeout: '',
        }

    }

    componentWillMount() {
        Meteor.userId() ? history.replace('/dashboard') : undefined;
    }

    evalPasswordMatch() {
        clearTimeout(this.state.timeout);

        this.setState({
            timeout: setTimeout(()  => {
                this.refs.password.value.trim() !== this.refs.passwordCheck.value.trim()
                || this.refs.password.value.length < 7 
                || this.refs.passwordCheck.value.length < 7
                || this.refs.password.value.length > 16
                || this.refs.passwordCheck.value.length > 16
                    ? (this._FlashMessages.message('error', 'Password must match and be between 7 and 15 characters long', 2000), this.setState({passwordMatch: false}))
                    : this.setState({passwordMatch: true});
            }, 750)
        });
    };

    evalEmail() {
        clearTimeout(this.state.timeout);

        this.setState({
            timeout: setTimeout(() => {
                !this.refs.email.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
                ? (this._FlashMessages.message('error', 'Invalid email address please be sure that you have typed it correctly', 2000), this.setState({email: false}))
                : this.setState({email: true});
            }, 750)
        })
    }

    evalUsername() {
        clearTimeout(this.state.timeout);

        this.setState({
            timeout: setTimeout(() => {
                Meteor.call('users.findUserByUsername', this.refs.username.value, (err, res) => {
                    if (err) {
                        this._FlashMessages.message('error', err.reason, 2000);
                        this.setState({username: false});
                    } else {
                        res ? (this._FlashMessages.message('error', `The username ${this.refs.username.value} is already taken`, 2000),
                                this.setState({username: false}))
                            : (this.setState({username: true}), console.log(this.state.username));
                    }
                });
            }, 750)
        })
    }

    onFormSubmit(e) {
        e.preventDefault();

        const username = this.refs.username.value.trim();
        const password = this.refs.password.value.trim();
        const email = this.refs.email.value.trim();

        if (!this.state.email || !this.state.passwordMatch || !this.state.username) { 
            this._FlashMessages.message('error', 'Please fill out all fields', 2000);
        } else {
            Accounts.createUser({username, email, password}, (err) => {
                err ? this._FlashMessages.message('error', err.reason, 2000)
                    : this._FlashMessages.message('success', 'Account Created', 2000, () => {
                        history.push('/dashboard');
                    });
            });
        }
    }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <FlashMessages ref={(FlashMessages) => {this._FlashMessages = FlashMessages}}/>
        <form onSubmit={this.onFormSubmit.bind(this)}>
            <input 
                onKeyUp={this.evalUsername.bind(this)}
                type="text" 
                ref="username" 
                name="username" 
                placeholder="username" />
            <input 
                onKeyUp={this.evalEmail.bind(this)}
                type="email"
                ref="email"
                name="email"
                placeholder="Email"
            />
            <input 
            type="password"
            ref="password"
            name="password"
            placeholder="Password"
            />
            <input 
                onKeyUp={this.evalPasswordMatch.bind(this)}
                type="password"
                ref="passwordCheck"
                name="password"
                placeholder="Confirm Password"
            />
            <button>Register</button>
        </form>
        <Link to="/">Already have an account?</Link>
      </div>
    )
  }
}


export default Register;