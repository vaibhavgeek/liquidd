import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

  const classes = useStyles;

export default class Registration extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fname: "",
      lname:"",
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: "",
      message: ""
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
    const { fname, lname , email, password, password_confirmation } = this.state;

    axios
      .post(
        "https://thawing-mesa-00717.herokuapp.com/registrations",
        {
          user: {
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log(response.data);
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
        }
        else
        {
          this.setState({message: "Please fill all the details to signup"});
        }
      })
      .catch(error => {
       this.setState({message: "Please fill all the details to signup"});
      });
    event.preventDefault();
  }

  render() {
    return (

       <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={this.state.fname}
                onChange={this.handleChange}  
                autoComplete="fname"
                name="fname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={this.state.lname}
                onChange={this.handleChange}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lname"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={this.state.email}
                onChange={this.handleChange}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={this.state.password}
                onChange={this.handleChange}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>

             <Grid item xs={12}>
              <TextField
                value={this.state.password_confirmation}
                onChange={this.handleChange}
                variant="outlined"
                required
                fullWidth
                name="password_confirmation"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
     { this.state.message != "" && ( <Alert severity="info">  {this.state.message}</Alert> ) }

          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>


      
    );
  }
}
