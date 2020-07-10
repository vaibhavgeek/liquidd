
import React, { Component } from "react";
import axios from "axios";

export default class Product extends Component {
  state = { product: []}
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  componentDidMount(){
    console.log(this.props.match.params.id);
    
      axios
      .get('https://thawing-mesa-00717.herokuapp.com/product/'+ this.props.match.params.id)
      .then(response => {
           console.log(response.data.product);
           this.setState({product: [response.data.product]});
      })
    
  }
  handleLogoutClick() {
    axios
      .delete("https://thawing-mesa-00717.herokuapp.com/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
          this.props.history.push("/");
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render() {
    return (
      <div>
      {this.state.product.map(prod => 
        <div>
        <div><b> Name: </b>{prod.name}</div><div><b>Model: </b>{prod.model}</div>
        <div><b>Brand: </b>{prod.brand}</div>
        <div><b>Year: </b>{prod.year}</div>
        <div><b>RAM: </b>{prod.ram}</div>
        <div><b> External Storage: </b>{prod.external_storage}</div>
        <div><b>Info: </b>{prod.info}</div>
        </div>
        )}
        <h1>Status: {this.props.loggedInStatus}</h1>
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
        
      </div>
    );
  }
}