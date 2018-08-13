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

    onSubmit(e) {
        e.preventDefault();

        const email = this.refs.email;
        const password = this.refs.password;

        Meteor.loginWithPassword({email}, password, (err) => {
            err ? this._FlashMessages.message('error', 'Unable to login, please ensure that your email and password are entered correctly.', 2000)
                : (this._FlashMessages.message('success', 'Logged In Successfully', 2000, () => {
                    history.push('/dashboard');
                }));
        });

    }

    render() {
        return (
        <div>
            <h1>Login</h1>
            <FlashMessages ref={(FlashMessages) => {this._FlashMessages = FlashMessages}}/>
            <form onSubmit={this.onFormSubmit}>
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