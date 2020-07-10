import React from "react";
import {
  Route,
  NavLink,
  HashRouter,
  Link
} from "react-router-dom";

function UserGreeting(props) {
  return <h1>Liquid Diamonds</h1>;
}

function GuestGreeting(props) {
  return (
  	<div>
  	<h1>Please sign up. or Login</h1>
  	<Link to="/login" variant="body2">
                Login
         </Link>
         </div>
  	);
}


const Home = props => {
  const isLoggedIn = props.loggedInStatus;
  if (isLoggedIn == "NOT_LOGGED_IN") {
    return <GuestGreeting />;
  }
  return <UserGreeting />;
};


export default Home;