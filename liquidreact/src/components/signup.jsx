import React, { Component } from "react";

import Registration from "./auth/signup";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
 //   this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
  }

  /*handleLogoutClick() {
    axios
      .delete("https://thawing-mesa-00717.herokuapp.com/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }*/

  render() {
    return (
      <div>
       
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    );
  }
}