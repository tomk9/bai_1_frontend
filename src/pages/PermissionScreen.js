import React, { Component } from "react";
import axios from "axios";
import renameKeys from "rename-keys";

class PermissionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      message_id: null,
      text: "",
      answers: [],
      error: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.renderAnswer = this.renderAnswer.bind(this);
  }
  componentDidMount() {
    let checkUser = localStorage.getItem("username");
    if (checkUser == null) {
      checkUser = "";
    }
    const passwordValue = localStorage.getItem("password");
    const message_id = this.props.history.location.pathname.match(/\d+/)[0];
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
        action: "Edytuj",
        par: message_id
      }
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          console.log("Response 200");
          this.setState({
            text: response.data.text,
            answers: response.data.users || []
          });
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
    this.setState({
      user: checkUser,
      message_id: message_id
    });
    // console.log('props', this.props.history.location.pathname.match(/\d+/)[0])
  }

  _onClickCancel = () => {
    this.props.history.replace("/");
  };

  onSubmit(event) {
    event.preventDefault();

    const passwordValue = localStorage.getItem("password");

    const canEdit = this.state.answers.filter(item => item.edit);
    const canEditOnlyNames = canEdit.map(item => item.user_id);
    const canEditObject = Object.assign(
      {
        // action: 'Zatwierdź',
        // par: this.state.text,
        // par2: this.state.message_id,
      },
      canEditOnlyNames
    );
    const canEditOnlyNamesNewLabels = renameKeys(canEditObject, (key, val) => {
      return `par${val}${key}`;
    });
    const canEditObjectFinal = Object.assign(
      {
        action: "Zatwierdź",
        par: this.state.text,
        par2: this.state.message_id
      },
      canEditOnlyNamesNewLabels
    );

    console.log("nowatablica", canEditObjectFinal);

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
      params: canEditObjectFinal
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

  _onChange = index => {
    let answers = this.state.answers;
    answers[index].edit = !answers[index].edit;
    this.setState({
      answers: answers
    });
  };

  renderAnswer(item, index) {
    return (
      <label>
        <input
          style={{ marginTop: "30px" }}
          defaultChecked={item.edit}
          type="checkbox"
          onChange={() => this._onChange(index)}
        />
        {item.name}
      </label>
    );
  }
  handleChange = event => {
    this.setState({ text: event.target.value });
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
              onChange={event => this.handleChange(event)}
              value={this.state.text}
            />
            <div>{this.state.answers.map(this.renderAnswer)}</div>
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

export default PermissionScreen;
