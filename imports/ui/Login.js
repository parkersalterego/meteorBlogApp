import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import history from '../routing/history';
import FlashMessages from './FlashMessages';

class Login extends Component {

    constructor(props) { 
        super(props);

    }

    componentWillMount() {
        Meteor.userId() ? history.replace('/dashboard')
                        : null;
    }

    onFormSubmit(e) {
        e.preventDefault();

        const email = this.refs.email.value;
        const password = this.refs.password.value;

        Meteor.loginWithPassword({email}, password, (err) => {
            if (err) {
                this._FlashMessages.message('error', 'Unable to login, please check that your email and password are spelled correctly', 2000);
            } else {
                this._FlashMessages.message('success', 'Logged In', 2000, () => {
                    history.push('/dashboard');
                });
            }
        });
    }

    render() {
        return (
        <div>
            <h1>Login</h1>
            <FlashMessages ref={(FlashMessages) => {this._FlashMessages = FlashMessages}}/>
            <form onSubmit={this.onFormSubmit.bind(this)}>
                <input type="email" ref="email" placeholder="Email"/>
                <input type="password" ref="password" placeholder="Password"/>
                <button>Login</button>
            </form>
            <Link to="/register">Need an account?</Link>
        </div>
        )
    }
}


export default Login;