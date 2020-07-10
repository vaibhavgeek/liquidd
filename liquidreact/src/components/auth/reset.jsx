import axios from "axios";
import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter,
  Link 
} from "react-router-dom";
import { withRouter } from "react-router";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = withStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
      
const classes = useStyles;


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirmpassword: "",
      formErrors: "",
      message: "",
      buttonen: false,
      isLoading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    this.setState({buttonen: true ,  isLoading: true});
    const { password , confirmpassword } = this.state;
    const token = this.props.match.params.token;

    
      axios
      .post(
        "https://thawing-mesa-00717.herokuapp.com/password/reset",
        {
          user: {
            password: password,
            token: token
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log(response);
        if(response.statusText == "OK")
        {
            this.setState({isLoading: false, message: "Password Reset Successfully!"})
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
    
    
    event.preventDefault();
  }


  render() {
    return (

      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <TextField value={this.state.password}
            onChange={this.handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="newpassword"
          />

          <TextField value={this.state.confirm_password}
            onChange={this.handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmpassword"
            label="Confirm Password"
            type="password"
            id="confirmpassword"
            autoComplete="confirm-password"
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={this.state.buttonen}
          >
            Change Password
          </Button>
      { this.state.message != "" && ( <Alert severity="info">  {this.state.message}</Alert> ) }
        </form>
      </div>
      
    </Container>
    );
  }
}
