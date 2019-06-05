import React, { Component } from "react";

class LogIn extends Component {
  state = {
    email: "",
    password: "",
    response: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    fetch("/auth/login", {
      method: "post",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          response: res.msg
        });
      });
  };

  render() {
    return (
      <div>
        <label>
          email
          <input type="email" name="email" onChange={this.onChange} />
        </label>
        <label>
          password
          <input type="password" name="password" onChange={this.onChange} />
        </label>
        <input type="submit" value="Submit" onClick={this.onSubmit} />
        {this.state.response ? <p>{this.state.response}</p> : ""}
      </div>
    );
  }
}

export default LogIn;
