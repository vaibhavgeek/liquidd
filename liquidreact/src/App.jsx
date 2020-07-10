import React , {Component} from 'react';
import './App.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import Home from './components/home';
import Forgot from './components/auth/forgot';
import Reset from './components/auth/reset';
import Product from './components/product';
import axios from "axios";

export default class App extends Component {
   constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    axios
      .get("https://thawing-mesa-00717.herokuapp.com/logged_in", { withCredentials: true })
      .then(response => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user
          });
        } else if (
          !response.data.logged_in &
          (this.state.loggedInStatus === "LOGGED_IN")
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          });
        }
      })
      .catch(error => {
        console.log("check login error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
  

  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  }

  render(){
  return (
    <React.Fragment>

    <HashRouter>
           <Route
              exact
              path={"/login"}
              render={props => (
                <Login
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />

            <Route
              exact
              path={"/signup"}
              render={props => (
                <Signup
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />


             <Route
              exact
              path={"/forgot/:token"}
              render={props => (
                <Reset
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}

                />
              )}
            />

             <Route
              exact
              path={"/forgot"}
              render={props => (
                <Forgot
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}

                />
              )}
            />

            <Route
              exact
              path={"/"}
              render={props => (
                <Home
                  {...props}
                   handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />

             <Route
              exact
              path={"/product/:id"}
              render={props => (
                <Product
                  {...props}
                   handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />

            <Route
              exact
              path={"/dashboard"}
              render={props => (
                <Dashboard
                  {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
      </HashRouter>

    </React.Fragment>

  );
 }
}
