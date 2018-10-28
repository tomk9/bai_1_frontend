import React, { Component } from "react";
import axios from "axios";

class MessageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    let checkUser = localStorage.getItem("username");
    if (checkUser == null) {
      checkUser = "";
    }
    this.setState({
      user: checkUser
    });
  }
  onSubmit(event) {
    event.preventDefault();
    const { message: { value: messageText = "" } = {} } = this.refs;
    const passwordValue = localStorage.getItem("password");

    axios({
      baseURL: "http://localhost:5000/Ps042.php",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
      },
      auth: {
        username: this.state.user,
        password: passwordValue
      },
      params: {
        action: "Dodaj",
        par: messageText
      }
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          console.log("Response 200");
          this.props.history.replace("/");
        } else {
          this.setState({
            error: "Error"
          });
        }
      })
      .catch(error => {
        console.log(error.response.status);
        if (error.response.status === 401) {
          this.setState({
            error: error.response.statusText
          });
        } else {
          this.setState({
            error:
              error.response !== undefined
                ? error.response.data.error
                : error.toString()
          });
        }
      });
  }
  _onClickCancel = () => {
    this.props.history.replace("/");
  };
  render() {
    return (
      <div className="login-page">
        <div className="form">
          <h1 className="h1">{this.state.user}</h1>
          <form className="login-form" onSubmit={this.onSubmit}>
            <textarea
              name="Text1"
              cols="40"
              rows="5"
              type="text"
              placeholder="new message"
              ref="message"
              id="message"
              autoFocus
            />
            <div className="login-error">{this.state.error}</div>
            <button type="submit">submit</button>
          </form>
          <button
            style={{ marginTop: "20px" }}
            onClick={() => this._onClickCancel()}
          >
            cancel
          </button>
        </div>
      </div>
    );
  }
}

export default MessageScreen;
