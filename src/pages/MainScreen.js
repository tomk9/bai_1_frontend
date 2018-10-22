import React, { Component } from 'react';
import axios from 'axios';

class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            answers: []
        };
        this.renderAnswer = this.renderAnswer.bind(this)
    }
    componentDidMount(){
        let checkUser = localStorage.getItem('username');
        if (checkUser == null) {
            checkUser = ''
        }
        this.setState({
            user: checkUser
        });
        axios({
            baseURL: 'http://localhost:5000/Ps02.php',
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*' }, 
                auth: {
                    username: checkUser,
                  },
        }).then((response) => {
            console.log(response);
            if( response.status === 200) {
                this.setState({
                    answers: response.data
                })
            } else {
                console.log('Cannot fetch answers')
            }
          })
          .catch((error) => {
            this.setState({
                error: error.response !== undefined ? error.response.data.error : error.toString()
            });
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

    renderAnswer (item, index)  {
        return (
            <tr>
                <td>{item.name}</td>
                <td>{item.text}</td>
                <button
                    disabled={!item.delete}
                >
                Usuń
                </button>
                <button
                    disabled={!item.edit}
                >
                Edytuj
                </button>
            </tr>
            
        )
    }

    render() {
        return (
            <div className='login-page'>
                <div className='form'>
                    <h1 className='h1'>{this.state.user}</h1>
                    
                        <table>
                            {this.state.answers.map(this.renderAnswer)}
                        </table>
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

export default MainScreen;