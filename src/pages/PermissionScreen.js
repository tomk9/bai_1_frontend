import React, { Component } from 'react';

class PermissionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };
    }
    componentDidMount(){
        let checkUser = localStorage.getItem('username');
        this.setState({
            user: checkUser
        });
    }

    _onClickLogout = () => {
        this.setState({
            user: ''
        });
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    }

    _onClickLogin = () => {
        this.props.history.replace('/login');
    }

    render() {
        return (
            <div className='login-page'>
                <div className='form'>
                    <h1 className='h1'>{this.state.user}</h1>
                    {this.state.user === '' ?
                    <button
                        onClick={()=>{this._onClickLogin()}}
                    >
                    login
                    </button>
                    :
                    <button
                        onClick={()=>{this._onClickLogout()}}
                    >
                    logout
                    </button>
                    }

                </div>
            </div>
        );
    }
}

export default PermissionScreen;