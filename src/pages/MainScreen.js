import React, { Component } from "react";
import axios from "axios";

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      answers: []
    };
    this.renderAnswer = this.renderAnswer.bind(this);
  }
  componentDidMount() {
    let checkUser = localStorage.getItem("username");
    let endpoint;
    if (checkUser == null) {
      checkUser = "";
      endpoint = "2";
    } else {
      endpoint = "4";
    }
    const passwordValue = localStorage.getItem("password");
    axios({
      baseURL: `http://localhost:5000/Ps0${endpoint}.php`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
      },
      auth: {
        username: checkUser,
        password: passwordValue
      }
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            answers: response.data,
            user: checkUser
          });
        } else {
          console.log("Cannot fetch answers");
        }
      })
      .catch(error => {
        this.setState({
          error:
            error.response !== undefined
              ? error.response.data.error
              : error.toString()
        });
      });
  }

  _onClickLogout = () => {
    this.setState({
      user: ""
    });
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    axios({
      baseURL: "http://localhost:5000/Ps02.php",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            answers: response.data
          });
        } else {
          console.log("Cannot fetch answers");
        }
      })
      .catch(error => {
        this.setState({
          error:
            error.response !== undefined
              ? error.response.data.error
              : error.toString()
        });
      });
  };

  _onClickLogin = () => {
    this.props.history.replace("/login");
  };

  _onClickDelete = message_id => {
    let checkUser = localStorage.getItem("username");
    if (checkUser == null) {
      checkUser = "";
    }
    const passwordValue = localStorage.getItem("password");
    axios({
      baseURL: "http://localhost:5000/Ps042.php",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
      },
      auth: {
        username: checkUser,
        password: passwordValue
      },
      params: {
        action: "Usuń",
        par: message_id
      }
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            answers: response.data
          });
        } else {
          console.log("Cannot fetch answers");
        }
      })
      .catch(error => {
        this.setState({
          error:
            error.response !== undefined
              ? error.response.data.error
              : error.toString()
        });
      });
  };

  _onClickEdit = message_id => {
    this.props.history.replace(`/permissions/${message_id}`);
  };

  _onClickMessage = () => {
    this.props.history.replace("/message");
  };

  renderAnswer(item, index) {
    return (
      <tr>
        <td>{item.name}</td>
        <td>{item.text}</td>
        <button
          disabled={!item.delete}
          onClick={() => this._onClickDelete(item.message_id)}
        >
          Usuń
        </button>
        <button
          disabled={!item.edit}
          onClick={() => this._onClickEdit(item.message_id)}
        >
          Edytuj
        </button>
      </tr>
    );
  }

  render() {
    return (
      <div className="login-page">
        <div className="form">
          <h1 className="h1">{this.state.user}</h1>
          {this.state.user !== "" && (
            <button
              onClick={() => {
                this._onClickMessage();
              }}
            >
              New message
            </button>
          )}
          <table>{this.state.answers.map(this.renderAnswer)}</table>
          {this.state.user === "" ? (
            <button
              onClick={() => {
                this._onClickLogin();
              }}
            >
              login
            </button>
          ) : (
            <button
              onClick={() => {
                this._onClickLogout();
              }}
            >
              logout
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default MainScreen;
