
import React, { Component } from "react";
import axios from "axios";
import { ExportCSV } from './dashcomponents/excel';
import Pagination from '@material-ui/lab/Pagination';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';

export default class Dashboard extends Component {

  state = {
      name: "",
      model:"",
      brand: "",
      year: "",
      ram: "",
      external_storage:"",
      info:"",
      current_page: 1,
      total_page: 0,
      products: [],
      fileName: 'productsearch',
      curr_call: ""
    }

  constructor(props) {
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.searchProduct(event.target.name , event.target.value);
  }
  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
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
  componentDidMount(){
    axios
      .get('https://thawing-mesa-00717.herokuapp.com/all_products?page=1')
      .then(response => {
           console.log(response.data.results);
           this.setState({curr_call: 'https://thawing-mesa-00717.herokuapp.com/all_products'})
           this.setState({products: response.data.results});
           this.setState({total_page: response.data.meta.total_pages})
      })
  }
  searchProduct(column,query,page=1){
      axios
        .get('https://thawing-mesa-00717.herokuapp.com/products/search?column='+column+'&search='+query+'&page='+page)
        .then(response => {
            this.setState({curr_call: 'https://thawing-mesa-00717.herokuapp.com/products/search?column='+column+'&search='+query});
            this.setState({products: response.data.results});
            this.setState({current_page: page});
        })
  }
  nextpagebutton(value){
    this.setState({current_page: value});
    if(this.state.curr_call.includes('search'))
      var url_fetch = this.state.curr_call + '&page=' + value;
    else
      var url_fetch = this.state.curr_call + '?page=' + value;
    console.log(url_fetch);
    axios
        .get(url_fetch)
        .then(response => {
            this.setState({products: response.data.results});
            this.setState({current_page: value});
        })
  }
  handleChangePage = (event, value) => {
   // console.log(value);
    this.nextpagebutton(value);
  };
   
  render() {
   return (
      <div>
      <Button onClick={() => this.handleLogoutClick()}>Logout</Button>
        <ExportCSV csvData={this.state.products} fileName={this.state.fileName} />
        
      <table>
      <thead className='bgvi'>
                            <tr>
                                <th>URL</th>
                                <th>Name</th>
                                <th>Model</th>
                                <th>Brand</th>
                                <th>Year</th>
                                <th>RAM</th>
                                <th>External Storage</th>
                                <th>Info</th>
                            </tr>
                             <tr>
                             <th> </th>

                                <th>
    <TextField value={this.state.name} onChange={this.handleChange} variant="outlined"
      id="searchq" label="Search Query" name="name" />
                                </th>
                                <th>
    <TextField value={this.state.model} onChange={this.handleChange} variant="outlined"
      id="searchq" label="Search Query" name="model" />
                                </th>
                                <th>
    <TextField value={this.state.brand} onChange={this.handleChange} variant="outlined"
      id="searchq" label="Search Query" name="brand" />
                                </th>
                                <th>
    <TextField value={this.state.year} onChange={this.handleChange} variant="outlined"
      id="searchq" label="Search Query" name="year" />
                                </th>
                                <th>
    <TextField value={this.state.ram} onChange={this.handleChange} variant="outlined"
      id="searchq" label="Search Query" name="ram" />
                                </th>
                                <th>
    <TextField value={this.state.external_storage} onChange={this.handleChange} variant="outlined"
      id="searchq" label="Search Query" name="external_storage" />
                                </th>
                                <th>
    <TextField value={this.state.info} onChange={this.handleChange} variant="outlined"
      id="searchq" label="Search Query" name="info" />
                                </th>
                     
                            </tr>
                        </thead>
                        <tbody>
              { this.state.products.map(product => 

                <tr key = {product.id}>
                  <td> https://URL/product/{product.id + 1} </td>
                  <td>{product.name}</td>
                  <td>{product.model}</td>
                  <td>{product.brand}</td>
                  <td>{product.year}</td>
                  <td>{product.ram}</td>
                  <td>{product.external_storage}</td>
                  <td>{product.info}</td>
              </tr>

                )
            }
            </tbody>
            </table>
                    <Pagination count={10} page={this.state.current_page} onChange={this.handleChangePage} color="primary" />

        {/*<h1>Status: {this.props.loggedInStatus}</h1>*/}
        

      </div>
    );
  }
}