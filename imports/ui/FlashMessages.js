import React from 'react';

export default class FlashMessages extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: '',
            success: ''
        };
    }

    message(state, message, timing, callback) {
        state === 'error' ? this.setState({error: message}) : this.setState({success: message});

        setTimeout(() => {
            this.setState({error: '', success: ''});

            typeof(callback) === 'function' ? callback() : undefined;
        }, timing);

    }

    render() {
        return (
            <div>
                {this.state.error ? <p className='error-message'>{this.state.error}</p> : undefined}
                {this.state.success ? <p className="success-message">{this.state.success}</p> : undefined}
            </div>
        );
    }
}