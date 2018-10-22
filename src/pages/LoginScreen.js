import React, { Component } from 'react';
import axios from 'axios';

class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit (event) {
        event.preventDefault();
        const {
            username: {
                value: usernameValue = ''
            } = {},
            password: {
                value: passwordValue = ''
            } = {}
        } = this.refs;

        axios({
            baseURL: 'http://localhost:5000/Ps04.php',
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*' }, 
                auth: {
                    username: usernameValue,
                    password: passwordValue,
                  },
        }).then((response) => {
            console.log(response);
            if( response.status === 200) {
                console.log('Response 200');
                localStorage.setItem('username', usernameValue);
                localStorage.setItem('password', passwordValue);
                this.props.history.replace('/');
            } else {
                this.setState({
                    error: 'Incorrect login or password'
                });
            }
          })
          .catch((error) => {
              console.log(error.response.status);
                if(error.response.status === 401) {
                    this.setState({
                        error: error.response.statusText
                    });
                }
                else {
                this.setState({
                    error: error.response !== undefined ? error.response.data.error : error.toString()
                });
              }
          });

    }
  render() {
    return (
        <div className='login-page'>
            <div className='form'>
                <form
                    className='login-form'
                    onSubmit={this.onSubmit}
                >
                    <input
                        type='text'
                        placeholder='username'
                        ref='username'
                        id='username'
                        autoFocus
                    />
                    <input
                        type='password'
                        placeholder='password'
                        ref='password'
                        id='password'
                    />
                    <div className='login-error'>{this.state.error}</div>
                    <button type='submit'>login</button>
                </form>
            </div>
        </div>
    );
  }
}

export default LoginScreen;